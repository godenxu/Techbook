/* =====================================================================
 * 银行金融科技前沿技术研究成果 · 电子研究书 —— 应用逻辑
 * 纯原生 JS，无任何外部依赖；双击 index.html 即可离线运行。
 * 双视图：书籍 / 网页（目录+滚动内容）
 * ===================================================================== */
(function () {
  'use strict';
  var DATA = window.DATA;
  var $ = function (id) { return document.getElementById(id); };

  /* ==================== 工具函数 ==================== */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function scoreColor(v) {
    if (v >= 8) return 'var(--good)';
    if (v >= 6) return 'var(--accent2)';
    if (v >= 4) return 'var(--warn)';
    return 'var(--bad)';
  }
  function scoreBar(v, max, delayIdx) {
    max = max || 10;
    var pct = Math.round(v / max * 100);
    var color = pct >= 80 ? 'var(--good)' : (pct >= 60 ? 'var(--accent2)' : (pct >= 40 ? 'var(--warn)' : 'var(--bad)'));
    var delay = delayIdx != null ? ('animation-delay:' + (0.3 + delayIdx * 0.18).toFixed(2) + 's;') : '';
    return '<div class="bar"><i style="--bar-w:' + pct + '%;' + delay + 'width:' + pct + '%;background:' + color + '"></i></div>';
  }
  function scoreColor5(v) {
    if (v >= 4) return 'var(--good)';
    if (v >= 3) return 'var(--warn)';
    if (v >= 2) return 'var(--accent2)';
    return 'var(--bad)';
  }
  function catColor(name) { return DATA.categoryColor[name] || '#8fa3c0'; }
  function tierColor(name) {
    if (name === '布局层') return '#34d399';
    if (name === '论证层') return '#38bdf8';
    if (name === '研究层') return '#fbbf24';
    if (name === '观察层') return '#fb7185';
    return (DATA && DATA.tierColor && DATA.tierColor[name]) || '#8fa3c0';
  }
  function scorePill(v) {
    var n = Number(v) || 0;
    return '<span class="pill s' + n + '">' + n + '分</span>';
  }
  function sixDimHTML(it) {
    var dims = [['成熟', it.maturity], ['匹配', it.strategicFit], ['价值', it.value], ['可行', it.feasibility], ['紧迫', it.urgency], ['开放', it.openness]];
    return '<div class="sixdim">' + dims.map(function (d) {
      return '<span class="sd s' + d[1] + '" title="' + d[0] + ' ' + d[1] + '/5">' + d[0] + ' ' + d[1] + '</span>';
    }).join('') + '</div>';
  }
  function tierPill(tier) {
    return '<span class="pill-tier" style="color:' + tierColor(tier) + ';background:' + tierColor(tier) + '1f;border:1px solid ' + tierColor(tier) + '">' + esc(tier) + '</span>';
  }
  function dimColor(d) { return scoreColor5(d.score); }
  function toast(msg) {
    var t = $('toast'); t.textContent = msg; t.classList.remove('hidden');
    clearTimeout(t._tm); t._tm = setTimeout(function () { t.classList.add('hidden'); }, 2200);
  }
  function relColor(key) {
    for (var i = 0; i < DATA.graphRelations.length; i++)
      if (DATA.graphRelations[i].key === key) return DATA.graphRelations[i].color;
    return '#64748b';
  }
  function findTech(id) {
    for (var i = 0; i < DATA.technologies.length; i++)
      if (DATA.technologies[i].id === id) return DATA.technologies[i];
    return null;
  }
  function findLib(id) {
    for (var i = 0; i < DATA.library.items.length; i++)
      if (DATA.library.items[i].id === id) return DATA.library.items[i];
    return null;
  }
  function formatBullets(text) {
    if (!text) return '<span style="color:var(--faint)">暂无详细说明</span>';
    var lines = String(text).split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    if (lines.length === 0) return '<span style="color:var(--faint)">暂无详细说明</span>';
    var isList = lines.some(function (l) { return /^[·•\-*▸]|\d+\./.test(l); }) || lines.length > 1;
    if (isList) {
      return '<ul class="tech-box-list">' + lines.map(function (l) {
        var clean = l.replace(/^[·•\-*▸]\s*/, '');
        var m = clean.match(/^([^：:]{2,10}[：:])(.*)$/);
        if (m) {
          return '<li><b class="hl">' + esc(m[1]) + '</b>' + esc(m[2]) + '</li>';
        }
        return '<li>' + esc(clean) + '</li>';
      }).join('') + '</ul>';
    }
    return '<div class="tech-box-text">' + esc(text) + '</div>';
  }

  /* ==================== 覆盖层动效性能智能冻结机制 ==================== */
  var activeOverlayCount = 0;
  var lastOverlayCloseTimestamp = 0;
  function syncOverlayCount() {
    var count = 0;
    ['panel', 'modal', 'lightbox'].forEach(function (id) {
      var el = $(id);
      if (el && !el.classList.contains('hidden') && !el.classList.contains('is-closing')) {
        count++;
      }
    });
    activeOverlayCount = count;
    if (activeOverlayCount > 0) {
      document.body.classList.add('has-overlay-open');
    } else {
      document.body.classList.remove('has-overlay-open');
    }
  }
  function updateOverlayState(delta) {
    syncOverlayCount();
  }

  /* ==================== 面板导航历史栈 (NavStack) ==================== */
  var panelNavStack = [];
  var currentPanelMeta = null;

  function updateBackBtn() {
    var backBtn = $('panelBack');
    if (!backBtn) return;
    if (panelNavStack.length > 0) {
      var topItem = panelNavStack[panelNavStack.length - 1];
      var parentName = topItem.meta && topItem.meta.name ? topItem.meta.name : '上一页';
      backBtn.innerHTML = '‹ 返回 ' + esc(parentName);
      backBtn.classList.remove('hidden');
    } else {
      backBtn.classList.add('hidden');
    }
  }

  function capturePanelSnapshot() {
    if (!currentPanelMeta || !$('panel') || $('panel').classList.contains('hidden')) return null;
    var snap = {
      meta: Object.assign({}, currentPanelMeta),
      title: $('panelTitle').innerHTML,
      scrollTop: $('panelBody') ? $('panelBody').scrollTop : 0
    };
    if (currentPanelMeta.type === 'library') {
      snap.libState = Object.assign({}, libState);
    } else if (currentPanelMeta.type === 'hypeCycle') {
      var hcWrap = $('panelBody') ? $('panelBody').querySelector('.hc-interactive-wrap') : null;
      if (hcWrap) {
        snap.hypeCycleFilters = {
          phase: hcWrap.querySelector('.radar-btn-group[data-filter="phase"] .active') ? hcWrap.querySelector('.radar-btn-group[data-filter="phase"] .active').getAttribute('data-val') : 'all',
          tier: hcWrap.querySelector('.radar-btn-group[data-filter="tier"] .active') ? hcWrap.querySelector('.radar-btn-group[data-filter="tier"] .active').getAttribute('data-val') : 'all',
          plateau: hcWrap.querySelector('.radar-btn-group[data-filter="plateau"] .active') ? hcWrap.querySelector('.radar-btn-group[data-filter="plateau"] .active').getAttribute('data-val') : 'all',
          q: hcWrap.querySelector('.hc-search-input') ? hcWrap.querySelector('.hc-search-input').value : ''
        };
      }
    } else if (currentPanelMeta.type === 'radar') {
      var rWrap = $('panelBody') ? $('panelBody').querySelector('.radar-interactive-wrap') : null;
      if (rWrap) {
        snap.radarFilters = {
          sector: rWrap.querySelector('.radar-btn-group[data-filter="sector"] .active') ? rWrap.querySelector('.radar-btn-group[data-filter="sector"] .active').getAttribute('data-val') : 'all',
          tier: rWrap.querySelector('.radar-btn-group[data-filter="tier"] .active') ? rWrap.querySelector('.radar-btn-group[data-filter="tier"] .active').getAttribute('data-val') : 'all',
          ring: rWrap.querySelector('.radar-btn-group[data-filter="ring"] .active') ? rWrap.querySelector('.radar-btn-group[data-filter="ring"] .active').getAttribute('data-val') : 'all',
          value: rWrap.querySelector('.radar-btn-group[data-filter="value"] .active') ? rWrap.querySelector('.radar-btn-group[data-filter="value"] .active').getAttribute('data-val') : 'all',
          q: rWrap.querySelector('.radar-search-input') ? rWrap.querySelector('.radar-search-input').value : ''
        };
      }
    } else if (currentPanelMeta.type === 'tech') {
      var activeTabEl = $('panelBody') ? $('panelBody').querySelector('.tab.active') : null;
      snap.techId = currentPanelMeta.techId;
      snap.activeTab = activeTabEl ? activeTabEl.getAttribute('data-name') : 'assess';
    }
    return snap;
  }

  function popPanelNav() {
    lastOverlayCloseTimestamp = Date.now();
    if (panelNavStack.length === 0) {
      closePanel(true);
      return;
    }
    var snapshot = panelNavStack.pop();
    if (snapshot.meta.type === 'library') {
      openLibraryPanel(null, snapshot.libState, snapshot.scrollTop, true);
    } else if (snapshot.meta.type === 'hypeCycle') {
      openHypeCyclePanel(snapshot.hypeCycleFilters, snapshot.scrollTop, true);
    } else if (snapshot.meta.type === 'radar') {
      openRadarPanel(snapshot.radarFilters, snapshot.scrollTop, true);
    } else if (snapshot.meta.type === 'graph') {
      openGraphPanel(snapshot.scrollTop, true);
    } else if (snapshot.meta.type === 'tech') {
      openTechPanel(findTech(snapshot.techId) || findLib(snapshot.techId), snapshot.activeTab, true);
      if (snapshot.scrollTop && $('panelBody')) $('panelBody').scrollTop = snapshot.scrollTop;
    } else {
      closePanel(true);
    }
  }

  function openPanel(title, html, onMount, flexBody) {
    var el = $('panel');
    el.classList.remove('is-closing');
    $('panelTitle').innerHTML = title;
    $('panelBody').innerHTML = html;
    if (typeof linkTermsInContainer === 'function') linkTermsInContainer($('panelBody'));
    $('panelBody').classList.toggle('flex', !!flexBody);
    var navEl = $('panelTechNav');
    if (navEl && (!currentPanelMeta || currentPanelMeta.type !== 'tech')) {
      navEl.classList.add('hidden');
    }
    el.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateOverlayState(1);
    updateBackBtn();
    if (onMount) setTimeout(onMount, 0);
  }

  function closePanel(force) {
    var pop = $('termModalPopover'); if (pop) pop.classList.add('hidden');
    var el = $('panel');
    if (!el || el.classList.contains('hidden')) return;
    lastOverlayCloseTimestamp = Date.now();
    if (!force && panelNavStack.length > 0) {
      popPanelNav();
      return;
    }
    el.classList.add('is-closing');
    setTimeout(function () {
      el.classList.add('hidden');
      el.classList.remove('is-closing');
      var navEl = $('panelTechNav');
      if (navEl) navEl.classList.add('hidden');
      var iframes = el.querySelectorAll('iframe');
      iframes.forEach(function (f) {
        try { f.src = 'about:blank'; } catch (e) {}
      });
      $('panelBody').innerHTML = '';
      $('panelBody').classList.remove('flex');
      panelNavStack = [];
      currentPanelMeta = null;
      updateBackBtn();
      document.body.style.overflow = '';
      updateOverlayState(-1);
    }, 220);
  }
  function openModal(title, html) {
    var el = $('modal');
    el.classList.remove('is-closing');
    $('modalTitle').innerHTML = title;
    $('modalBody').innerHTML = html;
    if (typeof linkTermsInContainer === 'function') linkTermsInContainer($('modalBody'));
    el.classList.remove('hidden');
    updateOverlayState(1);
  }
  function closeModal() {
    var pop = $('termModalPopover'); if (pop) pop.classList.add('hidden');
    var el = $('modal');
    if (!el || el.classList.contains('hidden')) return;
    lastOverlayCloseTimestamp = Date.now();
    el.classList.add('is-closing');
    setTimeout(function () {
      el.classList.add('hidden');
      el.classList.remove('is-closing');
      $('modalBody').innerHTML = '';
      updateOverlayState(-1);
    }, 220);
  }
  /* ==================== 灯箱 (图片全手势拖拽平移与双指缩放) ==================== */
  var lbScale = 1, lbTranslateX = 0, lbTranslateY = 0;
  var lbIsDragging = false, lbStartX = 0, lbStartY = 0, lbStartTx = 0, lbStartTy = 0;
  var lbPinchStartDist = 0, lbPinchStartScale = 1;
  var lbLastTapTime = 0;

  function updateLightboxTransform(animate) {
    var img = $('lightboxImg');
    if (!img) return;
    if (animate) {
      img.style.transition = 'transform 0.25s cubic-bezier(0.2, 0.9, 0.4, 1)';
    } else {
      img.style.transition = 'none';
    }
    img.style.transform = 'translate3d(' + lbTranslateX + 'px, ' + lbTranslateY + 'px, 0px) scale(' + lbScale + ')';
  }

  function resetLightboxTransform(animate) {
    lbScale = 1;
    lbTranslateX = 0;
    lbTranslateY = 0;
    updateLightboxTransform(animate);
  }

  function openLightbox(src, title) {
    var el = $('lightbox');
    el.classList.remove('is-closing');
    $('lightboxImg').src = src;
    $('lightboxTitle').textContent = title || '';
    resetLightboxTransform(false);
    el.classList.remove('hidden');
    el.style.display = 'flex';
    updateOverlayState(1);
  }

  function closeLightbox() {
    var el = $('lightbox');
    if (!el || el.classList.contains('hidden')) return;
    el.classList.add('is-closing');
    setTimeout(function () {
      el.classList.add('hidden');
      el.classList.remove('is-closing');
      el.style.display = '';
      resetLightboxTransform(false);
      updateOverlayState(-1);
    }, 220);
  }

  function initLightboxInteractions() {
    var stage = $('lightboxStage');
    var img = $('lightboxImg');
    if (!stage || !img) return;

    if ($('lightboxZoomIn')) {
      $('lightboxZoomIn').onclick = function (e) {
        e.stopPropagation();
        lbScale = Math.min(5, lbScale * 1.35);
        updateLightboxTransform(true);
      };
    }
    if ($('lightboxZoomOut')) {
      $('lightboxZoomOut').onclick = function (e) {
        e.stopPropagation();
        lbScale = Math.max(0.6, lbScale / 1.35);
        if (lbScale <= 1) { lbTranslateX = 0; lbTranslateY = 0; }
        updateLightboxTransform(true);
      };
    }
    if ($('lightboxReset')) {
      $('lightboxReset').onclick = function (e) {
        e.stopPropagation();
        resetLightboxTransform(true);
      };
    }

    stage.addEventListener('wheel', function (e) {
      e.preventDefault();
      var rect = stage.getBoundingClientRect();
      var mouseX = e.clientX - rect.left - rect.width / 2;
      var mouseY = e.clientY - rect.top - rect.height / 2;
      var delta = (e.deltaY < 0) ? 1.2 : 0.83;
      var newScale = Math.max(0.6, Math.min(5, lbScale * delta));
      lbTranslateX = mouseX - (mouseX - lbTranslateX) * (newScale / lbScale);
      lbTranslateY = mouseY - (mouseY - lbTranslateY) * (newScale / lbScale);
      lbScale = newScale;
      updateLightboxTransform(false);
    }, { passive: false });

    stage.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      lbIsDragging = true;
      stage.classList.add('is-dragging');
      lbStartX = e.clientX;
      lbStartY = e.clientY;
      lbStartTx = lbTranslateX;
      lbStartTy = lbTranslateY;
    });

    window.addEventListener('mousemove', function (e) {
      if (!lbIsDragging) return;
      lbTranslateX = lbStartTx + (e.clientX - lbStartX);
      lbTranslateY = lbStartTy + (e.clientY - lbStartY);
      updateLightboxTransform(false);
    });

    window.addEventListener('mouseup', function () {
      if (lbIsDragging) {
        lbIsDragging = false;
        if (stage) stage.classList.remove('is-dragging');
      }
    });

    function getTouchDist(t1, t2) {
      var dx = t1.clientX - t2.clientX;
      var dy = t1.clientY - t2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }

    stage.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        lbIsDragging = true;
        lbStartX = e.touches[0].clientX;
        lbStartY = e.touches[0].clientY;
        lbStartTx = lbTranslateX;
        lbStartTy = lbTranslateY;

        var now = Date.now();
        if (now - lbLastTapTime < 300) {
          e.preventDefault();
          if (lbScale > 1.2) {
            resetLightboxTransform(true);
          } else {
            var rect = stage.getBoundingClientRect();
            var tapX = e.touches[0].clientX - rect.left - rect.width / 2;
            var tapY = e.touches[0].clientY - rect.top - rect.height / 2;
            lbScale = 2.5;
            lbTranslateX = -tapX * 1.5;
            lbTranslateY = -tapY * 1.5;
            updateLightboxTransform(true);
          }
          lbLastTapTime = 0;
          return;
        }
        lbLastTapTime = now;
      } else if (e.touches.length === 2) {
        lbIsDragging = false;
        lbPinchStartDist = getTouchDist(e.touches[0], e.touches[1]);
        lbPinchStartScale = lbScale;
      }
    }, { passive: false });

    stage.addEventListener('touchmove', function (e) {
      e.preventDefault();
      if (e.touches.length === 1 && lbIsDragging) {
        lbTranslateX = lbStartTx + (e.touches[0].clientX - lbStartX);
        lbTranslateY = lbStartTy + (e.touches[0].clientY - lbStartY);
        updateLightboxTransform(false);
      } else if (e.touches.length === 2 && lbPinchStartDist > 0) {
        var dist = getTouchDist(e.touches[0], e.touches[1]);
        var factor = dist / lbPinchStartDist;
        lbScale = Math.max(0.6, Math.min(5, lbPinchStartScale * factor));
        updateLightboxTransform(false);
      }
    }, { passive: false });

    stage.addEventListener('touchend', function (e) {
      if (e.touches.length === 0) {
        lbIsDragging = false;
        lbPinchStartDist = 0;
      } else if (e.touches.length === 1) {
        lbIsDragging = true;
        lbStartX = e.touches[0].clientX;
        lbStartY = e.touches[0].clientY;
        lbStartTx = lbTranslateX;
        lbStartTy = lbTranslateY;
        lbPinchStartDist = 0;
      }
    });

    stage.addEventListener('touchcancel', function () {
      lbIsDragging = false;
      lbPinchStartDist = 0;
    });
  }

  function bindOverlayClose() {
    $('panelClose').onclick = function (e) {
      if (e) { e.stopPropagation(); e.preventDefault(); }
      lastOverlayCloseTimestamp = Date.now();
      closePanel();
    };
    if ($('panelBack')) $('panelBack').onclick = function (e) {
      if (e) { e.stopPropagation(); e.preventDefault(); }
      lastOverlayCloseTimestamp = Date.now();
      popPanelNav();
    };
    $('modalClose').onclick = function (e) {
      if (e) { e.stopPropagation(); e.preventDefault(); }
      lastOverlayCloseTimestamp = Date.now();
      closeModal();
    };
    $('lightboxClose').onclick = function (e) {
      if (e) { e.stopPropagation(); e.preventDefault(); }
      lastOverlayCloseTimestamp = Date.now();
      closeLightbox();
    };
    $('panel').onclick = function (e) {
      if (e.target === this) {
        e.stopPropagation();
        e.preventDefault();
        lastOverlayCloseTimestamp = Date.now();
        closePanel();
      }
    };
    $('modal').onclick = function (e) {
      if (e.target === this) {
        e.stopPropagation();
        e.preventDefault();
        lastOverlayCloseTimestamp = Date.now();
        closeModal();
      }
    };
    $('lightbox').onclick = function (e) {
      if (e.target === this || e.target === $('lightboxStage')) {
        e.stopPropagation();
        e.preventDefault();
        lastOverlayCloseTimestamp = Date.now();
        closeLightbox();
      }
    };
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (!$('lightbox').classList.contains('hidden')) { closeLightbox(); return; }
        if (!$('modal').classList.contains('hidden')) { closeModal(); return; }
        if (!$('panel').classList.contains('hidden')) { closePanel(); }
      }
    });
    initLightboxInteractions();
  }
  function toggleFullscreen(el) {
    if (!el) { toast('无预览内容'); return; }
    var doc = document;
    if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else { toast('浏览器不支持全屏'); }
    } else {
      if (doc.exitFullscreen) doc.exitFullscreen();
      else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
    }
  }

  /* ==================== 图表（雷达/柱状） ==================== */
  function radarSVG(tech, compact) {
    var dims = tech.assessment.dimensions, n = dims.length;
    var W = compact ? 340 : 380, H = compact ? 230 : 280;
    var cx = W / 2, cy = H / 2, R = compact ? 74 : 100;
    var angle = function (i) { return -Math.PI / 2 + i * 2 * Math.PI / n; };
    var pt = function (i, r) { return [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r]; };
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" class="radar-svg' + (compact ? ' compact' : '') + '">';
    var ring, k;
    for (ring = 1; ring <= 5; ring++) {
      var rr = R * ring / 5, pts = [];
      for (k = 0; k < n; k++) { var p = pt(k, rr); pts.push(p[0].toFixed(1) + ',' + p[1].toFixed(1)); }
      s += '<polygon points="' + pts.join(' ') + '" fill="none" style="stroke:var(--border)" stroke-width="1"' + (ring === 5 ? '' : ' stroke-dasharray="2,2"') + '/>';
    }
    for (k = 0; k < n; k++) { var p2 = pt(k, R); s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p2[0] + '" y2="' + p2[1] + '" style="stroke:var(--border)" stroke-width="1"/>'; }
    var rounds = tech.assessment.rounds || [{ name: '本年度', scores: dims.map(function (d) { return d.score; }) }];
    var tCol = (tech && tech.tier ? tierColor(tech.tier) : '#34d399') || '#34d399';
    rounds.forEach(function (rd, ri) {
      var pts2 = [];
      for (k = 0; k < n; k++) { var maxv = dims[k].max || 5; var pp = pt(k, rd.scores[k] / maxv * R); pts2.push(pp[0].toFixed(1) + ',' + pp[1].toFixed(1)); }
      var col = ri === 0 ? tCol : '#f59e0b';
      s += '<polygon class="radar-poly" points="' + pts2.join(' ') + '" fill="' + col + '" fill-opacity="' + (ri === 0 ? 0.32 : 0.16) + '" stroke="' + col + '" stroke-width="2.5"/>';
      for (k = 0; k < n; k++) {
        var pp2 = pt(k, rd.scores[k] / (dims[k].max || 5) * R);
        s += '<circle class="radar-node" style="animation-delay:' + (0.1 + k * 0.08) + 's" cx="' + pp2[0].toFixed(1) + '" cy="' + pp2[1].toFixed(1) + '" r="' + (compact ? '3.5' : '4.5') + '" fill="' + col + '"/>';
      }
    });
    for (k = 0; k < n; k++) {
      var offset = compact ? 16 : 22;
      var lp = pt(k, R + offset), a = angle(k);
      var anchor = Math.abs(Math.cos(a)) < 0.25 ? 'middle' : (Math.cos(a) > 0 ? 'start' : 'end');
      var scoreVal = dims[k].score;
      s += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] + (compact ? 4 : 5)).toFixed(1) + '" font-size="' + (compact ? '13' : '14') + '" text-anchor="' + anchor + '" style="fill:var(--text)" font-weight="normal">' + esc(dims[k].label) + (compact ? (' <tspan style="fill:' + dimColor(dims[k]) + '" font-weight="normal">' + scoreVal + '</tspan>') : '') + '</text>';
    }
    s += '</svg>';
    var legend = (!compact && rounds.length > 1) ? '<div style="text-align:center;font-size:14px;color:var(--dim);margin-top:6px">' +
      rounds.map(function (rd, ri) {
        return '<span style="margin:0 10px"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:' + (ri === 0 ? tCol : '#f59e0b') + ';margin-right:5px"></span>' + esc(rd.name) + '</span>';
      }).join('') + '</div>' : '';
    return s + legend;
  }
  function barSVG(tech) {
    var dims = tech.assessment.dimensions;
    var W = 340, rowH = 34, H = rowH * dims.length + 10, maxW = W - 128;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" class="bar-svg-chart">';
    dims.forEach(function (d, i) {
      var y = i * rowH + 14, bw = Math.round(d.score / (d.max || 5) * maxW);
      s += '<text x="0" y="' + (y + 5) + '" font-size="11" style="fill:var(--dim)">' + esc(d.label) + '</text>';
      s += '<rect x="112" y="' + y + '" width="' + maxW + '" height="9" rx="4" style="fill:var(--border)"/>';
      s += '<rect class="bar-fill-rect" style="animation-delay:' + (0.12 + i * 0.08) + 's" x="112" y="' + y + '" width="' + bw + '" height="9" rx="4" fill="' + dimColor(d) + '"/>';
      s += '<text x="' + (W - 4) + '" y="' + (y + 9) + '" font-size="11" text-anchor="end" font-weight="700" style="fill:var(--text)">' + d.score + '/5</text>';
    });
    s += '</svg>';
    return s;
  }

  /* ==================== 书籍页面内容渲染 ==================== */
  function insideCoverHTML() {
    return '';
  }
  function coverHTML() {
    var b = DATA.book;
    var orbs = [
      '<span class="cover-orb" style="width:220px;height:220px;background:#4f8cff;left:-60px;top:-60px"></span>',
      '<span class="cover-orb" style="width:180px;height:180px;background:#22d3ee;right:-40px;bottom:-40px"></span>',
      '<span class="cover-orb" style="width:120px;height:120px;background:#8b5cf6;right:20%;top:8%"></span>'
    ].join('');
    var coverTitle = esc(b.title).replace('科技发展部', '科技发展部<br>');
    return '<div class="cover-full">' + orbs +
      '<div class="cov-kicker">BANK FINTECH RESEARCH</div>' +
      '<div class="cov-title">' + coverTitle + '</div>' +
      '<div class="cov-rule"></div>' +
      '<div class="cov-meta">' + esc(b.org) + '<br>' + esc(b.date) + '</div>' +
      '</div>';
  }
  function titlePageHTML() {
    return '<div class="page-pad page-pad-flyleaf">' +
      '<div class="flyleaf-header">' +
        '<div class="flyleaf-kicker">PROLOGUE · 序章</div>' +
        '<div class="flyleaf-title">看见未来，还是等待未来发生？</div>' +
        '<div class="flyleaf-subtitle">当技术加速演进，我们需要的，不只是“知道”，更是看见、判断与行动。</div>' +
        '<div class="flyleaf-divider"></div>' +
      '</div>' +

      '<div class="flyleaf-questions">' +
        '<div class="fl-q-item">' +
          '<div class="fl-q-num">01</div>' +
          '<div class="fl-q-text">我们能否看见尚未成为共识、却可能改变未来的变化？</div>' +
        '</div>' +
        '<div class="fl-q-item">' +
          '<div class="fl-q-num">02</div>' +
          '<div class="fl-q-text">我们能否判断一项前沿技术，究竟是短暂热点，还是长期趋势？</div>' +
        '</div>' +
        '<div class="fl-q-item">' +
          '<div class="fl-q-num">03</div>' +
          '<div class="fl-q-text">我们能否看清技术演进，将如何重塑银行的业务、客户与竞争边界？</div>' +
        '</div>' +
        '<div class="fl-q-item">' +
          '<div class="fl-q-num">04</div>' +
          '<div class="fl-q-text">我们能否在未来真正到来之前，为选择与行动赢得时间？</div>' +
        '</div>' +
      '</div>' +

      '<div class="flyleaf-footer">' +
        '<div class="fl-f-quote">' +
          '<p>前沿技术研究，不是预测每一个未来，</p>' +
          '<p>而是更早发现变化，更深理解趋势，更准确判断影响，</p>' +
          '<p>并将不确定的技术变化，转化为可认知、可研判、可行动的研究成果。</p>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function frontMottoHTML() {
    return '<div class="page-pad page-pad-motto">' +
      '<div class="motto-center-wrap">' +
        '<div class="motto-clean-title">' +
          '<span>看见变化</span>' +
          '<span>判断趋势</span>' +
          '<span>洞察影响</span>' +
          '<span>赢得主动</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function getTocItems() {
    var items = [];
    function add(no, label, key, part) { items.push({ no: no, label: label, key: key, part: part }); }
    add('序章', '看见未来，还是等待未来发生？', 'title', true);
    add('', '目录 · 双页对开', 'toc1', false);
    add('第一章', '工作方案与方法', 'part1', true);
    add('1.1', '工作方案', 'workplan', false);
    add('1.2', '信息来源评估', 'sources', false);
    add('1.3', '方法论工具评估', 'methodology_appl', false);
    add('', '研判方法与分层机制', 'methodology_mechanism', false);
    add('第二章', '整体研究成果', 'part2', true);
    add('', '整体研究成果概述', 'research_overview', false);
    add('2.2', '前沿技术储备库（长名单）', 'library', false);
    add('2.3', '技术成熟度曲线（Gartner Hype Cycle）', 'hypeCycle', false);
    add('2.4', '技术影响力雷达图', 'radar', false);
    add('2.5', '前沿技术在企架十大中心的落位图谱', 'graph', false);
    add('第三章', '各项前沿技术研究', 'part3', true);
    DATA.technologies.forEach(function (t, i) {
      add('3.' + (i + 1), t.name, 'tech-' + t.id, false);
    });
    add('附录', '研究方法论工具与说明', 'partAppendix', true);
    add('附录一', '前沿技术研究方法论工具体系', 'appendix_methodology', false);
    add('附录二', '术语表', 'appendix', false);
    add('结语', '全书研判总结与未来展望', 'closing', true);
    return items;
  }

  function renderTocPage(title, sub, items) {
    var lis = items.map(function (it) {
      var pIdx = pageKeyMap[it.key];
      if (pIdx == null) pIdx = 1;
      var cls = it.part ? 'toc-part' : ((it.key === 'title' || it.key === 'overview') ? '' : 'toc-indent');
      var pageNum = pIdx;
      return '<li data-jump="' + pIdx + '" class="' + cls + '">' +
        '<span class="toc-no">' + esc(it.no) + '</span>' +
        '<span class="toc-label" title="' + esc(it.label) + '">' + esc(it.label) + '</span>' +
        '<span class="toc-dots"></span>' +
        '<span class="toc-page-num">P.' + pageNum + '</span>' +
      '</li>';
    }).join('');
    return '<div class="page-pad page-pad-toc">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">' + title + '</div>' +
          (sub ? ('<div class="page-subtitle">' + sub + '</div>') : '') +
        '</div>' +
      '</div>' +
      '<div class="h-rule"></div>' +
      '<ul class="toc-list">' + lis + '</ul>' +
    '</div>';
  }

  function toc1HTML() {
    var all = getTocItems();
    all = all.filter(function(it) { return it.key !== 'toc1'; });
    var mid = Math.ceil(all.length / 2);
    var items = all.slice(0, mid);
    return renderTocPage('目 录（上）', '', items);
  }

  function toc2HTML() {
    var all = getTocItems();
    all = all.filter(function(it) { return it.key !== 'toc1'; });
    var mid = Math.ceil(all.length / 2);
    var items = all.slice(mid);
    return renderTocPage('目 录（下）', '', items);
  }
  function dividerHTML(part, title, desc, num) {
    return '<div class="divider-full"><div class="dv-num">' + num + '</div>' +
      '<div class="dv-part">' + esc(part) + '</div>' +
      '<div class="dv-title">' + esc(title) + '</div>' +
      '<div class="dv-desc">' + esc(desc) + '</div></div>';
  }
  function workplanHTML() {
    var wp = DATA.workplan || {};
    var funnel = wp.funnel || [];
    var cadence = wp.cadence || [];
    var org = wp.org || [];

    var funnelSvg = '<svg width="260" height="238" viewBox="0 0 260 238" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
        '<linearGradient id="cyber1" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.8"/><stop offset="50%" stop-color="#3b82f6" stop-opacity="0.6"/><stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.8"/>' +
        '</linearGradient>' +
        '<linearGradient id="cyber2" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#0e7490" stop-opacity="0.8"/><stop offset="50%" stop-color="#06b6d4" stop-opacity="0.6"/><stop offset="100%" stop-color="#0e7490" stop-opacity="0.8"/>' +
        '</linearGradient>' +
        '<linearGradient id="cyber3" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#047857" stop-opacity="0.8"/><stop offset="50%" stop-color="#10b981" stop-opacity="0.6"/><stop offset="100%" stop-color="#047857" stop-opacity="0.8"/>' +
        '</linearGradient>' +
        '<linearGradient id="cyber4" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#b45309" stop-opacity="0.8"/><stop offset="50%" stop-color="#f59e0b" stop-opacity="0.6"/><stop offset="100%" stop-color="#b45309" stop-opacity="0.8"/>' +
        '</linearGradient>' +
        '<linearGradient id="cyber5" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#6d28d9" stop-opacity="0.8"/><stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.6"/><stop offset="100%" stop-color="#6d28d9" stop-opacity="0.8"/>' +
        '</linearGradient>' +
      '</defs>' +

      '<polygon points="0,0 260,0 234,41 26,41" fill="url(#cyber1)" stroke="#60a5fa" stroke-width="2" />' +
      '<text x="130" y="26" fill="#ffffff" stroke="#0b1329" stroke-width="2.2" paint-order="stroke fill" font-size="13.5" font-weight="900" text-anchor="middle" letter-spacing="0.5">01 · 多源情报动态扫描</text>' +

      '<polygon points="29,45 231,45 209,86 51,86" fill="url(#cyber2)" stroke="#22d3ee" stroke-width="2" />' +
      '<text x="130" y="71" fill="#ffffff" stroke="#0b1329" stroke-width="2.2" paint-order="stroke fill" font-size="13.5" font-weight="900" text-anchor="middle" letter-spacing="0.5">02 · 知识库归集与标引</text>' +

      '<polygon points="54,90 206,90 186,131 74,131" fill="url(#cyber3)" stroke="#34d399" stroke-width="2" />' +
      '<text x="130" y="116" fill="#ffffff" stroke="#0b1329" stroke-width="2.2" paint-order="stroke fill" font-size="13.5" font-weight="900" text-anchor="middle" letter-spacing="0.5">03 · 前沿技术长名单</text>' +

      '<polygon points="77,135 183,135 165,176 95,176" fill="url(#cyber4)" stroke="#fbbf24" stroke-width="2" />' +
      '<text x="130" y="161" fill="#ffffff" stroke="#0b1329" stroke-width="2.2" paint-order="stroke fill" font-size="13.5" font-weight="900" text-anchor="middle" letter-spacing="0.5">04 · 六维研判分层定档</text>' +

      '<polygon points="98,180 162,180 148,221 112,221" fill="url(#cyber5)" stroke="#c084fc" stroke-width="2" />' +
      '<text x="130" y="206" fill="#ffffff" stroke="#0b1329" stroke-width="2.2" paint-order="stroke fill" font-size="12.5" font-weight="900" text-anchor="middle" letter-spacing="0.5">05 · 重点专题深研</text>' +

      '<polygon points="123,225 137,225 130,236" fill="#c084fc" />' +
    '</svg>';

    var colors = ['#3b82f6', '#22d3ee', '#10b981', '#f59e0b', '#a855f7'];
    var funnelRows = funnel.map(function (f, i) {
      var c = colors[i] || 'var(--accent)';
      return '<div class="funnel-row-item" style="border-left:3.5px solid ' + c + '">' +
        '<div class="fri-top"><span class="fri-badge" style="background:' + c + '22;color:' + c + '">第 ' + f.step + ' 级</span><span class="fri-title">' + esc(f.name) + '</span></div>' +
        '<div class="fri-desc">' + esc(f.desc) + '</div>' +
      '</div>';
    }).join('');

    var cadenceCards = cadence.map(function (c) {
      return '<div class="wp-cadence-card">' +
        '<div class="wcc-period">' + esc(c.period) + '</div>' +
        '<div class="wcc-title">' + esc(c.title) + '</div>' +
        '<div class="wcc-desc">' + esc(c.desc) + '</div>' +
      '</div>';
    }).join('');

    var orgCards = org.map(function (o) {
      return '<div class="wp-org-card">' +
        '<div class="woc-role">' + esc(o.role) + '</div>' +
        '<div class="woc-duty">' + esc(o.duty) + '</div>' +
        '</div>';
    }).join('');

    return '<div class="page-pad page-workplan-v2">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">' + esc(wp.title || '工作方案') + '</div>' +
          '<div class="page-subtitle">' + esc(wp.subtitle || '敏捷工作机制 · 五级漏斗筛选闭环 · 全流程常态研判') + '</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn" data-action="open-workplan-report" title="在线预览工作推进方案（定稿）原生 Word 文档">📖 预览工作方案</button>' +
      '</div>' +
      '<div class="h-rule"></div>' +

      '<div class="sources-stack-upper" style="margin-bottom:4px;padding:6px 10px">' +
        '<div class="sources-box-header" style="margin-bottom:4px">' +
          '<div class="sbh-title">🌪️ 前沿技术五级漏斗筛选机制与研判闭环</div>' +
          '<div class="sbh-sub">从海量情报动态感知到关键专题深度落地</div>' +
        '</div>' +
        '<div class="funnel-flex-wrap">' +
          '<div class="funnel-svg-col">' +
            funnelSvg +
            '<div class="funnel-svg-sub">逐级筛选 · 深度聚焦 · 闭环研判</div>' +
          '</div>' +
          '<div class="funnel-rows-col">' + funnelRows + '</div>' +
        '</div>' +
      '</div>' +

      '<div class="sources-stack-lower" style="margin-bottom:4px;padding:6px 10px">' +
        '<div class="sources-box-header" style="margin-bottom:4px">' +
          '<div class="sbh-title">⏱️ 推进阶段与输出节奏</div>' +
          '<div class="sbh-sub">月度跟踪 · 季度简报 · 年度总报</div>' +
        '</div>' +
        '<div class="wp-cadence-grid">' + cadenceCards + '</div>' +
      '</div>' +

      '<div class="sources-stack-lower" style="padding:6px 10px">' +
        '<div class="sources-box-header" style="margin-bottom:4px">' +
          '<div class="sbh-title">👥 组织分工与专业协同</div>' +
          '<div class="sbh-sub">科技规划处总牵头 · 多元专业配置</div>' +
        '</div>' +
        '<div class="wp-org-grid">' + orgCards + '</div>' +
      '</div>' +
    '</div>';
  }
  function sourcesHTML() {
    var src = DATA.sources || {};
    var topRankings = src.topRankings || [];
    var domainChains = src.domainChains || [];
    var categories = src.categories || [];
    var scenarios = src.scenarios || [];

    var topRows = topRankings.map(function (r) {
      var rCls = r.rank === 1 ? 'r1' : (r.rank === 2 ? 'r2' : (r.rank === 3 ? 'r3' : ''));
      return '<tr>' +
        '<td style="text-align:center"><span class="rank-badge ' + rCls + '">' + r.rank + '</span></td>' +
        '<td><b>' + esc(r.name) + '</b></td>' +
        '<td><span class="tag ' + (r.badge || '') + '">' + esc(r.cat) + '</span></td>' +
        '<td><b style="color:var(--accent)">' + esc(r.score) + '</b></td>' +
        '<td>' + esc(r.feat) + '</td>' +
      '</tr>';
    }).join('');

    var catStrips = categories.map(function (c) {
      return '<span class="scs-item"><i style="background:' + (c.color || 'var(--accent)') + '"></i>' + esc(c.name) + ' (' + c.count + ')</span>';
    }).join('');

    var domainRows = domainChains.map(function (d) {
      return '<div class="sdv-row">' +
        '<div class="sdv-domain">' + esc(d.domain) + '</div>' +
        '<div class="sdv-chain">' + d.chain + '</div>' +
      '</div>';
    }).join('');

    var scenarioCards = scenarios.map(function (s) {
      var isGreen = s.title.indexOf('质量') >= 0;
      var tagStyle = isGreen ? 'background:rgba(16,185,129,0.15);color:#10b981' : 'background:rgba(59,130,246,0.15);color:#3b82f6';
      return '<div class="ssc-inline">' +
        '<span class="ssc-tag" style="' + tagStyle + '">' + esc(s.title) + ' · ' + esc(s.tag) + '</span>' +
        '<span class="ssc-desc">' + esc(s.rec) + '</span>' +
      '</div>';
    }).join('');

    return '<div class="page-pad page-sources-v4">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">' + esc(src.title || '信息来源评估') + '</div>' +
          '<div class="page-subtitle">' + esc(src.subtitle || '系统盘点 5 大类别 21 个权威渠道 · 覆盖五大战略领域 · 综合能力量化评估') + '</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn" data-action="open-sources-report" title="在线预览 Word 原生深度报告文档与多维评判图表">📖 预览完整报告</button>' +
      '</div>' +
      '<div class="h-rule"></div>' +
      '<div class="sources-kpi-bar">' +
        '<div class="skpi-item"><div class="skpi-val">21 <span class="skpi-unit">家</span></div><div class="skpi-lbl">全量盘点权威渠道</div></div>' +
        '<div class="skpi-item"><div class="skpi-val">5 <span class="skpi-unit">大</span></div><div class="skpi-lbl">核心渠道类别</div></div>' +
        '<div class="skpi-item"><div class="skpi-val">4.50 <span class="skpi-unit">分</span></div><div class="skpi-lbl">TOP 1 中国信通院</div></div>' +
        '<div class="skpi-item"><div class="skpi-val">4.40 <span class="skpi-unit">分</span></div><div class="skpi-lbl">TOP 2 Gartner</div></div>' +
        '<div class="skpi-item"><div class="skpi-val">100%</div><div class="skpi-lbl">官方真源核验可溯</div></div>' +
      '</div>' +
      '<div class="sources-stack-upper">' +
        '<div class="sources-box-header">' +
          '<span class="sbh-title">🏆 权威渠道综合能力 TOP 10 榜单（五维加权量化评估）</span>' +
          '<div class="sources-cat-strip">' + catStrips + '</div>' +
        '</div>' +
        '<table class="tbl sources-top-tbl">' +
          '<thead><tr><th style="width:32px;text-align:center">排名</th><th style="width:96px">渠道名称</th><th style="width:64px">机构类型</th><th style="width:44px">综合评分</th><th>核心优势与特色定位</th></tr></thead>' +
          '<tbody>' + topRows + '</tbody>' +
        '</table>' +
      '</div>' +
      '<div class="sources-stack-lower">' +
        '<div class="sources-box-header">' +
          '<span class="sbh-title">🧭 五大战略领域推荐获取链路与场景选型</span>' +
          '<span class="sbh-sub">按权威与时效优先级收敛</span>' +
        '</div>' +
        '<div class="sources-domain-vlist">' + domainRows + '</div>' +
        '<div class="sources-scenarios-row">' + scenarioCards + '</div>' +
      '</div>' +
    '</div>';
  }

  /* ==================== 方法论工具扁平映射 ==================== */
  var toolShortNames = [
    'Hype Cycle 曲线',
    'NASA TRL 量化',
    'TOGAF ADM 架构',
    'JTBD 业务逻辑',
    'APQC 标杆对标',
    'Priority Matrix 矩阵',
    '新兴技术雷达',
    'PESTEL 宏观扫描',
    'FMEA 风险优先级',
    'NIST CSF 与 FAIR',
    'TAM/SAM/SOM 空间',
    '双向交叉验证',
    'IDC MarketScape',
    '波特五力模型',
    '魔力象限 MQ',
    '关键能力配套工具',
    'SWOT 交叉分析',
    '实物期权 Real Options',
    'McKinsey 7S 模型',
    '德尔菲专家共识',
    '三角数据验证',
    'Kotter 变革八步法',
    '技术路线图 Roadmap',
    'PDCA 迭代闭环',
    'OKR 目标对齐'
  ];

  function getMethodologyFlatList() {
    var mt = DATA.methodologyToolkit || {};
    var list = [];
    var count = 0;
    (mt.sections || []).forEach(function (sec, sIdx) {
      if (sIdx < 8) {
        (sec.subsections || []).forEach(function (sub, subIdx) {
          count++;
          var numStr = (count < 10 ? '0' : '') + count;
          var clean = sub.title.replace(/^\d+、/, '');
          list.push({
            id: 'tool-' + sIdx + '-' + subIdx,
            globalIdx: count - 1,
            num: count,
            numStr: numStr,
            isTool: true,
            secId: sec.id,
            secTitle: sec.title,
            secShort: sec.title.replace(/^[一二三四五六七八九十]、/, ''),
            subTitle: sub.title,
            cleanName: clean,
            shortName: toolShortNames[count - 1] || clean.split('：')[0].split('（')[0],
            items: sub.items || []
          });
        });
      } else {
        // Section 9: Supplementary explanation (merged)
        list.push({
          id: 'supp-sec9',
          globalIdx: count, // 25
          num: null,
          numStr: null,
          isTool: false,
          secId: sec.id,
          secTitle: sec.title,
          secShort: '方法论选择与整合说明',
          subTitle: '方法论选择的内在张力与整合思路',
          cleanName: '方法论选择的内在张力与整合思路',
          shortName: '内在张力与整合思路',
          subsections: sec.subsections || []
        });
      }
    });
    return list;
  }

  function methodologyApplHTML() {
    var ma = DATA.methodologyApplication || {};
    var stages = ma.stages || [];
    var toolList = getMethodologyFlatList();

    var stageToolIndices = [
      [0, 1, 2],                 // 1. 成熟度判断: 01, 02, 03 (3项)
      [3, 4, 5, 6],              // 2. 场景验证: 04, 05, 06, 07 (4项)
      [7, 8, 9],                 // 3. 风险评估: 08, 09, 10 (3项)
      [10, 11, 12],              // 4. 市场规模: 11, 12, 13 (3项)
      [13, 14, 15],              // 5. 行业格局: 14, 15, 16 (3项)
      [16, 17, 18],              // 6. 战略定位: 17, 18, 19 (3项)
      [19, 20],                  // 7. 结论收敛: 20, 21 (2项)
      [21, 22, 23, 24]           // 8. 实施建议: 22, 23, 24, 25 (4项)
    ];

    var cards = stages.map(function (s, idx) {
      var indices = stageToolIndices[idx] || [];
      var chips = indices.map(function (tIdx) {
        var t = toolList[tIdx];
        if (!t) return '';
        return '<span class="method-tool-chip" data-action="open-tool" data-tool-idx="' + t.globalIdx + '" title="点击查看 ' + t.numStr + '. ' + esc(t.cleanName) + '">' +
          '<span class="mtc-num">' + t.numStr + '.</span> ' + esc(t.shortName) +
        '</span>';
      }).join('');

      return '<div class="method-stage-card" style="--stage-color:' + (s.tagColor || 'var(--accent)') + '">' +
        '<div class="method-stage-head" data-action="open-methodology" data-sec="' + s.secId + '" title="点击在方法论体系面板中查看该环节全部工具">' +
          '<span class="method-stage-badge">' + (idx + 1) + '. ' + esc(s.stage) + '</span>' +
          '<span class="method-stage-focus">' + esc(s.focus) + '</span>' +
        '</div>' +
        '<div class="method-tool-chips">' + chips + '</div>' +
      '</div>';
    }).join('');

    return '<div class="page-pad">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">' + esc(ma.title || '方法论工具评估') + '</div>' +
          '<div class="page-subtitle">覆盖技术研判全流程 8 大环节 · 25 项方法论工具矩阵支撑</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn" data-action="open-methodology">📖 打开方法论详析面板</button>' +
      '</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-p" style="margin-bottom:6px">' + esc(ma.intro || '') + '</div>' +
      '<div class="pg-section" style="margin-bottom:4px">' +
        '<div class="pg-h" style="margin-bottom:5px">研判全流程方法论工具矩阵（全量 25 项工具 · 点击直达详述）</div>' +
        '<div class="method-stage-grid">' + cards + '</div>' +
      '</div>' +
      '<div class="method-footer-callout">' +
        '<div class="mfc-text">💡 <b>体系化运用：</b>点击上方任意工具标签即可打开方法论详析面板直达该工具详述。各方法具体定义见附录一。</div>' +
      '</div>' +
    '</div>';
  }

  function methodologyMechanismHTML() {
    // 绘制 6 维蜘蛛网图 SVG
    var dims = [
      { name: '技术成熟度', score: 4.2 },
      { name: '战略匹配度', score: 4.6 },
      { name: '价值贡献度', score: 4.5 },
      { name: '引入可行度', score: 3.8 },
      { name: '战略紧迫度', score: 4.4 },
      { name: '生态开放度', score: 4.0 }
    ];
    var W = 320, H = 210, cx = W / 2, cy = H / 2, R = 62;
    var n = 6;
    var angle = function (i) { return -Math.PI / 2 + i * 2 * Math.PI / n; };
    var pt = function (i, r) { return [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r]; };
    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="mech-spider-svg" role="img">';
    // 背景网格 5 层
    for (var ring = 1; ring <= 5; ring++) {
      var rr = R * ring / 5, pts = [];
      for (var k = 0; k < n; k++) { var p = pt(k, rr); pts.push(p[0].toFixed(1) + ',' + p[1].toFixed(1)); }
      svg += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="var(--border)" stroke-width="1"' + (ring === 5 ? '' : ' stroke-dasharray="2,2"') + '/>';
    }
    // 轴线
    for (var k = 0; k < n; k++) {
      var p2 = pt(k, R);
      svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p2[0].toFixed(1) + '" y2="' + p2[1].toFixed(1) + '" stroke="var(--border)" stroke-width="1"/>';
    }
    // 示例多边形
    var polyPts = [];
    for (var k = 0; k < n; k++) {
      var pp = pt(k, (dims[k].score / 5) * R);
      polyPts.push(pp[0].toFixed(1) + ',' + pp[1].toFixed(1));
    }
    svg += '<polygon points="' + polyPts.join(' ') + '" fill="rgba(79, 140, 255, 0.28)" stroke="#4f8cff" stroke-width="2"/>';
    for (var k = 0; k < n; k++) {
      var pp = pt(k, (dims[k].score / 5) * R);
      svg += '<circle cx="' + pp[0].toFixed(1) + '" cy="' + pp[1].toFixed(1) + '" r="3.5" fill="#38bdf8"/>';
    }
    // 维度标签
    for (var k = 0; k < n; k++) {
      var a = angle(k);
      var isTopBottom = Math.abs(Math.cos(a)) < 0.25;
      var dist = isTopBottom ? (R + 15) : (R + 10);
      var lp = pt(k, dist);
      var anchor = isTopBottom ? 'middle' : (Math.cos(a) > 0 ? 'start' : 'end');
      svg += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] + 4).toFixed(1) + '" font-size="11" text-anchor="' + anchor + '" fill="var(--text)" font-weight="700">' + dims[k].name + '</text>';
    }
    svg += '</svg>';

    return '<div class="page-pad page-pad-mechanism">' +
      '<div class="page-head-row" style="margin-bottom:2px">' +
        '<div class="page-head-main">' +
          '<div class="page-title">研判方法与分层机制</div>' +
          '<div class="page-subtitle">六维蜘蛛雷达评判模型 · 前沿技术储备库四类层级研判方法</div>' +
        '</div>' +
      '</div>' +
      '<div class="h-rule" style="margin-bottom:8px"></div>' +

      // 上半区：6维蜘蛛雷达评判模型
      '<div class="pg-section" style="margin-bottom:8px">' +
        '<div class="pg-h" style="font-size:14px;margin-bottom:5px">一、六维蜘蛛雷达量化评判模型</div>' +
        '<div class="mech-upper-grid">' +
          '<div class="mech-spider-box">' + svg + '</div>' +
          '<div class="mech-dims-grid">' +
            '<div class="mech-dim-card"><div class="mech-dim-head"><span class="mech-dim-name">技术成熟度</span></div><div class="mech-dim-desc">技术所处发展阶段，判断技术本身是否可用</div></div>' +
            '<div class="mech-dim-card"><div class="mech-dim-head"><span class="mech-dim-name">战略匹配度</span></div><div class="mech-dim-desc">与本行战略方向的命中契合程度</div></div>' +
            '<div class="mech-dim-card"><div class="mech-dim-head"><span class="mech-dim-name">价值贡献度</span></div><div class="mech-dim-desc">对效率、风控、客户体验与新业务的预期价值贡献</div></div>' +
            '<div class="mech-dim-card"><div class="mech-dim-head"><span class="mech-dim-name">引入可行度</span></div><div class="mech-dim-desc">改造成本叠加合规、安全、人才约束，判断引入难易</div></div>' +
            '<div class="mech-dim-card"><div class="mech-dim-head"><span class="mech-dim-name">战略紧迫度</span></div><div class="mech-dim-desc">同业布局节奏与监管时限对推进窗口的压缩程度</div></div>' +
            '<div class="mech-dim-card"><div class="mech-dim-head"><span class="mech-dim-name">生态开放度</span></div><div class="mech-dim-desc">技术生态厂商集中度与可替代路径，判断有无单点依赖</div></div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // 下半区：4类层级研判方法
      '<div class="pg-section" style="margin-bottom:0">' +
        '<div class="pg-h" style="font-size:14px;margin-bottom:5px">二、前沿技术储备库四类层级研判方法与管理策略</div>' +
        '<div class="mech-tiers-grid">' +
          '<div class="mech-tier-card" style="--tier-accent:#34d399">' +
            '<div class="mech-tier-head"><span class="mech-tier-title"><span style="width:8px;height:8px;border-radius:50%;background:#34d399"></span>布局层</span><span class="mech-tier-badge">提前布局 · 试点攻坚</span></div>' +
            '<div class="mech-tier-rule"><b>判定标准：</b>战略匹配度与价值贡献度双高（≥4分），紧迫度高，方向明确但尚未完全成熟。</div>' +
            '<div class="mech-tier-strategy"><b>研判策略：</b>资源前置、治理先行，在低风险可控业务场景率先开展沙盒试点，打造标杆架构示范。</div>' +
          '</div>' +
          '<div class="mech-tier-card" style="--tier-accent:#38bdf8">' +
            '<div class="mech-tier-head"><span class="mech-tier-title"><span style="width:8px;height:8px;border-radius:50%;background:#38bdf8"></span>论证层</span><span class="mech-tier-badge">系统论证 · 架构融合</span></div>' +
            '<div class="mech-tier-rule"><b>判定标准：</b>商业前景明确，技术成熟度达3~4分，与我行业务直接关联且具备引入可行性。</div>' +
            '<div class="mech-tier-strategy"><b>研判策略：</b>开展全面技术可行性与工程论证，启动系统性 PoC 原型验证，攻坚安全合规与系统集成。</div>' +
          '</div>' +
          '<div class="mech-tier-card" style="--tier-accent:#fbbf24">' +
            '<div class="mech-tier-head"><span class="mech-tier-title"><span style="width:8px;height:8px;border-radius:50%;background:#fbbf24"></span>研究层</span><span class="mech-tier-badge">机理跟踪 · 原型预研</span></div>' +
            '<div class="mech-tier-rule"><b>判定标准：</b>演进趋势明确，具潜在金融变革价值，但在工程实现或架构适配上仍有不确定性。</div>' +
            '<div class="mech-tier-strategy"><b>研判策略：</b>保持技术机理深入跟踪，开展前瞻实验室原型试制，跟踪全球顶级论文与专利态势。</div>' +
          '</div>' +
          '<div class="mech-tier-card" style="--tier-accent:#fb7185">' +
            '<div class="mech-tier-head"><span class="mech-tier-title"><span style="width:8px;height:8px;border-radius:50%;background:#fb7185"></span>观察层</span><span class="mech-tier-badge">常态观察 · 拐点捕捉</span></div>' +
            '<div class="mech-tier-rule"><b>判定标准：</b>新兴萌芽探索或当前在算力、算法、安全或监管合规上受强约束，短期难落地。</div>' +
            '<div class="mech-tier-strategy"><b>研判策略：</b>纳入技术雷达常态化观测，设置量化触发指标，动态跟踪同业实践与底层技术突破拐点。</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="mech-footer-note">' +
        '<span style="font-weight:800;color:var(--accent)">动态流转机制：</span>' +
        '<span>储备库实行“季度常态扫描 + 半年度动态调级 + 年度总报告定稿”，六维量化评分达标即触发升降级流转，确保前沿研判资产常态演进、精准闭环。</span>' +
      '</div>' +
    '</div>';
  }

  function researchOverviewDataHTML() {
    return '<div class="page-pad page-pad-research-overview">' +
      '<div class="page-head-row" style="margin-bottom:2px">' +
        '<div class="page-head-main">' +
          '<div class="page-title">整体研究成果概述</div>' +
          '<div class="page-subtitle">前沿技术全景画像 · 四级梯队分布 · 核心研判指标数据</div>' +
        '</div>' +
      '</div>' +
      '<div class="h-rule" style="margin-bottom:10px"></div>' +

      // 6大核心研究成果数据卡片
      '<div class="res-kpi-bar res-kpi-grid-6">' +
        '<div class="res-kpi-card" style="--kpi-col:#6366f1">' +
          '<div class="res-kpi-val">1<span>套</span></div>' +
          '<div class="res-kpi-lbl">工作方法</div>' +
          '<div class="res-kpi-sub" title="1套工作方法">1套工作方法</div>' +
        '</div>' +
        '<div class="res-kpi-card" style="--kpi-col:#0ea5e9">' +
          '<div class="res-kpi-val">21<span>个</span></div>' +
          '<div class="res-kpi-lbl">信息渠道评估</div>' +
          '<div class="res-kpi-sub" title="21个信息渠道评估">21个信息渠道评估</div>' +
        '</div>' +
        '<div class="res-kpi-card" style="--kpi-col:#10b981">' +
          '<div class="res-kpi-val">25<span>项</span></div>' +
          '<div class="res-kpi-lbl">方法论工具评估</div>' +
          '<div class="res-kpi-sub" title="25项方法论工具评估">25项方法论工具评估</div>' +
        '</div>' +
        '<div class="res-kpi-card" style="--kpi-col:#f59e0b">' +
          '<div class="res-kpi-val">100<span>+</span></div>' +
          '<div class="res-kpi-lbl">知识库报告归集</div>' +
          '<div class="res-kpi-sub" title="100+知识库报告归集">100+知识库报告归集</div>' +
        '</div>' +
        '<div class="res-kpi-card" style="--kpi-col:#3b82f6">' +
          '<div class="res-kpi-val">36<span>项</span></div>' +
          '<div class="res-kpi-lbl">储备库初步研判</div>' +
          '<div class="res-kpi-sub" title="36项前沿技术储备库(长名单)初步研判">36项储备库(长名单)初步研判</div>' +
        '</div>' +
        '<div class="res-kpi-card" style="--kpi-col:#a855f7">' +
          '<div class="res-kpi-val">3<span>项</span></div>' +
          '<div class="res-kpi-lbl">深度研判资产</div>' +
          '<div class="res-kpi-sub" title="3项关键技术深度研判资产">3项关键技术深度研判资产</div>' +
        '</div>' +
      '</div>' +

      // 梯队分布条与核心技术明细
      '<div class="res-progress-wrap">' +
        '<div class="res-progress-head">' +
          '<span class="res-prog-title">一、36 项前沿技术储备库（长名单）4 大梯队分布与代表技术</span>' +
          '<span style="font-size:11.5px;color:var(--dim)">总计 36 项 · 梯次衔接 · 动态管理</span>' +
        '</div>' +
        '<div class="res-progress-bar">' +
          '<div class="res-progress-seg" style="width:16.7%;background:#34d399">布局 16.7%</div>' +
          '<div class="res-progress-seg" style="width:27.8%;background:#38bdf8">论证 27.8%</div>' +
          '<div class="res-progress-seg" style="width:27.8%;background:#fbbf24">研究 27.8%</div>' +
          '<div class="res-progress-seg" style="width:27.7%;background:#fb7185">观察 27.8%</div>' +
        '</div>' +
        '<div class="res-tier-subcards">' +
          '<div class="res-tier-subcard">' +
            '<div class="res-tier-subhead" style="color:#34d399"><span>布局层 (6项)</span><span>16.7%</span></div>' +
            '<div class="res-tier-subtechs">自主型AI智能体、AI原生架构、数据编织、具身智能、时空图计算、端侧模型与边缘智能</div>' +
          '</div>' +
          '<div class="res-tier-subcard">' +
            '<div class="res-tier-subhead" style="color:#38bdf8"><span>论证层 (10项)</span><span>27.8%</span></div>' +
            '<div class="res-tier-subtechs">算力网络、AI安全平台、多模态大模型、合成数据、隐私计算、云原生AI底座、知识图谱...</div>' +
          '</div>' +
          '<div class="res-tier-subcard">' +
            '<div class="res-tier-subhead" style="color:#fbbf24"><span>研究层 (10项)</span><span>27.8%</span></div>' +
            '<div class="res-tier-subtechs">因果AI、去中心化身份(DID)、Web3金融、神经形态计算、存算一体、脑机接口、可解释AI...</div>' +
          '</div>' +
          '<div class="res-tier-subcard">' +
            '<div class="res-tier-subhead" style="color:#fb7185"><span>观察层 (10项)</span><span>27.8%</span></div>' +
            '<div class="res-tier-subtechs">量子计算、量子加密、DNA存储、光子计算、微电网与绿色算力、WebAssembly沙箱、6G...</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // 三大战略领域
      '<div class="pg-section" style="margin-bottom:0">' +
        '<div class="pg-h" style="font-size:13.5px;margin-bottom:6px">二、三大战略主轴领域分布与关键技术深度研判</div>' +
        '<div class="res-domains-grid">' +
          '<div class="res-domain-card">' +
            '<div class="res-domain-head"><span class="res-domain-name">🤖 人工智能领域</span><span class="res-domain-count">15 项 (41.7%)</span></div>' +
            '<div class="res-domain-desc">聚焦自主智能体、多模态与生成式AI工程化，打造数智内核（含自主型AI智能体、AI原生架构 2 项关键技术深度研判）。</div>' +
          '</div>' +
          '<div class="res-domain-card">' +
            '<div class="res-domain-head"><span class="res-domain-name">📊 数据要素领域</span><span class="res-domain-count">11 项 (30.6%)</span></div>' +
            '<div class="res-domain-desc">攻坚数据要素流通、数据编织、隐私计算与图计算，释放高价值数据资产乘数效应与安全合规流通价值。</div>' +
          '</div>' +
          '<div class="res-domain-card">' +
            '<div class="res-domain-head"><span class="res-domain-name">⚡ 算力与基础设施</span><span class="res-domain-count">10 项 (27.8%)</span></div>' +
            '<div class="res-domain-desc">前瞻算力网络调度、绿色低碳算力、量子科技与新兴安全，构筑弹性基石（含算力网络 1 项关键技术深度研判）。</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      // 底部工作方法/知识库与研究产出总结（对应顶部6大核心指标）
      '<div class="res-bottom-grid">' +
        '<div class="res-bottom-card">' +
          '<div class="res-bottom-title">🛠️ 研判工作方法体系与知识资产储备</div>' +
          '<div class="res-bottom-desc">形成 1 套全流程工作方法，完成 21 个权威信息渠道多维评估与 25 项方法论工具实操适配，持续归集 100+ 篇权威行业研报沉淀至前沿知识库。</div>' +
        '</div>' +
        '<div class="res-bottom-card">' +
          '<div class="res-bottom-title">📦 重点技术深度研判与资产交付</div>' +
          '<div class="res-bottom-desc">全面完成 36 项技术长名单多维画像与初步研判，并对 3 项关键技术交付高标准全套深度研判资产（Word详析报告+演讲PPT+一张图架构）。</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  var libPreviewPage = 0;
  function libraryPreviewHTML(pageIdx, isWeb) {
    if (pageIdx !== undefined && typeof pageIdx === 'number') libPreviewPage = pageIdx;
    var pageSize = 18;
    var total = DATA.library.items.length;
    var allItems = DATA.library.items.slice().sort(function (a, b) {
      return (Number(a.no) || 0) - (Number(b.no) || 0);
    });
    var totalPages = Math.ceil(total / pageSize);
    if (libPreviewPage >= totalPages) libPreviewPage = 0;
    if (libPreviewPage < 0) libPreviewPage = 0;

    var slice = isWeb ? allItems : allItems.slice(libPreviewPage * pageSize, (libPreviewPage + 1) * pageSize);
    var startNo = (libPreviewPage * pageSize) + 1;
    var endNo = Math.min((libPreviewPage + 1) * pageSize, total);

    var rows = slice.map(function (it) {
      var mainName = it.short || it.name.replace(/（[^）]+）|\([^)]+\)/g, '').trim() || it.name;
      return '<tr data-action="open-tech" data-id="' + it.id + '" style="cursor:pointer" title="点击查看专题档案">' +
        '<td style="color:var(--faint);font-family:var(--mono);font-size:11px;text-align:center">' + it.no + '</td>' +
        '<td class="tname" style="font-weight:700" title="' + esc(it.name) + '"><b>' + esc(mainName) + '</b></td>' +
        '<td style="white-space:nowrap;text-align:center">' + tierPill(it.tier) + '</td>' +
        '<td class="col-score">' + scorePill(it.maturity) + '</td>' +
        '<td class="col-score">' + scorePill(it.strategicFit) + '</td>' +
        '<td class="col-score">' + scorePill(it.value) + '</td>' +
        '<td class="col-score">' + scorePill(it.feasibility) + '</td>' +
        '<td class="col-score">' + scorePill(it.urgency) + '</td>' +
        '<td class="col-score">' + scorePill(it.openness) + '</td>' +
      '</tr>';
    }).join('');

    var pagerHtml = isWeb ? '' : (
      '<div class="lib-preview-pager">' +
        '<button class="btn btn-sm" data-action="lib-prev-page" ' + (libPreviewPage === 0 ? 'disabled' : '') + '>‹ 上一页</button>' +
        '<span class="lpp-info">第 ' + (libPreviewPage + 1) + ' / ' + totalPages + ' 页（T' + (startNo < 10 ? '0' : '') + startNo + '–T' + (endNo < 10 ? '0' : '') + endNo + '）</span>' +
        '<button class="btn btn-sm" data-action="lib-next-page" ' + (libPreviewPage >= totalPages - 1 ? 'disabled' : '') + '>下一页 ›</button>' +
      '</div>'
    );

    return '<div class="page-pad book-lib-pad">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">前沿技术储备库</div>' +
          '<div class="page-subtitle">长名单 · ' + total + ' 项 × 13 字段</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn" data-action="open-library">⛶ 完整长名单</button>' +
      '</div>' +
      '<div class="h-rule" style="margin-bottom:8px"></div>' +
      '<div class="pg-p" style="margin-bottom:6px;font-size:13px;line-height:1.55">储备库覆盖 ' + DATA.categories.length + ' 大战略方向，按「布局 / 论证 / 研究 / 观察」四层动态滚动管理，每项技术按完整台账字段维护，支持全文检索、多维筛选与排序。</div>' +
      '<div class="tbl-preview-wrap">' +
        '<table class="tbl tbl-library-preview">' +
          (isWeb ? (
            '<colgroup>' +
              '<col style="width:36px">' +
              '<col>' +
              '<col style="width:78px">' +
              '<col style="width:72px">' +
              '<col style="width:72px">' +
              '<col style="width:72px">' +
              '<col style="width:72px">' +
              '<col style="width:72px">' +
              '<col style="width:72px">' +
            '</colgroup>'
          ) : (
            '<colgroup>' +
              '<col style="width:20px">' +
              '<col>' +
              '<col style="width:52px">' +
              '<col style="width:30px">' +
              '<col style="width:30px">' +
              '<col style="width:30px">' +
              '<col style="width:30px">' +
              '<col style="width:30px">' +
              '<col style="width:30px">' +
            '</colgroup>'
          )) +
          '<thead><tr>' +
            '<th>#</th>' +
            '<th class="tname-th">技术名称</th>' +
            '<th>层级</th>' +
            '<th class="col-score" title="技术成熟度 (1-5)">成熟度</th>' +
            '<th class="col-score" title="战略匹配度 (1-5)">匹配度</th>' +
            '<th class="col-score" title="价值贡献度 (1-5)">贡献度</th>' +
            '<th class="col-score" title="引入可行度 (1-5)">可行度</th>' +
            '<th class="col-score" title="战略紧迫度 (1-5)">紧迫度</th>' +
            '<th class="col-score" title="生态开放度 (1-5)">开放度</th>' +
          '</tr></thead>' +
          '<tbody>' + rows + '</tbody>' +
        '</table>' +
      '</div>' +
      pagerHtml +
    '</div>';
  }

  function refreshLibraryPreview() {
    var pLeftInner = $('pageLeftInner');
    var pRightInner = $('pageRightInner');
    var webContent = $('webContent');
    if (pLeftInner && pLeftInner.querySelector('.book-lib-pad')) {
      pLeftInner.innerHTML = libraryPreviewHTML(undefined, false);
      bindPageActions(pLeftInner);
    }
    if (pRightInner && pRightInner.querySelector('.book-lib-pad')) {
      pRightInner.innerHTML = libraryPreviewHTML(undefined, false);
      bindPageActions(pRightInner);
    }
    var webLibSec = webContent ? webContent.querySelector('#s-library .sec-body') : null;
    if (webLibSec) {
      webLibSec.innerHTML = libraryPreviewHTML(undefined, true);
      bindPageActions(webLibSec);
    }
  }

  /* ==================== 技术成熟度曲线 (Gartner Hype Cycle) ==================== */
  function getHypeCycleCurveY(x) {
    if (x <= 310) {
      // 萌芽期到膨胀期峰顶：平滑S曲线，峰顶平缓
      var t = (x - 60) / (310 - 60);
      var p0 = 460, p1 = 450, p2 = 65, p3 = 65;
      var u = 1 - t;
      return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
    } else if (x <= 505) {
      // 膨胀期峰顶到谷底：平滑过渡下坠，谷底宽阔平缓
      var t = (x - 310) / (505 - 310);
      var p0 = 65, p1 = 65, p2 = 450, p3 = 450;
      var u = 1 - t;
      return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
    } else if (x <= 820) {
      // 谷底爬升期：平滑爬升斜率，优雅接入成熟平稳期
      var t = (x - 505) / (820 - 505);
      var p0 = 450, p1 = 450, p2 = 270, p3 = 268;
      var u = 1 - t;
      return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
    } else {
      // 生产力成熟平稳期：平稳横线
      var t = Math.min(1, (x - 820) / (950 - 820));
      return 268 - t * 3;
    }
  }

  function renderHypeCycleSVG(variant, containerId) {
    var isMini = variant === 'mini';
    var cfg = DATA.hypeCycle;
    var W = 1000, H = 550;
    var phases = cfg.phases;
    var rawItems = cfg.items;

    // 1. 5个阶段背景分色带与竖向分割线
    var phaseBands = phases.map(function (ph, idx) {
      var w = ph.endX - ph.startX;
      var line = idx < phases.length - 1 ? '<line x1="' + ph.endX + '" y1="38" x2="' + ph.endX + '" y2="500" stroke="currentColor" stroke-opacity="0.16" stroke-dasharray="4 4" stroke-width="1.2"/>' : '';
      return '<rect x="' + ph.startX + '" y="38" width="' + w + '" height="462" fill="' + ph.color + '"/>' + line;
    }).join('');

    // 2. 阶段标头 (精调紧凑字号 12px / 8.5px)
    var phaseHeaders = phases.map(function (ph) {
      var midX = (ph.startX + ph.endX) / 2;
      return '<g class="hc-phase-header">' +
        '<text x="' + midX + '" y="22" text-anchor="middle" font-size="12" font-weight="900" fill="var(--text)" letter-spacing="0.5">' + esc(ph.name) + '</text>' +
        '<text x="' + midX + '" y="34" text-anchor="middle" font-size="8.5" font-weight="600" fill="var(--dim)" font-family="var(--sans)">' + esc(ph.nameEn) + '</text>' +
        '</g>';
    }).join('');

    // 3. 坐标轴 (修复纵轴文字溢出：text-anchor="start" x="56"，绝不超出左边界)
    var axes = '<g class="hc-axes" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.4">' +
      '<line x1="50" y1="500" x2="50" y2="42" marker-end="url(#hcArr)"/>' +
      '<text x="56" y="44" text-anchor="start" font-size="9.5" font-weight="750" fill="var(--dim)" stroke="none">期望值 / 产业关注度 (Expectations) ↑</text>' +
      '<line x1="50" y1="500" x2="975" y2="500" marker-end="url(#hcArr)"/>' +
      '<text x="970" y="515" text-anchor="end" font-size="9.5" font-weight="750" fill="var(--dim)" stroke="none">生命周期演进阶段 (Time / Maturity) →</text>' +
      '</g>';

    // 4. 经典 Hype Cycle 拟合平滑连续数学曲线 (100% 精确匹配节点点位)
    var curvePathD = 'M 60,' + getHypeCycleCurveY(60).toFixed(1);
    for (var cx = 65; cx <= 950; cx += 5) {
      curvePathD += ' L ' + cx + ',' + getHypeCycleCurveY(cx).toFixed(1);
    }
    var curve = '<g class="hc-curve-group">' +
      '<path d="' + curvePathD + '" fill="none" stroke="var(--accent)" stroke-opacity="0.2" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + curvePathD + '" fill="none" stroke="var(--accent)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</g>';

    // 5. 动态计算胶囊全称宽度与力导向防重叠布局 (Non-overlapping Label Placement)
    var BOX_H = 15;
    var layoutNodes = rawItems.map(function (it, idx) {
      var tech = findTech(it.id) || findLib(it.id);
      var standardShort = tech ? (tech.short || tech.name) : it.name;
      // 绝不截断省略，完整显示标准技术简称与编号
      var fullLabelStr = it.id + ' ' + standardShort;

      // 动态计算字符宽度 (汉字 7.6px, 西文 4.4px)
      var charLen = 0;
      for (var i = 0; i < fullLabelStr.length; i++) {
        charLen += (fullLabelStr.charCodeAt(i) > 255 ? 7.6 : 4.4);
      }
      var bw = Math.max(38, Math.ceil(charLen + 10));

      // 确保节点中心 Y 坐标 100% 严格落在曲线上
      var exactY = Math.round(getHypeCycleCurveY(it.x));
      var isTop = (it.labelPos === 'top');
      if (!it.labelPos) isTop = (idx % 2 === 0);

      var tx = it.x + (it.labelDx || 0);
      var ty = exactY + (it.labelDy || (isTop ? -18 : 18));

      return {
        item: it,
        tech: tech,
        id: it.id,
        labelStr: fullLabelStr,
        bw: bw,
        bh: BOX_H,
        x: it.x,
        y: exactY,
        tx: tx,
        ty: ty,
        isTop: isTop
      };
    });

    // 2D 碰撞消除迭代求解 (Relaxation loop)
    for (var iter = 0; iter < 120; iter++) {
      for (var i = 0; i < layoutNodes.length; i++) {
        for (var j = i + 1; j < layoutNodes.length; j++) {
          var a = layoutNodes[i];
          var b = layoutNodes[j];

          var minDistanceX = (a.bw + b.bw) / 2 + 3;
          var minDistanceY = (a.bh + b.bh) / 2 + 3;

          var dx = b.tx - a.tx;
          var dy = b.ty - a.ty;

          if (Math.abs(dx) < minDistanceX && Math.abs(dy) < minDistanceY) {
            var overlapX = minDistanceX - Math.abs(dx);
            var overlapY = minDistanceY - Math.abs(dy);

            if (overlapY < overlapX * 1.4) {
              var shiftY = (overlapY / 2);
              if (dy > 0) { b.ty += shiftY; a.ty -= shiftY; }
              else { b.ty -= shiftY; a.ty += shiftY; }
            } else {
              var shiftX = (overlapX / 2);
              if (dx > 0) { b.tx += shiftX; a.tx -= shiftX; }
              else { b.tx -= shiftX; a.tx += shiftX; }
            }
          }
        }
      }

      // 严格限制在画布安全可见区域内（左边界 >= 20，绝不越界）
      for (var k = 0; k < layoutNodes.length; k++) {
        var n = layoutNodes[k];
        if (n.tx - n.bw / 2 < 20) n.tx = 20 + n.bw / 2;
        if (n.tx + n.bw / 2 > 980) n.tx = 980 - n.bw / 2;
        if (n.ty - n.bh / 2 < 42) n.ty = 42 + n.bh / 2;
        if (n.ty + n.bh / 2 > 512) n.ty = 512 - n.bh / 2;
      }
    }

    // 6. 36个技术节点绘制 (中心点 100% 严格落在曲线上)
    var nodes = layoutNodes.map(function (n) {
      var it = n.item;
      var tech = n.tech;
      var tier = tech ? tech.tier : '布局层';
      var tCol = tierColor(tier);
      var symbolMarkup = '';

      if (it.plateau === '<2年') {
        symbolMarkup = '<circle class="hc-sym-shape" cx="' + n.x + '" cy="' + n.y + '" r="5.5" fill="' + tCol + '" stroke="var(--panel)" stroke-width="1.8"/>';
      } else if (it.plateau === '2-5年') {
        symbolMarkup = '<polygon class="hc-sym-shape" points="' + n.x + ',' + (n.y - 6.5) + ' ' + (n.x - 5.5) + ',' + (n.y + 4.5) + ' ' + (n.x + 5.5) + ',' + (n.y + 4.5) + '" fill="' + tCol + '" stroke="var(--panel)" stroke-width="1.8"/>';
      } else if (it.plateau === '5-10年') {
        symbolMarkup = '<rect class="hc-sym-shape" x="' + (n.x - 4.5) + '" y="' + (n.y - 4.5) + '" width="9" height="9" rx="1.8" fill="' + tCol + '" stroke="var(--panel)" stroke-width="1.8"/>';
      } else {
        symbolMarkup = '<polygon class="hc-sym-shape" points="' + n.x + ',' + (n.y - 6.5) + ' ' + (n.x + 5.5) + ',' + n.y + ' ' + n.x + ',' + (n.y + 6.5) + ' ' + (n.x - 5.5) + ',' + n.y + '" fill="' + tCol + '" stroke="var(--panel)" stroke-width="1.8"/>';
      }

      var halfW = n.bw / 2;
      var labelBox = '<g class="hc-label-box" transform="translate(' + n.tx + ', ' + n.ty + ')">' +
        '<rect class="hc-label-bg" x="' + (-halfW) + '" y="-7.5" width="' + n.bw + '" height="' + n.bh + '" rx="3.5" fill="var(--panel)" stroke="' + tCol + '" stroke-width="1.1"/>' +
        '<text class="hc-label-text" x="0" y="3.2" text-anchor="middle" font-size="8.5" font-weight="750" fill="var(--text)">' + esc(n.labelStr) + '</text>' +
        '</g>';

      var isAbove = n.ty < n.y;
      var stemY1 = isAbove ? (n.y - 6) : (n.y + 6);
      var stemY2 = isAbove ? (n.ty + 7.5) : (n.ty - 7.5);
      var stemLine = '<line class="hc-stem-line" x1="' + n.x + '" y1="' + stemY1 + '" x2="' + n.tx + '" y2="' + stemY2 + '" stroke="' + tCol + '" stroke-opacity="0.45" stroke-width="1" stroke-dasharray="1.5 1.5"/>';

      return '<g class="hc-node-g" data-id="' + esc(it.id) + '" data-no="' + esc(it.no) + '" data-tier="' + esc(tier) + '" data-maturity="' + esc(tech ? tech.maturity : '') + '" data-phase="' + esc(it.phase) + '" data-plateau="' + esc(it.plateau) + '" data-cat="' + esc(tech ? tech.category : '') + '" data-action="open-tech">' +
        '<circle class="hc-hit-circle" cx="' + n.x + '" cy="' + n.y + '" r="14" fill="transparent" cursor="pointer"/>' +
        stemLine +
        symbolMarkup +
        labelBox +
        '</g>';
    }).join('');

    // 7. 底部图例 (精细适中 9.5px)
    var legend = '<g class="hc-legends" font-size="9.5" fill="var(--dim)">' +
      '<g transform="translate(60, 532)">' +
        '<text x="0" y="0" font-weight="750" fill="var(--text)">达平稳期时间：</text>' +
        '<circle cx="85" cy="-3.2" r="4" fill="var(--dim)"/>' +
        '<text x="94" y="0">2年以内</text>' +
        '<polygon points="152,-7 148,1 156,1" fill="var(--dim)"/>' +
        '<text x="160" y="0">2–5年</text>' +
        '<rect x="208" y="-7" width="7" height="7" rx="1.2" fill="var(--dim)"/>' +
        '<text x="219" y="0">5–10年</text>' +
        '<polygon points="270,-7 274,-3.5 270,0 266,-3.5" fill="var(--dim)"/>' +
        '<text x="279" y="0">10年以上</text>' +
      '</g>' +
      '<g transform="translate(630, 532)">' +
        '<text x="0" y="0" font-weight="750" fill="var(--text)">处置档位：</text>' +
        '<circle cx="65" cy="-3.2" r="4.5" fill="#34d399"/>' +
        '<text x="74" y="0">布局层</text>' +
        '<circle cx="130" cy="-3.2" r="4.5" fill="#38bdf8"/>' +
        '<text x="139" y="0">论证层</text>' +
        '<circle cx="195" cy="-3.2" r="4.5" fill="#fbbf24"/>' +
        '<text x="204" y="0">研究层</text>' +
        '<circle cx="260" cy="-3.2" r="4.5" fill="#fb7185"/>' +
        '<text x="269" y="0">观察层</text>' +
      '</g>' +
      '</g>';

    var defs = '<defs>' +
      '<marker id="hcArr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="currentColor" opacity="0.45"/></marker>' +
      '</defs>';

    return '<svg class="hc-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg">' +
      defs +
      '<g class="hc-bg-layer">' + phaseBands + '</g>' +
      '<g class="hc-header-layer">' + phaseHeaders + '</g>' +
      axes +
      curve +
      '<g class="hc-nodes-layer">' + nodes + '</g>' +
      legend +
      '</svg>';
  }

  function hypeCyclePreviewHTML() {
    return '<div class="page-pad">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">技术成熟度曲线</div>' +
          '<div class="page-subtitle">Gartner Hype Cycle · 36项前沿技术全景研判</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn" data-action="open-hype-cycle">⛶ 全屏成熟度曲线</button>' +
      '</div>' +
      '<div class="h-rule" style="margin-bottom:6px"></div>' +
      '<div class="pg-p" style="margin-bottom:6px;font-size:12.5px;line-height:1.52">方法借鉴 Gartner 经典新兴技术成熟度曲线（Hype Cycle）分析框架，严密对齐我行36项前沿技术专题六维评价中的“技术成熟度”评分（1分萌芽起步、2分技术触发、3分早期采用/低谷攻坚、4分生产应用、5分主流成熟）。横轴自左向右依次呈现由前沿萌芽到主流成熟的生命周期演进轨迹，节点符号表征达到主流生产力平稳期的预估时间，颜色表征处置档位（布局/论证/研究/观察）。</div>' +
      '<div class="hc-page-card">' +
        '<div class="pg-h" style="margin:0 0 4px">生命周期演进分布（严格对应六维成熟度评级）</div>' +
        '<div class="hc-stat-pills">' +
          '<span class="hc-stat-pill">创新萌芽期: <b>10项</b> (1分1 / 2分4 / 3分5)</span>' +
          '<span class="hc-stat-pill">期望膨胀期: <b>5项</b> (2分2 / 4分3)</span>' +
          '<span class="hc-stat-pill">泡沫破裂谷底期: <b>9项</b> (2分1 / 3分8)</span>' +
          '<span class="hc-stat-pill">稳步爬升恢复期: <b>9项</b> (3分2 / 4分7)</span>' +
          '<span class="hc-stat-pill">生产力成熟期: <b>3项</b> (4分2 / 5分1)</span>' +
        '</div>' +
        '<div class="hc-stat-pills" style="margin-top:4px">' +
          '<span class="hc-stat-pill" style="border-color:rgba(79, 140, 255, 0.4)">★ 六维技术成熟度评分分布：</span>' +
          '<span class="hc-stat-pill">1分 (萌芽起步): <b>1项</b></span>' +
          '<span class="hc-stat-pill">2分 (技术触发): <b>7项</b></span>' +
          '<span class="hc-stat-pill">3分 (早期采用): <b>15项</b></span>' +
          '<span class="hc-stat-pill">4分 (生产应用): <b>12项</b></span>' +
          '<span class="hc-stat-pill">5分 (主流成熟): <b>1项</b></span>' +
        '</div>' +
        '<div class="hc-preview-box" data-action="open-hype-cycle" title="点击打开全屏技术成熟度曲线">' +
          '<div style="width:100%;pointer-events:none">' +
            renderHypeCycleSVG('preview') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function hypeCycleInteractiveHTML(containerId, isModal) {
    var cfg = DATA.hypeCycle;

    return '<div class="hc-interactive-wrap" id="' + containerId + '">' +
      '<div class="radar-toolbar">' +
        '<div class="radar-filter-group"><span style="font-weight:700">演进阶段:</span>' +
          '<div class="radar-btn-group" data-filter="phase">' +
            '<button class="active" data-val="all">全部 (36)</button>' +
            '<button data-val="创新萌芽期">创新萌芽 (10)</button>' +
            '<button data-val="期望膨胀期">期望膨胀 (5)</button>' +
            '<button data-val="泡沫破裂谷底期">泡沫破裂 (9)</button>' +
            '<button data-val="稳步爬升恢复期">稳步爬升 (9)</button>' +
            '<button data-val="生产力成熟期">生产力成熟 (3)</button>' +
          '</div>' +
        '</div>' +
        '<div class="radar-filter-group"><span style="font-weight:700">技术成熟度:</span>' +
          '<div class="radar-btn-group" data-filter="maturity">' +
            '<button class="active" data-val="all">全部</button>' +
            '<button data-val="1">1分 (1)</button>' +
            '<button data-val="2">2分 (7)</button>' +
            '<button data-val="3">3分 (15)</button>' +
            '<button data-val="4">4分 (12)</button>' +
            '<button data-val="5">5分 (1)</button>' +
          '</div>' +
        '</div>' +
        '<div class="radar-filter-group"><span style="font-weight:700">处置档位:</span>' +
          '<div class="radar-btn-group" data-filter="tier">' +
            '<button class="active" data-val="all">全部</button>' +
            '<button data-val="布局层" style="color:#34d399">布局层</button>' +
            '<button data-val="论证层" style="color:#38bdf8">论证层</button>' +
            '<button data-val="研究层" style="color:#fbbf24">研究层</button>' +
            '<button data-val="观察层" style="color:#fb7185">观察层</button>' +
          '</div>' +
        '</div>' +
        '<div class="radar-filter-group"><span style="font-weight:700">达平稳期:</span>' +
          '<div class="radar-btn-group" data-filter="plateau">' +
            '<button class="active" data-val="all">全部</button>' +
            '<button data-val="<2年"><2年</button>' +
            '<button data-val="2-5年">2-5年</button>' +
            '<button data-val="5-10年">5-10年</button>' +
            '<button data-val=">10年">>10年</button>' +
          '</div>' +
        '</div>' +
        '<div style="margin-left:auto;display:flex;align-items:center;gap:10px">' +
          '<input type="text" class="hc-search-input radar-search-input" placeholder="🔍 搜索技术编号/名称...">' +
        '</div>' +
      '</div>' +

      // 全屏全宽自适应曲线图 (纯净大屏)
      '<div class="hc-top-chart-box">' +
        renderHypeCycleSVG('full', containerId) +
        '<div class="radar-tooltip hidden"></div>' +
      '</div>' +

      '<div class="radar-footer-note">' + esc(cfg.subtitle) + '</div>' +
    '</div>';
  }

  function initHypeCycleInteractive(rootEl, savedFilters) {
    if (!rootEl) return;
    var container = rootEl.querySelector('.hc-top-chart-box');
    var tooltip = rootEl.querySelector('.radar-tooltip');
    var searchInput = rootEl.querySelector('.hc-search-input');
    var nodes = rootEl.querySelectorAll('.hc-node-g');

    var curPhase = 'all', curMaturity = 'all', curTier = 'all', curPlateau = 'all', curQuery = '';

    if (savedFilters) {
      curPhase = savedFilters.phase || 'all';
      curMaturity = savedFilters.maturity || 'all';
      curTier = savedFilters.tier || 'all';
      curPlateau = savedFilters.plateau || 'all';
      curQuery = savedFilters.q || '';
      ['phase', 'maturity', 'tier', 'plateau'].forEach(function (filterType) {
        var val = savedFilters[filterType] || 'all';
        var grp = rootEl.querySelector('.radar-btn-group[data-filter="' + filterType + '"]');
        if (grp) {
          grp.querySelectorAll('button').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-val') === val);
          });
        }
      });
      if (searchInput) searchInput.value = curQuery;
    }

    function applyFilter() {
      nodes.forEach(function (nd) {
        var id = nd.getAttribute('data-id');
        var phase = nd.getAttribute('data-phase');
        var maturity = nd.getAttribute('data-maturity');
        var tier = nd.getAttribute('data-tier');
        var plateau = nd.getAttribute('data-plateau');
        var name = (nd.querySelector('.hc-label-text') ? nd.querySelector('.hc-label-text').textContent : '') + ' ' + id;

        var passPhase = (curPhase === 'all' || phase === curPhase);
        var passMaturity = (curMaturity === 'all' || String(maturity) === String(curMaturity));
        var passTier = (curTier === 'all' || tier === curTier);
        var passPlateau = (curPlateau === 'all' || plateau === curPlateau);
        var passQ = (!curQuery || name.toLowerCase().indexOf(curQuery.toLowerCase()) !== -1 || id.toLowerCase().indexOf(curQuery.toLowerCase()) !== -1);

        nd.classList.toggle('filtered-out', !(passPhase && passMaturity && passTier && passPlateau && passQ));
      });
    }

    rootEl.querySelectorAll('.radar-btn-group button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var grp = btn.parentElement;
        var fType = grp.getAttribute('data-filter');
        var val = btn.getAttribute('data-val');
        grp.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        if (fType === 'phase') curPhase = val;
        else if (fType === 'maturity') curMaturity = val;
        else if (fType === 'tier') curTier = val;
        else if (fType === 'plateau') curPlateau = val;

        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        curQuery = searchInput.value.trim();
        applyFilter();
      });
    }

    // 节点交互（平稳无抖动，浮窗详析与点击穿透，全面支持移动端触摸）
    nodes.forEach(function (nd) {
      var id = nd.getAttribute('data-id');
      nd.addEventListener('mouseenter', function (e) {
        var tech = findTech(id) || findLib(id);
        if (!tech) return;

        nd.classList.add('highlighted');
        var tCol = tierColor(tech.tier);
        var matScore = tech.maturity || 3;
        var matDesc = matScore === 1 ? '萌芽起步（渗透率<5%）' : matScore === 2 ? '技术触发（概念验证与实验阶段）' : matScore === 3 ? '早期采用（标准初定/低谷攻坚）' : matScore === 4 ? '生产应用（多行业规模化落地）' : '主流成熟（CNCF毕业事实标准）';

        if (tooltip && container) {
          tooltip.innerHTML = '<div style="font-weight:900;color:' + tCol + ';font-size:13.5px;margin-bottom:4px">' + esc(tech.id) + ' ' + esc(tech.short || tech.name) + '</div>' +
            '<div style="font-size:12px;color:var(--text);margin-bottom:2px">技术成熟度评分：<b style="color:var(--accent)">' + esc(matScore) + ' 分</b> <span style="font-size:11px;color:var(--dim)">(' + esc(matDesc) + ')</span></div>' +
            '<div style="font-size:12px;color:var(--text);margin-bottom:2px">生命周期演进阶段：<b>' + esc(nd.getAttribute('data-phase')) + '</b></div>' +
            '<div style="font-size:12px;color:var(--text);margin-bottom:2px">达平稳期预估时间：<b>' + esc(nd.getAttribute('data-plateau')) + '</b></div>' +
            '<div style="font-size:12px;color:var(--text);margin-bottom:4px">处置档位：<span style="color:' + tCol + ';font-weight:700">[' + esc(tech.tier) + '] ' + esc(tech.disposal || '') + '</span></div>' +
            '<div style="font-size:11.5px;color:var(--dim);line-height:1.4;margin-top:4px;border-top:1px dashed var(--border);padding-top:4px"><b>研判依据：</b>' + esc(tech.maturityBasis || tech.definition || '') + '</div>';
          tooltip.classList.remove('hidden');
        }
      });
      nd.addEventListener('mousemove', function (e) {
        if (tooltip && container) {
          var rect = container.getBoundingClientRect();
          var x = e.clientX - rect.left + 16;
          var y = e.clientY - rect.top - 12;
          if (x + 300 > rect.width) x = e.clientX - rect.left - 310;
          if (y + 160 > rect.height) y = e.clientY - rect.top - 150;
          if (x < 10) x = 10;
          if (y < 10) y = 10;
          tooltip.style.left = x + 'px';
          tooltip.style.top = y + 'px';
        }
      });
      nd.addEventListener('touchstart', function (e) {
        var tech = findTech(id) || findLib(id);
        if (!tech) return;
        nodes.forEach(function (n) { n.classList.remove('highlighted'); });
        nd.classList.add('highlighted');
        var tCol = tierColor(tech.tier);
        var matScore = tech.maturity || 3;
        var matDesc = matScore === 1 ? '萌芽起步（渗透率<5%）' : matScore === 2 ? '技术触发（概念验证与实验阶段）' : matScore === 3 ? '早期采用（标准初定/低谷攻坚）' : matScore === 4 ? '生产应用（多行业规模化落地）' : '主流成熟（CNCF毕业事实标准）';

        if (tooltip && container) {
          tooltip.innerHTML = '<div style="font-weight:900;color:' + tCol + ';font-size:13.5px;margin-bottom:4px">' + esc(tech.id) + ' ' + esc(tech.short || tech.name) + '</div>' +
            '<div style="font-size:12px;color:var(--text);margin-bottom:2px">技术成熟度评分：<b style="color:var(--accent)">' + esc(matScore) + ' 分</b> <span style="font-size:11px;color:var(--dim)">(' + esc(matDesc) + ')</span></div>' +
            '<div style="font-size:12px;color:var(--text);margin-bottom:2px">生命周期演进阶段：<b>' + esc(nd.getAttribute('data-phase')) + '</b></div>' +
            '<div style="font-size:12px;color:var(--text);margin-bottom:2px">达平稳期预估时间：<b>' + esc(nd.getAttribute('data-plateau')) + '</b></div>' +
            '<div style="font-size:12px;color:var(--text);margin-bottom:4px">处置档位：<span style="color:' + tCol + ';font-weight:700">[' + esc(tech.tier) + '] ' + esc(tech.disposal || '') + '</span></div>' +
            '<div style="font-size:11.5px;color:var(--dim);line-height:1.4;margin-top:4px;border-top:1px dashed var(--border);padding-top:4px"><b>研判依据：</b>' + esc(tech.maturityBasis || tech.definition || '') + '</div>';
          var rect = container.getBoundingClientRect();
          var touch = e.touches[0];
          var x = touch.clientX - rect.left + 10;
          var y = touch.clientY - rect.top - 130;
          if (x + 280 > rect.width) x = rect.width - 290;
          if (y < 10) y = touch.clientY - rect.top + 20;
          if (x < 10) x = 10;
          tooltip.style.left = x + 'px';
          tooltip.style.top = y + 'px';
          tooltip.classList.remove('hidden');
        }
      }, { passive: true });
      nd.addEventListener('mouseleave', function () {
        nd.classList.remove('highlighted');
        if (tooltip) tooltip.classList.add('hidden');
      });
      nd.addEventListener('click', function () {
        var tech = findTech(id) || findLib(id);
        if (tech) openTechPanel(tech);
      });
    });

    if (container) {
      container.addEventListener('touchstart', function (e) {
        if (!e.target.closest('.hc-node-g') && tooltip) {
          nodes.forEach(function (n) { n.classList.remove('highlighted'); });
          tooltip.classList.add('hidden');
        }
      }, { passive: true });
    }

    applyFilter();
  }

  function openHypeCyclePanel(savedFilters, savedScrollTop, isNavBack) {
    if (!isNavBack) {
      if (!$('panel').classList.contains('hidden') && currentPanelMeta && currentPanelMeta.type !== 'hypeCycle') {
        var snap = capturePanelSnapshot();
        if (snap) panelNavStack.push(snap);
      } else {
        panelNavStack = [];
      }
    }
    currentPanelMeta = { type: 'hypeCycle', name: '成熟度曲线' };
    openPanel('技术成熟度曲线（Gartner Hype Cycle）', hypeCycleInteractiveHTML('modalHypeCycleWrap', true), function () {
      var wrap = $('modalHypeCycleWrap');
      if (wrap) {
        initHypeCycleInteractive(wrap, savedFilters);
        if (savedScrollTop && $('panelBody')) $('panelBody').scrollTop = savedScrollTop;
      }
    }, true);
  }

  /* ==================== 技术影响力雷达图 (Impact Radar) ==================== */
  function renderImpactRadarSVG(variant, containerId) {
    var isMini = variant === 'mini';
    var rCfg = DATA.impactRadar;
    var W = 920, H = 920, cx = 460, cy = 460, R_max = 390;
    var rings = rCfg.rings;
    var sectors = rCfg.sectors;
    var items = rCfg.items;

    // 1. 同心圆环
    var ringCircles = rings.map(function (rg, idx) {
      var r = rg.maxR * (R_max / 370);
      var isDashed = idx === 0 || idx === 2 || idx === 4;
      return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r.toFixed(1) + '" fill="none" stroke="currentColor" stroke-opacity="0.14" stroke-width="1.2" ' + (isDashed ? 'stroke-dasharray="4 4"' : '') + '></circle>';
    }).join('');

    // 2. 5大架构维度分割线 (从中心向外辐射)
    var rayLines = sectors.map(function (sec) {
      var rad = (sec.startAngle) * Math.PI / 180;
      var x2 = cx + R_max * Math.sin(rad);
      var y2 = cy - R_max * Math.cos(rad);
      return '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="currentColor" stroke-opacity="0.25" stroke-width="1.4"></line>';
    }).join('');

    // 3. 维度名称标签 (业务 / 应用 / 数据 / 技术 / 安全)
    var sectorLabels = sectors.map(function (sec) {
      var rad = sec.labelAngle * Math.PI / 180;
      var lr = 348;
      var lx = cx + lr * Math.sin(rad);
      var ly = cy - lr * Math.cos(rad);
      return '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" dominant-baseline="central" fill="currentColor" fill-opacity="0.8" font-size="' + (isMini ? '20' : '24') + '" font-weight="900" font-family="var(--sans)" letter-spacing="1">' + esc(sec.label) + '</text>';
    }).join('');

    // 4. 影响时间圈层标签 (当前 / 1-3年 / 3-6年 / 6-8年 / 8年以上)
    var ringLabels = rings.map(function (rg) {
      var ry = cy - (rg.midR * (R_max / 370));
      return '<text x="' + (cx + 8) + '" y="' + ry.toFixed(1) + '" text-anchor="start" dominant-baseline="central" fill="currentColor" fill-opacity="0.55" font-size="' + (isMini ? '10.5' : '12') + '" font-family="var(--sans)">' + esc(rg.label) + '</text>';
    }).join('');

    // 5. 36项气泡节点（严格按照 Gartner 价值贡献度 5 档 1~5 分强化大小对比，并绑定标准处置档位色彩）
    var brMap = { 1: 10, 2: 14.5, 3: 19.5, 4: 25.5, 5: 33 };
    var fontMap = { 1: 9.5, 2: 11, 3: 13, 4: 15, 5: 17.5 };
    var yOffsetMap = { 1: 3.5, 2: 4, 3: 4.5, 4: 5.5, 5: 6.5 };

    var bubbleNodes = items.map(function (it) {
      var tech = findTech(it.id) || findLib(it.id);
      var val = (tech && tech.value) ? tech.value : (it.value || 3);
      var r_scaled = it.r * (R_max / 370);
      var rad = it.angle * Math.PI / 180;
      var bx = cx + r_scaled * Math.sin(rad);
      var by = cy - r_scaled * Math.cos(rad);
      var br = brMap[val] || 19.5;
      var bColor = rCfg.tierColors[it.tier] || (DATA.tierColor && DATA.tierColor[it.tier]) || '#38bdf8';
      var fontSize = fontMap[val] || 13;
      var yOffset = yOffsetMap[val] || 4.5;

      return '<g class="radar-bubble-g" data-id="' + esc(it.id) + '" data-no="' + esc(it.no) + '" data-sector="' + esc(it.sector) + '" data-tier="' + esc(it.tier) + '" data-ring="' + esc(it.ring) + '" data-val="' + val + '" transform="translate(' + bx.toFixed(1) + ', ' + by.toFixed(1) + ')">' +
        '<circle class="hit-area" r="' + Math.max(34, br + 8).toFixed(1) + '" fill="transparent" pointer-events="all"></circle>' +
        '<circle class="glow-circle" r="' + (br + 7).toFixed(1) + '" fill="' + bColor + '" opacity="0" pointer-events="none"></circle>' +
        '<circle class="main-circle" r="' + br.toFixed(1) + '" fill="' + bColor + '" stroke="rgba(255,255,255,0.92)" stroke-width="2.2" pointer-events="none"></circle>' +
        '<text y="' + yOffset + '" text-anchor="middle" fill="#ffffff" font-size="' + fontSize + '" font-weight="900" font-family="var(--mono)" pointer-events="none">' + esc(it.no) + '</text>' +
        '</g>';
    }).join('');

    return '<svg class="radar-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" style="color:var(--text);">' +
      '<g class="radar-grid-layer">' + ringCircles + rayLines + sectorLabels + ringLabels + '</g>' +
      '<g class="radar-nodes-layer">' + bubbleNodes + '</g>' +
      '</svg>';
  }

  function radarPreviewHTML() {
    return '<div class="page-pad">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">技术影响力雷达图</div>' +
          '<div class="page-subtitle">Impact Radar · 5大架构维度 · 4大影响圈层</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn" data-action="open-radar">⛶ 全屏雷达图</button>' +
      '</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-p">方法借鉴 Gartner Emerging Tech Impact Radar 框架，融合本项目业务、应用、技术、数据、安全 5 大架构维度。以同心圆圈层划分发生实质性影响的预估时间跨度（当前、1-3年、3-6年、6-8年），由技术成熟度、战略紧迫度与引入可行度综合推导；气泡颜色表征处置档位（布局/论证/研究/观察），气泡大小表征价值贡献度（共5档，1–5分）。</div>' +
      '<div class="radar-page-card">' +
        '<div class="pg-h" style="margin:0 0 4px">架构维度与影响圈层分布</div>' +
        '<div class="radar-stat-pills">' +
          '<span class="radar-stat-pill">业务维度: <b>5项</b> (布局2 / 研究1 / 观察2)</span>' +
          '<span class="radar-stat-pill">应用维度: <b>10项</b> (布局2 / 论证1 / 研究6 / 观察1)</span>' +
          '<span class="radar-stat-pill">数据维度: <b>6项</b> (布局1 / 论证3 / 研究1 / 观察1)</span>' +
          '<span class="radar-stat-pill">技术维度: <b>7项</b> (论证5 / 研究1 / 观察1)</span>' +
          '<span class="radar-stat-pill">安全维度: <b>8项</b> (论证4 / 研究1 / 观察3)</span>' +
        '</div>' +
        '<div class="radar-preview-box" data-action="open-radar" title="点击打开全屏雷达图">' +
          '<div style="width:100%;max-width:410px;pointer-events:none">' +
            renderImpactRadarSVG('mini') +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function radarInteractiveHTML(containerId, isModal) {
    var sectors = DATA.impactRadar.sectors;
    var rCfg = DATA.impactRadar;

    function renderSectorCard(secKey) {
      var sec = null;
      for (var i = 0; i < sectors.length; i++) {
        if (sectors[i].key === secKey) { sec = sectors[i]; break; }
      }
      if (!sec) return '';
      var secItems = rCfg.items.filter(function (it) { return it.sector === sec.key; });
      var rows = secItems.map(function (it) {
        var tech = findTech(it.id) || findLib(it.id);
        var val = (tech && tech.value) ? tech.value : (it.value || 3);
        var dotColor = rCfg.tierColors[it.tier] || (DATA.tierColor && DATA.tierColor[it.tier]) || '#38bdf8';
        return '<div class="radar-item-row" data-id="' + esc(it.id) + '" data-no="' + esc(it.no) + '" data-sector="' + esc(it.sector) + '" data-tier="' + esc(it.tier) + '" data-ring="' + esc(it.ring) + '" data-val="' + val + '" title="点击查看 ' + esc(it.name) + ' 详情">' +
          '<span class="radar-item-dot" style="background:' + dotColor + '"></span>' +
          '<span class="radar-item-no">' + esc(it.no) + '</span>' +
          '<span class="radar-item-name">' + esc(it.name) + '</span>' +
          '<span class="radar-item-meta">' + esc(it.ring) + ' · ' + val + '分</span>' +
        '</div>';
      }).join('');
      return '<div class="radar-sector-card" data-sector-col="' + esc(sec.key) + '">' +
        '<div class="radar-sector-head"><span>' + esc(sec.label) + '维度</span><span class="radar-col-badge">' + secItems.length + '项</span></div>' +
        '<div class="radar-item-list">' + rows + '</div>' +
      '</div>';
    }

    var leftCardsHTML = renderSectorCard('业务') + renderSectorCard('应用');
    var rightCardsHTML = renderSectorCard('数据') + renderSectorCard('技术') + renderSectorCard('安全');

    return '<div class="radar-interactive-wrap" id="' + containerId + '">' +
      '<div class="radar-toolbar">' +
        '<div class="radar-filter-group"><span style="font-weight:700">架构维度:</span>' +
          '<div class="radar-btn-group" data-filter="sector">' +
            '<button class="active" data-val="all">全部 (36)</button>' +
            '<button data-val="业务">业务 (5)</button>' +
            '<button data-val="应用">应用 (10)</button>' +
            '<button data-val="数据">数据 (6)</button>' +
            '<button data-val="技术">技术 (7)</button>' +
            '<button data-val="安全">安全 (8)</button>' +
          '</div>' +
        '</div>' +
        '<div class="radar-filter-group"><span style="font-weight:700">处置档位:</span>' +
          '<div class="radar-btn-group" data-filter="tier">' +
            '<button class="active" data-val="all">全部</button>' +
            '<button data-val="布局层" style="color:#34d399">布局层</button>' +
            '<button data-val="论证层" style="color:#38bdf8">论证层</button>' +
            '<button data-val="研究层" style="color:#fbbf24">研究层</button>' +
            '<button data-val="观察层" style="color:#fb7185">观察层</button>' +
          '</div>' +
        '</div>' +
        '<div class="radar-filter-group"><span style="font-weight:700">影响时间:</span>' +
          '<div class="radar-btn-group" data-filter="ring">' +
            '<button class="active" data-val="all">全部</button>' +
            '<button data-val="当前">当前</button>' +
            '<button data-val="1-3年">1-3年</button>' +
            '<button data-val="3-6年">3-6年</button>' +
            '<button data-val="6-8年">6-8年</button>' +
          '</div>' +
        '</div>' +
        '<div class="radar-filter-group"><span style="font-weight:700">价值贡献:</span>' +
          '<div class="radar-btn-group" data-filter="value">' +
            '<button class="active" data-val="all">全部</button>' +
            '<button data-val="5"><span class="rvl-dot d5"></span>5分</button>' +
            '<button data-val="4"><span class="rvl-dot d4"></span>4分</button>' +
            '<button data-val="3"><span class="rvl-dot d3"></span>3分</button>' +
            '<button data-val="2"><span class="rvl-dot d2"></span>2分</button>' +
            '<button data-val="1"><span class="rvl-dot d1"></span>1分</button>' +
          '</div>' +
        '</div>' +
        '<div style="margin-left:auto;display:flex;align-items:center;gap:10px">' +
          '<input type="text" class="radar-search-input" placeholder="🔍 搜索技术编号/名称...">' +
        '</div>' +
      '</div>' +

      '<div class="radar-cockpit-layout">' +
        '<div class="radar-side-col radar-side-left">' +
          '<div class="radar-cards-wrap">' + leftCardsHTML + '</div>' +
        '</div>' +
        '<div class="radar-center-chart">' +
          '<div class="radar-svg-container">' +
            renderImpactRadarSVG('full', containerId) +
            '<div class="radar-tooltip hidden"></div>' +
          '</div>' +
        '</div>' +
        '<div class="radar-side-col radar-side-right">' +
          '<div class="radar-cards-wrap">' + rightCardsHTML + '</div>' +
        '</div>' +
      '</div>' +

      '<div class="radar-footer-note">' + esc(rCfg.subtitle) + '</div>' +
    '</div>';
  }

  function initImpactRadarInteractive(rootEl, savedRadarFilters) {
    if (!rootEl) return;
    var container = rootEl.querySelector('.radar-svg-container');
    var tooltip = rootEl.querySelector('.radar-tooltip');
    var searchInput = rootEl.querySelector('.radar-search-input');
    var bubbles = rootEl.querySelectorAll('.radar-bubble-g');
    var listRows = rootEl.querySelectorAll('.radar-item-row');
    var sectorCards = rootEl.querySelectorAll('.radar-sector-card');

    var curSector = 'all', curTier = 'all', curRing = 'all', curValue = 'all', curQuery = '';

    if (savedRadarFilters) {
      curSector = savedRadarFilters.sector || 'all';
      curTier = savedRadarFilters.tier || 'all';
      curRing = savedRadarFilters.ring || 'all';
      curValue = savedRadarFilters.value || 'all';
      curQuery = savedRadarFilters.q || '';
      ['sector', 'tier', 'ring', 'value'].forEach(function (filterType) {
        var val = savedRadarFilters[filterType] || 'all';
        var grp = rootEl.querySelector('.radar-btn-group[data-filter="' + filterType + '"]');
        if (grp) {
          grp.querySelectorAll('button').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-val') === val);
          });
        }
      });
      if (searchInput) searchInput.value = curQuery;
    }

    function applyFilter() {
      var sectorCounts = {};

      bubbles.forEach(function (b) {
        var id = b.getAttribute('data-id');
        var no = b.getAttribute('data-no');
        var sec = b.getAttribute('data-sector');
        var tier = b.getAttribute('data-tier');
        var ring = b.getAttribute('data-ring');
        var val = b.getAttribute('data-val') || '3';
        var tech = findTech(id) || findLib(id);
        var name = tech ? (tech.name + ' ' + (tech.short || '') + ' ' + (tech.nameEn || '')) : '';

        var matchSec = (curSector === 'all' || sec === curSector);
        var matchTier = (curTier === 'all' || tier === curTier);
        var matchRing = (curRing === 'all' || ring === curRing);
        var matchValue = (curValue === 'all' || String(val) === String(curValue));
        var matchSearch = (!curQuery || (no + ' ' + name).toLowerCase().indexOf(curQuery.toLowerCase()) >= 0);

        var isMatch = matchSec && matchTier && matchRing && matchValue && matchSearch;
        b.classList.toggle('dimmed', !isMatch);
        b.classList.toggle('highlighted', isMatch && (!!curQuery || curValue !== 'all'));

        if (isMatch) {
          sectorCounts[sec] = (sectorCounts[sec] || 0) + 1;
        }
      });

      listRows.forEach(function (r) {
        var id = r.getAttribute('data-id');
        var b = rootEl.querySelector('.radar-bubble-g[data-id="' + id + '"]');
        var isDimmed = b ? b.classList.contains('dimmed') : false;
        r.classList.toggle('dimmed', isDimmed);
      });

      sectorCards.forEach(function (c) {
        var secKey = c.getAttribute('data-sector-col');
        var cnt = sectorCounts[secKey] || 0;
        var badge = c.querySelector('.radar-col-badge');
        if (badge) badge.textContent = cnt + '项';
        c.classList.toggle('dimmed', cnt === 0);
      });
    }

    // 绑定过滤按钮
    rootEl.querySelectorAll('.radar-btn-group').forEach(function (grp) {
      var filterType = grp.getAttribute('data-filter');
      grp.querySelectorAll('button').forEach(function (btn) {
        btn.onclick = function () {
          grp.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var val = btn.getAttribute('data-val');
          if (filterType === 'sector') curSector = val;
          else if (filterType === 'tier') curTier = val;
          else if (filterType === 'ring') curRing = val;
          else if (filterType === 'value') curValue = val;
          applyFilter();
        };
      });
    });

    // 搜索过滤
    if (searchInput) {
      searchInput.oninput = function () {
        curQuery = searchInput.value.trim();
        applyFilter();
      };
    }

    // 初始执行一次筛选（若有还原态）
    applyFilter();

    // 气泡交互
    bubbles.forEach(function (b) {
      var id = b.getAttribute('data-id');
      var tech = findTech(id) || findLib(id);
      var glow = b.querySelector('.glow-circle');

      b.onmouseenter = function (e) {
        if (glow) glow.setAttribute('opacity', '0.65');
        var matchingRow = rootEl.querySelector('.radar-item-row[data-id="' + id + '"]');
        if (matchingRow) {
          matchingRow.classList.add('highlighted');
          matchingRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (tech && tooltip && container) {
          var rect = container.getBoundingClientRect();
          var bRect = b.getBoundingClientRect();
          var tipX = bRect.left + bRect.width / 2 - rect.left;
          var tipY = bRect.top - rect.top - 8;

          tooltip.innerHTML = '<div class="radar-tooltip-title">[' + esc(tech.id) + '] ' + esc(tech.short || tech.name) + '</div>' +
            '<div class="radar-tooltip-meta">' +
              '<div><b>架构维度:</b> ' + esc(b.getAttribute('data-sector')) + ' · <b>时间圈层:</b> ' + esc(b.getAttribute('data-ring')) + '</div>' +
              '<div><b>处置档位:</b> ' + esc(tech.tier) + ' (' + esc(tech.disposal || '') + ')</div>' +
              '<div><b>价值贡献:</b> ' + tech.value + '/5 · <b>成熟度:</b> ' + tech.maturity + '/5</div>' +
              '<div style="color:var(--accent2);margin-top:4px;font-size:11px">👉 点击查看完整专题</div>' +
            '</div>';
          tooltip.style.left = tipX + 'px';
          tooltip.style.top = tipY + 'px';
          tooltip.classList.remove('hidden');
        }
      };

      b.ontouchstart = function (e) {
        bubbles.forEach(function (otherB) { var g = otherB.querySelector('.glow-circle'); if (g) g.setAttribute('opacity', '0'); });
        if (glow) glow.setAttribute('opacity', '0.65');
        var matchingRow = rootEl.querySelector('.radar-item-row[data-id="' + id + '"]');
        if (matchingRow) {
          matchingRow.classList.add('highlighted');
          matchingRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (tech && tooltip && container) {
          var rect = container.getBoundingClientRect();
          var bRect = b.getBoundingClientRect();
          var tipX = bRect.left + bRect.width / 2 - rect.left;
          var tipY = bRect.top - rect.top - 8;

          tooltip.innerHTML = '<div class="radar-tooltip-title">[' + esc(tech.id) + '] ' + esc(tech.short || tech.name) + '</div>' +
            '<div class="radar-tooltip-meta">' +
              '<div><b>架构维度:</b> ' + esc(b.getAttribute('data-sector')) + ' · <b>时间圈层:</b> ' + esc(b.getAttribute('data-ring')) + '</div>' +
              '<div><b>处置档位:</b> ' + esc(tech.tier) + ' (' + esc(tech.disposal || '') + ')</div>' +
              '<div><b>价值贡献:</b> ' + tech.value + '/5 · <b>成熟度:</b> ' + tech.maturity + '/5</div>' +
              '<div style="color:var(--accent2);margin-top:4px;font-size:11px">👉 点击查看完整专题</div>' +
            '</div>';
          tooltip.style.left = tipX + 'px';
          tooltip.style.top = tipY + 'px';
          tooltip.classList.remove('hidden');
        }
      };

      b.onmouseleave = function () {
        if (glow) glow.setAttribute('opacity', '0');
        var matchingRow = rootEl.querySelector('.radar-item-row[data-id="' + id + '"]');
        if (matchingRow) matchingRow.classList.remove('highlighted');
        if (tooltip) tooltip.classList.add('hidden');
      };

      b.onclick = function (e) {
        e.stopPropagation();
        if (tooltip) tooltip.classList.add('hidden');
        openTechPanel(findTech(id) || findLib(id));
      };
    });

    if (container) {
      container.addEventListener('touchstart', function (e) {
        if (!e.target.closest('.radar-bubble-g') && tooltip) {
          bubbles.forEach(function (b) { var g = b.querySelector('.glow-circle'); if (g) g.setAttribute('opacity', '0'); });
          tooltip.classList.add('hidden');
        }
      }, { passive: true });
    }

    // 列表项交互
    listRows.forEach(function (r) {
      var id = r.getAttribute('data-id');
      var b = rootEl.querySelector('.radar-bubble-g[data-id="' + id + '"]');
      r.onmouseenter = function () {
        if (b) {
          b.classList.add('highlighted');
          var glow = b.querySelector('.glow-circle');
          if (glow) glow.setAttribute('opacity', '0.85');
        }
      };
      r.onmouseleave = function () {
        if (b && !curQuery) {
          b.classList.remove('highlighted');
          var glow = b.querySelector('.glow-circle');
          if (glow) glow.setAttribute('opacity', '0');
        }
      };
      r.onclick = function (e) {
        e.stopPropagation();
        openTechPanel(findTech(id) || findLib(id));
      };
    });
  }

  function openRadarPanel(savedRadarFilters, savedScrollTop, isNavBack) {
    if (!isNavBack) {
      if (!$('panel').classList.contains('hidden') && currentPanelMeta && currentPanelMeta.type !== 'radar') {
        var snap = capturePanelSnapshot();
        if (snap) panelNavStack.push(snap);
      } else {
        panelNavStack = [];
      }
    }
    currentPanelMeta = { type: 'radar', name: '影响力雷达图' };
    openPanel('技术影响力雷达图（Impact Radar）', radarInteractiveHTML('modalRadarWrap', true), function () {
      var wrap = $('modalRadarWrap');
      if (wrap) {
        initImpactRadarInteractive(wrap, savedRadarFilters);
        if (savedScrollTop && $('panelBody')) $('panelBody').scrollTop = savedScrollTop;
      }
    }, false);
  }

  /* ==================== 企架十大中心前沿技术落位图谱 ==================== */
  /* ==================== 企架十大中心前沿技术落位图谱 ==================== */
  function renderTenCentersBlueprintSVG() {
    var W = 1000, H = 760;

    var centers = [
      {
        id: 'c1', no: 1, name: '对客服务中心',
        subLines: ['手机银行、网上银行、浦惠来了、全球司库、柜面'],
        techs: [{ id: 'T28' }, { id: 'T24' }, { id: 'T04' }, { id: 'T19' }],
        x: 246, y: 14, w: 508, h: 104, type: 'grid2', pillsY: 50
      },
      {
        id: 'c2', no: 2, name: '智慧运营中心',
        subLines: ['数智运营服务平台、智能工厂'],
        techs: [{ id: 'T34' }, { id: 'T12' }],
        x: 95, y: 148, w: 355, h: 104, type: 'row', pillsY: 58
      },
      {
        id: 'c3', no: 3, name: '客户经营中心',
        subLines: ['统一商机平台、对公驾驶舱'],
        techs: [{ id: 'T32' }, { id: 'T02' }],
        x: 550, y: 148, w: 355, h: 104, type: 'row', pillsY: 58
      },
      {
        id: 'c4', no: 4, name: '产品合约中心',
        subLines: ['产品目录系统、合约管理系统', '产品定价系统、客户定价系统'],
        techs: [{ id: 'T15' }],
        x: 20, y: 284, w: 160, h: 236, type: 'stack', pillsY: 110
      },
      {
        id: 'c5', no: 5, name: '业务处理中心',
        subLines: ['企业信贷系统、在线融资系统、零售信贷系统', '保理、单证、票据'],
        techs: [{ id: 'T31' }, { id: 'T13' }],
        x: 246, y: 284, w: 508, h: 122, type: 'row', pillsY: 78
      },
      {
        id: 'c7', no: 7, name: '账务交易中心',
        subLines: ['对公分布式核心系统、零售分布式核心系统、信用卡核心系统'],
        techs: [{ id: 'T35' }, { id: 'T03' }],
        x: 246, y: 432, w: 508, h: 88, type: 'row', pillsY: 48
      },
      {
        id: 'c6', no: 6, name: '风险管理中心',
        subLines: ['天眼系统', '信用风险智能决策系统'],
        techs: [{ id: 'T23' }, { id: 'T33' }, { id: 'T21' }, { id: 'T27' }, { id: 'T30' }],
        x: 820, y: 284, w: 160, h: 236, type: 'stack', pillsY: 74
      },
      {
        id: 'c8', no: 8, name: '管理支持中心',
        subLines: [],
        techs: [{ id: 'T29' }, { id: 'T22' }],
        x: 20, y: 546, w: 230, h: 194, type: 'stack', pillsY: 56
      },
      {
        id: 'c9', no: 9, name: '数智能力中心',
        subLines: [],
        techs: [{ id: 'T01' }, { id: 'T05' }, { id: 'T06' }, { id: 'T16' }, { id: 'T17' }, { id: 'T20' }],
        x: 270, y: 546, w: 386, h: 194, type: 'grid2', pillsY: 50
      },
      {
        id: 'c10', no: 10, name: '技术服务中心',
        subLines: [],
        techs: [{ id: 'T07' }, { id: 'T08' }, { id: 'T09' }, { id: 'T10' }, { id: 'T11' }, { id: 'T14' }, { id: 'T18' }, { id: 'T25' }, { id: 'T26' }, { id: 'T36' }],
        x: 676, y: 546, w: 304, h: 194, type: 'grid2', pillsY: 46
      }
    ];

    function renderPillSVG(tObj, x, y, w, h, centerId, centerName) {
      var tech = findTech(tObj.id) || findLib(tObj.id);
      var tier = tech ? tech.tier : '布局层';
      var tColor = tierColor(tier);
      var standardShort = tech ? tech.short : tObj.id;
      var label = tObj.id + ' ' + standardShort;

      var fSize = 10.5;
      var approxW = label.length * 10;
      if (approxW > w - 10) {
        fSize = Math.max(7.8, Math.floor(((w - 10) / label.length) * 10) / 10);
      }

      return '<g class="tc-tech-pill" data-action="open-tech" data-id="' + tObj.id + '" data-tier="' + tier + '" data-center-id="' + esc(centerId || '') + '" data-center="' + esc(centerName || '') + '">' +
        '<rect class="tc-pill-bg" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="5" ry="5" fill="var(--panel2)" stroke="' + tColor + '" stroke-width="1.2"/>' +
        '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 4) + '" text-anchor="middle" font-size="' + fSize + '" font-weight="700" fill="var(--text)">' + esc(label) + '</text>' +
        '</g>';
    }

    function renderCenterGroup(c) {
      var titleColor = '#38bdf8';
      if (c.no === 1) titleColor = '#38bdf8';
      else if (c.no === 2 || c.no === 3) titleColor = '#0ea5e9';
      else if (c.no === 4 || c.no === 6) titleColor = '#f59e0b';
      else if (c.no === 5 || c.no === 7) titleColor = '#ef4444';
      else titleColor = '#10b981';

      var subLines = c.subLines || (c.sub ? [c.sub] : []);
      var subMarkup = '';
      var titleY = c.y + 19;
      var subStartY = titleY + 15;

      if (subLines.length > 0) {
        var tspans = '';
        var subFSize = (c.w < 200 || subLines.length > 1) ? 9.2 : 10.2;
        var lineGap = 13.5;
        subLines.forEach(function (line, idx) {
          var approxW = line.length * (subFSize * 0.95);
          var lineF = subFSize;
          if (approxW > c.w - 12) {
            lineF = Math.max(7.2, Math.floor(((c.w - 12) / line.length) * 10) / 10);
          }
          var dy = idx === 0 ? 0 : lineGap;
          tspans += '<tspan x="' + (c.x + c.w / 2) + '" dy="' + dy + '" font-size="' + lineF + '">' + esc(line) + '</tspan>';
        });
        subMarkup = '<text x="' + (c.x + c.w / 2) + '" y="' + subStartY + '" text-anchor="middle" fill="var(--dim)">' + tspans + '</text>';
      }

      var pillsStartY = subStartY + (subLines.length * 14) + 4;
      if (subLines.length === 0) {
        titleY = c.y + 24;
        pillsStartY = c.y + 44;
      }

      var pillsMarkup = '';
      if (c.type === 'row') {
        var pWidth = Math.floor((c.w - 20 - (c.techs.length - 1) * 8) / c.techs.length);
        var py = c.pillsY !== undefined ? (c.y + c.pillsY) : Math.max(pillsStartY, c.y + c.h - 32);
        c.techs.forEach(function (t, i) {
          var px = c.x + 10 + i * (pWidth + 8);
          pillsMarkup += renderPillSVG(t, px, py, pWidth, 24, c.id, c.name);
        });
      } else if (c.type === 'grid2') {
        var pWidth = Math.floor((c.w - 20 - 8) / 2);
        var pHeight = c.techs.length > 6 ? 21 : 22;
        var gapY = c.techs.length > 6 ? 4 : 5;
        var startGridY = c.pillsY !== undefined ? (c.y + c.pillsY) : pillsStartY;
        c.techs.forEach(function (t, i) {
          var colIdx = i % 2;
          var rowIdx = Math.floor(i / 2);
          var px = c.x + 10 + colIdx * (pWidth + 8);
          var py = startGridY + rowIdx * (pHeight + gapY);
          pillsMarkup += renderPillSVG(t, px, py, pWidth, pHeight, c.id, c.name);
        });
      } else if (c.type === 'stack') {
        var pWidth = c.w - 16;
        var pHeight = c.techs.length > 4 ? 20.5 : 23;
        var gap = c.techs.length > 4 ? 3.5 : 6;
        var startStackY = c.pillsY !== undefined ? (c.y + c.pillsY) : pillsStartY;
        c.techs.forEach(function (t, i) {
          var px = c.x + 8;
          var py = startStackY + i * (pHeight + gap);
          pillsMarkup += renderPillSVG(t, px, py, pWidth, pHeight, c.id, c.name);
        });
      }

      return '<g class="tc-center-box" data-center="' + c.id + '">' +
        '<rect class="tc-box-rect" x="' + c.x + '" y="' + c.y + '" width="' + c.w + '" height="' + c.h + '" rx="10" ry="10" fill="var(--panel)" stroke="var(--border)" stroke-width="1.2"/>' +
        '<text x="' + (c.x + c.w / 2) + '" y="' + titleY + '" text-anchor="middle" font-size="14.5" font-weight="900" fill="' + titleColor + '">' + esc(c.name) + '</text>' +
        subMarkup +
        pillsMarkup +
        '</g>';
    }

    var lines = [
      // 对客 <-> 运营 (全渠道协同，竖向双向箭头)
      '<g class="tc-flow-group" data-centers="c1 c2">' +
        '<line class="tc-flow-line" x1="272" y1="126" x2="272" y2="140" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="272,120 267.5,127 276.5,127" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="272,146 267.5,139 276.5,139" fill="currentColor" opacity="0.92"/>' +
        '<text x="222" y="133" class="tc-flow-text" text-anchor="middle">全渠道协同</text>' +
      '</g>',

      // 对客 <-> 经营 (营销协同，竖向双向箭头)
      '<g class="tc-flow-group" data-centers="c1 c3">' +
        '<line class="tc-flow-line" x1="728" y1="126" x2="728" y2="140" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="728,120 723.5,127 732.5,127" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="728,146 723.5,139 732.5,139" fill="currentColor" opacity="0.92"/>' +
        '<text x="778" y="133" class="tc-flow-text" text-anchor="middle">营销协同</text>' +
      '</g>',

      // 对客 <-> 业务处理 (竖向双向箭头 + 左右竖排文字)
      '<g class="tc-flow-group" data-centers="c1 c5">' +
        '<line class="tc-flow-line" x1="500" y1="126" x2="500" y2="274" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="500,120 495.5,127 504.5,127" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="500,280 495.5,273 504.5,273" fill="currentColor" opacity="0.92"/>' +
        '<text x="478" y="174" class="tc-flow-text" text-anchor="middle" font-size="11.5" font-weight="750">' +
          '<tspan x="478" dy="0">产</tspan><tspan x="478" dy="16">品</tspan><tspan x="478" dy="16">销</tspan><tspan x="478" dy="16">售</tspan>' +
        '</text>' +
        '<text x="522" y="174" class="tc-flow-text" text-anchor="middle" font-size="11.5" font-weight="750">' +
          '<tspan x="522" dy="0">流</tspan><tspan x="522" dy="16">程</tspan><tspan x="522" dy="16">办</tspan><tspan x="522" dy="16">理</tspan>' +
        '</text>' +
      '</g>',

      // 运营 <-> 业务处理 (流程办理，竖向双向箭头)
      '<g class="tc-flow-group" data-centers="c2 c5">' +
        '<line class="tc-flow-line" x1="250" y1="260" x2="250" y2="276" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="250,254 245.5,261 254.5,261" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="250,282 245.5,275 254.5,275" fill="currentColor" opacity="0.92"/>' +
        '<text x="290" y="268" class="tc-flow-text" text-anchor="middle">流程办理</text>' +
      '</g>',

      // 经营 <-> 业务处理 (流程办理，竖向双向箭头)
      '<g class="tc-flow-group" data-centers="c3 c5">' +
        '<line class="tc-flow-line" x1="710" y1="260" x2="710" y2="276" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="710,254 705.5,261 714.5,261" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="710,282 705.5,275 714.5,275" fill="currentColor" opacity="0.92"/>' +
        '<text x="750" y="268" class="tc-flow-text" text-anchor="middle">流程办理</text>' +
      '</g>',

      // 产品合约 <-> 业务处理 (水平双向箭头)
      '<g class="tc-flow-group" data-centers="c4 c5">' +
        '<line class="tc-flow-line" x1="190" y1="345" x2="236" y2="345" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="184,345 191,340.5 191,349.5" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="242,345 235,340.5 235,349.5" fill="currentColor" opacity="0.92"/>' +
        '<text x="213" y="398" class="tc-flow-text" text-anchor="middle" font-size="11" font-weight="750">产品管理</text>' +
      '</g>',

      // 产品合约 <-> 账务交易 (水平双向箭头)
      '<g class="tc-flow-group" data-centers="c4 c7">' +
        '<line class="tc-flow-line" x1="190" y1="476" x2="236" y2="476" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="184,476 191,471.5 191,480.5" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="242,476 235,471.5 235,480.5" fill="currentColor" opacity="0.92"/>' +
        '<text x="213" y="416" class="tc-flow-text" text-anchor="middle" font-size="11" font-weight="750">合约及定价</text>' +
      '</g>',

      // 风险管理 <-> 业务处理 (水平双向箭头)
      '<g class="tc-flow-group" data-centers="c6 c5">' +
        '<line class="tc-flow-line" x1="764" y1="345" x2="810" y2="345" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="758,345 765,340.5 765,349.5" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="816,345 809,340.5 809,349.5" fill="currentColor" opacity="0.92"/>' +
        '<text x="787" y="398" class="tc-flow-text" text-anchor="middle" font-size="11" font-weight="750">风险检测</text>' +
      '</g>',

      // 风险管理 <-> 账务交易 (水平双向箭头)
      '<g class="tc-flow-group" data-centers="c6 c7">' +
        '<line class="tc-flow-line" x1="764" y1="476" x2="810" y2="476" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="758,476 765,471.5 765,480.5" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="816,476 809,471.5 809,480.5" fill="currentColor" opacity="0.92"/>' +
        '<text x="787" y="416" class="tc-flow-text" text-anchor="middle" font-size="11" font-weight="750">风险管控</text>' +
      '</g>',

      // 业务处理 <-> 账务交易 (竖向双向箭头)
      '<g class="tc-flow-group" data-centers="c5 c7">' +
        '<line class="tc-flow-line" x1="470" y1="413" x2="470" y2="425" stroke="currentColor" stroke-opacity="0.9" stroke-width="1.8"/>' +
        '<polygon class="tc-flow-arrow" points="470,408 465.5,415 474.5,415" fill="currentColor" opacity="0.92"/>' +
        '<polygon class="tc-flow-arrow" points="470,430 465.5,423 474.5,423" fill="currentColor" opacity="0.92"/>' +
        '<text x="512" y="422" class="tc-flow-text" text-anchor="middle" font-size="11" font-weight="750">账务处理</text>' +
      '</g>',

      // 底座支撑虚线
      '<g class="tc-flow-group" data-centers="c8 c4 c5">' +
        '<line class="tc-flow-line" x1="135" y1="544" x2="135" y2="522" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="4 3" stroke-width="1.4"/>' +
      '</g>',
      '<g class="tc-flow-group" data-centers="c9 c5 c7">' +
        '<line class="tc-flow-line" x1="463" y1="544" x2="463" y2="522" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="4 3" stroke-width="1.4"/>' +
      '</g>',
      '<g class="tc-flow-group" data-centers="c10 c6 c7">' +
        '<line class="tc-flow-line" x1="828" y1="544" x2="828" y2="522" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="4 3" stroke-width="1.4"/>' +
      '</g>'
    ].join('');

    var centersMarkup = centers.map(renderCenterGroup).join('');

    return '<svg class="blueprint-svg" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" style="color:var(--text);">' +
      '<g class="tc-lines-layer">' + lines + '</g>' +
      '<g class="tc-centers-layer">' + centersMarkup + '</g>' +
      '</svg>';
  }

  /* ==================== 落位图谱技术卡片浮窗提示交互 ==================== */
  function bindBlueprintPillTooltips(container) {
    if (!container) return;
    var tooltip = container.querySelector('.graph-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'graph-tooltip hidden';
      container.appendChild(tooltip);
    }

    var pills = container.querySelectorAll('.tc-tech-pill');
    pills.forEach(function (pill) {
      var id = pill.getAttribute('data-id');
      var tech = findTech(id) || findLib(id);
      var info = (window.DATA && window.DATA.centerMappings && window.DATA.centerMappings[id]) || {};
      var reason = (tech && tech.centerReason) || info.reason || (tech && tech.bankValue) || '暂无详细落位简述';
      var centerName = (tech && tech.center) || info.center || pill.getAttribute('data-center') || '企架十大中心';

      function showTip(pillEl) {
        if (!tech) return;
        var tCol = tierColor(tech.tier) || 'var(--accent)';
        var cleanName = tech.short || tech.name;
        tooltip.innerHTML = '<div class="gt-title">' +
          '<span class="gt-id">[' + esc(tech.id) + ']</span> ' + esc(cleanName) +
          ' <span class="gt-tier" style="background:' + tCol + '22;color:' + tCol + ';border:1px solid ' + tCol + '55">' + esc(tech.tier) + ' · ' + esc(tech.disposal || '') + '</span>' +
        '</div>' +
        '<div class="gt-center">🏢 <b>落位中心：</b><span style="color:var(--text);font-weight:700">' + esc(centerName) + '</span></div>' +
        '<div class="gt-reason-box">' +
          '<div class="gt-reason-label">🎯 落位原因简述：</div>' +
          '<div class="gt-reason-text">' + esc(reason) + '</div>' +
        '</div>' +
        '<div class="gt-foot">👉 点击查看完整专题档案</div>';

        tooltip.classList.remove('hidden');

        var pRect = pillEl.getBoundingClientRect();
        var cRect = container.getBoundingClientRect();
        var tipRect = tooltip.getBoundingClientRect();
        var tipW = tipRect.width || 340;
        var tipH = tipRect.height || 150;

        var pillLeft = pRect.left - cRect.left;
        var pillRight = pRect.right - cRect.left;
        var pillTop = pRect.top - cRect.top;
        var pillBottom = pRect.bottom - cRect.top;
        var pillMidX = (pillLeft + pillRight) / 2;

        var spaceBelow = cRect.height - pillBottom;
        var spaceAbove = pillTop;

        var x = pillMidX - tipW / 2;
        var y;

        // 优先在胶囊下方弹出，若空间不足则在上方弹出，绝不遮挡当前技术胶囊
        if (spaceBelow >= tipH + 14) {
          y = pillBottom + 10;
        } else if (spaceAbove >= tipH + 14) {
          y = pillTop - tipH - 10;
        } else {
          // 上下方均局促时在左右侧弹出
          if (cRect.width - pillRight >= tipW + 14) {
            x = pillRight + 12;
            y = Math.max(10, Math.min(cRect.height - tipH - 10, pillTop - 20));
          } else if (pillLeft >= tipW + 14) {
            x = pillLeft - tipW - 12;
            y = Math.max(10, Math.min(cRect.height - tipH - 10, pillTop - 20));
          } else {
            y = spaceBelow > spaceAbove ? (pillBottom + 8) : (pillTop - tipH - 8);
          }
        }

        // 边界平滑夹紧
        if (x < 10) x = 10;
        if (x + tipW > cRect.width - 10) x = cRect.width - tipW - 10;
        if (y < 10) y = 10;
        if (y + tipH > cRect.height - 10) y = cRect.height - tipH - 10;

        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      }

      pill.addEventListener('mouseenter', function (e) {
        showTip(pill);
        pill.classList.add('highlighted');
        var bg = pill.querySelector('.tc-pill-bg');
        if (bg) {
          bg.style.strokeWidth = '2.4px';
          bg.style.filter = 'drop-shadow(0 2px 8px rgba(79, 140, 255, 0.5))';
        }
      });

      pill.addEventListener('mouseleave', function () {
        tooltip.classList.add('hidden');
        pill.classList.remove('highlighted');
        var bg = pill.querySelector('.tc-pill-bg');
        if (bg) {
          bg.style.strokeWidth = '1.2px';
          bg.style.filter = 'none';
        }
      });

      pill.addEventListener('touchstart', function (e) {
        showTip(pill);
      }, { passive: true });

      pill.addEventListener('click', function (e) {
        e.stopPropagation();
        tooltip.classList.add('hidden');
        if (tech) openTechPanel(tech);
      });
    });

    container.addEventListener('touchstart', function (e) {
      if (!e.target.closest('.tc-tech-pill') && tooltip) {
        tooltip.classList.add('hidden');
      }
    }, { passive: true });

    if (container.getAttribute('data-action') === 'open-graph' || container.classList.contains('blueprint-preview-box')) {
      container.onclick = function (e) {
        if (e.target.closest('.tc-tech-pill')) return;
        if (tooltip) tooltip.classList.add('hidden');
        openGraphPanel();
      };
    }
  }

  function graphPreviewHTML() {
    return '<div class="page-pad">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">企架十大中心落位图谱</div>' +
          '<div class="page-subtitle">企架建设十大中心 · 36项前沿技术精准落位与跨中心协同</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn" data-action="open-graph">⛶ 全屏落位图谱</button>' +
      '</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-p">基于我行「企架建设十大中心」架构蓝图，将 36 项前沿技术精准映射至对客服务、智慧运营、客户经营、产品合约、业务处理、风险管理、账务交易及底层管理/数智/技术支撑中心，全景展现技术对各中心业务流转、风控防线与底座算力的驱动链路。点击图谱卡片可进入全屏交互界面，点击技术标签可穿透查看专题档案。</div>' +
      '<div class="radar-page-card" style="padding:10px 14px;gap:8px;margin-top:4px">' +
        '<div class="pg-h" style="margin:0 0 4px">企架十大中心前沿技术落位分布</div>' +
        '<div class="tc-stat-rows">' +
          '<div class="tc-stat-row cols-3">' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c1" title="点击在全屏图谱中聚焦查看 对客服务中心"><span>对客服务中心:</span> <b>4项</b></span>' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c2" title="点击在全屏图谱中聚焦查看 智慧运营中心"><span>智慧运营中心:</span> <b>2项</b></span>' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c3" title="点击在全屏图谱中聚焦查看 客户经营中心"><span>客户经营中心:</span> <b>2项</b></span>' +
          '</div>' +
          '<div class="tc-stat-row cols-3">' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c4" title="点击在全屏图谱中聚焦查看 产品合约中心"><span>产品合约中心:</span> <b>1项</b></span>' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c5" title="点击在全屏图谱中聚焦查看 业务处理中心"><span>业务处理中心:</span> <b>2项</b></span>' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c6" title="点击在全屏图谱中聚焦查看 风险管理中心"><span>风险管理中心:</span> <b>5项</b></span>' +
          '</div>' +
          '<div class="tc-stat-row cols-4">' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c7" title="点击在全屏图谱中聚焦查看 账务交易中心"><span>账务交易中心:</span> <b>2项</b></span>' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c8" title="点击在全屏图谱中聚焦查看 管理支持中心"><span>管理支持中心:</span> <b>2项</b></span>' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c9" title="点击在全屏图谱中聚焦查看 数智能力中心"><span>数智能力中心:</span> <b>6项</b></span>' +
            '<span class="radar-stat-pill tc-stat-pill" data-center="c10" title="点击在全屏图谱中聚焦查看 技术服务中心"><span>技术服务中心:</span> <b>10项</b></span>' +
          '</div>' +
        '</div>' +
        '<div class="blueprint-card blueprint-preview-box" data-action="open-graph" style="margin-top:4px" title="点击打开全屏企架十大中心落位交互图谱">' +
          renderTenCentersBlueprintSVG() +
        '</div>' +
      '</div>' +
    '</div>';
  }
  /* ==================== 专享：书籍模式纵向排版 (Vertical Book Page) ==================== */
  function techBookHTML(tech) {
    var tags = [
      '<span class="tag" style="border-color:' + catColor(tech.category) + ';color:' + catColor(tech.category) + '">' + esc(tech.category) + '</span>',
      tierPill(tech.tier),
      tech.disposal ? '<span class="pill-disposal">' + esc(tech.disposal) + '</span>' : '',
      tech.archDim ? '<span class="pill-dim">' + esc(tech.archDim) + '</span>' : ''
    ].filter(Boolean).join(' ');

    return '<div class="page-pad book-tech-pad">' +
      '<div class="page-head-row bk-head">' +
        '<div class="page-head-main">' +
          '<div class="page-title bk-title-row">' +
            '<span class="bk-no">' + esc(tech.id) + '</span>' +
            '<span class="bk-name">' + esc(tech.name) + '</span>' +
          '</div>' +
          '<div class="page-subtitle bk-tags-row">' + tags + '</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn bk-btn" data-action="open-tech" data-id="' + tech.id + '">📄 专题档案</button>' +
      '</div>' +
      '<div class="h-rule"></div>' +

      '<div class="bk-middle-row">' +
        '<div class="bk-radar-col">' +
          '<div class="bk-sec-title"><span class="icon">🕸️</span> 六维研判蜘蛛图</div>' +
          '<div class="bk-radar-box">' + radarSVG(tech, true) + '</div>' +
        '</div>' +
        '<div class="bk-conclusion-col">' +
          '<div class="bk-sec-title"><span class="icon">⚖️</span> 研判结论与处置建议</div>' +
          '<div class="bk-conclusion-text">' + esc(tech.conclusion) + '</div>' +
          '<div class="bk-scores-grid">' + sixDimHTML(tech) + '</div>' +
        '</div>' +
      '</div>' +

      '<div class="bk-section bk-def">' +
        '<div class="bk-sec-title"><span class="icon">💡</span> 技术定义与机理</div>' +
        '<div class="bk-sec-body">' + formatBullets(tech.definition || tech.summary) + '</div>' +
      '</div>' +

      '<div class="bk-section bk-trend">' +
        '<div class="bk-sec-title"><span class="icon">🚀</span> 颠覆性趋势演进</div>' +
        '<div class="bk-sec-body">' + formatBullets(tech.trend) + '</div>' +
      '</div>' +

      '<div class="bk-section bk-value">' +
        '<div class="bk-sec-title"><span class="icon">🏦</span> 对银行的价值贡献</div>' +
        '<div class="bk-sec-body">' + formatBullets(tech.bankValue) + '</div>' +
      '</div>' +

      '<div class="bk-section bk-limit">' +
        '<div class="bk-sec-title"><span class="icon">⚠️</span> 当前局限性与合规风险</div>' +
        '<div class="bk-sec-body">' + formatBullets(tech.limitation) + '</div>' +
      '</div>' +
    '</div>';
  }

  /* ==================== 专享：网页模式横向仪表盘 (Horizontal Web Layout) ==================== */
  function techWebHTML(tech) {
    var tags = [
      '<span class="tag" style="border-color:' + catColor(tech.category) + ';color:' + catColor(tech.category) + '">' + esc(tech.category) + '</span>',
      tierPill(tech.tier),
      tech.disposal ? '<span class="pill-disposal">' + esc(tech.disposal) + '</span>' : '',
      tech.archDim ? '<span class="pill-dim">' + esc(tech.archDim) + '</span>' : '',
      tech.attr ? '<span class="pill-attr">' + esc(tech.attr) + '</span>' : ''
    ].filter(Boolean).join(' ');

    return '<div class="web-tech-container">' +
      '<div class="web-tech-head">' +
        '<div class="wth-left">' +
          '<div class="tech-sub-tags"><span class="tech-no-badge">' + esc(tech.id) + '</span> ' + tags + '</div>' +
        '</div>' +
        '<div class="wth-right">' +
          '<button class="btn btn-sm active" data-action="open-tech" data-id="' + tech.id + '">📄 专题档案</button>' +
        '</div>' +
      '</div>' +
      '<div class="h-rule" style="margin:8px 0 14px"></div>' +
      '<div class="web-tech-layout">' +
        '<div class="web-col-dash">' +
          '<div class="bento-card radar-card">' +
            '<div class="bento-card-title"><span class="icon">🕸️</span> 六维研判蜘蛛图</div>' +
            '<div class="radar-box">' + radarSVG(tech, false) + '</div>' +
            '<div class="radar-scores-mini">' + sixDimHTML(tech) + '</div>' +
          '</div>' +
          '<div class="bento-card conclusion-card" style="margin-top:12px">' +
            '<div class="bento-card-title"><span class="icon">⚖️</span> 研判结论与处置建议</div>' +
            '<div class="conclusion-text">' + esc(tech.conclusion) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="web-col-content">' +
          '<div class="bento-card def-card">' +
            '<div class="bento-card-title"><span class="icon">💡</span> 技术定义与机理</div>' +
            '<div class="bento-card-body">' + formatBullets(tech.definition || tech.summary) + '</div>' +
          '</div>' +
          '<div class="bento-card trend-card">' +
            '<div class="bento-card-title"><span class="icon">🚀</span> 颠覆性趋势演进</div>' +
            '<div class="bento-card-body">' + formatBullets(tech.trend) + '</div>' +
          '</div>' +
          '<div class="bento-card value-card">' +
            '<div class="bento-card-title"><span class="icon">🏦</span> 对银行业务与架构的价值</div>' +
            '<div class="bento-card-body">' + formatBullets(tech.bankValue) + '</div>' +
          '</div>' +
          '<div class="bento-card limit-card">' +
            '<div class="bento-card-title"><span class="icon">⚠️</span> 当前局限性与合规风险</div>' +
            '<div class="bento-card-body">' + formatBullets(tech.limitation) + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }
  function appendixMethodologyHTML() {
    var toolList = getMethodologyFlatList();

    function renderToolChips(indices) {
      return indices.map(function (tIdx) {
        var t = toolList[tIdx];
        if (!t) return '';
        return '<span class="method-tool-chip" data-action="open-tool" data-tool-idx="' + t.globalIdx + '" title="点击查看 ' + t.numStr + '. ' + esc(t.cleanName) + '">' +
          '<span class="mtc-num">' + t.numStr + '.</span> ' + esc(t.shortName) +
        '</span>';
      }).join('');
    }

    var layer1Chips = renderToolChips([0, 1, 2, 7, 10, 11, 12, 13]); // 8 tools: 01, 02, 03, 08, 11, 12, 13, 14
    var layer2Chips = renderToolChips([3, 4, 5, 6, 8, 9, 14, 15, 16, 17, 18]); // 11 tools: 04, 05, 06, 07, 09, 10, 15, 16, 17, 18, 19
    var layer3Chips = renderToolChips([19, 20, 21, 22, 23, 24]); // 6 tools: 20, 21, 22, 23, 24, 25

    return '<div class="page-pad">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">前沿技术研究方法论工具体系</div>' +
          '<div class="page-subtitle">附录一 · 覆盖研判全生命周期 8 大维度 25 项方法论工具全景导航</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn" data-action="open-methodology">📖 打开方法论详析面板</button>' +
      '</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-section" style="margin-bottom:6px">' +
        '<div class="pg-h" style="margin-bottom:5px">方法论整合框架（三层推进逻辑 · 全量 25 项工具导航 · 点击直达）</div>' +
        '<div class="method-bento-row">' +
          '<div class="method-bento-card">' +
            '<div class="method-bento-title">1. 认知建立层（定位与宏观扫描 · 8项）</div>' +
            '<div class="method-bento-desc">行业标尺定位、硬科技量化刻度、架构准入规范、宏观风险扫描、市场规模与竞争结构。</div>' +
            '<div class="method-tool-chips">' + layer1Chips + '</div>' +
          '</div>' +
          '<div class="method-bento-card">' +
            '<div class="method-bento-title">2. 深入分析层（多维严谨验证 · 11项）</div>' +
            '<div class="method-bento-desc">业务任务拆解、APQC流程对标、优先级矩阵、技术雷达、失效模式、厂商测评与组织落地。</div>' +
            '<div class="method-tool-chips">' + layer2Chips + '</div>' +
          '</div>' +
          '<div class="method-bento-card">' +
            '<div class="method-bento-title">3. 方案输出层（收敛与执行闭环 · 6项）</div>' +
            '<div class="method-bento-desc">专家共识收敛、多源数据校准、变革路径设计、路线图规划、持续迭代与目标对齐闭环。</div>' +
            '<div class="method-tool-chips">' + layer3Chips + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pg-section" style="margin-bottom:4px">' +
        '<div class="pg-h" style="margin-bottom:5px">方法论选择的三大内在张力与平衡（框架指引 · 点击查看详析）</div>' +
        '<div class="method-tensions-list">' +
          '<div class="method-tension-item" data-action="open-tool" data-tool-idx="25" title="点击查看方法论内在张力详述">' +
            '<div class="method-tension-title">⚖️ 定性判断 vs. 量化计算</div>' +
            '<div class="method-tension-body">经验洞察与严谨工程打分互补，定性定框架、定量定刻度。</div>' +
          '</div>' +
          '<div class="method-tension-item" data-action="open-tool" data-tool-idx="25" title="点击查看方法论内在张力详述">' +
            '<div class="method-tension-title">⏱️ 权威性 vs. 时效性</div>' +
            '<div class="method-tension-body">国际权威年度报告与行内敏捷动态情报源双轨融合。</div>' +
          '</div>' +
          '<div class="method-tension-item" data-action="open-tool" data-tool-idx="25" title="点击查看方法论内在张力详述">' +
            '<div class="method-tension-title">🏦 通用模型 vs. 金融特殊性</div>' +
            '<div class="method-tension-body">通用科技分析框架与强监管合规、高可用风控强约束结合。</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }
  /* ==================== 专业术语全书超链接与释义系统 ==================== */
  var termMap = {};
  var termMasterRegex = null;
  var currentActiveLetter = 'ALL';
  var tooltipHideTimeout = null;

  function initTerms() {
    if (!DATA || !DATA.terms || !DATA.terms.length) return;
    DATA.terms.forEach(function (t) {
      termMap[t.id] = t;
      termMap[t.term.toLowerCase()] = t;
      termMap[t.term] = t;
      termMap[t.term.toLowerCase().replace(/\s+/g, '-')] = t;
    });

    // 优先匹配更长词汇（例如 OpenTelemetry 优先于 OTel，Zero Trust 优先于 Trust）
    var sortedKeys = DATA.terms.slice().sort(function (a, b) {
      return b.term.length - a.term.length;
    }).map(function (t) {
      return t.term.replace(/[.*+?^$${}()|[\]\\]/g, '\\$&');
    });

    termMasterRegex = new RegExp('\\b(' + sortedKeys.join('|') + ')\\b', 'g');
  }

  function linkTermsInContainer(rootEl) {
    if (!rootEl || !termMasterRegex) return;

    var textNodes = [];
    var walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        var tag = p.tagName.toLowerCase();
        if (tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'input' || tag === 'textarea' || tag === 'code' || tag === 'pre') {
          return NodeFilter.FILTER_REJECT;
        }
        if (p.closest('.term-ref') || p.closest('.term-tooltip') || p.closest('.term-modal-popover') || 
            p.closest('.page-pad-toc') || p.closest('.page-pad-appendix') || p.closest('.page-head-row') || 
            p.closest('.edge-tab') || p.closest('.motto-clean-title') || p.closest('button') || 
            p.closest('.btn') || p.closest('a') || p.closest('[data-action]')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(function (node) {
      var text = node.nodeValue;
      termMasterRegex.lastIndex = 0;
      if (!termMasterRegex.test(text)) return;
      termMasterRegex.lastIndex = 0;

      var frag = document.createDocumentFragment();
      var lastIdx = 0;
      var match;
      while ((match = termMasterRegex.exec(text)) !== null) {
        var matchStr = match[1];
        var matchIdx = match.index;
        if (matchIdx > lastIdx) {
          frag.appendChild(document.createTextNode(text.substring(lastIdx, matchIdx)));
        }
        var tObj = termMap[matchStr.toLowerCase()] || termMap[matchStr];
        var span = document.createElement('span');
        span.className = 'term-ref';
        span.setAttribute('data-term', tObj ? tObj.id : matchStr.toLowerCase());
        span.setAttribute('tabindex', '0');
        span.setAttribute('role', 'button');
        span.setAttribute('title', tObj ? (tObj.term + ' (' + tObj.nameCn + ')') : matchStr);
        span.textContent = matchStr;
        frag.appendChild(span);
        lastIdx = matchIdx + matchStr.length;
      }
      if (lastIdx < text.length) {
        frag.appendChild(document.createTextNode(text.substring(lastIdx)));
      }
      if (node.parentNode) {
        node.parentNode.replaceChild(frag, node);
      }
    });
  }

  function showTermTooltip(refEl, termId) {
    var tip = $('termTooltip');
    var t = termMap[termId];
    if (!tip || !t) return;
    clearTimeout(tooltipHideTimeout);

    tip.innerHTML = '<div class="term-tip-head">' +
        '<span class="term-tip-code">' + esc(t.term) + '</span>' +
        '<span class="term-tip-fullname">' + esc(t.fullName) + '</span>' +
        '<span class="term-tip-badge">' + esc(t.cat) + '</span>' +
      '</div>' +
      '<div class="term-tip-body">' +
        '<div class="term-tip-name-cn">' + esc(t.nameCn) + '</div>' +
        '<div class="term-tip-def">' + esc(t.def) + '</div>' +
      '</div>' +
      '</div>';

    tip.classList.remove('hidden');
    tip.style.display = 'block';

    var rect = refEl.getBoundingClientRect();
    var tipRect = tip.getBoundingClientRect();
    var left = rect.left + (rect.width / 2) - (tipRect.width / 2);
    var top = rect.top - tipRect.height - 10;

    if (left < 15) left = 15;
    if (left + tipRect.width > window.innerWidth - 15) {
      left = window.innerWidth - tipRect.width - 15;
    }
    if (top < 15) {
      top = rect.bottom + 10;
    }

    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
    tip.classList.add('is-visible');
  }

  function hideTermTooltip(immediate) {
    var tip = $('termTooltip');
    if (!tip) return;
    if (immediate) {
      clearTimeout(tooltipHideTimeout);
      tip.classList.remove('is-visible');
      tip.classList.add('hidden');
      tip.style.display = 'none';
    } else {
      clearTimeout(tooltipHideTimeout);
      tooltipHideTimeout = setTimeout(function () {
        tip.classList.remove('is-visible');
        tip.classList.add('hidden');
        tip.style.display = 'none';
      }, 180);
    }
  }

  function showTermModalPopover(refEl, termId) {
    var t = termMap[termId];
    if (!t) return;
    var pop = $('termModalPopover');
    if (!pop) return;

    pop.innerHTML = '<div class="term-popover-head">' +
        '<div class="term-popover-title">' +
          '<span class="term-popover-code">' + esc(t.term) + '</span>' +
          '<span class="term-popover-fullname">' + esc(t.fullName) + '</span>' +
        '</div>' +
        '<div class="term-popover-meta">' +
          '<span class="term-popover-badge">' + esc(t.cat) + '</span>' +
          '<button class="term-popover-close" id="termPopoverClose" title="关闭名片">✕</button>' +
        '</div>' +
      '</div>' +
      '<div class="term-popover-body">' +
        '<div class="term-popover-item">' +
          '<span class="term-popover-lbl">标准定名</span>' +
          '<span class="term-popover-val term-val-highlight">' + esc(t.nameCn) + '</span>' +
        '</div>' +
        '<div class="term-popover-item">' +
          '<span class="term-popover-lbl">核心释义</span>' +
          '<span class="term-popover-val">' + esc(t.def) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="term-popover-foot">' +
        '<button class="btn-jump-appendix" id="btnJumpAppendixFromModal" data-term-id="' + esc(t.id) + '">前往附录二查看全书术语表 ↗</button>' +
      '</div>';

    pop.classList.remove('hidden');

    var closeBtn = $('termPopoverClose');
    if (closeBtn) {
      closeBtn.onclick = function (e) {
        if (e) e.stopPropagation();
        pop.classList.add('hidden');
      };
    }

    var jumpBtn = $('btnJumpAppendixFromModal');
    if (jumpBtn) {
      jumpBtn.onclick = function (e) {
        if (e) e.stopPropagation();
        pop.classList.add('hidden');
        closePanel(true);
        closeModal();
        jumpToTerm(termId);
      };
    }
  }

  function jumpToTerm(termId) {
    var t = termMap[termId];
    if (!t) return;
    hideTermTooltip(true);
    var pop = $('termModalPopover');
    if (pop) pop.classList.add('hidden');

    var appendixIdx = pageKeyMap['appendix'];
    if (appendixIdx == null) appendixIdx = 56;

    jumpToPage(appendixIdx);

    setTimeout(function () {
      var sInput = $('termSearchInput');
      if (sInput) sInput.value = '';
      document.querySelectorAll('.term-alpha-tab').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-letter') === 'ALL');
      });
      currentActiveLetter = 'ALL';
      filterAppendixTerms('', 'ALL');

      var card = $('term-' + termId);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.remove('term-halo-flash');
        void card.offsetWidth;
        card.classList.add('term-halo-flash');
        setTimeout(function () {
          card.classList.remove('term-halo-flash');
        }, 3200);
      }
    }, 450);
  }

  function filterAppendixTerms(q, letter) {
    var grid = $('termCardsGrid');
    if (!grid) return;
    var cards = grid.querySelectorAll('.term-card');
    var visibleCount = 0;
    cards.forEach(function (card) {
      var cLetter = card.getAttribute('data-letter');
      var tid = card.getAttribute('data-term-id');
      var t = termMap[tid];
      var matchLetter = (letter === 'ALL' || cLetter === letter);
      var matchQuery = true;
      if (q && t) {
        var fullSearchText = (t.term + ' ' + t.fullName + ' ' + t.nameCn + ' ' + t.cat + ' ' + t.def).toLowerCase();
        matchQuery = fullSearchText.indexOf(q) !== -1;
      }
      if (matchLetter && matchQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    var pill = $('termCountPill');
    if (pill) {
      pill.textContent = '展示 ' + visibleCount + ' / ' + (DATA.terms ? DATA.terms.length : 0) + ' 项术语';
    }
  }

  function initTermListeners() {
    document.addEventListener('mouseover', function (e) {
      var ref = e.target.closest('.term-ref');
      if (ref) {
        var tid = ref.getAttribute('data-term');
        if (tid) showTermTooltip(ref, tid);
        return;
      }
      if (e.target.closest('#termTooltip')) {
        clearTimeout(tooltipHideTimeout);
        return;
      }
    });

    document.addEventListener('mouseout', function (e) {
      var ref = e.target.closest('.term-ref');
      if (ref) {
        var related = e.relatedTarget;
        if (related && (related.closest('.term-ref') === ref || related.closest('#termTooltip'))) {
          return;
        }
        hideTermTooltip(false);
        return;
      }
      if (e.target.closest('#termTooltip')) {
        var rel = e.relatedTarget;
        if (rel && (rel.closest('#termTooltip') || rel.closest('.term-ref'))) {
          return;
        }
        hideTermTooltip(false);
        return;
      }
    });

    document.addEventListener('click', function (e) {
      var ref = e.target.closest('.term-ref');
      if (ref) {
        e.stopPropagation();
        e.preventDefault();
        // 浮层已包含完整释义，点击不跳转术语表；触屏/点击时直接唤起/维持 Tooltip
        var tid = ref.getAttribute('data-term');
        if (tid) showTermTooltip(ref, tid);
        return;
      }

      if (!e.target.closest('#termTooltip')) {
        hideTermTooltip(true);
      }
      var pop = $('termModalPopover');
      if (pop && !pop.classList.contains('hidden') && !e.target.closest('#termModalPopover')) {
        pop.classList.add('hidden');
      }
    }, true);

    document.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'termSearchInput') {
        var q = e.target.value.trim().toLowerCase();
        if (q) {
          currentActiveLetter = 'ALL';
          document.querySelectorAll('.term-alpha-tab').forEach(function (b) {
            b.classList.toggle('active', b.getAttribute('data-letter') === 'ALL');
          });
        }
        filterAppendixTerms(q, currentActiveLetter);
      }
    });

    document.addEventListener('click', function (e) {
      var tab = e.target.closest('.term-alpha-tab');
      if (tab) {
        var letter = tab.getAttribute('data-letter');
        document.querySelectorAll('.term-alpha-tab').forEach(function (b) { b.classList.remove('active'); });
        tab.classList.add('active');
        currentActiveLetter = letter;
        var q = $('termSearchInput') ? $('termSearchInput').value.trim().toLowerCase() : '';
        filterAppendixTerms(q, letter);
        return;
      }
    });
  }

  function appendixTermsHTML() {
    var terms = DATA.terms || [];
    var letterCounts = {};
    terms.forEach(function (t) {
      var c = t.term[0].toUpperCase();
      letterCounts[c] = (letterCounts[c] || 0) + 1;
    });
    var letters = Object.keys(letterCounts).sort();

    var alphaTabsHTML = '<button class="term-alpha-tab active" data-letter="ALL">全部 (' + terms.length + ')</button>';
    letters.forEach(function (ch) {
      alphaTabsHTML += '<button class="term-alpha-tab" data-letter="' + ch + '">' + ch + ' (' + letterCounts[ch] + ')</button>';
    });

    var cardsHTML = terms.map(function (t) {
      var letter = t.term[0].toUpperCase();
      return '<div class="term-card" id="term-' + t.id + '" data-term-id="' + t.id + '" data-letter="' + letter + '">' +
        '<div class="tc-top">' +
          '<div class="tc-title-wrap">' +
            '<span class="tc-code">' + esc(t.term) + '</span>' +
            '<span class="tc-fullname">' + esc(t.fullName) + '</span>' +
          '</div>' +
          '<span class="tc-badge">' + esc(t.cat) + '</span>' +
        '</div>' +
        '<div class="tc-body">' +
          '<div class="tc-def"><b class="tc-namecn">' + esc(t.nameCn) + '</b>：' + esc(t.def) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="page-pad page-pad-appendix">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">术语表</div>' +
          '<div class="page-subtitle">附录二 · 全书专业技术术语释义与索引（按 A–Z 字母序）</div>' +
        '</div>' +
      '</div>' +
      '<div class="h-rule"></div>' +

      // 术语搜索与 A-Z 筛选工具栏
      '<div class="term-glossary-bar">' +
        '<div class="term-search-wrap">' +
          '<span class="term-search-icon">🔍</span>' +
          '<input type="text" class="term-search-input" id="termSearchInput" placeholder="快速检索英文缩写、全称、中文释义或研判关键信息..." />' +
        '</div>' +
        '<span class="term-count-pill" id="termCountPill">收录 ' + terms.length + ' 项专业技术术语（按 A–Z 字母排序）</span>' +
      '</div>' +

      // 字母快捷切换栏
      '<div class="term-alpha-tabs" id="termAlphaTabs">' +
        alphaTabsHTML +
      '</div>' +

      // 垂直滚动卡片区域（仅卡片部分滚动，表头与字母栏绝对固定）
      '<div class="term-scroll-wrap" id="termScrollWrap">' +
        '<div class="term-cards-grid" id="termCardsGrid">' +
          cardsHTML +
        '</div>' +
      '</div>' +
    '</div>';
  }
  var appendixHTML = appendixTermsHTML;
    function backCoverHTML() {
    var orbs = [
      '<span class="cover-orb" style="width:220px;height:220px;background:#4f8cff;right:-60px;top:-60px"></span>',
      '<span class="cover-orb" style="width:180px;height:180px;background:#22d3ee;left:-40px;bottom:-40px"></span>',
      '<span class="cover-orb" style="width:120px;height:120px;background:#8b5cf6;left:20%;top:8%"></span>'
    ].join('');
    return '<div class="cover-full back-cover-full">' + orbs +
      '<div class="cov-kicker" style="letter-spacing:6px;margin-bottom:32px;opacity:0.85">VALUATION & STRATEGY</div>' +
      '<div class="back-cover-core">' +
        '<div class="bc-step-chain">' +
          '<div class="bc-step-node"><span class="bc-step-verb">看见</span><span class="bc-step-noun">变化</span></div>' +
          '<div class="bc-step-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>' +
          '<div class="bc-step-node"><span class="bc-step-verb">判断</span><span class="bc-step-noun">趋势</span></div>' +
          '<div class="bc-step-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>' +
          '<div class="bc-step-node"><span class="bc-step-verb">洞察</span><span class="bc-step-noun">影响</span></div>' +
          '<div class="bc-step-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>' +
          '<div class="bc-step-node bc-step-highlight"><span class="bc-step-verb">赢得</span><span class="bc-step-noun">主动</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="cov-rule" style="margin:36px 0 24px"></div>' +
      '<div class="cov-meta" style="font-size:12px;opacity:0.75;line-height:1.8">' + esc(DATA.book.org) + '<br>' + esc(DATA.book.date) + '</div>' +
      '</div>';
  }
  function closingHTML() {
    return '<div class="page-pad">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">结语</div>' +
          '<div class="page-subtitle">成果沉淀 · 持续演进 · 创新引领</div>' +
        '</div>' +
      '</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-p">本电子研究书以「整体研究成果 + 重点技术专题」双层结构汇集科技发展部前沿技术研究的关键结论：长名单识别重点方向与分层，落位图谱展现企架十大中心协同与技术映射，专题报告与评估表支撑逐项研判。</div>' +
      '<div class="pg-p">随着研究工作深入，长名单、评估数据与专题报告将持续滚动更新，本系统与研究工作保持同步。</div>' +
      '<div style="margin-top:26px;text-align:center;color:var(--dim)">— 完 —</div>' +
      '</div>';
  }

  /* ==================== 书籍页面序列 ==================== */
  var pages = [];
  var pageLabels = [];
  var pageScroll = {};   // 标记可滚动页（不缩放）
  var pageKeyMap = {};   // 键名到绝对页码映射表
  function addPage(key, label, html, scroll) {
    pages.push(html);
    pageLabels.push(label);
    pageKeyMap[key] = pages.length - 1;
    if (scroll) pageScroll[pages.length - 1] = true;
  }

  function getPageHTML(idx) {
    if (idx < 0 || idx >= pages.length) return '';
    var p = pages[idx];
    if (typeof p === 'function') return p();
    return p || '';
  }

  addPage('inside', '', insideCoverHTML());
  addPage('cover', '封面', coverHTML());
  addPage('motto', '', frontMottoHTML());
  addPage('title', '序章', titlePageHTML());
  addPage('toc1', '目录（上）', toc1HTML);
  addPage('toc2', '目录（下）', toc2HTML);
  addPage('part1', '第一章', dividerHTML('第一章', '工作方案与方法', '顶层规划 · 情报源评估 · 研判工具与多维坐标', '01'));
  addPage('workplan', '第一章 · 工作方案', workplanHTML());
  addPage('sources', '第一章 · 信息来源评估', sourcesHTML());
  addPage('methodology_appl', '第一章 · 研判工具应用', methodologyApplHTML());
  addPage('methodology_mechanism', '第一章 · 研判方法与分层机制', methodologyMechanismHTML());
  addPage('part2', '第二章', dividerHTML('第二章', '整体研究成果', '前沿技术全景 · 成熟度研判 · 影响力雷达 · 企架落位', '02'));
  addPage('research_overview', '第二章 · 整体研究成果概述', researchOverviewDataHTML());
  addPage('library', '第二章 · 前沿技术储备库', libraryPreviewHTML());
  addPage('hypeCycle', '第二章 · 成熟度曲线', hypeCyclePreviewHTML);
  addPage('radar', '第二章 · 影响力雷达图', radarPreviewHTML);
  addPage('graph', '第二章 · 企架落位图谱', graphPreviewHTML());
  addPage('part3', '第三章', dividerHTML('第三章', '各项前沿技术研究', '四大维度全面解构 · 36项重点技术专题研判', '03'));
  DATA.technologies.forEach(function (t) { addPage('tech-' + t.id, '第三章 · ' + t.name, techBookHTML(t)); });
  addPage('partAppendix', '附录', dividerHTML('附录', '研究方法论与术语体系', '前沿技术研究方法论工具体系 · 术语表', '附'));
  addPage('appendix_methodology', '附录一 · 方法论体系', appendixMethodologyHTML());
  addPage('appendix', '附录二 · 术语表', appendixTermsHTML);
  addPage('closing', '结语', closingHTML());
  // 确保封底位于闭合跨页（总页数为偶数，若为奇数则在封底前插入一空白衬页）
  if (pages.length % 2 !== 0) {
    addPage('blankPreBack', '', '<div class="page-pad"></div>');
  }
  addPage('back', '封底', backCoverHTML());
  addPage('blankEnd', '', '');
  var maxSpread = Math.floor((pages.length - 1) / 2);

  /* ==================== 左右双侧技术书签系统 (Dynamic Left/Right Side Tabs) ==================== */
  function getAllBookmarks() {
    var bms = [
      { id: 'cover', no: '封面', short: '全书封面', name: '全书封面 · 科技发展部前沿技术研究成果集', page: pageKeyMap['cover'] != null ? pageKeyMap['cover'] : 1, color: '#818cf8', tier: '前序' },
      { id: 'title', no: '序章', short: '序章', name: '第3页 · 序章：看见未来，还是等待未来发生？', page: pageKeyMap['title'] != null ? pageKeyMap['title'] : 3, color: '#818cf8', tier: '前序' },
      { id: 'toc1', no: '目录', short: '全书目录', name: '全书目录 · 双页对开', page: pageKeyMap['toc1'] != null ? pageKeyMap['toc1'] : 4, color: '#818cf8', tier: '前序' },
      { id: 'part1', no: '一章', short: '方案方法', name: '第一章 · 工作方案与方法', page: pageKeyMap['part1'] != null ? pageKeyMap['part1'] : 6, color: '#6366f1', tier: '第一章' },
      { id: 'workplan', no: '1.1', short: '工作方案', name: '1.1 · 工作方案', page: pageKeyMap['workplan'] != null ? pageKeyMap['workplan'] : 7, color: '#6366f1', tier: '第一章' },
      { id: 'sources', no: '1.2', short: '情报来源', name: '1.2 · 信息来源评估', page: pageKeyMap['sources'] != null ? pageKeyMap['sources'] : 8, color: '#6366f1', tier: '第一章' },
      { id: 'methodology_appl', no: '1.3', short: '方法工具', name: '1.3 · 方法论工具评估', page: pageKeyMap['methodology_appl'] != null ? pageKeyMap['methodology_appl'] : 9, color: '#6366f1', tier: '第一章' },
      { id: 'methodology_mechanism', no: '研判', short: '研判机制', name: '研判方法与分层机制', page: pageKeyMap['methodology_mechanism'] != null ? pageKeyMap['methodology_mechanism'] : 10, color: '#6366f1', tier: '第一章' },
      { id: 'part2', no: '二章', short: '整体成果', name: '第二章 · 整体研究成果', page: pageKeyMap['part2'] != null ? pageKeyMap['part2'] : 11, color: '#3b82f6', tier: '第二章' },
      { id: 'research_overview', no: '成果', short: '成果概述', name: '整体研究成果概述', page: pageKeyMap['research_overview'] != null ? pageKeyMap['research_overview'] : 12, color: '#3b82f6', tier: '第二章' },
      { id: 'library', no: '2.2', short: '技术储备库', name: '2.2 · 前沿技术储备库（长名单）', page: pageKeyMap['library'] != null ? pageKeyMap['library'] : 13, color: '#3b82f6', tier: '第二章' },
      { id: 'hypeCycle', no: '2.3', short: '成熟度曲线', name: '2.3 · 技术成熟度曲线（Gartner Hype Cycle）', page: pageKeyMap['hypeCycle'] != null ? pageKeyMap['hypeCycle'] : 14, color: '#3b82f6', tier: '第二章' },
      { id: 'radar', no: '2.4', short: '影响力雷达', name: '2.4 · 技术影响力雷达图', page: pageKeyMap['radar'] != null ? pageKeyMap['radar'] : 15, color: '#3b82f6', tier: '第二章' },
      { id: 'graph', no: '2.5', short: '落位图谱', name: '2.5 · 企架十大中心落位图谱', page: pageKeyMap['graph'] != null ? pageKeyMap['graph'] : 16, color: '#3b82f6', tier: '第二章' },
      { id: 'part3', no: '三章', short: '专题研判', name: '第三章 · 各项前沿技术研究', page: pageKeyMap['part3'] != null ? pageKeyMap['part3'] : 17, color: '#a855f7', tier: '第三章' }
    ];

    DATA.technologies.forEach(function (t) {
      var cleanName = t.short || t.name.replace(/（[^）]+）|\([^)]+\)/g, '').trim() || t.name;
      var tColor = tierColor(t.tier) || '#8fa3c0';
      var pIdx = pageKeyMap['tech-' + t.id];
      bms.push({
        id: 'tech-' + t.id,
        no: t.id,
        short: cleanName,
        name: t.id + ' ' + cleanName + (t.nameEn ? ' (' + t.nameEn + ')' : '') + ' · [' + t.tier + ']',
        page: pIdx,
        color: tColor,
        tier: t.tier
      });
    });

    bms.push({ id: 'partAppendix', no: '附录', short: '附录导读', name: '附录 · 研究方法论与术语体系', page: pageKeyMap['partAppendix'], color: '#94a3b8', tier: '附录' });
    bms.push({ id: 'appendix_methodology', no: '附一', short: '方法论体系', name: '附录一 · 前沿技术研究方法论工具体系', page: pageKeyMap['appendix_methodology'] != null ? pageKeyMap['appendix_methodology'] : (pages.length - 4), color: '#94a3b8', tier: '附录' });
    bms.push({ id: 'appendix', no: '附二', short: '术语表', name: '附录二 · 术语表', page: pageKeyMap['appendix'] != null ? pageKeyMap['appendix'] : (pages.length - 3), color: '#94a3b8', tier: '附录' });
    bms.push({ id: 'closing', no: '结语', short: '研判结语', name: '结语 · 全书研判总结与未来展望', page: pageKeyMap['closing'] != null ? pageKeyMap['closing'] : (pages.length - 2), color: '#94a3b8', tier: '结语' });
    if (pageKeyMap['back'] != null) {
      bms.push({ id: 'back', no: '封底', short: '全书封底', name: '封底 · 看见变化 → 判断趋势 → 洞察影响 → 赢得主动', page: pageKeyMap['back'], color: '#818cf8', tier: '封底' });
    }
    return bms;
  }

  function syncSideBookmarkLayout() {
    var leftEl = $('bookSideLeft'), rightEl = $('bookSideRight');
    if (!leftEl || !rightEl) return;

    var bookEl = $('book');
    var bookH = bookEl ? (bookEl.clientHeight || bookEl.offsetHeight) : 0;
    if (!bookH || bookH < 100) {
      try {
        var topbarH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--topbar-h'), 10) || 58;
        bookH = window.innerHeight - topbarH - 76;
      } catch (e) {
        bookH = Math.max(400, window.innerHeight - 134);
      }
    }

    var TAB_H = 24;
    var GAP = 4;
    var PAD_TOP = 4;
    var MIN_MARGIN = 10;
    var maxAvail = bookH - MIN_MARGIN * 2;

    var step = TAB_H + GAP; // 28
    // Tab K bottom is at: PAD_TOP + K * TAB_H + (K - 1) * GAP = K * 28 with PAD_TOP=4, GAP=4
    var K = Math.floor((maxAvail - PAD_TOP + GAP) / step);
    if (K < 1) K = 1;

    var exactH = PAD_TOP + K * TAB_H + (K - 1) * GAP; // exactly K * 28
    var topOffset = Math.round((bookH - exactH) / 2);

    leftEl.style.top = topOffset + 'px';
    leftEl.style.height = exactH + 'px';
    leftEl.style.bottom = 'auto';

    rightEl.style.top = topOffset + 'px';
    rightEl.style.height = exactH + 'px';
    rightEl.style.bottom = 'auto';
  }

  function renderSideBookmarks() {
    var leftEl = $('bookSideLeft'), rightEl = $('bookSideRight');
    if (!leftEl || !rightEl) return;

    var curLeftPage = isSingle() ? singleIdx : (spread * 2);
    var curRightPage = isSingle() ? singleIdx : (spread * 2 + 1);

    var all = getAllBookmarks();
    var leftList = all.filter(function (b) { return b.page < curLeftPage; });
    var rightList = all.filter(function (b) { return b.page > curRightPage; });

    function tabHTML(b) {
      return '<div class="edge-tab" data-page="' + b.page + '" style="--tab-color:' + b.color + '" title="' + esc(b.name) + '">' +
        '<span class="et-no" style="color:' + b.color + '">' + esc(b.no) + '</span>' +
        '<span class="et-name">' + esc(b.short) + '</span>' +
      '</div>';
    }

    leftEl.innerHTML = leftList.map(tabHTML).join('');
    rightEl.innerHTML = rightList.map(tabHTML).join('');
    leftEl.scrollTop = 0;
    rightEl.scrollTop = 0;

    syncSideBookmarkLayout();

    function addClicks(el) {
      el.querySelectorAll('.edge-tab').forEach(function (tab) {
        tab.addEventListener('click', function (e) {
          e.stopPropagation();
          e.preventDefault();
          var p = parseInt(this.getAttribute('data-page'), 10);
          jumpToPage(p);
        });
      });
    }
    addClicks(leftEl);
    addClicks(rightEl);
  }

  var spread = 0;
  var singleIdx = 1;
  var flipping = false;
  var isSingle = function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    // 1. 普通手机竖屏 / 折叠屏折叠态竖屏（窄屏使用单页）
    if (w < 560) return true;
    // 2. 普通手机横屏 / 折叠屏横屏 / 电脑桌面（宽屏使用双页对开）
    if (w > h) return false;
    // 3. 折叠屏手机展开态竖屏（接近正方形或 4:3 比例，宽 >= 600 且 宽高比 >= 0.70 显示双页）
    if (w >= 600 && (w / h) >= 0.70) return false;
    // 4. 双屏 / 折叠屏原生 CSS Media Query 适配（展开态双页）
    try {
      if (window.matchMedia && (
        window.matchMedia('(horizontal-viewport-segments: 2)').matches ||
        window.matchMedia('(screen-spanning: single-fold-vertical)').matches
      )) return false;
    } catch (e) {}
    // 5. 其余窄长或竖屏模式使用单页
    return true;
  };

  function flashPage(el) {
    if (!el || !el.parentElement) return;
    var p = el.parentElement;
    p.classList.remove('page-flash');
    void p.offsetWidth;
    p.classList.add('page-flash');
    setTimeout(function () { p.classList.remove('page-flash'); }, 1300);
  }

  function updatePageNo() {
    var pnoL = $('cornerPageNoL'), pnoR = $('cornerPageNoR');
    if (isSingle()) {
      var label = pageLabels[singleIdx] || '';
      var dispNo = (singleIdx >= 2 && singleIdx < pages.length - 2) ? singleIdx : (singleIdx + 1);
      $('pageNo').textContent = label ? (label + ' · ' + dispNo + ' / ' + pages.length) : '';
      if (pnoL) pnoL.textContent = '';
      if (pnoR) pnoR.textContent = (singleIdx >= 2 && singleIdx < pages.length - 2) ? singleIdx : '';
    } else {
      var l = pageLabels[spread * 2] || '', r = pageLabels[spread * 2 + 1] || '';
      if (spread === 0) {
        $('pageNo').textContent = '封面 · 科技发展部前沿技术研究成果集';
        if (pnoL) pnoL.textContent = '';
        if (pnoR) pnoR.textContent = '';
      } else if (spread === maxSpread) {
        $('pageNo').textContent = (l || '封底') + ' · 跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
        if (pnoL) pnoL.textContent = '';
        if (pnoR) pnoR.textContent = '';
      } else {
        if (spread === 1) {
          $('pageNo').textContent = '序章 · 跨页 2 / ' + (maxSpread + 1);
        } else if (spread === 2) {
          $('pageNo').textContent = '全书目录 · 双页对开 · 跨页 3 / ' + (maxSpread + 1);
        } else if (l && r) {
          $('pageNo').textContent = l + '　·　' + r + ' · 跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
        } else if (l) {
          $('pageNo').textContent = l + ' · 跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
        } else if (r) {
          $('pageNo').textContent = r + ' · 跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
        } else {
          $('pageNo').textContent = '跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
        }
        var pLeft = spread * 2;
        var pRight = spread * 2 + 1;
        if (pnoL) pnoL.textContent = (pLeft >= 2 && pLeft < pages.length - 2) ? pLeft : '';
        if (pnoR) pnoR.textContent = (pRight >= 2 && pRight < pages.length - 2) ? pRight : '';
      }
    }
  }
  var BASE_PAGE_W = 593;
  var BASE_PAGE_H = 960;

  // 准备阶段：只做重置写入，不读取任何布局属性
  function prepareFit(el, idx) {
    if (!el) return null;
    if (pageScroll[idx]) { el.classList.add('scroll'); return null; }
    el.classList.remove('scroll');
    var pad = el.querySelector('.page-pad, .cover-full, .back-cover-full, .divider-full') || el.firstElementChild;
    if (!pad) return null;
    pad.style.transform = '';
    pad.style.width = '';
    pad.style.height = '';
    pad.style.minHeight = '';
    pad.style.maxHeight = '';
    return { el: el, pad: pad };
  }
  // 应用阶段：针对普通小屏/笔记本缩放，及 2K/4K 超高分辨率屏幕自适应双向缩放
  function applyFits(items) {
    // 阶段 1：初测容器物理可视尺寸与高分屏重置
    items.forEach(function (m) {
      if (!m) return;
      m.aw = m.el.clientWidth;
      m.ah = m.el.clientHeight;
      if (m.aw > BASE_PAGE_W + 10) {
        // 在 2K/4K 高分屏下，先以基准宽度排版并解除 minHeight 100%，以测量内容真实高度
        m.pad.style.width = BASE_PAGE_W + 'px';
        m.pad.style.height = 'auto';
        m.pad.style.minHeight = '0px';
      }
    });

    // 阶段 2：读取自然排版内容真实高度与宽度
    items.forEach(function (m) {
      if (!m) return;
      m.nw = m.pad.scrollWidth;
      m.nh = m.pad.scrollHeight;
    });

    // 阶段 3：计算各自的自然缩放系数
    items.forEach(function (m) {
      if (!m) return;
      if (m.aw > BASE_PAGE_W + 10) {
        var isFullBleed = (m.pad.matches && m.pad.matches('.cover-full, .back-cover-full, .divider-full')) ||
                          m.pad.classList.contains('cover-full') ||
                          m.pad.classList.contains('back-cover-full') ||
                          m.pad.classList.contains('divider-full');
        var sW = m.aw / BASE_PAGE_W;
        var isFixedH = isFullBleed || (m.pad.classList && m.pad.classList.contains('page-pad-appendix'));
        var effectiveH = isFixedH ? BASE_PAGE_H : Math.max(BASE_PAGE_H, m.nh);
        var sH = m.ah / effectiveH;
        m.s = Math.min(sW, sH);
      } else {
        if (m.nw <= m.aw + 1 && m.nh <= m.ah + 1) {
          m.s = 1;
        } else {
          var effectiveNh = (m.pad.classList && m.pad.classList.contains('page-pad-appendix')) ? BASE_PAGE_H : m.nh;
          var s = Math.min(m.aw / m.nw, m.ah / effectiveNh);
          m.s = (s >= 1) ? 1 : s;
        }
      }
    });

    // 阶段 4：跨页对开双向协调缩放——如果同属常规技术页或正文页，左右取统一缩放基准，确保左右标题文字大小、按钮规格与排版层次绝对对齐一致
    if (items.length === 2 && items[0] && items[1] && !isSingle()) {
      var pad0 = items[0].pad, pad1 = items[1].pad;
      var isTech0 = pad0.classList.contains('book-tech-pad') || pad0.classList.contains('page-pad');
      var isTech1 = pad1.classList.contains('book-tech-pad') || pad1.classList.contains('page-pad');
      if (isTech0 && isTech1) {
        var sUnified = Math.min(items[0].s, items[1].s);
        items[0].s = sUnified;
        items[1].s = sUnified;
      }
    } else if (items.length === 3 && items[1] && items[2] && !isSingle()) {
      var padA = items[1].pad, padB = items[2].pad;
      var isTechA = padA.classList.contains('book-tech-pad') || padA.classList.contains('page-pad');
      var isTechB = padB.classList.contains('book-tech-pad') || padB.classList.contains('page-pad');
      if (isTechA && isTechB) {
        var sUnified = Math.min(items[1].s, items[2].s);
        items[1].s = sUnified;
        items[2].s = sUnified;
      }
    }

    // 阶段 5：写入 transform 尺寸与缩放属性
    items.forEach(function (m) {
      if (!m) return;
      m.pad.style.minHeight = '';
      var s = m.s || 1;

      if (m.aw > BASE_PAGE_W + 10) {
        m.pad.style.transformOrigin = 'top left';
        m.pad.style.width = (m.aw / s) + 'px';
        m.pad.style.height = (m.ah / s) + 'px';
        m.pad.style.minHeight = '0px';
        m.pad.style.maxHeight = (m.ah / s) + 'px';
        m.pad.style.transform = 'scale(' + s + ')';
        return;
      }

      // === 标准屏幕 / 小屏幕常规适配 ===
      m.pad.style.width = '';
      m.pad.style.height = '';
      m.pad.style.maxHeight = '';
      if (s >= 0.999) {
        m.pad.style.transform = '';
        return;
      }
      m.pad.style.transformOrigin = 'top left';
      // 若仅高度超限而宽度未超限，通过补偿宽度确保页面横向依然 100% 满宽，消除横向被压缩变形感
      if (m.ah / m.nh < m.aw / m.nw) {
        m.pad.style.width = (100 / s) + '%';
      } else {
        m.pad.style.width = '';
      }
      m.pad.style.transform = 'scale(' + s + ')';
    });
  }
  function fitPage(el, idx) {
    applyFits([prepareFit(el, idx)]);
  }
  function fitSpread() {
    if (isSingle()) { fitPage($('pageRightInner'), singleIdx); return; }
    applyFits([
      prepareFit($('pageLeftInner'), spread * 2),
      prepareFit($('pageRightInner'), spread * 2 + 1)
    ]);
  }
  function renderSpread() {
    if (isSingle()) {
      var sHtml = getPageHTML(singleIdx);
      $('pageLeftInner').innerHTML = '';
      $('pageRightInner').innerHTML = sHtml;
      $('pageLeft').classList.add('page-blank');
      $('pageRight').classList.toggle('page-blank', !sHtml.trim());
      $('pageRightInner').parentElement.style.width = '100%';
      $('pageRightInner').classList.toggle('scroll', !!pageScroll[singleIdx]);
    } else {
      var leftHtml = getPageHTML(spread * 2);
      var rightHtml = getPageHTML(spread * 2 + 1);
      $('pageLeftInner').innerHTML = leftHtml;
      $('pageRightInner').innerHTML = rightHtml;
      $('pageRightInner').parentElement.style.width = '';

      // 封面前（左侧空白）和 封底后（右侧空白）不渲染底板，直接透出背景，呈现真实闭合封面效果
      $('pageLeft').classList.toggle('page-blank', !leftHtml.trim());
      $('pageRight').classList.toggle('page-blank', !rightHtml.trim());

      var bookEl = $('book');
      if (bookEl) {
        bookEl.classList.toggle('is-cover', spread === 0);
        bookEl.classList.toggle('is-back-cover', spread === maxSpread);
      }

      $('pageLeftInner').classList.toggle('scroll', !!pageScroll[spread * 2]);
      $('pageRightInner').classList.toggle('scroll', !!pageScroll[spread * 2 + 1]);
    }
    updatePageNo();
    renderSideBookmarks();
    updateSpreadEdgesAndPeeks();
    bindPageActions();
    fitSpread();
  }
  function updateSpreadEdgesAndPeeks() {
    var isSingleMode = isSingle();
    var leftHtml = isSingleMode ? '' : getPageHTML(spread * 2);
    var rightHtml = isSingleMode ? getPageHTML(singleIdx) : getPageHTML(spread * 2 + 1);
    var leftBlank = isSingleMode ? (singleIdx <= 0) : (!leftHtml.trim() || $('pageLeft').classList.contains('page-blank') || spread <= 0);
    var rightBlank = isSingleMode ? (singleIdx >= pages.length - 1) : (!rightHtml.trim() || $('pageRight').classList.contains('page-blank') || spread >= maxSpread);

    var peekL = $('cornerPeekL'), peekR = $('cornerPeekR');
    if (peekL) peekL.style.display = leftBlank ? 'none' : '';
    if (peekR) peekR.style.display = rightBlank ? 'none' : '';

    var edgeL = $('bookEdgeLeft'), edgeR = $('bookEdgeRight');
    if (edgeL && edgeR) {
      var isCoverSpread = (spread <= 0 && !isSingleMode);
      var isBackSpread = (spread >= maxSpread && !isSingleMode);

      if (isCoverSpread || isBackSpread) {
        renderEdgeLayers(edgeL, 0, true);
        renderEdgeLayers(edgeR, 0, false);
      } else {
        var ratio = maxSpread > 0 ? (spread / maxSpread) : 0;
        if (isSingleMode) ratio = pages.length > 1 ? (singleIdx / (pages.length - 1)) : 0;
        var leftThick = Math.round(ratio * 13);
        var rightThick = Math.round((1 - ratio) * 13);
        if (spread <= 0 || (isSingleMode && singleIdx <= 0) || leftBlank) leftThick = 0;
        if (spread >= maxSpread || (isSingleMode && singleIdx >= pages.length - 1) || rightBlank) rightThick = 0;

        renderEdgeLayers(edgeL, leftThick, true);
        renderEdgeLayers(edgeR, rightThick, false);
      }
    }
  }
  function renderEdgeLayers(el, thick, isLeft) {
    if (!el) return;
    if (thick <= 0) {
      el.style.display = 'none';
      el.style.width = '0px';
      el.innerHTML = '';
      return;
    }
    el.style.display = 'block';
    el.style.width = thick + 'px';

    // 精巧适度的书本厚度（最高 13px，阶梯层次更轻薄精致）
    var layerCount = 1;
    if (thick > 8) layerCount = 2;

    var html = '';
    for (var i = 0; i < layerCount; i++) {
      var stepInset = i * 2; // 上下阶梯轻量微缩进 2px
      var layerWidth = Math.max(2, Math.round((thick / layerCount) * (layerCount - i)));
      var sideProp = isLeft ? ('right:0;width:' + layerWidth + 'px;') : ('left:0;width:' + layerWidth + 'px;');
      html += '<div class="book-edge-layer edge-tier-' + (i + 1) + '" style="position:absolute;top:' + stepInset + 'px;bottom:' + stepInset + 'px;' + sideProp + '"></div>';
    }
    el.innerHTML = html;
  }
  function bindPageActions(customRoot) {
    // 绑定跨页书页及网页模式内容区中的链接与按钮交互
    var roots = customRoot ? [customRoot] : [$('pageLeftInner'), $('pageRightInner'), $('webContent')];
    roots.forEach(function (root) {
      if (!root) return;
      if (typeof linkTermsInContainer === 'function') linkTermsInContainer(root);
      root.querySelectorAll('.toc-list li').forEach(function (li) {
        li.onclick = function (e) {
          if (e) e.stopPropagation();
          jumpToPage(parseInt(li.getAttribute('data-jump'), 10));
        };
      });
      root.querySelectorAll('[data-action]').forEach(function (el) {
        el.onclick = function (e) {
          if (e) e.stopPropagation();
          var action = el.getAttribute('data-action');
          var id = el.getAttribute('data-id');
          if (action === 'open-library') openLibraryPanel();
          else if (action === 'open-hype-cycle') openHypeCyclePanel();
          else if (action === 'open-radar') openRadarPanel();
          else if (action === 'open-graph') openGraphPanel();
          else if (action === 'open-methodology') openMethodologyPanel(el.getAttribute('data-sec'));
          else if (action === 'open-tool') openMethodologyPanel(null, parseInt(el.getAttribute('data-tool-idx'), 10));
          else if (action === 'open-sources-report') openSourcesReportPanel();
          else if (action === 'open-workplan-report') openWorkplanReportPanel();
          else if (action === 'open-tech') openTechPanel(findTech(id), el.getAttribute('data-tab'));
          else if (action === 'lib-prev-page') {
            libPreviewPage = Math.max(0, libPreviewPage - 1);
            refreshLibraryPreview();
          }
          else if (action === 'lib-next-page') {
            libPreviewPage = Math.min(1, libPreviewPage + 1);
            refreshLibraryPreview();
          }
        };
      });
      root.querySelectorAll('.blueprint-card, .blueprint-svg-wrap, #graphBox').forEach(function (card) {
        bindBlueprintPillTooltips(card);
      });
      root.querySelectorAll('.tc-stat-pill').forEach(function (pill) {
        pill.onclick = function (e) {
          if (e) e.stopPropagation();
          var cid = pill.getAttribute('data-center');
          openGraphPanel(null, false, cid);
        };
      });
    });
  }
  function jumpToPage(i) {
    flipping = false;
    var sheet = $('turnSheet');
    if (sheet) {
      sheet.style.display = 'none';
      sheet.classList.remove('turning', 'turning-back');
    }
    i = Math.max(0, Math.min(pages.length - 1, i));
    if (isSingle()) {
      singleIdx = Math.max(1, i);
      renderSpread();
      flashPage($('pageRightInner'));
    } else {
      spread = Math.max(0, Math.min(maxSpread, Math.floor(i / 2)));
      renderSpread();
      var targetInner = (i % 2 === 0) ? $('pageLeftInner') : $('pageRightInner');
      flashPage(targetInner);
    }
  }
  function flipForward() {
    if (flipping) return;
    if (isSingle()) {
      if (singleIdx >= pages.length - 1) { toast('已是最后一页'); return; }
      singleIdx++; renderSpread(); return;
    }
    if (spread >= maxSpread) { toast('已是最后一页'); return; }
    flipping = true;

    var targetSpread = spread + 1;
    var isGoingToBackCover = (targetSpread >= maxSpread);
    var isLeavingCover = (spread === 0);

    // 1. 【动效顺序前置】：在翻页开始的第一时间切换封面/封底状态并消除空白底框
    var bookEl = $('book');
    if (bookEl) {
      if (isGoingToBackCover) bookEl.classList.add('is-back-cover');
      if (isLeavingCover) bookEl.classList.remove('is-cover');
    }

    var oldRight = getPageHTML(spread * 2 + 1);
    var newLeft = getPageHTML(spread * 2 + 2);
    var newRight = getPageHTML(spread * 2 + 3);

    $('pageRightInner').innerHTML = newRight;
    $('turnFrontInner').innerHTML = oldRight;
    $('turnBackInner').innerHTML = newLeft;

    $('turnFrontInner').classList.toggle('scroll', !!pageScroll[spread * 2 + 1]);
    $('turnBackInner').classList.toggle('scroll', !!pageScroll[spread * 2 + 2]);
    $('pageRightInner').classList.toggle('scroll', !!pageScroll[spread * 2 + 3]);

    // 提前去除目标空白页底板与边框，确保翻页过程中绝对不会露出多余空白边框
    $('pageRight').classList.toggle('page-blank', !newRight.trim());
    $('pageLeft').classList.toggle('page-blank', !newLeft.trim());
    $('turnFrontInner').parentElement.classList.toggle('page-blank', !oldRight.trim());
    $('turnBackInner').parentElement.classList.toggle('page-blank', !newLeft.trim());

    // 提前在翻页动画开始之前绘制好目标跨页的书本厚度与边框（绝无翻页后阴影突变）
    if (targetSpread > 0 && targetSpread < maxSpread) {
      var ratio = targetSpread / maxSpread;
      var leftThick = Math.round(ratio * 13);
      var rightThick = Math.round((1 - ratio) * 13);
      renderEdgeLayers($('bookEdgeLeft'), leftThick, true);
      renderEdgeLayers($('bookEdgeRight'), rightThick, false);
    } else {
      renderEdgeLayers($('bookEdgeLeft'), 0, true);
      renderEdgeLayers($('bookEdgeRight'), 0, false);
    }
    if (isGoingToBackCover && $('cornerPeekR')) $('cornerPeekR').style.display = 'none';

    var sheet = $('turnSheet');
    sheet.classList.remove('back');
    sheet.style.display = 'block';
    sheet.classList.remove('turning');
    void sheet.offsetWidth;
    applyFits([
      prepareFit($('turnFrontInner'), spread * 2 + 1),
      prepareFit($('turnBackInner'), spread * 2 + 2),
      prepareFit($('pageRightInner'), spread * 2 + 3)
    ]);
    sheet.classList.add('turning');

    setTimeout(function () {
      spread++;
      var leftHtml = getPageHTML(spread * 2);
      var rightHtml = getPageHTML(spread * 2 + 1);
      $('pageLeftInner').innerHTML = leftHtml;
      $('pageRightInner').innerHTML = rightHtml;
      $('pageLeft').classList.toggle('page-blank', !leftHtml.trim());
      $('pageRight').classList.toggle('page-blank', !rightHtml.trim());
      if (bookEl) {
        bookEl.classList.toggle('is-cover', spread === 0);
        bookEl.classList.toggle('is-back-cover', spread === maxSpread);
      }
      $('pageLeftInner').classList.toggle('scroll', !!pageScroll[spread * 2]);
      $('pageRightInner').classList.toggle('scroll', !!pageScroll[spread * 2 + 1]);
      fitSpread();
      updatePageNo();
      renderSideBookmarks();
      updateSpreadEdgesAndPeeks();
      bindPageActions();
      sheet.style.display = 'none';
      sheet.classList.remove('turning');
      flipping = false;
    }, 860);
  }
  function flipBackward() {
    if (flipping) return;
    if (isSingle()) {
      if (singleIdx <= 1) { toast('已是第一页'); return; }
      singleIdx--; renderSpread(); return;
    }
    if (spread <= 0) { toast('已是第一页'); return; }
    flipping = true;

    var targetSpread = spread - 1;
    var isGoingToCover = (targetSpread <= 0);
    var isLeavingBackCover = (spread >= maxSpread);

    // 1. 【动效顺序前置】：在翻页开始的第一时间切换封面/封底状态并消除空白底框
    var bookEl = $('book');
    if (bookEl) {
      if (isGoingToCover) bookEl.classList.add('is-cover');
      if (isLeavingBackCover) bookEl.classList.remove('is-back-cover');
    }

    var oldLeft = getPageHTML(spread * 2);
    var newLeft = getPageHTML(spread * 2 - 2);
    var newRight = getPageHTML(spread * 2 - 1);

    $('pageLeftInner').innerHTML = newLeft;
    $('turnFrontInner').innerHTML = oldLeft;
    $('turnBackInner').innerHTML = newRight;

    $('pageLeftInner').classList.toggle('scroll', !!pageScroll[spread * 2 - 2]);
    $('turnFrontInner').classList.toggle('scroll', !!pageScroll[spread * 2]);
    $('turnBackInner').classList.toggle('scroll', !!pageScroll[spread * 2 - 1]);

    // 提前去除目标空白页底板与边框，确保翻页过程中绝对不会露出多余空白边框
    $('pageLeft').classList.toggle('page-blank', !newLeft.trim());
    $('pageRight').classList.toggle('page-blank', !newRight.trim());
    $('turnFrontInner').parentElement.classList.toggle('page-blank', !oldLeft.trim());
    $('turnBackInner').parentElement.classList.toggle('page-blank', !newRight.trim());

    // 提前在翻页动画开始之前绘制好目标跨页的书本厚度与边框（绝无翻页后阴影突变）
    if (targetSpread > 0 && targetSpread < maxSpread) {
      var ratio = targetSpread / maxSpread;
      var leftThick = Math.round(ratio * 13);
      var rightThick = Math.round((1 - ratio) * 13);
      renderEdgeLayers($('bookEdgeLeft'), leftThick, true);
      renderEdgeLayers($('bookEdgeRight'), rightThick, false);
    } else {
      renderEdgeLayers($('bookEdgeLeft'), 0, true);
      renderEdgeLayers($('bookEdgeRight'), 0, false);
    }
    if (isGoingToCover && $('cornerPeekL')) $('cornerPeekL').style.display = 'none';

    var sheet = $('turnSheet');
    sheet.classList.add('back');
    sheet.style.display = 'block';
    sheet.classList.remove('turning');
    void sheet.offsetWidth;
    applyFits([
      prepareFit($('turnFrontInner'), spread * 2),
      prepareFit($('turnBackInner'), spread * 2 - 1),
      prepareFit($('pageLeftInner'), spread * 2 - 2)
    ]);
    sheet.classList.add('turning');

    setTimeout(function () {
      spread--;
      var leftHtml = getPageHTML(spread * 2);
      var rightHtml = getPageHTML(spread * 2 + 1);
      $('pageLeftInner').innerHTML = leftHtml;
      $('pageRightInner').innerHTML = rightHtml;
      $('pageLeft').classList.toggle('page-blank', !leftHtml.trim());
      $('pageRight').classList.toggle('page-blank', !rightHtml.trim());
      if (bookEl) {
        bookEl.classList.toggle('is-cover', spread === 0);
        bookEl.classList.toggle('is-back-cover', spread === maxSpread);
      }
      $('pageLeftInner').classList.toggle('scroll', !!pageScroll[spread * 2]);
      $('pageRightInner').classList.toggle('scroll', !!pageScroll[spread * 2 + 1]);
      fitSpread();
      updatePageNo();
      renderSideBookmarks();
      updateSpreadEdgesAndPeeks();
      bindPageActions();
      sheet.style.display = 'none';
      sheet.classList.remove('turning');
      sheet.classList.remove('back');
      flipping = false;
    }, 860);
  }

  /* ==================== 网页视图（目录 + 滚动内容） ==================== */
  function webSection(id, no, titleHtml, bodyHtml, actionBtnHtml) {
    return '<div class="sec" id="' + id + '">' +
      '<div class="sec-head">' +
        '<span class="sec-no">' + esc(no) + '</span>' +
        '<span class="sec-title">' + titleHtml + '</span>' +
        (actionBtnHtml || '') +
      '</div>' +
      '<div class="sec-body">' + bodyHtml + '</div>' +
    '</div>';
  }
  function renderWeb() {
    var b = DATA.book;
    var sections = [];
    sections.push('<div class="sec" id="s-motto"><div class="sec-body">' + frontMottoHTML() + '</div></div>');
    sections.push('<div class="sec" id="s-title"><div class="sec-head"><span class="sec-title">序章</span></div><div class="sec-body">' + titlePageHTML() + '</div></div>');
    sections.push(webSection('s-workplan', '1.1', '工作方案', workplanHTML(), '<button class="btn btn-sm active sec-head-btn" data-action="open-workplan-report">📖 预览工作方案</button>'));
    sections.push(webSection('s-sources', '1.2', '信息来源评估', sourcesHTML(), '<button class="btn btn-sm active sec-head-btn" data-action="open-sources-report">📖 完整评判大屏</button>'));
    sections.push(webSection('s-methodology-appl', '1.3', '方法论工具评估', methodologyApplHTML(), '<button class="btn btn-sm active sec-head-btn" data-action="open-methodology">📖 完整方法论体系</button>'));
    sections.push(webSection('s-methodology-mechanism', '1.4', '研判方法与分层机制', methodologyMechanismHTML()));
    sections.push(webSection('s-research-overview', '2.1', '整体研究成果概述', researchOverviewDataHTML()));
    sections.push(webSection('s-library', '2.2', '前沿技术储备库（长名单）', libraryPreviewHTML(0, true), '<button class="btn btn-sm active sec-head-btn" data-action="open-library">⛶ 完整长名单</button>'));
    sections.push(webSection('s-hype-cycle', '2.3', '技术成熟度曲线（Gartner Hype Cycle）', hypeCycleInteractiveHTML('webHypeCycleWrap', false), '<button class="btn btn-sm active sec-head-btn" data-action="open-hype-cycle">⛶ 全屏成熟度曲线</button>'));
    sections.push(webSection('s-radar', '2.4', '技术影响力雷达图（Impact Radar）', radarInteractiveHTML('webRadarWrap', false), '<button class="btn btn-sm active sec-head-btn" data-action="open-radar">⛶ 全屏雷达图</button>'));
    sections.push(webSection('s-graph', '2.5', '前沿技术在企架十大中心的落位图谱', graphPreviewHTML(), '<button class="btn btn-sm active sec-head-btn" data-action="open-graph">⛶ 交互图谱</button>'));
    DATA.technologies.forEach(function (t, i) {
      var pureName = t.short || t.name.replace(/（[^）]+）|\([^)]+\)/g, '').trim() || t.name;
      var enName = t.nameEn || '';
      var titleHtml = esc(pureName) + (enName ? (' <span style="font-size:13.5px;color:var(--dim);font-weight:400;margin-left:8px">' + esc(enName) + '</span>') : '');
      sections.push(webSection('s-tech-' + t.id, '3.' + (i + 1), titleHtml, techWebHTML(t)));
    });
    sections.push(webSection('s-part-appendix', '附录', '附录与研究方法论工具', '<div class="pg-p">收录前沿技术研究方法论工具体系、术语定义与数据来源依据。</div>'));
    sections.push(webSection('s-appendix-methodology', '附录一', '前沿技术研究方法论工具体系', appendixMethodologyHTML(), '<button class="btn btn-sm active sec-head-btn" data-action="open-methodology">📖 打开方法论详析面板</button>'));
    sections.push(webSection('s-appendix', '附录二', '术语表', appendixTermsHTML()));
    sections.push(webSection('s-closing', '结语', '结语 · 全书研判总结与未来展望', closingHTML()));
    $('webContent').innerHTML = sections.join('');
    if (typeof linkTermsInContainer === 'function') linkTermsInContainer($('webContent'));
    initHypeCycleInteractive($('webHypeCycleWrap'));
    initImpactRadarInteractive($('webRadarWrap'));

    // 目录
    var toc = ['<h3>目录</h3>'];
    toc.push('<div class="web-toc-item part" data-target="s-title"><span class="wt-no">序章</span>看见未来，还是等待未来发生？</div>');
    toc.push('<div class="web-toc-item part" data-target="s-workplan">第一章 · 工作方案与方法</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-workplan"><span class="wt-no">1.1</span>工作方案</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-sources"><span class="wt-no">1.2</span>信息来源评估</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-methodology-appl"><span class="wt-no">1.3</span>方法论工具评估</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-methodology-mechanism"><span class="wt-no">1.4</span>研判方法与分层机制</div>');
    toc.push('<div class="web-toc-item part" data-target="s-research-overview">第二章 · 整体研究成果</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-research-overview"><span class="wt-no">2.1</span>整体研究成果概述</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-library"><span class="wt-no">2.2</span>前沿技术储备库</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-hype-cycle"><span class="wt-no">2.3</span>技术成熟度曲线</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-radar"><span class="wt-no">2.4</span>技术影响力雷达</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-graph"><span class="wt-no">2.5</span>企架十大中心落位图谱</div>');
    toc.push('<div class="web-toc-item part" data-target="s-tech-' + DATA.technologies[0].id + '">第三章 · 各项前沿技术研究</div>');
    DATA.technologies.forEach(function (t, i) {
      var pureName = t.short || t.name.replace(/（[^）]+）|\([^)]+\)/g, '').trim() || t.name;
      toc.push('<div class="web-toc-item sub" data-target="s-tech-' + t.id + '"><span class="wt-no">3.' + (i + 1) + '</span>' + esc(pureName) + '</div>');
    });
    toc.push('<div class="web-toc-item part" data-target="s-part-appendix">附录 · 研究方法论工具与说明</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-appendix-methodology"><span class="wt-no">附录一</span>方法论工具体系</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-appendix"><span class="wt-no">附录二</span>术语表</div>');
    toc.push('<div class="web-toc-item part" data-target="s-closing">结语 · 全书研判总结与未来展望</div>');
    $('webToc').innerHTML = toc.join('');

    // 目录点击定位
    var tocItems = $('webToc').querySelectorAll('.web-toc-item');
    tocItems.forEach(function (it) {
      it.onclick = function () {
        var el = $(it.getAttribute('data-target'));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
    });

    // 滚动高亮
    if (window._webObserver) window._webObserver.disconnect();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var id = en.target.id;
          tocItems.forEach(function (it) { it.classList.toggle('active', it.getAttribute('data-target') === id); });
        }
      });
    }, { root: $('webContent'), rootMargin: '0px 0px -70% 0px', threshold: 0 });
    $('webContent').querySelectorAll('.sec').forEach(function (s) { observer.observe(s); });
    window._webObserver = observer;
    bindPageActions();
  }

  /* ==================== 长名单面板 ==================== */
  function libraryHTML() {
    var catOpts = '<option value="">全部战略方向</option>' + DATA.categories.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join('');
    var tierOpts = '<option value="">全部层级</option>' + DATA.tiers.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join('');
    return '<div class="lib-container-layout">' +
      '<div class="lib-toolbar">' +
        '<input id="libSearch" type="text" placeholder="搜索技术名称 / 关键词 / 应用…">' +
        '<select id="libCat">' + catOpts + '</select>' +
        '<select id="libTier">' + tierOpts + '</select>' +
        '<select id="libPageSize">' +
          '<option value="36" selected>显示全部 (36项)</option>' +
          '<option value="20">每页 20 项</option>' +
          '<option value="12">每页 12 项</option>' +
        '</select>' +
        '<span class="lib-count" id="libCount"></span>' +
      '</div>' +
      '<div class="lib-table-wrap">' +
        '<table class="lib-table"><thead><tr>' +
          '<th data-sort="no">#</th>' +
          '<th data-sort="name">技术名称</th>' +
          '<th data-sort="category">战略方向</th>' +
          '<th data-sort="tier">层级</th>' +
          '<th data-sort="maturity" class="col-score" title="技术成熟度 (1-5)">成熟度</th>' +
          '<th data-sort="strategicFit" class="col-score" title="战略匹配度 (1-5)">匹配度</th>' +
          '<th data-sort="value" class="col-score" title="价值贡献度 (1-5)">贡献度</th>' +
          '<th data-sort="feasibility" class="col-score" title="引入可行度 (1-5)">可行度</th>' +
          '<th data-sort="urgency" class="col-score" title="战略紧迫度 (1-5)">紧迫度</th>' +
          '<th data-sort="openness" class="col-score" title="生态开放度 (1-5)">开放度</th>' +
          '<th data-sort="disposal">处置档位</th>' +
          '<th>操作</th>' +
        '</tr></thead><tbody id="libTbody"></tbody></table>' +
      '</div>' +
      '<div class="pager" id="libPager">' +
        '<button id="pgPrev">‹ 上一页</button>' +
        '<span id="pgInfo"></span>' +
        '<button id="pgNext">下一页 ›</button>' +
      '</div>' +
    '</div>';
  }
  var libState = { q: '', cat: '', tier: '', sort: 'no', dir: 1, page: 0, pageSize: 36 };
  function initLibrary(prefilter, savedLibState) {
    if (savedLibState) {
      libState = Object.assign({}, savedLibState);
      if ($('libSearch')) $('libSearch').value = libState.q || '';
      if ($('libCat')) $('libCat').value = libState.cat || '';
      if ($('libTier')) $('libTier').value = libState.tier || '';
      if ($('libPageSize')) $('libPageSize').value = libState.pageSize || 36;
    } else {
      libState = { q: prefilter || '', cat: '', tier: '', sort: 'no', dir: 1, page: 0, pageSize: 36 };
      if (prefilter && $('libSearch')) $('libSearch').value = prefilter;
    }
    var tierOrder = { '布局层': 1, '论证层': 2, '研究层': 3, '观察层': 4 };
    function render() {
      var items = DATA.library.items.filter(function (it) {
        if (libState.cat && it.category !== libState.cat) return false;
        if (libState.tier && it.tier !== libState.tier) return false;
        if (libState.q) {
          var hay = (it.name + it.nameEn + (it.short || '') + it.summary + it.definition + it.bankValue + it.source + it.category + it.tier).toLowerCase();
          if (hay.indexOf(libState.q.toLowerCase()) < 0) return false;
        }
        return true;
      });
      var dir = libState.dir, key = libState.sort;
      items.sort(function (a, b) {
        var va, vb;
        if (key === 'no') { va = a.no; vb = b.no; }
        else if (key === 'tier') { va = tierOrder[a.tier] || 9; vb = tierOrder[b.tier] || 9; }
        else if (key === 'maturity' || key === 'strategicFit' || key === 'value' || key === 'feasibility' || key === 'urgency' || key === 'openness') {
          va = Number(a[key]) || 0; vb = Number(b[key]) || 0;
        }
        else if (key === 'name') {
          va = a.short || a.name; vb = b.short || b.name;
        }
        else { va = a[key] || ''; vb = b[key] || ''; }
        if (va < vb) return -1 * dir; if (va > vb) return 1 * dir; return 0;
      });
      var total = items.length, pages = Math.max(1, Math.ceil(total / libState.pageSize));
      libState.page = Math.min(libState.page, pages - 1);
      var start = libState.page * libState.pageSize;
      var slice = items.slice(start, start + libState.pageSize);
      $('libCount').textContent = '共 ' + total + ' 项';
      $('pgInfo').textContent = (total ? (start + 1) : 0) + '–' + Math.min(start + libState.pageSize, total) + ' / ' + total + ' 项' + (pages > 1 ? (' (第 ' + (libState.page + 1) + '/' + pages + ' 页)') : '');
      $('pgPrev').disabled = libState.page === 0;
      $('pgNext').disabled = libState.page >= pages - 1;
      $('pgPrev').style.display = pages <= 1 ? 'none' : 'inline-block';
      $('pgNext').style.display = pages <= 1 ? 'none' : 'inline-block';

      $('libTbody').innerHTML = slice.map(function (it) {
        var mainName = it.short || it.name.replace(/（[^）]+）|\([^)]+\)/g, '').trim() || it.name;
        return '<tr><td>' + it.no + '</td>' +
          '<td class="tname">' + esc(mainName) + (it.nameEn ? '<div style="font-size:11px;color:var(--faint);font-weight:400">' + esc(it.nameEn) + '</div>' : '') + '</td>' +
          '<td><span class="tag" style="border-color:' + catColor(it.category) + ';color:' + catColor(it.category) + '">' + esc(it.category) + '</span></td>' +
          '<td>' + tierPill(it.tier) + '</td>' +
          '<td class="col-score">' + scorePill(it.maturity) + '</td>' +
          '<td class="col-score">' + scorePill(it.strategicFit) + '</td>' +
          '<td class="col-score">' + scorePill(it.value) + '</td>' +
          '<td class="col-score">' + scorePill(it.feasibility) + '</td>' +
          '<td class="col-score">' + scorePill(it.urgency) + '</td>' +
          '<td class="col-score">' + scorePill(it.openness) + '</td>' +
          '<td>' + esc(it.disposal || '—') + '</td>' +
          '<td><button class="btn" data-row="' + it.id + '">详情</button> <button class="btn active" data-tech="' + it.id + '">专题</button></td></tr>';
      }).join('');
      $('libTbody').querySelectorAll('[data-row]').forEach(function (b) {
        b.onclick = function () { openLibraryItemModal(b.getAttribute('data-row')); };
      });
      $('libTbody').querySelectorAll('[data-tech]').forEach(function (b) {
        b.onclick = function () { openTechPanel(findTech(b.getAttribute('data-tech'))); };
      });

      // 更新表头排序指示箭头
      document.querySelectorAll('.lib-table th[data-sort]').forEach(function (th) {
        var k = th.getAttribute('data-sort');
        var base = th.getAttribute('data-label') || th.textContent.replace(/[ ▲▼]/g, '').trim();
        th.setAttribute('data-label', base);
        if (libState.sort === k) {
          th.classList.add('sorted');
          th.textContent = base + (libState.dir === 1 ? ' ▲' : ' ▼');
        } else {
          th.classList.remove('sorted');
          th.textContent = base;
        }
      });
    }
    $('libSearch').oninput = function () { libState.q = this.value; libState.page = 0; render(); };
    $('libCat').onchange = function () { libState.cat = this.value; libState.page = 0; render(); };
    $('libTier').onchange = function () { libState.tier = this.value; libState.page = 0; render(); };
    var psEl = $('libPageSize');
    if (psEl) {
      psEl.onchange = function () {
        libState.pageSize = parseInt(this.value, 10) || 36;
        libState.page = 0;
        render();
      };
    }
    $('pgPrev').onclick = function () { libState.page--; render(); };
    $('pgNext').onclick = function () { libState.page++; render(); };
    document.querySelectorAll('.lib-table th[data-sort]').forEach(function (th) {
      th.onclick = function () {
        var k = th.getAttribute('data-sort');
        if (libState.sort === k) libState.dir *= -1; else { libState.sort = k; libState.dir = 1; }
        render();
      };
    });
    render();
  }
  function openLibraryPanel(prefilter, savedLibState, savedScrollTop, isNavBack) {
    if (!isNavBack) {
      if (!$('panel').classList.contains('hidden') && currentPanelMeta && currentPanelMeta.type !== 'library') {
        var snap = capturePanelSnapshot();
        if (snap) panelNavStack.push(snap);
      } else {
        panelNavStack = [];
      }
    }
    currentPanelMeta = { type: 'library', name: '技术储备库' };
    openPanel('前沿技术储备库（长名单 · 36 项）', libraryHTML(), function () {
      initLibrary(prefilter, savedLibState);
      if (savedScrollTop && $('panelBody')) $('panelBody').scrollTop = savedScrollTop;
    });
  }

  var LONG_FIELDS = ['source', 'externalSource', 'definition', 'trend', 'bankValue', 'limitation', 'maturityBasis', 'strategicFitBasis', 'valueBasis', 'feasibilityBasis', 'urgencyBasis', 'opennessBasis', 'conclusion', 'remark', 'summary'];
  function openLibraryItemModal(id) {
    var it = findLib(id); if (!it) return;
    var rows = DATA.library.fields.map(function (f) {
      var v = it[f.key];
      var html = v == null || v === '' ? '—' : v;
      if (f.key === 'tier') html = tierPill(v);
      else if (f.key === 'maturity' || f.key === 'strategicFit' || f.key === 'value' || f.key === 'feasibility' || f.key === 'urgency' || f.key === 'openness') html = scorePill(v);
      else if (f.key === 'category') html = '<span class="tag" style="border-color:' + catColor(v) + ';color:' + catColor(v) + '">' + esc(v) + '</span>';
      else html = esc(v);
      var full = LONG_FIELDS.indexOf(f.key) >= 0 ? ' full' : '';
      return '<div class="rd' + full + '"><div class="k">' + esc(f.label) + '</div><div class="v">' + html + '</div></div>';
    }).join('');
    openModal(it.name + ' · ' + it.id + '（全字段详情）', '<div class="row-detail">' + rows + '<div class="rd full" style="border:0;margin-top:6px"><button class="btn active" id="mdOpenTech" data-id="' + id + '">打开专题研究 →</button></div></div>');
    $('mdOpenTech').onclick = function () { closeModal(); openTechPanel(findTech(id)); };
  }

  /* ==================== 企架十大中心交互图谱面板 ==================== */
  function graphToolbarHTML() {
    var centers = [
      { id: 'all', label: '全部 (36)' },
      { id: 'c1', label: '1.对客服务' },
      { id: 'c2', label: '2.智慧运营' },
      { id: 'c3', label: '3.客户经营' },
      { id: 'c4', label: '4.产品合约' },
      { id: 'c5', label: '5.业务处理' },
      { id: 'c7', label: '6.账务交易' },
      { id: 'c6', label: '7.风险管理' },
      { id: 'c8', label: '8.管理支持' },
      { id: 'c9', label: '9.数智能力' },
      { id: 'c10', label: '10.技术服务' }
    ];

    var centerBtnHtml = centers.map(function (c, idx) {
      return '<button class="' + (idx === 0 ? 'active' : '') + '" data-center="' + c.id + '">' + esc(c.label) + '</button>';
    }).join('');

    return '<div class="radar-toolbar" style="margin-bottom:8px;padding:8px 14px;gap:8px 14px;flex:none">' +
      '<div class="radar-filter-group" style="flex-wrap:wrap;gap:6px 8px">' +
        '<span style="font-weight:700">十大中心:</span>' +
        '<div class="radar-btn-group" id="graphCenterFilterGroup" data-filter="center" style="flex-wrap:wrap">' +
          centerBtnHtml +
        '</div>' +
      '</div>' +
      '<div class="radar-filter-group" style="flex-wrap:wrap;gap:6px 8px">' +
        '<span style="font-weight:700">处置档位:</span>' +
        '<div class="radar-btn-group" id="graphTierFilterGroup" data-filter="tier">' +
          '<button class="active" data-tier="all">全部</button>' +
          '<button data-tier="布局层" style="color:#34d399">布局层</button>' +
          '<button data-tier="论证层" style="color:#38bdf8">论证层</button>' +
          '<button data-tier="研究层" style="color:#fbbf24">研究层</button>' +
          '<button data-tier="观察层" style="color:#fb7185">观察层</button>' +
        '</div>' +
      '</div>' +
      '<div class="radar-filter-group" style="margin-left:auto">' +
        '<input type="text" class="radar-search-input" id="graphSearchInput" placeholder="🔍 检索技术 (如 T01、智能体)..." style="width:190px">' +
      '</div>' +
    '</div>';
  }

  function openGraphPanel(savedScrollTop, isNavBack, initialCenter) {
    if (!isNavBack) {
      if (!$('panel').classList.contains('hidden') && currentPanelMeta && currentPanelMeta.type !== 'graph') {
        var snap = capturePanelSnapshot();
        if (snap) panelNavStack.push(snap);
      } else {
        panelNavStack = [];
      }
    }
    currentPanelMeta = { type: 'graph', name: '前沿技术在企架十大中心的落位图谱' };
    openPanel('前沿技术在企架十大中心的落位图谱', graphToolbarHTML() + '<div id="graphBox">' + renderTenCentersBlueprintSVG() + '</div><div class="graph-tip" style="margin-top:6px;flex:none">💡 提示：上方可按十个中心与处置档位多维联动筛选；点击任意前沿技术标签可直接穿透查看专题档案。</div>', function () {
      initTenCentersPanelEvents(initialCenter);
      if (savedScrollTop && $('panelBody')) $('panelBody').scrollTop = savedScrollTop;
    }, true);
  }

  function initTenCentersPanelEvents(initialCenter) {
    var box = $('graphBox');
    if (!box) return;

    var activeCenter = initialCenter || 'all';
    var activeTier = 'all';
    var searchQuery = '';

    function applyCombinedFilters() {
      var pills = box.querySelectorAll('.tc-tech-pill');
      var centerBoxes = box.querySelectorAll('.tc-center-box');

      // 1. 过滤技术胶囊
      pills.forEach(function (p) {
        var id = p.getAttribute('data-id');
        var tech = findTech(id) || findLib(id);
        var pCenterId = p.getAttribute('data-center-id') || '';
        var pTier = (tech && tech.tier) || p.getAttribute('data-tier') || '';

        var matchCenter = (activeCenter === 'all' || pCenterId === activeCenter);
        var matchTier = (activeTier === 'all' || pTier === activeTier || pTier.indexOf(activeTier.replace('层', '')) >= 0);
        var matchQuery = true;
        if (searchQuery) {
          var name = tech ? tech.name.toLowerCase() : '';
          var short = tech ? (tech.short || '').toLowerCase() : '';
          var idLower = (id || '').toLowerCase();
          matchQuery = idLower.indexOf(searchQuery) >= 0 || name.indexOf(searchQuery) >= 0 || short.indexOf(searchQuery) >= 0;
        }

        var visible = matchCenter && matchTier && matchQuery;
        p.style.opacity = visible ? '1' : '0.12';
        p.style.transition = 'opacity .2s ease, transform .15s ease';
        var bg = p.querySelector('.tc-pill-bg');
        if (bg) {
          bg.style.strokeWidth = visible && (activeTier !== 'all' || searchQuery) ? '2.2px' : '1.2px';
        }
      });

      // 2. 聚焦十大中心外框
      centerBoxes.forEach(function (cb) {
        var cid = cb.getAttribute('data-center');
        var isCenterActive = (activeCenter === 'all' || cid === activeCenter);
        cb.style.opacity = isCenterActive ? '1' : '0.15';
        cb.style.transition = 'opacity .2s ease';
        var rect = cb.querySelector('.tc-box-rect');
        if (rect) {
          if (activeCenter !== 'all' && cid === activeCenter) {
            rect.style.stroke = 'var(--accent)';
            rect.style.strokeWidth = '2.2px';
            rect.style.filter = 'drop-shadow(0 0 12px rgba(79, 140, 255, 0.45))';
          } else {
            rect.style.stroke = '';
            rect.style.strokeWidth = '';
            rect.style.filter = '';
          }
        }
      });

      // 3. 联动蒙版流程连线与标注说明 (筛选具体中心时，所有流程连线、双向箭头及说明文字全部蒙版淡化，使视觉绝对聚焦于所选中心本身)
      var flowGroups = box.querySelectorAll('.tc-flow-group');
      flowGroups.forEach(function (fg) {
        fg.style.opacity = (activeCenter === 'all') ? '1' : '0.08';
        fg.style.transition = 'opacity .2s ease';
      });
    }

    var centerGroup = $('graphCenterFilterGroup');
    if (centerGroup) {
      if (initialCenter) {
        centerGroup.querySelectorAll('button').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-center') === initialCenter);
        });
      }
      centerGroup.querySelectorAll('button').forEach(function (btn) {
        btn.onclick = function () {
          centerGroup.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          activeCenter = btn.getAttribute('data-center') || 'all';
          applyCombinedFilters();
        };
      });
    }

    var tierGroup = $('graphTierFilterGroup');
    if (tierGroup) {
      tierGroup.querySelectorAll('button').forEach(function (btn) {
        btn.onclick = function () {
          tierGroup.querySelectorAll('button').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          activeTier = btn.getAttribute('data-tier') || 'all';
          applyCombinedFilters();
        };
      });
    }

    var sInput = $('graphSearchInput');
    if (sInput) {
      sInput.oninput = function () {
        searchQuery = sInput.value.trim().toLowerCase();
        applyCombinedFilters();
      };
    }

    if (initialCenter && initialCenter !== 'all') {
      applyCombinedFilters();
    }

    bindBlueprintPillTooltips(box);
  }

  /* ==================== 前沿技术研究方法论工具体系详析面板 (Master-Detail Cockpit) ==================== */
  var toolListGlobal = [];

  function renderToolDetailHTML(tool, idx, total) {
    if (!tool) return '<div class="method-tool-card"><div class="method-card-body">请在左侧选择方法论工具</div></div>';

    if (!tool.isTool) {
      var subsHtml = (tool.subsections || []).map(function (sub) {
        var itemsHtml = (sub.items || []).map(function (it) {
          if (it.type === 'p') {
            return '<p>' + esc(it.text) + '</p>';
          } else if (it.type === 'table') {
            var thead = (it.headers && it.headers.length) ? ('<thead><tr>' + it.headers.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead>') : '';
            var tbody = (it.rows || []).map(function (r) {
              return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>';
            }).join('');
            return '<div class="tbl-wrap" style="overflow-x:auto;margin:6px 0"><table class="tbl method-tbl">' + thead + '<tbody>' + tbody + '</tbody></table></div>';
          }
          return '';
        }).join('');

        return '<div style="margin-bottom:12px">' +
          '<h3 class="method-sub-title" style="margin:8px 0 6px">' + esc(sub.title) + '</h3>' +
          itemsHtml +
        '</div>';
      }).join('');

      var prevBtn = '<button class="btn btn-sm" id="btnMethodPrev" data-idx="' + (idx - 1) + '">← 上一个：' + toolListGlobal[idx - 1].numStr + '. ' + esc(toolListGlobal[idx - 1].shortName) + '</button>';

      return '<div class="method-tool-card">' +
        '<div class="method-card-head">' +
          '<div class="method-card-tags">' +
            '<span class="method-card-sec-badge">' + esc(tool.secTitle) + '</span>' +
            '<span class="method-card-idx-badge">方法论整体指引</span>' +
          '</div>' +
          '<h2 class="method-card-title">' + esc(tool.cleanName) + '</h2>' +
        '</div>' +
        '<div class="method-card-body">' + subsHtml + '</div>' +
        '<div class="method-card-footer">' + prevBtn + '<div></div></div>' +
      '</div>';
    }

    var itemsHtml = (tool.items || []).map(function (it) {
      if (it.type === 'p') {
        return '<p>' + esc(it.text) + '</p>';
      } else if (it.type === 'table') {
        var thead = (it.headers && it.headers.length) ? ('<thead><tr>' + it.headers.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead>') : '';
        var tbody = (it.rows || []).map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>';
        }).join('');
        return '<div class="tbl-wrap" style="overflow-x:auto;margin:6px 0"><table class="tbl method-tbl">' + thead + '<tbody>' + tbody + '</tbody></table></div>';
      } else if (it.type === 'image') {
        return '<div class="method-fig-box">' +
          '<img src="' + it.src + '" alt="' + esc(it.caption || '') + '" class="method-fig-img">' +
          '<div class="method-fig-cap">' + esc(it.caption || '') + '</div>' +
        '</div>';
      }
      return '';
    }).join('');

    var prevBtn = idx > 0 ? ('<button class="btn btn-sm" id="btnMethodPrev" data-idx="' + (idx - 1) + '">← 上一个：' + (toolListGlobal[idx - 1].isTool ? (toolListGlobal[idx - 1].numStr + '. ' + esc(toolListGlobal[idx - 1].shortName)) : esc(toolListGlobal[idx - 1].cleanName)) + '</button>') : '<div></div>';
    var nextBtn = idx < total - 1 ? ('<button class="btn btn-sm" id="btnMethodNext" data-idx="' + (idx + 1) + '">下一个：' + (toolListGlobal[idx + 1].isTool ? (toolListGlobal[idx + 1].numStr + '. ' + esc(toolListGlobal[idx + 1].shortName)) : esc(toolListGlobal[idx + 1].cleanName)) + ' →</button>') : '<div></div>';

    var toolCountTotal = toolListGlobal.filter(function (t) { return t.isTool; }).length || 29;

    return '<div class="method-tool-card">' +
      '<div class="method-card-head">' +
        '<div class="method-card-tags">' +
          '<span class="method-card-sec-badge">' + esc(tool.secTitle) + '</span>' +
          '<span class="method-card-idx-badge">方法论工具 ' + tool.numStr + ' / ' + toolCountTotal + '</span>' +
        '</div>' +
        '<h2 class="method-card-title">' + tool.numStr + '. ' + esc(tool.cleanName) + '</h2>' +
      '</div>' +
      '<div class="method-card-body">' + itemsHtml + '</div>' +
      '<div class="method-card-footer">' + prevBtn + nextBtn + '</div>' +
    '</div>';
  }

  function methodologyPanelHTML() {
    var mt = DATA.methodologyToolkit || {};
    var sections = mt.sections || [];
    toolListGlobal = getMethodologyFlatList();

    var treeHtml = sections.map(function (s, sIdx) {
      if (sIdx < 8) {
        var toolsInSec = toolListGlobal.filter(function (t) { return t.secId === s.id; }).map(function (t) {
          return '<div class="method-tool-nav-item ' + (t.globalIdx === 0 ? 'active' : '') + '" data-idx="' + t.globalIdx + '" data-sec-id="' + s.id + '">' +
            '<span class="method-tool-num">' + t.numStr + '.</span>' +
            '<span class="method-tool-name" title="' + esc(t.cleanName) + '">' + esc(t.cleanName) + '</span>' +
          '</div>';
        }).join('');

        return '<div class="method-sec-group" data-sec-id="' + s.id + '">' +
          '<div class="method-group-header">' + esc(s.title) + '</div>' +
          toolsInSec +
        '</div>';
      } else {
        var suppItem = toolListGlobal.find(function (t) { return t.id === 'supp-sec9'; });
        var idx = suppItem ? suppItem.globalIdx : 25;
        return '<div class="method-sec-group" data-sec-id="' + s.id + '">' +
          '<div class="method-group-header">' + esc(s.title) + '</div>' +
          '<div class="method-tool-nav-item" data-idx="' + idx + '" data-sec-id="' + s.id + '">' +
            '<span class="method-tool-num" style="color:var(--accent2)">📖</span>' +
            '<span class="method-tool-name" title="方法论内在张力与整合思路">内在张力与整合思路</span>' +
          '</div>' +
        '</div>';
      }
    }).join('');

    var initialDetail = toolListGlobal.length > 0 ? renderToolDetailHTML(toolListGlobal[0], 0, toolListGlobal.length) : '';

    return '<div class="method-cockpit">' +
      '<div class="method-sidebar">' +
        '<div class="method-search-wrap">' +
          '<input type="text" class="method-search-input" id="methodSearchInput" placeholder="🔍 检索方法论工具 (如 Hype Cycle, SWOT)...">' +
        '</div>' +
        '<div class="method-tree-wrap" id="methodTreeWrap">' + treeHtml + '</div>' +
      '</div>' +
      '<div class="method-detail-pane" id="methodDetailPane">' + initialDetail + '</div>' +
    '</div>';
  }

  function initMethodologyPanel(initialSec, initialToolIdx) {
    var searchInput = $('methodSearchInput');
    var treeWrap = $('methodTreeWrap');
    var detailPane = $('methodDetailPane');
    if (!treeWrap || !detailPane) return;

    function selectTool(idx) {
      idx = Math.max(0, Math.min(toolListGlobal.length - 1, idx));
      detailPane.innerHTML = renderToolDetailHTML(toolListGlobal[idx], idx, toolListGlobal.length);
      detailPane.scrollTop = 0;

      treeWrap.querySelectorAll('.method-tool-nav-item').forEach(function (item) {
        var itemIdx = parseInt(item.getAttribute('data-idx'), 10);
        item.classList.toggle('active', itemIdx === idx);
        if (itemIdx === idx) {
          try { item.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {}
        }
      });

      var btnPrev = $('btnMethodPrev');
      if (btnPrev) {
        btnPrev.onclick = function () {
          var pIdx = parseInt(this.getAttribute('data-idx'), 10);
          selectTool(pIdx);
        };
      }
      var btnNext = $('btnMethodNext');
      if (btnNext) {
        btnNext.onclick = function () {
          var nIdx = parseInt(this.getAttribute('data-idx'), 10);
          selectTool(nIdx);
        };
      }
    }

    treeWrap.querySelectorAll('.method-tool-nav-item').forEach(function (item) {
      item.onclick = function (e) {
        e.preventDefault();
        var idx = parseInt(this.getAttribute('data-idx'), 10);
        selectTool(idx);
      };
    });

    if (searchInput) {
      searchInput.oninput = function () {
        var q = this.value.trim().toLowerCase();
        var groups = treeWrap.querySelectorAll('.method-sec-group');
        groups.forEach(function (grp) {
          var items = grp.querySelectorAll('.method-tool-nav-item');
          var visibleCount = 0;
          items.forEach(function (it) {
            var text = it.textContent.toLowerCase();
            var match = !q || text.indexOf(q) >= 0;
            it.style.display = match ? 'flex' : 'none';
            if (match) visibleCount++;
          });
          grp.style.display = (!q || visibleCount > 0) ? 'flex' : 'none';
        });
      };
    }

    var targetIdx = 0;
    if (initialToolIdx !== undefined && initialToolIdx !== null) {
      targetIdx = parseInt(initialToolIdx, 10);
    } else if (initialSec) {
      for (var i = 0; i < toolListGlobal.length; i++) {
        if (toolListGlobal[i].secId === initialSec) {
          targetIdx = i;
          break;
        }
      }
    }
    selectTool(targetIdx);
  }

  function openMethodologyPanel(initialSec, initialToolIdx, isNavBack) {
    if (!isNavBack) {
      if (!$('panel').classList.contains('hidden') && currentPanelMeta && currentPanelMeta.type !== 'methodology') {
        var snap = capturePanelSnapshot();
        if (snap) panelNavStack.push(snap);
      } else {
        panelNavStack = [];
      }
    }
    currentPanelMeta = { type: 'methodology', name: '方法论工具体系', sec: initialSec, toolIdx: initialToolIdx };
    openPanel('前沿技术研究方法论工具体系', methodologyPanelHTML(), function () {
      initMethodologyPanel(initialSec, initialToolIdx);
    }, true);
  }

  function openSourcesReportPanel(isNavBack) {
    if (!isNavBack) {
      if (!$('panel').classList.contains('hidden') && currentPanelMeta && currentPanelMeta.type !== 'sources_report') {
        var snap = capturePanelSnapshot();
        if (snap) panelNavStack.push(snap);
      } else {
        panelNavStack = [];
      }
    }
    currentPanelMeta = { type: 'sources_report', name: '前沿科技研究信息来源报告' };

    var pdfPath = (DATA.sources && DATA.sources.pdfReport) || 'assets/reports/前沿科技研究信息来源报告.pdf';
    var docxPath = (DATA.sources && DATA.sources.docxReport) || 'assets/reports/前沿科技研究信息来源报告_V4.docx';

    var toolbar = '<div class="preview-toolbar" style="margin-bottom:8px">' +
      '<a href="' + esc(docxPath) + '" download>⬇ 下载 Word 原报告 (V4)</a>' +
      (pdfPath ? ('<a href="' + esc(pdfPath) + '" download>⬇ 下载 PDF</a><a href="' + esc(pdfPath) + '" target="_blank">↗ 新窗口打开</a>') : '') +
      '<button class="btn" data-fs="1" title="全屏预览">⛶ 全屏</button>' +
    '</div>';

    var stage = '<div class="preview-stage" data-stage="1" style="height:calc(100vh - 165px);min-height:600px;border-radius:8px;overflow:hidden;background:#525659">' +
      '<iframe src="' + esc(pdfPath) + '" style="width:100%;height:100%;border:none" title="前沿科技研究信息来源报告 Word 报告预览"></iframe>' +
    '</div>';

    openPanel('前沿科技研究信息来源报告 · Word 报告预览', toolbar + stage, function () {
      var panel = $('panel');
      var fsBtn = panel.querySelector('[data-fs="1"]');
      var stageEl = panel.querySelector('[data-stage="1"]');
      if (fsBtn && stageEl) {
        fsBtn.onclick = function () {
          if (!document.fullscreenElement) {
            (stageEl.requestFullscreen || stageEl.webkitRequestFullscreen || stageEl.msRequestFullscreen).call(stageEl);
          } else {
            (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
          }
        };
      }
    }, true);
  }

  function openWorkplanReportPanel(isNavBack) {
    if (!isNavBack) {
      if (!$('panel').classList.contains('hidden') && currentPanelMeta && currentPanelMeta.type !== 'workplan_report') {
        var snap = capturePanelSnapshot();
        if (snap) panelNavStack.push(snap);
      } else {
        panelNavStack = [];
      }
    }
    currentPanelMeta = { type: 'workplan_report', name: '前沿技术趋势扫描与专题研究工作推进方案' };

    var wp = DATA.workplan || {};
    var pdfPath = wp.pdfPlan || 'assets/plans/FA000_工作推进方案.pdf';
    var docxPath = wp.docxPlan || 'assets/plans/FA000_工作推进方案（定稿）_v1.0.docx';

    var toolbar = '<div class="preview-toolbar" style="margin-bottom:8px">' +
      '<a href="' + esc(docxPath) + '" download>⬇ 下载方案 Word 原件</a>' +
      (pdfPath ? ('<a href="' + esc(pdfPath) + '" download>⬇ 下载 PDF</a><a href="' + esc(pdfPath) + '" target="_blank">↗ 新窗口打开</a>') : '') +
      '<button class="btn" data-fs="1" title="全屏预览">⛶ 全屏</button>' +
    '</div>';

    var stage = '<div class="preview-stage" data-stage="1" style="height:calc(100vh - 165px);min-height:600px;border-radius:8px;overflow:hidden;background:#525659">' +
      '<iframe src="' + esc(pdfPath) + '" style="width:100%;height:100%;border:none" title="工作推进方案 Word 预览"></iframe>' +
    '</div>';

    openPanel('前沿技术趋势扫描与专题研究工作推进方案 · 预览', toolbar + stage, function () {
      var panel = $('panel');
      var fsBtn = panel.querySelector('[data-fs="1"]');
      var stageEl = panel.querySelector('[data-stage="1"]');
      if (fsBtn && stageEl) {
        fsBtn.onclick = function () {
          if (!document.fullscreenElement) {
            (stageEl.requestFullscreen || stageEl.webkitRequestFullscreen || stageEl.msRequestFullscreen).call(stageEl);
          } else {
            (document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
          }
        };
      }
    }, true);
  }

  /* ==================== 技术专题详情面板 ==================== */
  window.__handleTechImgError = function (techId, tabKey, imgEl) {
    var tech = findTech(techId);
    if (tech) {
      if (tabKey === 'image') {
        tech.image = null;
        tech.imageName = null;
        tech.imageSize = null;
      } else if (tabKey === 'hypecycle') {
        tech.hypeCycle = null;
      }
    }
    var tabBtn = document.querySelector('#panelBody .tab[data-name="' + tabKey + '"]');
    var tabPane = document.querySelector('#panelBody .tabpane[data-name="' + tabKey + '"]') || (imgEl ? imgEl.closest('.tabpane') : null);
    var wasActive = (tabBtn && tabBtn.classList.contains('active')) || (tabPane && tabPane.classList.contains('active'));

    if (tabBtn && tabBtn.parentNode) {
      tabBtn.parentNode.removeChild(tabBtn);
    }
    if (tabPane && tabPane.parentNode) {
      tabPane.parentNode.removeChild(tabPane);
    }

    if (wasActive) {
      var assessTab = document.querySelector('#panelBody .tab[data-name="assess"]');
      var assessPane = document.querySelector('#panelBody .tabpane[data-name="assess"]');
      if (assessTab) assessTab.classList.add('active');
      if (assessPane) assessPane.classList.add('active');
      if (currentPanelMeta && currentPanelMeta.type === 'tech') {
        currentPanelMeta.activeTab = 'assess';
      }
    }
  };

  function validateTechAssetsExistence() {
    if (typeof DATA === 'undefined' || !DATA.technologies) return;
    DATA.technologies.forEach(function (tech) {
      if (tech.image && typeof tech.image === 'string' && tech.image.indexOf('blob:') !== 0 && tech.image.indexOf('data:') !== 0) {
        var testImg = new Image();
        testImg.onerror = function () {
          tech.image = null;
          tech.imageName = null;
          tech.imageSize = null;
          if (currentPanelMeta && currentPanelMeta.type === 'tech' && currentPanelMeta.techId === tech.id) {
            window.__handleTechImgError(tech.id, 'image');
          }
        };
        testImg.src = tech.image;
      }
      if (tech.hypeCycle && typeof tech.hypeCycle === 'string' && tech.hypeCycle.indexOf('blob:') !== 0 && tech.hypeCycle.indexOf('data:') !== 0) {
        var testHc = new Image();
        testHc.onerror = function () {
          tech.hypeCycle = null;
          if (currentPanelMeta && currentPanelMeta.type === 'tech' && currentPanelMeta.techId === tech.id) {
            window.__handleTechImgError(tech.id, 'hypecycle');
          }
        };
        testHc.src = tech.hypeCycle;
      }
    });
  }

  function techTabs(tech) {
    var tabs = [];
    tabs.push({ key: 'assess', name: '评估表', html: assessHTML(tech), fill: false });
    if (tech.image) tabs.push({ key: 'image', name: '一张图概述', html: onePageHTML(tech), fill: true });
    if (tech.hypeCycle) tabs.push({ key: 'hypecycle', name: '技术成熟度曲线', html: hypeCycleHTML(tech), fill: true });
    if (tech.reportPdf || tech.reportDocx || tech.reportDocxName) tabs.push({ key: 'word', name: 'Word 报告', html: wordHTML(tech), fill: true });
    if (tech.slidesPdf || tech.slidesPptx || tech.slidesPptxName) tabs.push({ key: 'ppt', name: 'PPT 报告', html: pptHTML(tech), fill: true });
    return tabs;
  }
  function onePageHTML(tech) {
    var imgName = tech.imageName || (tech.image ? tech.image.split('/').pop() : '');
    var dl = '<div class="preview-toolbar">';
    if (tech.image) {
      dl += '<span class="preview-source-badge" title="指定文件夹母版：' + esc(tech.image) + '">' +
        '<span class="psb-icon">📁</span> 正在预览指定文件夹母版：<b>' + esc(imgName) + '</b></span>';
      dl += '<a href="' + esc(tech.image) + '" download="' + esc(imgName) + '">⬇ 下载 一张图 原件</a>';
    }
    dl += '<a href="' + esc(tech.image) + '" target="_blank">↗ 新窗口打开</a>' +
      '<button class="btn" data-fs="1" title="全屏查看">⛶ 全屏</button>' +
      '</div>';
    return dl + '<div class="preview-stage onepage-stage" data-stage="1"><div class="onepage-wrap"><img id="onepageImg" src="' + esc(tech.image) + '" alt="' + esc(tech.name) + ' 一张图概述" title="点击放大查看" onerror="window.__handleTechImgError&&window.__handleTechImgError(\'' + esc(tech.id) + '\',\'image\',this)"></div></div>';
  }
  function hypeCycleHTML(tech) {
    var dl = '<div class="preview-toolbar">' +
      '<a href="' + esc(tech.hypeCycle) + '" download>⬇ 下载技术成熟度曲线原图</a>' +
      '<a href="' + esc(tech.hypeCycle) + '" target="_blank">↗ 新窗口打开</a>' +
      '<button class="btn" data-fs="1" title="全屏查看">⛶ 全屏</button>' +
      '</div>';
    return dl + '<div class="preview-stage onepage-stage" data-stage="1"><div class="onepage-wrap"><img class="hypecycle-img" src="' + esc(tech.hypeCycle) + '" alt="' + esc(tech.name) + ' 技术成熟度曲线" title="点击放大查看" onerror="window.__handleTechImgError&&window.__handleTechImgError(\'' + esc(tech.id) + '\',\'hypecycle\',this)"></div></div>';
  }
  function assessHTML(tech) {
    var dims = tech.assessment.dimensions;
    var basisMap = {
      '技术成熟度': tech.maturityBasis || '',
      '战略匹配度': tech.strategicFitBasis || '',
      '价值贡献度': tech.valueBasis || '',
      '引入可行度': tech.feasibilityBasis || '',
      '战略紧迫度': tech.urgencyBasis || '',
      '生态开放度': tech.opennessBasis || ''
    };
    var rows = dims.map(function (d, idx) {
      var basis = basisMap[d.label] || '';
      return '<tr>' +
        '<td class="td-dim"><b>' + esc(d.label) + '</b></td>' +
        '<td class="td-score"><div class="score-cell"><span class="score-num" style="color:' + dimColor(d) + '">' + d.score + '/5</span>' + scoreBar(d.score, d.max || 5, idx) + '</div></td>' +
        '<td class="td-basis">' + (basis ? esc(basis) : '<span style="color:var(--faint)">暂无详细研判依据</span>') + '</td>' +
        '</tr>';
    }).join('');

    var infoCards = [];
    if (tech.definition) {
      infoCards.push('<div class="assess-info-card"><div class="aic-h"><span class="aic-icon">📌</span>技术定义</div><div class="aic-p">' + esc(tech.definition) + '</div></div>');
    }
    if (tech.trend) {
      infoCards.push('<div class="assess-info-card"><div class="aic-h"><span class="aic-icon">🚀</span>颠覆性趋势</div><div class="aic-p">' + formatBullets(tech.trend) + '</div></div>');
    }
    if (tech.bankValue) {
      infoCards.push('<div class="assess-info-card"><div class="aic-h"><span class="aic-icon">🏦</span>对银行的价值</div><div class="aic-p">' + formatBullets(tech.bankValue) + '</div></div>');
    }
    if (tech.limitation) {
      infoCards.push('<div class="assess-info-card"><div class="aic-h"><span class="aic-icon">⚠️</span>当前局限与合规风险</div><div class="aic-p">' + formatBullets(tech.limitation) + '</div></div>');
    }

    var infoGrid = infoCards.length ? '<div class="assess-info-grid">' + infoCards.join('') + '</div>' : '';

    return '<div class="assess-dashboard">' +
      '<div class="assess-side">' +
        '<div class="chart-card assess-radar-card"><h4>多轮评估雷达</h4>' + radarSVG(tech, false) + '</div>' +
        '<div class="chart-card assess-conclusion-card">' +
          '<div class="acc-head"><h4>研判结论与处置建议</h4><div class="acc-tags">' + tierPill(tech.tier) + '<span class="badge acc">' + esc(tech.disposal || '') + '</span></div></div>' +
          '<div class="acc-body">' + esc(tech.conclusion) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="assess-main">' +
        '<div class="chart-card assess-table-card">' +
          '<h4>六维研判评分与依据对照表</h4>' +
          '<div class="assess-tbl-wrap">' +
            '<table class="assess-tbl">' +
              '<thead><tr><th style="width:125px">评估维度</th><th style="width:145px">评分 (满分5分)</th><th>研判依据与推演考量</th></tr></thead>' +
              '<tbody>' + rows + '</tbody>' +
            '</table>' +
          '</div>' +
        '</div>' +
        infoGrid +
      '</div>' +
    '</div>';
  }
  function resolveFullPath(relPath) {
    if (!relPath) return '';
    if (location.protocol === 'file:') {
      var pathname = decodeURIComponent(location.pathname);
      pathname = pathname.replace(/^\/([a-zA-Z]:)/, '$1');
      var baseDir = pathname.substring(0, pathname.lastIndexOf('/'));
      var full = baseDir + '/' + relPath;
      return full.replace(/\//g, '\\');
    }
    return relPath;
  }

  function launchSourceFile(relPath, title) {
    if (!relPath) return;
    var full = resolveFullPath(relPath);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(full).catch(function () {});
    }
    var a = document.createElement('a');
    a.href = relPath;
    a.download = relPath.split('/').pop();
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    toast('🚀 已启动打开 ' + (title || 'Office') + ' 源文件！本地绝对路径已同步复制到剪贴板');
  }

  function copySourcePath(relPath, label) {
    var full = resolveFullPath(relPath);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(full).then(function () {
        toast('📋 已复制 ' + (label || '本地路径') + ' 到剪贴板！');
      }).catch(function () {
        prompt('请手动复制本地路径：', full);
      });
    } else {
      prompt('请手动复制本地路径：', full);
    }
  }

  function wordHTML(tech) {
    return previewHTML(tech, tech.reportDocx, tech.reportPdf, 'Word 报告', tech.reportDocxName);
  }

  function pptHTML(tech) {
    return previewHTML(tech, tech.slidesPptx, tech.slidesPdf, 'PPT 报告', tech.slidesPptxName);
  }

  function previewHTML(tech, sourceDoc, pdf, label, origFileName) {
    var fileName = origFileName || (sourceDoc ? sourceDoc.split('/').pop() : '');
    var isWord = label.indexOf('Word') >= 0;
    var ext = isWord ? '.docx' : '.pptx';

    var dl = '<div class="preview-toolbar">';
    if (sourceDoc) {
      dl += '<span class="preview-source-badge" title="指定文件夹母版：' + esc(sourceDoc) + '">' +
        '<span class="psb-icon">📁</span> 正在预览指定文件夹母版：<b>' + esc(fileName || (label + ext)) + '</b></span>';
      dl += '<a href="' + esc(sourceDoc) + '" download="' + esc(fileName) + '">⬇ 下载 ' + esc(label) + ' 原件</a>';
    }
    if (pdf) {
      var pdfDlName = (tech.short || tech.name) + (isWord ? '_专题研究报告.pdf' : '_演示汇报.pdf');
      dl += '<a href="' + esc(pdf) + '" download="' + esc(pdfDlName) + '">⬇ 下载 PDF</a>';
      dl += '<a href="' + esc(pdf) + '" target="_blank">↗ 新窗口打开</a>';
    }
    dl += '<button class="btn" data-fs="1" title="全屏预览">⛶ 全屏</button>';
    dl += '</div>';

    if (!pdf) {
      return dl + '<div class="preview-empty">暂无在线预览，请下载指定文件夹中的原件查看。</div>';
    }
    return dl + '<div class="preview-stage" data-stage="1"><iframe data-src="' + esc(pdf) + '" title="' + esc(label) + '预览"></iframe></div>';
  }
  function techHeadHTML(tech) {
    return '<div class="panel-tech-head">' +
      '<span class="pth-id">' + esc(tech.id) + '</span>' +
      '<span class="pth-title">' + esc(tech.name) + '</span>' +
      '<span class="tag" style="border-color:' + catColor(tech.category) + ';color:' + catColor(tech.category) + '">' + esc(tech.category) + '</span>' +
      tierPill(tech.tier) +
      '<span class="badge acc">成熟度 ' + tech.maturity + '/5</span>' +
    '</div>';
  }
  function techDetailHTML(tech) {
    var tabs = techTabs(tech);
    var tabBtns = tabs.map(function (t, i) { return '<button class="tab' + (i === 0 ? ' active' : '') + '" data-name="' + t.key + '">' + esc(t.name) + '</button>'; }).join('');
    var panes = tabs.map(function (t, i) {
      var cls = 'tabpane' + (i === 0 ? ' active' : '') + (t.fill ? ' fill' : '');
      return '<div class="' + cls + '" data-name="' + t.key + '">' + t.html + '</div>';
    }).join('');
    return '<div class="tech-detail"><div class="tabs">' + tabBtns + '</div><div class="tech-detail-body">' + panes + '</div></div>';
  }
  function updateTechNav(tech) {
    var navEl = $('panelTechNav');
    var prevBtn = $('btnTechPrev');
    var nextBtn = $('btnTechNext');
    if (!navEl || !prevBtn || !nextBtn) return;
    if (!tech || !tech.id) {
      navEl.classList.add('hidden');
      return;
    }
    var idx = -1;
    for (var i = 0; i < DATA.technologies.length; i++) {
      if (DATA.technologies[i].id === tech.id) {
        idx = i;
        break;
      }
    }
    if (idx === -1) {
      navEl.classList.add('hidden');
      return;
    }
    navEl.classList.remove('hidden');
    var prevTech = idx > 0 ? DATA.technologies[idx - 1] : null;
    var nextTech = idx < DATA.technologies.length - 1 ? DATA.technologies[idx + 1] : null;

    if (prevTech) {
      prevBtn.disabled = false;
      prevBtn.title = '向前浏览上一项技术：' + prevTech.id + ' ' + (prevTech.short || prevTech.name);
      prevBtn.onclick = function (e) {
        e.stopPropagation();
        var curTab = (currentPanelMeta && currentPanelMeta.type === 'tech') ? currentPanelMeta.activeTab : 'assess';
        openTechPanel(prevTech, curTab, true);
      };
    } else {
      prevBtn.disabled = true;
      prevBtn.title = '已是第一项技术（' + tech.id + '）';
      prevBtn.onclick = null;
    }

    if (nextTech) {
      nextBtn.disabled = false;
      nextBtn.title = '向后浏览下一项技术：' + nextTech.id + ' ' + (nextTech.short || nextTech.name);
      nextBtn.onclick = function (e) {
        e.stopPropagation();
        var curTab = (currentPanelMeta && currentPanelMeta.type === 'tech') ? currentPanelMeta.activeTab : 'assess';
        openTechPanel(nextTech, curTab, true);
      };
    } else {
      nextBtn.disabled = true;
      nextBtn.title = '已是最后一项技术（' + tech.id + '）';
      nextBtn.onclick = null;
    }
  }
  function openTechPanel(tech, tab, isNavBack) {
    if (!tech) return;
    if (!isNavBack) {
      if (!$('panel').classList.contains('hidden') && currentPanelMeta) {
        var snap = capturePanelSnapshot();
        if (snap) panelNavStack.push(snap);
      } else {
        panelNavStack = [];
      }
    }
    currentPanelMeta = { type: 'tech', name: tech.short || tech.name, techId: tech.id, activeTab: tab || 'assess' };
    openPanel(techHeadHTML(tech), techDetailHTML(tech), function () {
      updateTechNav(tech);
      var tabs = document.querySelectorAll('#panelBody .tab');
      var panes = document.querySelectorAll('#panelBody .tabpane');
      var body = document.querySelector('#panelBody .tech-detail-body');
      var panelBody = $('panelBody');
      // 切换标签后，把内容区直接定位到该内容顶部（多重保险，避免停留在上一内容的滚动深处）
      function scrollContentTop() {
        if (panelBody) panelBody.scrollTop = 0;
        if (body) body.scrollTop = 0;
        var ap = document.querySelector('#panelBody .tabpane.active');
        if (ap && ap.scrollIntoView) { try { ap.scrollIntoView(true); } catch (e) { ap.scrollIntoView(); } }
      }
      function loadPane(p) {
        p.querySelectorAll('iframe[data-src]').forEach(function (f) {
          if (!f.getAttribute('src')) {
            f.setAttribute('src', f.getAttribute('data-src'));
            // PDF 加载完成后内容高度变化，再滚一次确保停在顶部
            f.onload = function () { scrollContentTop(); };
          }
        });
      }
      function activateByName(name) {
        tabs.forEach(function (t) { t.classList.toggle('active', t.getAttribute('data-name') === name); });
        panes.forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-name') === name); });
        panes.forEach(function (p) { if (p.classList.contains('active')) loadPane(p); });
        if (currentPanelMeta && currentPanelMeta.type === 'tech') currentPanelMeta.activeTab = name;
        scrollContentTop();
        // 布局稳定后再滚一次（iframe/图片加载会改变内容高度）
        requestAnimationFrame(scrollContentTop);
      }
      tabs.forEach(function (t) {
        t.onclick = function () { activateByName(t.getAttribute('data-name')); };
      });
      if (tab != null) activateByName(String(tab));
      panes.forEach(function (p) { if (p.classList.contains('active')) loadPane(p); });
      scrollContentTop();
      requestAnimationFrame(scrollContentTop);
      var img = $('onepageImg');
      if (img) {
        img.onerror = function () { window.__handleTechImgError(tech.id, 'image', img); };
        img.onclick = function () { openLightbox(img.src, tech.name + ' · 一张图概述'); };
      }
      document.querySelectorAll('#panelBody .hypecycle-img').forEach(function (hcImg) {
        hcImg.onerror = function () { window.__handleTechImgError(tech.id, 'hypecycle', hcImg); };
        hcImg.onclick = function () { openLightbox(hcImg.src, tech.name + ' · Gartner技术成熟度曲线'); };
      });
      document.querySelectorAll('#panelBody [data-fs]').forEach(function (b) {
        b.onclick = function () {
          var pane = b.closest('.tabpane');
          toggleFullscreen(pane ? pane.querySelector('.preview-stage') : null);
        };
      });
      document.querySelectorAll('#panelBody [data-launch]').forEach(function (b) {
        b.onclick = function () {
          var rel = b.getAttribute('data-launch');
          var title = b.getAttribute('data-title') || '';
          launchSourceFile(rel, title);
        };
      });
      document.querySelectorAll('#panelBody [data-copy-path]').forEach(function (b) {
        b.onclick = function () {
          var rel = b.getAttribute('data-copy-path');
          copySourcePath(rel, '文件本地绝对路径');
        };
      });
      document.querySelectorAll('#panelBody [data-copy-folder]').forEach(function (b) {
        b.onclick = function () {
          var rel = b.getAttribute('data-copy-folder');
          copySourcePath(rel, '技术专属文件夹路径');
        };
      });
    }, true);
  }
  window.openTechPanel = openTechPanel;
  window.closePanel = closePanel;
  window.closeModal = closeModal;
  window.findTech = findTech;
  window.validateTechAssetsExistence = validateTechAssetsExistence;
  window.jumpToPage = jumpToPage;
  window.flipForward = flipForward;
  window.flipBackward = flipBackward;
  window.renderSpread = renderSpread;
  window.fitSpread = fitSpread;

  /* ==================== 全局搜索 ==================== */
  function initSearch() {
    var input = $('searchInput'), box = $('searchResults');
    var lib = DATA.library.items;
    function hide() { box.classList.add('hidden'); box.innerHTML = ''; }
    function doSearch(q) {
      q = (q || '').trim();
      if (!q) { hide(); return; }
      var ql = q.toLowerCase();
      var hits = [];
      if ('工作方案 1.1 漏斗筛选 fa000 推进方案 工作机制'.toLowerCase().indexOf(ql) >= 0) {
        hits.push({ id: '_workplan', name: '1.1 工作方案', cat: '第一章 · 工作方案与方法', tier: '工作方案', sum: '敏捷工作机制 · 五级漏斗筛选闭环 · 全流程常态研判' });
      }
      if ('信息来源 信息来源评估 情报源 1.2 sources caict gartner'.toLowerCase().indexOf(ql) >= 0) {
        hits.push({ id: '_sources', name: '1.2 信息来源评估', cat: '第一章 · 工作方案与方法', tier: '信息来源', sum: '系统盘点 5 大类别 21 个权威渠道与量化评估' });
      }
      if ('方法论 方法论工具评估 研究方法论工具运用 1.3 methodology'.toLowerCase().indexOf(ql) >= 0) {
        hits.push({ id: '_methodology_appl', name: '1.3 方法论工具评估', cat: '第一章 · 工作方案与方法', tier: '方法论', sum: '覆盖技术研判全流程 8 大环节 · 25 项方法论工具矩阵支撑' });
      }
      if ('前沿技术储备库 长名单 2.1'.toLowerCase().indexOf(ql) >= 0) {
        hits.push({ id: '_library', name: '2.1 前沿技术储备库（长名单）', cat: '第二章 · 整体成果', tier: '储备库', sum: '36项长名单前沿技术全景台账' });
      }
      if ('技术成熟度曲线 gartner hype cycle 2.2 成熟度曲线'.toLowerCase().indexOf(ql) >= 0) {
        hits.push({ id: '_hypeCycle', name: '2.2 技术成熟度曲线（Gartner Hype Cycle）', cat: '第二章 · 整体成果', tier: '成熟度曲线', sum: '36项前沿技术生命周期演进5阶段与达平稳期全景研判' });
      }
      if ('技术影响力雷达图 影响力雷达 impact radar 2.3'.toLowerCase().indexOf(ql) >= 0) {
        hits.push({ id: '_radar', name: '2.3 技术影响力雷达图（Impact Radar）', cat: '第二章 · 整体成果', tier: '全景雷达', sum: '5大企业级架构维度 · 4大影响时间圈层 · 36项长名单全景' });
      }
      if ('前沿技术在企架十大中心的落位图谱 企架十大中心 落位图谱 关系图谱 2.4 graph'.toLowerCase().indexOf(ql) >= 0) {
        hits.push({ id: '_graph', name: '2.4 前沿技术在企架十大中心的落位图谱', cat: '第二章 · 整体成果', tier: '落位图谱', sum: '36项前沿技术在企架十大中心的精准落位与业务流转' });
      }
      lib.forEach(function (it) {
        var hay = (it.name + ' ' + it.nameEn + ' ' + it.summary + ' ' + it.definition + ' ' + it.bankValue + ' ' + it.category + ' ' + it.tier).toLowerCase();
        if (hay.indexOf(ql) >= 0) hits.push({ id: it.id, name: it.name, cat: it.category, tier: it.tier, sum: it.summary });
      });
      hits = hits.slice(0, 8);
      if (!hits.length) { box.innerHTML = '<div class="search-item"><span class="si-sum">未找到匹配结果</span></div>'; box.classList.remove('hidden'); return; }
      box.innerHTML = hits.map(function (h, i) {
        return '<div class="search-item" data-i="' + i + '"><div style="flex:1"><div class="si-name">' + esc(h.name) + ' <span class="si-cat">' + esc(h.cat) + ' · ' + esc(h.tier) + '</span></div><div class="si-sum">' + esc(h.sum) + '</div></div></div>';
      }).join('');
      box.classList.remove('hidden');
      box.querySelectorAll('.search-item').forEach(function (el) {
        el.onclick = function () {
          var h = hits[parseInt(el.getAttribute('data-i'), 10)];
          hide(); input.value = '';
          if (h.id === '_workplan') { if (pageKeyMap['workplan'] != null) jumpToPage(pageKeyMap['workplan']); }
          else if (h.id === '_sources') { if (pageKeyMap['sources'] != null) jumpToPage(pageKeyMap['sources']); }
          else if (h.id === '_methodology_appl') { if (pageKeyMap['methodology_appl'] != null) jumpToPage(pageKeyMap['methodology_appl']); }
          else if (h.id === '_library') openLibraryPanel();
          else if (h.id === '_hypeCycle') openHypeCyclePanel();
          else if (h.id === '_radar') openRadarPanel();
          else if (h.id === '_graph') openGraphPanel();
          else openTechPanel(findTech(h.id));
        };
      });
    }
    input.addEventListener('input', function () { doSearch(this.value); });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { var first = box.querySelector('.search-item'); if (first) first.click(); }
      if (e.key === 'Escape') { hide(); input.value = ''; }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.search-wrap')) hide(); });
  }

  /* ==================== 主题 / 模式 / 特效切换 ==================== */
  var mode = 'book';
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('dsh-theme', theme); } catch (e) {}
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute('data-theme');
    setTheme(cur === 'dark' ? 'light' : 'dark');
  }
  // 缓存书本尺寸，避免鼠标滑动时调用 getBoundingClientRect() 触发强制同步重排 (Zero Forced Reflow)
  var cachedBookRect = null;
  function updateBookRect() {
    var bookEl = $('book');
    if (bookEl) cachedBookRect = bookEl.getBoundingClientRect();
  }

  // 动态根据浏览器可视区域比例自适应：支持单页(手机/折叠屏竖屏)与双页(横屏/折叠屏展开态/电脑)自适应
  function syncAdaptiveLayout() {
    var single = isSingle();
    document.body.classList.toggle('is-single-page', single);
    document.body.classList.toggle('is-double-page', !single);

    var w = window.innerWidth;
    var h = window.innerHeight;
    var topbarH = (w <= 560) ? 46 : 54;
    var vertReserve = (w <= 560) ? 16 : 40;
    var availH = Math.max(160, h - topbarH - vertReserve);

    if (single) {
      // 单页模式：黄金比例 0.618:1 (长宽比 1:1.618，即宽/高 = 0.618)
      var aspect = 0.618;
      var horizMargin = (w <= 480) ? 12 : 24;
      var availW = Math.max(160, w - horizMargin);
      var bookH = Math.min(availH, availW / aspect);
      var bookW = bookH * aspect;
      document.documentElement.style.setProperty('--book-w', Math.round(bookW) + 'px');
      document.documentElement.style.setProperty('--book-h', Math.round(bookH) + 'px');
    } else {
      // 双页对开模式：经典黄金展开对开长宽比 1.236:1 (单页 0.618:1，不含左右两侧书签区域)
      var aspect = 1.236;
      var hasBookmarks = w > 980;
      // 书签宽 170px，外侧至可视边缘仅留 12px 最小安全间距，两侧合计预留 (170 + 12) * 2 = 364px
      var sideReserve = hasBookmarks ? 364 : ((w <= 768) ? 16 : 40);
      var availW = Math.max(200, w - sideReserve);
      var bookH = Math.min(availH, availW / aspect);
      var bookW = bookH * aspect;
      document.documentElement.style.setProperty('--book-w', Math.round(bookW) + 'px');
      document.documentElement.style.setProperty('--book-h', Math.round(bookH) + 'px');
    }
  }

  function setMode(m) {
    mode = m;
    $('bookView').classList.toggle('hidden', m !== 'book');
    $('webView').classList.toggle('hidden', m !== 'web');
    $('btnBook').classList.toggle('active', m === 'book');
    $('btnWeb').classList.toggle('active', m === 'web');
    if (m === 'book') {
      syncAdaptiveLayout();
      updateBookRect();
      renderSpread();
    }
    else if (m === 'web') renderWeb();
  }

  /* ==================== ✨ 动效增强系统 (UI / Micro-FX) ==================== */
  var fxEnabled = true;
  try { fxEnabled = localStorage.getItem('techbook_fx') !== '0'; } catch (e) {}

  function setFxMode(enabled, quiet) {
    fxEnabled = !!enabled;
    try { localStorage.setItem('techbook_fx', fxEnabled ? '1' : '0'); } catch (e) {}
    document.body.classList.toggle('fx-enabled', fxEnabled);
    document.body.classList.toggle('fx-disabled', !fxEnabled);
    var btn = $('btnFxToggle');
    if (btn) {
      btn.innerHTML = '<span class="btn-icon">✨</span><span class="btn-txt">' + (fxEnabled ? '动效: 开' : '动效: 关') + '</span>';
      btn.classList.toggle('active', fxEnabled);
    }
    if (!quiet) {
      toast(fxEnabled ? '已开启【动效增强】模式 (翻页流光/悬停掀角/图表生长)' : '已切换为【经典极简】模式 (0开销纯净静态)');
    }
  }

  /* ==================== 大屏自动巡航与整本书全屏播放模式 ==================== */
  var autoPlaying = false, autoPlayTimer = null, autoProgressTimer = null, autoInterval = 6000;
  var isFullscreenPlaying = false;

  function isFsActive() {
    return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
  }

  function enterBrowserFullscreen() {
    var de = document.documentElement;
    var req = de.requestFullscreen || de.webkitRequestFullscreen || de.mozRequestFullScreen || de.msRequestFullscreen;
    if (req && !isFsActive()) {
      try { req.call(de).catch(function () {}); } catch (err) {}
    }
  }

  function exitBrowserFullscreen() {
    var exitFs = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
    if (isFsActive() && exitFs) {
      try { exitFs.call(document).catch(function () {}); } catch (err) {}
    }
  }

  function updateFullscreenPlayBtn(active) {
    var btn = $('btnFullscreenPlay');
    if (!btn) return;
    if (active) {
      btn.innerHTML = '<span class="btn-icon">⛶</span><span class="btn-txt">退出全屏</span>';
      btn.classList.add('active');
    } else {
      btn.innerHTML = '<span class="btn-icon">⛶</span><span class="btn-txt">全屏播放</span>';
      btn.classList.remove('active');
    }
  }

  function startFullscreenPlay() {
    isFullscreenPlaying = true;
    if (mode !== 'book') setMode('book');
    enterBrowserFullscreen();
    updateFullscreenPlayBtn(true);
    setTimeout(function () {
      fitSpread();
    }, 150);
    toast('已进入整本书全屏模式 (按 ESC 或点击退出)');
  }

  function stopFullscreenPlay() {
    isFullscreenPlaying = false;
    exitBrowserFullscreen();
    updateFullscreenPlayBtn(false);
    setTimeout(function () {
      fitSpread();
    }, 150);
  }

  function toggleFullscreenPlay() {
    if (isFsActive() || isFullscreenPlaying) {
      stopFullscreenPlay();
    } else {
      startFullscreenPlay();
    }
  }

  function startAutoPlay() {
    autoPlaying = true;
    if (mode !== 'book') setMode('book');
    var b = $('btnAutoPlay');
    if (b) {
      b.innerHTML = '<span class="btn-icon">⏹</span><span class="btn-txt">停止放映</span>';
      b.classList.add('active');
    }
    $('presenterBar').classList.remove('hidden');
    runPresenterTick();
  }

  function stopAutoPlay() {
    autoPlaying = false;
    if (autoPlayTimer) clearTimeout(autoPlayTimer);
    if (autoProgressTimer) clearInterval(autoProgressTimer);
    var b = $('btnAutoPlay');
    if (b) {
      b.innerHTML = '<span class="btn-icon">▶</span><span class="btn-txt">自动放映</span>';
      b.classList.remove('active');
    }
    $('presenterBar').classList.add('hidden');
    $('pbFill').style.width = '0%';
  }

  function toggleAutoPlay() {
    if (autoPlaying) stopAutoPlay(); else startAutoPlay();
  }
  function runPresenterTick() {
    if (!autoPlaying) return;
    var infoText = isSingle() ? ((singleIdx + 1) + ' / ' + pages.length + ' 页') : ((spread + 1) + ' / ' + (maxSpread + 1) + ' 跨页');
    $('pbInfo').textContent = infoText;
    var startTime = Date.now();
    $('pbFill').style.width = '0%';
    if (autoProgressTimer) clearInterval(autoProgressTimer);
    autoProgressTimer = setInterval(function () {
      if (!autoPlaying) { clearInterval(autoProgressTimer); return; }
      var elapsed = Date.now() - startTime;
      var p = Math.min(100, (elapsed / autoInterval) * 100);
      $('pbFill').style.width = p + '%';
      if (elapsed >= autoInterval) clearInterval(autoProgressTimer);
    }, 80);

    if (autoPlayTimer) clearTimeout(autoPlayTimer);
    autoPlayTimer = setTimeout(function () {
      if (!autoPlaying) return;
      if (isSingle()) {
        if (singleIdx >= pages.length - 1) jumpToPage(0); else flipForward();
      } else {
        if (spread >= maxSpread) jumpToPage(0); else flipForward();
      }
      runPresenterTick();
    }, autoInterval);
  }

  /* ==================== 移动端手指滑动/拖拽翻页手势 (Mobile Touch Swipe Gestures) ==================== */
  function initBookTouchGestures() {
    var bookEl = $('book');
    var wrapEl = $('readerWrap') || document.body;
    if (!bookEl) return;

    var touchStartX = 0, touchStartY = 0, touchStartTime = 0;
    var isTracking = false, isHorizontalSwipe = false;

    wrapEl.addEventListener('touchstart', function (e) {
      if (mode !== 'book' || activeOverlayCount > 0 || flipping) return;
      if (e.touches.length !== 1) return;
      // 避免误触按钮、链接、侧边栏或搜索框
      if (e.target.closest('button, li, a, iframe, .book-side-col, .edge-tab, .book-nav, .book-page-no, .btn, .corner-peek, .book-edge-stack, select, input, .search-wrap, .brand')) return;

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      isTracking = true;
      isHorizontalSwipe = false;
    }, { passive: true });

    wrapEl.addEventListener('touchmove', function (e) {
      if (!isTracking || e.touches.length !== 1) return;
      var currentX = e.touches[0].clientX;
      var currentY = e.touches[0].clientY;
      var deltaX = currentX - touchStartX;
      var deltaY = currentY - touchStartY;

      if (!isHorizontalSwipe) {
        if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
          if (Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
            isHorizontalSwipe = true;
          } else {
            isTracking = false;
          }
        }
      }

      if (isHorizontalSwipe) {
        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });

    wrapEl.addEventListener('touchend', function (e) {
      if (!isTracking) return;
      isTracking = false;
      var touchEndTime = Date.now();
      var duration = touchEndTime - touchStartTime;
      var touchEndX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : touchStartX;
      var touchEndY = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientY : touchStartY;
      var deltaX = touchEndX - touchStartX;
      var deltaY = touchEndY - touchStartY;

      if (isHorizontalSwipe || Math.abs(deltaX) > Math.abs(deltaY)) {
        var minDistance = 28;
        var isQuickFlick = (duration < 350 && Math.abs(deltaX) > 18);

        if (Math.abs(deltaX) >= minDistance || isQuickFlick) {
          if (deltaX < 0) {
            // 向左滑拖动 -> 下一页
            flipForward();
          } else {
            // 向右滑拖动 -> 上一页
            flipBackward();
          }
          return;
        }
      }

      // 如果是手机端轻触点击 (Tap)
      if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15 && duration < 350) {
        if (e.target.closest('button, li, a, iframe, .book-side-col, .edge-tab, .book-nav, .book-page-no, .btn, .corner-peek, .book-edge-stack, select, input, .search-wrap, .brand')) return;
        var rect = bookEl.getBoundingClientRect();
        var clickX = touchEndX - rect.left;
        var clickRatio = clickX / rect.width;
        if (clickRatio < 0.28) {
          flipBackward();
        } else if (clickRatio > 0.72) {
          flipForward();
        }
      }
    }, { passive: true });

    wrapEl.addEventListener('touchcancel', function () {
      isTracking = false;
      isHorizontalSwipe = false;
    });
  }

  function goToCover(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    flipping = false;
    var sheet = $('turnSheet');
    if (sheet) {
      sheet.style.display = 'none';
      sheet.classList.remove('turning', 'turning-back');
    }
    if (typeof stopAutoPlay === 'function') stopAutoPlay();
    if (typeof stopFullscreenPlay === 'function') stopFullscreenPlay();
    if (typeof closeLightbox === 'function') closeLightbox();
    if (typeof closeModal === 'function') closeModal();
    if (typeof closePanel === 'function') closePanel(true);
    var sr = $('searchResults');
    if (sr) sr.classList.add('hidden');
    var sInput = $('searchInput');
    if (sInput) { sInput.value = ''; sInput.blur(); }
    setMode('book');
    var coverIdx = (pageKeyMap && pageKeyMap['cover'] != null) ? pageKeyMap['cover'] : 1;
    jumpToPage(coverIdx);
    if (window.location.hash) {
      try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (err) {}
    }
  }
  window.goToCover = goToCover;

  /* ==================== 初始化 ==================== */
  function init() {
    try { var t = localStorage.getItem('dsh-theme'); if (t) document.documentElement.setAttribute('data-theme', t); } catch (e) {}
    initTerms();
    initTermListeners();
    bindOverlayClose();
    initSearch();
    initBookTouchGestures();
    validateTechAssetsExistence();
    var bBtn = $('brandBtn');
    if (bBtn) {
      bBtn.onclick = goToCover;
      bBtn.addEventListener('click', goToCover);
    }
    $('btnBook').onclick = function () { setMode('book'); };
    $('btnWeb').onclick = function () { setMode('web'); };
    $('btnTheme').onclick = toggleTheme;
    $('btnFxToggle').onclick = function () { setFxMode(!fxEnabled); };
    var btnFsPlay = $('btnFullscreenPlay');
    if (btnFsPlay) btnFsPlay.onclick = toggleFullscreenPlay;
    $('btnAutoPlay').onclick = toggleAutoPlay;
    $('pbExit').onclick = stopAutoPlay;
    var nNext = $('navNext'), nPrev = $('navPrev');
    if (nNext) nNext.onclick = flipForward;
    if (nPrev) nPrev.onclick = flipBackward;
    var peekR = $('cornerPeekR'), peekL = $('cornerPeekL');
    if (peekR) peekR.onclick = function (e) { e.stopPropagation(); flipForward(); };
    if (peekL) peekL.onclick = function (e) { e.stopPropagation(); flipBackward(); };

    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (ev) {
      document.addEventListener(ev, function () {
        var fs = isFsActive();
        isFullscreenPlaying = fs;
        updateFullscreenPlayBtn(fs);
        setTimeout(function () {
          syncAdaptiveLayout();
          updateBookRect();
          fitSpread();
        }, 150);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
      var panelEl = $('panel');
      if (panelEl && !panelEl.classList.contains('hidden') && currentPanelMeta && currentPanelMeta.type === 'tech') {
        var prevBtn = $('btnTechPrev');
        var nextBtn = $('btnTechNext');
        if (e.key === 'ArrowLeft' && prevBtn && !prevBtn.disabled) {
          prevBtn.click();
          return;
        }
        if (e.key === 'ArrowRight' && nextBtn && !nextBtn.disabled) {
          nextBtn.click();
          return;
        }
        if (e.key === 'Escape') {
          closePanel();
          return;
        }
      }
      if (e.key === 'ArrowRight') flipForward();
      else if (e.key === 'ArrowLeft') flipBackward();
      else if (e.key === 'Home') goToCover();
      else if (e.key === 'Escape') {
        if (isFullscreenPlaying) stopFullscreenPlay();
        else if (autoPlaying) stopAutoPlay();
      }
    });

    syncAdaptiveLayout();
    updateBookRect();

    var sideLeft = $('bookSideLeft'), sideRight = $('bookSideRight');
    if (sideLeft) sideLeft.addEventListener('click', function (e) { e.stopPropagation(); });
    if (sideRight) sideRight.addEventListener('click', function (e) { e.stopPropagation(); });

    // 鼠标超出书页范围后显示对应侧书签，在书页内阅读时不显示 (零 CPU 重绘开销，状态防抖)
    var prevRevealedL = false, prevRevealedR = false;
    window.addEventListener('mousemove', function (e) {
      if (mode !== 'book' || !sideLeft || !sideRight || activeOverlayCount > 0) return;
      if (!cachedBookRect) updateBookRect();
      if (!cachedBookRect) return;
      var rect = cachedBookRect;
      var cx = e.clientX, cy = e.clientY;
      var inVertical = (cy >= rect.top - 60 && cy <= rect.bottom + 60);
      var isOutsideLeft = inVertical && (cx <= rect.left);
      var isOutsideRight = inVertical && (cx >= rect.right);

      if (prevRevealedL !== isOutsideLeft) {
        prevRevealedL = isOutsideLeft;
        sideLeft.classList.toggle('is-revealed', isOutsideLeft);
      }
      if (prevRevealedR !== isOutsideRight) {
        prevRevealedR = isOutsideRight;
        sideRight.classList.toggle('is-revealed', isOutsideRight);
      }
    }, { passive: true });

    window.addEventListener('mouseleave', function () {
      if (sideLeft) sideLeft.classList.remove('is-revealed');
      if (sideRight) sideRight.classList.remove('is-revealed');
      prevRevealedL = false;
      prevRevealedR = false;
    });

    var book = $('book');
    book.addEventListener('click', function (e) {
      if (flipping || activeOverlayCount > 0 || (Date.now() - lastOverlayCloseTimestamp < 450)) return;
      if (e.target.closest('button, li, a, iframe, .book-side-col, .edge-tab, .book-nav, .book-page-no, .btn, .corner-peek, .book-edge-stack, .term-ref, .term-tooltip, .term-modal-popover, .term-scroll-wrap, .term-card, .term-alpha-tab, .term-search-input')) return;
      if (!cachedBookRect) updateBookRect();
      var rect = cachedBookRect || book.getBoundingClientRect();
      var x = e.clientX - rect.left;
      if (x < rect.width * 0.28) flipBackward();
      else if (x > rect.width * 0.72) flipForward();
    });
    window.addEventListener('resize', function () {
      syncAdaptiveLayout();
      updateBookRect();
      if (mode === 'book') renderSpread();
    });
    window.addEventListener('orientationchange', function () {
      setTimeout(function () {
        syncAdaptiveLayout();
        updateBookRect();
        if (mode === 'book') renderSpread();
      }, 150);
    });
    setFxMode(fxEnabled, true);
    renderSpread();

    var verBadge = $('appVersionBadge');
    if (verBadge) {
      var v = (window.DATA && window.DATA.book && window.DATA.book.version) ? window.DATA.book.version : '';
      if (v) {
        verBadge.textContent = 'v' + v;
        verBadge.title = '发布版本号（UTC+8）：' + v;
      }
    }

    // URL 深链
    if (location.hash) {
      var h = location.hash.substring(1);
      setTimeout(function () {
        if (h === 'library') openLibraryPanel();
        else if (h === 'hype-cycle' || h === 'hypeCycle') openHypeCyclePanel();
        else if (h === 'radar') openRadarPanel();
        else if (h === 'graph') openGraphPanel();
        else if (h === 'methodology' || h === 'method') openMethodologyPanel();
        else if (h === 'sources') { if (pageKeyMap['sources'] != null) jumpToPage(pageKeyMap['sources']); }
        else if (h === 'workplan') { if (pageKeyMap['workplan'] != null) jumpToPage(pageKeyMap['workplan']); }
        else if (h === 'workplan-report' || h === 'workplanReport') openWorkplanReportPanel();
        else if (h === 'sources-report' || h === 'sourcesReport') openSourcesReportPanel();
        else if (h === 'appendix' || h === 'terms') { if (pageKeyMap['appendix'] != null) jumpToPage(pageKeyMap['appendix']); }
        else if (h.indexOf('term-') === 0) { jumpToTerm(h.substring(5)); }
        else if (h.indexOf('p-') === 0) jumpToPage(parseInt(h.substring(2), 10));
        else if (h === 'web') setMode('web');
        else if (h.indexOf('tech-') === 0) {
          var parts = h.substring(5).split('-');
          var techId = parts[0];
          var tabName = parts[1] || null;
          openTechPanel(findTech(techId), tabName);
        }
      }, 0);
    }
  }

  window.jumpToTerm = jumpToTerm;
  window.linkTermsInContainer = linkTermsInContainer;
  window.__techbook = {
    jumpToTerm: jumpToTerm,
    linkTermsInContainer: linkTermsInContainer,
    getPages: function () { return pages; },
    getPageLabels: function () { return pageLabels; },
    getPageKeyMap: function () { return pageKeyMap; },
    getSpread: function () { return spread; },
    getMaxSpread: function () { return maxSpread; },
    renderSpread: renderSpread,
    jumpToPage: jumpToPage,
    goToCover: goToCover,
    openHypeCyclePanel: openHypeCyclePanel,
    openPanel: openPanel,
    closePanel: closePanel
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();