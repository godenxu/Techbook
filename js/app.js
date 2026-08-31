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
    if (name === '布局层') return '#fb7185';
    if (name === '论证层') return '#38bdf8';
    if (name === '研究层') return '#fbbf24';
    if (name === '观察层') return '#34d399';
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
  function updateOverlayState(delta) {
    activeOverlayCount = Math.max(0, activeOverlayCount + delta);
    if (activeOverlayCount > 0) {
      document.body.classList.add('has-overlay-open');
    } else {
      document.body.classList.remove('has-overlay-open');
    }
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
    if (panelNavStack.length === 0) {
      closePanel(true);
      return;
    }
    var snapshot = panelNavStack.pop();
    if (snapshot.meta.type === 'library') {
      openLibraryPanel(null, snapshot.libState, snapshot.scrollTop, true);
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
    $('panelBody').classList.toggle('flex', !!flexBody);
    el.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    updateOverlayState(1);
    updateBackBtn();
    if (onMount) setTimeout(onMount, 0);
  }

  function closePanel(force) {
    var el = $('panel');
    if (!el || el.classList.contains('hidden')) return;
    if (!force && panelNavStack.length > 0) {
      popPanelNav();
      return;
    }
    el.classList.add('is-closing');
    setTimeout(function () {
      el.classList.add('hidden');
      el.classList.remove('is-closing');
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
    el.classList.remove('hidden');
    updateOverlayState(1);
  }
  function closeModal() {
    var el = $('modal');
    if (!el || el.classList.contains('hidden')) return;
    el.classList.add('is-closing');
    setTimeout(function () {
      el.classList.add('hidden');
      el.classList.remove('is-closing');
      $('modalBody').innerHTML = '';
      updateOverlayState(-1);
    }, 220);
  }
  function openLightbox(src, title) {
    var el = $('lightbox');
    el.classList.remove('is-closing');
    $('lightboxImg').src = src; $('lightboxTitle').textContent = title || '';
    el.classList.remove('hidden'); el.style.display = 'flex';
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
      updateOverlayState(-1);
    }, 220);
  }
  function bindOverlayClose() {
    $('panelClose').onclick = function () { closePanel(); };
    if ($('panelBack')) $('panelBack').onclick = function () { popPanelNav(); };
    $('modalClose').onclick = closeModal;
    $('lightboxClose').onclick = closeLightbox;
    $('panel').onclick = function (e) { if (e.target === this) closePanel(); };
    $('modal').onclick = function (e) { if (e.target === this) closeModal(); };
    $('lightbox').onclick = function (e) { if (e.target === this) closeLightbox(); };
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (!$('lightbox').classList.contains('hidden')) { closeLightbox(); return; }
        if (!$('modal').classList.contains('hidden')) { closeModal(); return; }
        if (!$('panel').classList.contains('hidden')) { closePanel(); }
      }
    });
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
    var W = compact ? 320 : 380, H = compact ? 230 : 280;
    var cx = W / 2, cy = H / 2, R = compact ? 78 : 100;
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
    rounds.forEach(function (rd, ri) {
      var pts2 = [];
      for (k = 0; k < n; k++) { var maxv = dims[k].max || 5; var pp = pt(k, rd.scores[k] / maxv * R); pts2.push(pp[0].toFixed(1) + ',' + pp[1].toFixed(1)); }
      var col = ri === 0 ? '#4f8cff' : '#f59e0b';
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
      s += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] + (compact ? 3.5 : 5)).toFixed(1) + '" font-size="' + (compact ? '11' : '14') + '" text-anchor="' + anchor + '" style="fill:var(--text)" font-weight="700">' + esc(dims[k].label) + (compact ? (' <tspan style="fill:' + dimColor(dims[k]) + '" font-weight="800">' + scoreVal + '</tspan>') : '') + '</text>';
    }
    s += '</svg>';
    var legend = (!compact && rounds.length > 1) ? '<div style="text-align:center;font-size:14px;color:var(--dim);margin-top:6px">' +
      rounds.map(function (rd, ri) {
        return '<span style="margin:0 10px"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:' + (ri === 0 ? '#4f8cff' : '#f59e0b') + ';margin-right:5px"></span>' + esc(rd.name) + '</span>';
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
      '<div class="cov-sub">' + esc(b.subtitle) + '</div>' +
      '<div class="cov-rule"></div>' +
      '<div class="cov-meta">' + esc(b.org) + '<br>' + esc(b.date) + '</div>' +
      '</div>';
  }
  function titlePageHTML() {
    var b = DATA.book;
    var lib = DATA.library.items.length;
    var cats = DATA.categories.length;
    var srcs = DATA.sources.items.length;
    var techs = DATA.technologies.length;
    return '<div class="page-pad">' +
      '<div class="page-title">' + esc(b.title) + '</div>' +
      '<div class="page-subtitle">' + esc(b.subtitle) + '</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-p">本电子研究书系统汇集科技发展部前沿技术研究成果，分为两篇：<b>第一篇 · 整体研究成果</b>（工作方案、情报源评判、前沿技术储备库、技术关系图谱）与<b>第二篇 · 各项前沿技术研究</b>（评估表、专题报告、一张图概述）。</div>' +
      '<div class="stat-grid">' +
      '<div class="stat"><div class="num">' + lib + '</div><div class="lbl">长名单技术项</div></div>' +
      '<div class="stat"><div class="num">' + cats + '</div><div class="lbl">战略方向</div></div>' +
      '<div class="stat"><div class="num">' + srcs + '</div><div class="lbl">情报源</div></div>' +
      '<div class="stat"><div class="num">' + techs + '</div><div class="lbl">专题研究项</div></div>' +
      '</div>' +
      '<div class="pg-section">' +
      '<div class="pg-h">成果体系架构</div>' +
      '<div class="cards" style="grid-template-columns:1fr 1fr;gap:10px">' +
      '<div class="card"><div class="c-title" style="color:var(--accent)">第一篇 · 整体研究成果</div><div class="c-comment">包含技术储备库（36项）、情报源评判报告、关系图谱及敏捷工作方案，支撑全行宏观研判与战略技术选型。</div></div>' +
      '<div class="card"><div class="c-title" style="color:var(--accent2)">第二篇 · 各项前沿技术研究</div><div class="c-comment">针对重点前沿技术输出六维研判评估表、万字专题报告（Word/PPT）及一张图，深度赋能业务与架构落地。</div></div>' +
      '</div></div>' +
      '</div>';
  }

  function overviewPageHTML() {
    var b = DATA.book;
    var edges = DATA.graph.edges.length;
    return '<div class="page-pad">' +
      '<div class="page-title">成果全景与说明</div>' +
      '<div class="page-subtitle">编制说明 · 管理机制 · 研判标准</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-section">' +
      '<div class="pg-h">前沿技术储备库动态分层管理机制</div>' +
      '<div class="pg-p dim">储备库按「布局 / 论证 / 研究 / 观察」四层动态滚动管理；关系图谱共 ' + DATA.graph.nodes.length + ' 个节点、' + edges + ' 条关系边；每项技术含完整台账字段（定义 / 趋势 / 研判依据等）与六维评级（1–5 分制）。</div>' +
      '<div class="pg-p dim">系统支持「书籍模式」沉浸式翻阅与「网页模式」大屏仪表盘，支持明暗主题自适应与实时检索。</div>' +
      '</div>' +
      '<div class="pg-section" style="margin-top:16px">' +
      '<div class="pg-h">编制与发布信息</div>' +
      '<table class="tbl">' +
      '<tr><th style="width:90px">编制单位</th><td>' + esc(b.org) + '</td></tr>' +
      '<tr><th>发布时间</th><td>' + esc(b.date) + '</td></tr>' +
      '<tr><th>研究范围</th><td>前沿技术长名单36项（布局6 / 论证10 / 研究10 / 观察10），覆盖人工智能、数据要素、算力网络等战略方向。</td></tr>' +
      '<tr><th>更新机制</th><td>月度滚动研判跟踪，关键技术动态升级，确保研究成果与前沿趋势深度同频。</td></tr>' +
      '</table>' +
      '</div>' +
      '</div>';
  }

  function getTocItems() {
    var items = [];
    function add(no, label, key, part) { items.push({ no: no, label: label, key: key, part: part }); }
    add('', '扉页 · 成果总览', 'title', false);
    add('', '成果全景与说明', 'overview', false);
    add('', '目录 · 双页对开', 'toc1', false);
    add('第一篇', '整体研究成果', 'part1', true);
    add('1.1', '工作方案', 'workplan', false);
    add('1.2', '情报源评判报告', 'sources', false);
    add('1.3', '前沿技术储备库（长名单）', 'library', false);
    add('1.4', '技术影响力雷达图', 'radar', false);
    add('1.5', '各项前沿技术关系图谱', 'graph', false);
    add('第二篇', '各项前沿技术研究', 'part2', true);
    DATA.technologies.forEach(function (t, i) {
      add('2.' + (i + 1), t.name, 'tech-' + t.id, false);
    });
    add('附录', '术语 · 数据来源 · 版本', 'appendix', false);
    add('', '结语', 'closing', false);
    return items;
  }

  function renderTocPage(title, items) {
    var lis = items.map(function (it) {
      var pIdx = pageKeyMap[it.key];
      if (pIdx == null) pIdx = 1;
      var cls = it.part ? 'toc-part' : (it.key.indexOf('tech-') === 0 ? 'toc-indent' : '');
      return '<li data-jump="' + pIdx + '" class="' + cls + '">' +
        '<span class="toc-no">' + esc(it.no) + '</span>' +
        '<span class="toc-label">' + esc(it.label) + '</span>' +
        '<span class="toc-dots"></span>' +
        '<span class="toc-page-num">P.' + (pIdx + 1) + '</span>' +
      '</li>';
    }).join('');
    return '<div class="page-pad">' +
      '<div class="page-title">' + title + '</div>' +
      '<div class="h-rule"></div>' +
      '<ul class="toc-list">' + lis + '</ul>' +
    '</div>';
  }

  function toc1HTML() {
    var all = getTocItems();
    var mid = Math.ceil(all.length / 2);
    var items = all.slice(0, mid);
    return renderTocPage('目 录（上）', items);
  }

  function toc2HTML() {
    var all = getTocItems();
    var mid = Math.ceil(all.length / 2);
    var items = all.slice(mid);
    return renderTocPage('目 录（下）', items);
  }
  function dividerHTML(part, title, desc, num) {
    return '<div class="divider-full"><div class="dv-num">' + num + '</div>' +
      '<div class="dv-part">' + esc(part) + '</div>' +
      '<div class="dv-title">' + esc(title) + '</div>' +
      '<div class="dv-desc">' + esc(desc) + '</div></div>';
  }
  function workplanHTML() {
    var wp = DATA.workplan;
    var phases = wp.phases.map(function (p) {
      return '<div class="tl-item"><div class="tl-time">' + esc(p.phase) + ' · ' + esc(p.time) + '</div>' +
        '<div class="tl-title">' + esc(p.title) + '</div>' +
        '<div class="tl-items">' + p.items.map(esc).join('；') + '</div></div>';
    }).join('');
    var orgRows = wp.org.map(function (o) {
      return '<tr><th>' + esc(o.role) + '</th><td>' + esc(o.duty) + '</td></tr>';
    }).join('');
    return '<div class="page-pad">' +
      '<div class="page-title">工作方案</div><div class="h-rule"></div>' +
      '<div class="pg-section"><div class="pg-h">研究目标</div><div class="pg-p">' + esc(wp.goal) + '</div></div>' +
      '<div class="pg-section"><div class="pg-h">基本原则</div><ul class="pg-list">' +
      wp.principles.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul></div>' +
      '<div class="pg-section"><div class="pg-h">实施阶段</div><div class="timeline">' + phases + '</div></div>' +
      '<div class="pg-section"><div class="pg-h">组织分工</div><table class="tbl"><tr><th>角色</th><th>职责</th></tr>' + orgRows + '</table></div>' +
      '</div>';
  }
  function sourcesHTML() {
    var crit = DATA.sources.criteria, items = DATA.sources.items.slice();
    items.forEach(function (it) {
      var total = 0;
      crit.forEach(function (c) { total += it[c.key] * c.weight; });
      it._total = total / 100;
    });
    items.sort(function (a, b) { return b._total - a._total; });
    var head = '<tr><th style="width:23%">情报源</th><th style="width:11%">类型</th>' + crit.map(function (c) { return '<th style="width:11%">' + esc(c.label) + '<br><span style="font-weight:400;color:var(--faint);font-size:10px">(' + c.weight + ')</span></th>'; }).join('') + '<th style="width:12%">加权得分</th></tr>';
    var rows = items.map(function (it) {
      return '<tr><td><b>' + esc(it.name) + '</b></td><td><span class="tag" style="padding:2px 4px;font-size:11px">' + esc(it.type) + '</span></td>' +
        crit.map(function (c) { return '<td><span class="score-dot" style="background:' + scoreColor(it[c.key]) + ';margin-right:2px;width:7px;height:7px"></span>' + it[c.key] + '</td>'; }).join('') +
        '<td><b style="color:' + scoreColor(it._total) + '">' + it._total.toFixed(1) + '</b></td></tr>';
    }).join('');
    var cards = items.map(function (it) {
      return '<div class="card"><div class="c-title"><span>' + esc(it.name) + '</span><span class="badge acc">' + esc(it.type) + '</span></div>' +
        '<div class="c-comment">' + esc(it.comment) + '</div>' +
        '<div style="margin-top:8px">' + scoreBar(it._total) + '</div></div>';
    }).join('');
    return '<div class="page-pad">' +
      '<div class="page-title">情报源评判报告</div>' +
      '<div class="page-subtitle">共 ' + items.length + ' 类情报源 · 按「权威性 / 时效性 / 可信度 / 覆盖度 / 独特性」五维加权评判</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-section"><div class="pg-h">评判汇总表</div><table class="tbl tbl-sources">' + head + rows + '</table></div>' +
      '<div class="pg-section"><div class="pg-h">逐源评判</div><div class="cards">' + cards + '</div></div>' +
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
              '<col style="width:22px">' +
              '<col>' +
              '<col style="width:64px">' +
              '<col style="width:42px">' +
              '<col style="width:42px">' +
              '<col style="width:42px">' +
              '<col style="width:42px">' +
              '<col style="width:42px">' +
              '<col style="width:42px">' +
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
          '<div class="page-title">技术影响力雷达图（Impact Radar）</div>' +
          '<div class="page-subtitle">5大企业级架构维度 · 4大影响时间圈层 · 36项前沿技术全景</div>' +
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
            '<button data-val="布局层" style="color:#fb7185">布局层</button>' +
            '<button data-val="论证层" style="color:#38bdf8">论证层</button>' +
            '<button data-val="研究层" style="color:#fbbf24">研究层</button>' +
            '<button data-val="观察层" style="color:#34d399">观察层</button>' +
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

  function graphPreviewHTML() {
    var g = DATA.graph;
    var relLegend = DATA.graphRelations.map(function (r) {
      return '<span class="lg"><span class="line" style="background:' + r.color + '"></span>' + esc(r.label) + '</span>';
    }).join('');
    var catLegend = DATA.categories.map(function (c) {
      return '<span class="lg"><span class="dot" style="background:' + catColor(c) + '"></span>' + esc(c) + '</span>';
    }).join('');
    return '<div class="page-pad">' +
      '<div class="page-head-row">' +
        '<div class="page-head-main">' +
          '<div class="page-title">各项前沿技术关系图谱</div>' +
          '<div class="page-subtitle">' + g.nodes.length + ' 个技术节点 · ' + g.edges.length + ' 条关系边</div>' +
        '</div>' +
        '<button class="btn btn-sm active page-head-btn" data-action="open-graph">⛶ 交互图谱</button>' +
      '</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-p">以力导向图刻画 ' + g.nodes.length + ' 项技术之间的「同族 / 依赖 / 互补 / 竞争」关系，支持拖拽、缩放、按关系筛选，点击节点直达对应技术详情。</div>' +
      '<div class="pg-section"><div class="pg-h">关系类型</div><div class="legend">' + relLegend + '</div></div>' +
      '<div class="pg-section"><div class="pg-h">战略方向</div><div class="legend">' + catLegend + '</div></div>' +
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
      '<div class="bk-head">' +
        '<div class="bk-title-row">' +
          '<span class="bk-no">' + esc(tech.id) + '</span>' +
          '<span class="bk-name">' + esc(tech.name) + '</span>' +
          '<button class="btn btn-sm active bk-btn" data-action="open-tech" data-id="' + tech.id + '">📄 专题档案</button>' +
        '</div>' +
        '<div class="bk-tags-row">' + tags + '</div>' +
      '</div>' +
      '<div class="h-rule" style="margin:5px 0 7px"></div>' +

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
  function appendixHTML() {
    return '<div class="page-pad">' +
      '<div class="page-title">附录</div><div class="h-rule"></div>' +
      '<div class="pg-section"><div class="pg-h">术语表</div><table class="tbl">' +
      '<tr><th>术语</th><th>含义</th></tr>' +
      '<tr><td>六维评级</td><td>技术成熟度、战略匹配度、价值贡献度、引入可行度、战略紧迫度、生态开放度（1–5 分制，越高越有利）。</td></tr>' +
      '<tr><td>储备库分层</td><td>布局层/论证层/研究层/观察层四层，对应提前布局、系统论证、深入研究、动态观察。</td></tr>' +
      '</table></div>' +
      '<div class="pg-section"><div class="pg-h">数据来源</div><div class="pg-p dim">评估内容来源于监管与标准组织、研究机构、金融同业实践、学术文献及开源社区，按六维评级口径客观研判。</div></div>' +
      '<div class="pg-section"><div class="pg-h">系统说明</div><div class="pg-p dim">' + esc(DATA.book.org) + ' · ' + esc(DATA.book.date) + ' · 本系统为纯静态离线展示，双击 index.html 即可打开。</div></div>' +
      '</div>';
  }
  function backCoverHTML() {
    return '<div class="cover-full">' +
      '<div class="cov-kicker">THANK YOU</div>' +
      '<div class="cov-title" style="font-size:24px">金融科技 · 前瞻研判</div>' +
      '<div class="cov-rule"></div>' +
      '<div class="cov-meta">' + esc(DATA.book.org) + '<br>' + esc(DATA.book.date) + '</div>' +
      '</div>';
  }
  function closingHTML() {
    return '<div class="page-pad">' +
      '<div class="page-title">结语</div><div class="h-rule"></div>' +
      '<div class="pg-p">本电子研究书以「整体研究成果 + 重点技术专题」双层结构汇集科技发展部前沿技术研究的关键结论：长名单识别重点方向与分层，关系图谱刻画技术间同族、依赖、互补与竞争关系，专题报告与评估表支撑逐项研判。</div>' +
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
  addPage('title', '扉页 · 成果总览', titlePageHTML());
  addPage('overview', '成果全景与说明', overviewPageHTML());
  addPage('toc1', '目录（上）', toc1HTML);
  addPage('toc2', '目录（下）', toc2HTML);
  addPage('part1', '第一篇', dividerHTML('第一篇', '整体研究成果', '工作方案 · 情报源评判 · 前沿技术储备库 · 技术影响力雷达 · 技术关系图谱', '01'));
  addPage('workplan', '第一篇 · 工作方案', workplanHTML());
  addPage('sources', '第一篇 · 情报源评判报告', sourcesHTML());
  addPage('library', '第一篇 · 前沿技术储备库', libraryPreviewHTML());
  addPage('radar', '第一篇 · 技术影响力雷达图', radarPreviewHTML);
  addPage('graph', '第一篇 · 关系图谱', graphPreviewHTML());
  addPage('part2', '第二篇', dividerHTML('第二篇', '各项前沿技术研究', '评估表 · 专题研究报告（Word / PPT）· 一张图概述', '02'));
  DATA.technologies.forEach(function (t) { addPage('tech-' + t.id, '第二篇 · ' + t.name, techBookHTML(t)); });
  addPage('appendix', '附录', appendixHTML());
  addPage('closing', '结语', closingHTML());
  // 确保封底始终位于最终闭合跨页的左侧页（偶数索引）：如果正文结束于奇数总页数，在封底前补充一页优雅衬页
  if (pages.length % 2 !== 0) {
    addPage('blankPreBack', '', '<div class="page-pad"></div>');
  }
  addPage('back', '封底', backCoverHTML());
  addPage('blankEnd', '', '');
  var maxSpread = Math.floor((pages.length - 1) / 2);

  /* ==================== 左右双侧技术书签系统 (Dynamic Left/Right Side Tabs) ==================== */
  function getAllBookmarks() {
    var bms = [
      { id: 'cover', no: '封面', short: '成果总览', name: '封面 · 成果总览', page: pageKeyMap['cover'] != null ? pageKeyMap['cover'] : 1, color: '#818cf8', tier: '前序' },
      { id: 'title', no: '扉页', short: '成果总览', name: '扉页 · 成果总览', page: pageKeyMap['title'] != null ? pageKeyMap['title'] : 2, color: '#818cf8', tier: '前序' },
      { id: 'toc1', no: '目录', short: '本书目录', name: '全书目录 · 双页对开', page: pageKeyMap['toc1'] != null ? pageKeyMap['toc1'] : 4, color: '#818cf8', tier: '前序' },
      { id: 'part1', no: '第一篇', short: '整体成果', name: '第一篇 · 整体研究成果', page: pageKeyMap['part1'] != null ? pageKeyMap['part1'] : 6, color: '#6366f1', tier: '第一篇' },
      { id: 'workplan', no: '1.1', short: '工作方案', name: '第一篇 · 工作方案', page: pageKeyMap['workplan'] != null ? pageKeyMap['workplan'] : 7, color: '#6366f1', tier: '第一篇' },
      { id: 'sources', no: '1.2', short: '情报源评判', name: '第一篇 · 情报源评判报告', page: pageKeyMap['sources'] != null ? pageKeyMap['sources'] : 8, color: '#6366f1', tier: '第一篇' },
      { id: 'library', no: '1.3', short: '技术储备库', name: '第一篇 · 前沿技术储备库（长名单）', page: pageKeyMap['library'] != null ? pageKeyMap['library'] : 9, color: '#6366f1', tier: '第一篇' },
      { id: 'radar', no: '1.4', short: '影响力雷达', name: '第一篇 · 技术影响力雷达图', page: pageKeyMap['radar'] != null ? pageKeyMap['radar'] : 10, color: '#6366f1', tier: '第一篇' },
      { id: 'graph', no: '1.5', short: '关系图谱', name: '第一篇 · 各项前沿技术关系图谱', page: pageKeyMap['graph'] != null ? pageKeyMap['graph'] : 11, color: '#6366f1', tier: '第一篇' },
      { id: 'part2', no: '第二篇', short: '专题研究', name: '第二篇 · 各项前沿技术研究', page: pageKeyMap['part2'] != null ? pageKeyMap['part2'] : 12, color: '#a855f7', tier: '第二篇' }
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

    bms.push({ id: 'appendix', no: '附录', short: '术语与来源', name: '附录 · 术语 · 数据来源 · 版本', page: pageKeyMap['appendix'] != null ? pageKeyMap['appendix'] : (pages.length - 3), color: '#94a3b8', tier: '附录' });
    bms.push({ id: 'closing', no: '结语', short: '研究结语', name: '结语', page: pageKeyMap['closing'] != null ? pageKeyMap['closing'] : (pages.length - 2), color: '#94a3b8', tier: '结语' });
    if (pageKeyMap['back'] != null) {
      bms.push({ id: 'back', no: '封底', short: '封底', name: '封底', page: pageKeyMap['back'], color: '#818cf8', tier: '封底' });
    }
    return bms;
  }

  function renderSideBookmarks() {
    var leftEl = $('bookSideLeft'), rightEl = $('bookSideRight');
    if (!leftEl || !rightEl) return;

    var curLeftPage = isSingle() ? singleIdx : (spread * 2);
    var curRightPage = isSingle() ? singleIdx : (spread * 2 + 1);

    var all = getAllBookmarks();
    var leftList = all.filter(function (b) { return b.page < curLeftPage; });
    var rightList = all.filter(function (b) { return b.page > curRightPage; });

    function tabHTML(b, isLeft) {
      return '<div class="edge-tab" data-page="' + b.page + '" style="--tab-color:' + b.color + '" title="' + esc(b.name) + '">' +
        '<span class="et-no" style="color:' + b.color + '">' + esc(b.no) + '</span>' +
        '<span class="et-name">' + esc(b.short) + '</span>' +
      '</div>';
    }

    leftEl.innerHTML = leftList.map(function (b) { return tabHTML(b, true); }).join('');
    rightEl.innerHTML = rightList.map(function (b) { return tabHTML(b, false); }).join('');

    leftEl.querySelectorAll('.edge-tab').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var p = parseInt(this.getAttribute('data-page'), 10);
        jumpToPage(p);
      });
    });
    rightEl.querySelectorAll('.edge-tab').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        var p = parseInt(this.getAttribute('data-page'), 10);
        jumpToPage(p);
      });
    });
  }

  /* ==================== 翻书引擎 ==================== */
  var spread = 0;
  var singleIdx = 1;
  var flipping = false;
  var isSingle = function () { return window.innerWidth < 900; };

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
      $('pageNo').textContent = label ? (label + ' · ' + (singleIdx + 1) + ' / ' + pages.length) : '';
      if (pnoL) pnoL.textContent = '';
      if (pnoR) pnoR.textContent = (singleIdx > 0 && singleIdx < pages.length - 1) ? (singleIdx + 1) : '';
    } else {
      var l = pageLabels[spread * 2] || '', r = pageLabels[spread * 2 + 1] || '';
      if (spread === 0) {
        $('pageNo').textContent = '封面 · 科技发展部前沿技术研究成果集';
        if (pnoL) pnoL.textContent = '';
        if (pnoR) pnoR.textContent = '';
      } else if (spread === 1) {
        $('pageNo').textContent = '扉页 · 成果总览与编制说明 · 跨页 2 / ' + (maxSpread + 1);
        if (pnoL) pnoL.textContent = '2';
        if (pnoR) pnoR.textContent = '3';
      } else if (spread === maxSpread) {
        $('pageNo').textContent = (l || '封底') + ' · 跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
        var leftIdx = spread * 2;
        if (pnoL) pnoL.textContent = (leftIdx < pages.length - 1) ? (leftIdx + 1) : '';
        if (pnoR) pnoR.textContent = '';
      } else {
        if (spread === 2) {
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
        var pLeft = spread * 2 + 1;
        var pRight = spread * 2 + 2;
        if (pnoL) pnoL.textContent = (pLeft < pages.length) ? pLeft : '';
        if (pnoR) pnoR.textContent = (pRight < pages.length) ? pRight : '';
      }
    }
  }
  // 准备阶段：只做重置写入，不读取任何布局属性
  function prepareFit(el, idx) {
    if (!el) return null;
    if (pageScroll[idx]) { el.classList.add('scroll'); return null; }
    el.classList.remove('scroll');
    var pad = el.querySelector('.page-pad');
    if (!pad) return null;
    pad.style.transform = '';
    return { el: el, pad: pad };
  }
  // 应用阶段：把多个待处理页面的“读尺寸”和“写transform”分别集中批量执行，
  // 避免逐个元素交替读写触发多次强制同步布局（layout thrashing）
  function applyFits(items) {
    items.forEach(function (m) {
      if (!m) return;
      m.aw = m.el.clientWidth; m.ah = m.el.clientHeight;
      m.nw = m.pad.scrollWidth; m.nh = m.pad.scrollHeight;
    });
    items.forEach(function (m) {
      if (!m) return;
      if (m.nw <= m.aw + 1 && m.nh <= m.ah + 1) return;
      var s = Math.min(m.aw / m.nw, m.ah / m.nh);
      if (s >= 1) return;
      m.pad.style.transformOrigin = 'top left';
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
        var leftThick = Math.round(ratio * 26);
        var rightThick = Math.round((1 - ratio) * 26);
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

    // 随着书本变厚动态呈现 1 ~ 3 层阶梯纸页边缘（最多3层，质感精简清晰）
    var layerCount = 1;
    if (thick > 14) layerCount = 3;
    else if (thick > 6) layerCount = 2;

    var html = '';
    for (var i = 0; i < layerCount; i++) {
      var stepInset = i * 3.5; // 每层上下阶梯缩进 0px, 3.5px, 7px
      var layerWidth = Math.max(3, Math.round((thick / layerCount) * (layerCount - i)));
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
          else if (action === 'open-radar') openRadarPanel();
          else if (action === 'open-graph') openGraphPanel();
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
    });
  }
  function jumpToPage(i) {
    i = Math.max(0, Math.min(pages.length - 1, i));
    if (isSingle()) {
      singleIdx = i;
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

    // 提前去除目标空白页底板与边框，确保翻页过程中绝对不会露出多余空白边框
    $('pageRight').classList.toggle('page-blank', !newRight.trim());
    $('pageLeft').classList.toggle('page-blank', !newLeft.trim());
    $('turnFrontInner').parentElement.classList.toggle('page-blank', !oldRight.trim());
    $('turnBackInner').parentElement.classList.toggle('page-blank', !newLeft.trim());

    // 提前在翻页动画开始之前绘制好目标跨页的书本厚度与边框（绝无翻页后阴影突变）
    if (targetSpread > 0 && targetSpread < maxSpread) {
      var ratio = targetSpread / maxSpread;
      var leftThick = Math.round(ratio * 26);
      var rightThick = Math.round((1 - ratio) * 26);
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
      if (singleIdx <= 0) { toast('已是第一页'); return; }
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

    // 提前去除目标空白页底板与边框，确保翻页过程中绝对不会露出多余空白边框
    $('pageLeft').classList.toggle('page-blank', !newLeft.trim());
    $('pageRight').classList.toggle('page-blank', !newRight.trim());
    $('turnFrontInner').parentElement.classList.toggle('page-blank', !oldLeft.trim());
    $('turnBackInner').parentElement.classList.toggle('page-blank', !newRight.trim());

    // 提前在翻页动画开始之前绘制好目标跨页的书本厚度与边框（绝无翻页后阴影突变）
    if (targetSpread > 0 && targetSpread < maxSpread) {
      var ratio = targetSpread / maxSpread;
      var leftThick = Math.round(ratio * 26);
      var rightThick = Math.round((1 - ratio) * 26);
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
    sections.push('<div class="sec" id="s-title"><div class="sec-head"><span class="sec-title">' + esc(b.title) + '</span></div><div class="sec-body">' + titlePageHTML() + '</div></div>');
    sections.push(webSection('s-overview', '序', '成果全景与说明', overviewPageHTML()));
    sections.push(webSection('s-workplan', '1.1', '工作方案', workplanHTML()));
    sections.push(webSection('s-sources', '1.2', '情报源评判报告', sourcesHTML()));
    sections.push(webSection('s-library', '1.3', '前沿技术储备库（长名单）', libraryPreviewHTML(0, true), '<button class="btn btn-sm active sec-head-btn" data-action="open-library">⛶ 完整长名单</button>'));
    sections.push(webSection('s-radar', '1.4', '技术影响力雷达图（Impact Radar）', radarInteractiveHTML('webRadarWrap', false), '<button class="btn btn-sm active sec-head-btn" data-action="open-radar">⛶ 全屏雷达图</button>'));
    sections.push(webSection('s-graph', '1.5', '各项前沿技术关系图谱', graphPreviewHTML(), '<button class="btn btn-sm active sec-head-btn" data-action="open-graph">⛶ 交互图谱</button>'));
    DATA.technologies.forEach(function (t, i) {
      var pureName = t.short || t.name.replace(/（[^）]+）|\([^)]+\)/g, '').trim() || t.name;
      var enName = t.nameEn || '';
      var titleHtml = esc(pureName) + (enName ? (' <span style="font-size:13.5px;color:var(--dim);font-weight:400;margin-left:8px">' + esc(enName) + '</span>') : '');
      sections.push(webSection('s-tech-' + t.id, '2.' + (i + 1), titleHtml, techWebHTML(t)));
    });
    sections.push(webSection('s-appendix', '附录', '术语 · 数据来源 · 版本', appendixHTML()));
    sections.push(webSection('s-closing', '结语', '结语', closingHTML()));
    $('webContent').innerHTML = sections.join('');
    initImpactRadarInteractive($('webRadarWrap'));

    // 目录
    var toc = ['<h3>目录</h3>'];
    toc.push('<div class="web-toc-item" data-target="s-title"><span class="wt-no"></span>扉页 · 成果总览</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-overview"><span class="wt-no">序</span>成果全景与说明</div>');
    toc.push('<div class="web-toc-item part" data-target="s-workplan">第一篇 · 整体研究成果</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-workplan"><span class="wt-no">1.1</span>工作方案</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-sources"><span class="wt-no">1.2</span>情报源评判报告</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-library"><span class="wt-no">1.3</span>前沿技术储备库</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-radar"><span class="wt-no">1.4</span>技术影响力雷达</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-graph"><span class="wt-no">1.5</span>技术关系图谱</div>');
    toc.push('<div class="web-toc-item part" data-target="s-tech-' + DATA.technologies[0].id + '">第二篇 · 各项前沿技术研究</div>');
    DATA.technologies.forEach(function (t, i) {
      var pureName = t.short || t.name.replace(/（[^）]+）|\([^)]+\)/g, '').trim() || t.name;
      toc.push('<div class="web-toc-item sub" data-target="s-tech-' + t.id + '"><span class="wt-no">2.' + (i + 1) + '</span>' + esc(pureName) + '</div>');
    });
    toc.push('<div class="web-toc-item part" data-target="s-appendix">附录</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-appendix"><span class="wt-no"></span>术语 · 数据来源 · 版本</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-closing"><span class="wt-no"></span>结语</div>');
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

  /* ==================== 关系图谱面板（力导向） ==================== */
  function graphToolbarHTML() {
    var rels = DATA.graphRelations.map(function (r) {
      return '<span class="lg" data-rel="' + r.key + '"><span class="line" style="background:' + r.color + '"></span>' + esc(r.label) + '</span>';
    }).join('');
    return '<div class="graph-toolbar"><div class="legend">' + rels + '</div>' +
      '<button class="btn" id="graphReset" style="margin-left:auto">重置布局</button></div>';
  }
  function openGraphPanel(savedScrollTop, isNavBack) {
    if (!isNavBack) {
      if (!$('panel').classList.contains('hidden') && currentPanelMeta && currentPanelMeta.type !== 'graph') {
        var snap = capturePanelSnapshot();
        if (snap) panelNavStack.push(snap);
      } else {
        panelNavStack = [];
      }
    }
    currentPanelMeta = { type: 'graph', name: '关系图谱' };
    openPanel('各项前沿技术关系图谱', graphToolbarHTML() + '<div id="graphBox"></div><div class="graph-tip" style="margin-top:8px">滚轮缩放 · 拖拽空白平移 · 拖拽节点调整 · 点击节点查看详情</div>', function () {
      initForceGraph();
      if (savedScrollTop && $('panelBody')) $('panelBody').scrollTop = savedScrollTop;
    });
  }

  function initForceGraph() {
    var box = $('graphBox');
    if (!box) return;
    var W = box.clientWidth || 900, H = box.clientHeight || 560;
    var g = DATA.graph;
    var svgNS = 'http://www.w3.org/2000/svg';
    var nodes = g.nodes.map(function (n, i) {
      var ci = DATA.categories.indexOf(n.category);
      var ang = (ci / DATA.categories.length) * Math.PI * 2 + i * 0.5;
      return { id: n.id, name: n.name, cat: n.category, trl: n.trl, tier: n.tier,
        x: W / 2 + Math.cos(ang) * W * 0.32, y: H / 2 + Math.sin(ang) * H * 0.32, vx: 0, vy: 0 };
    });
    var edges = g.edges.map(function (e) { return { s: e.source, t: e.target, rel: e.relation }; });
    var activeRel = {}; DATA.graphRelations.forEach(function (r) { activeRel[r.key] = true; });
    var idx = {}; nodes.forEach(function (n) { idx[n.id] = n; });

    box.innerHTML = '';
    var svg = document.createElementNS(svgNS, 'svg');
    var viewport = document.createElementNS(svgNS, 'g');
    svg.appendChild(viewport); box.appendChild(svg);
    var edgeLayer = document.createElementNS(svgNS, 'g');
    var nodeLayer = document.createElementNS(svgNS, 'g');
    viewport.appendChild(edgeLayer); viewport.appendChild(nodeLayer);
    var dimColor = getComputedStyle(document.documentElement).getPropertyValue('--dim').trim() || '#8fa3c0';

    nodes.forEach(function (n) {
      var c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('r', 10); c.setAttribute('fill', catColor(n.cat));
      c.setAttribute('stroke', 'rgba(255,255,255,.55)'); c.setAttribute('stroke-width', 1.5);
      c.style.cursor = 'pointer';
      var t = document.createElementNS(svgNS, 'text');
      t.setAttribute('font-size', '10.5'); t.setAttribute('text-anchor', 'middle');
      t.style.fill = dimColor; t.style.pointerEvents = 'none';
      t.textContent = n.name.length > 9 ? n.name.slice(0, 9) + '…' : n.name;
      n.el = c; n.label = t;
      nodeLayer.appendChild(c); nodeLayer.appendChild(t);
    });
    edges.forEach(function (e) {
      var l = document.createElementNS(svgNS, 'line');
      l.setAttribute('stroke', relColor(e.rel)); l.setAttribute('stroke-width', 1.4); l.setAttribute('opacity', .55);
      e.el = l; edgeLayer.appendChild(l);
    });

    function draw() {
      edges.forEach(function (e) {
        var s = idx[e.s], t = idx[e.t];
        if (!s || !t) return;
        var visible = activeRel[e.rel] !== false;
        e.el.setAttribute('x1', s.x); e.el.setAttribute('y1', s.y);
        e.el.setAttribute('x2', t.x); e.el.setAttribute('y2', t.y);
        e.el.style.display = visible ? '' : 'none';
      });
      nodes.forEach(function (n) {
        n.el.setAttribute('cx', n.x); n.el.setAttribute('cy', n.y);
        n.label.setAttribute('x', n.x); n.label.setAttribute('y', n.y + 22);
      });
    }

    function tick(alpha) {
      var i, j, a, b;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j];
          var dx = b.x - a.x, dy = b.y - a.y;
          var d2 = dx * dx + dy * dy; if (d2 < 1) d2 = 1;
          var f = 2600 * alpha / d2;
          var d = Math.sqrt(d2);
          var fx = dx / d * f, fy = dy / d * f;
          a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
        }
      }
      edges.forEach(function (e) {
        var s = idx[e.s], t = idx[e.t]; if (!s || !t) return;
        var dx = t.x - s.x, dy = t.y - s.y;
        var d = Math.sqrt(dx * dx + dy * dy) || 1;
        var f = (d - 90) * 0.02 * alpha;
        var fx = dx / d * f, fy = dy / d * f;
        s.vx += fx; s.vy += fy; t.vx -= fx; t.vy -= fy;
      });
      nodes.forEach(function (n) {
        n.vx += (W / 2 - n.x) * 0.0012 * alpha;
        n.vy += (H / 2 - n.y) * 0.0012 * alpha;
        n.x += n.vx; n.y += n.vy;
        n.vx *= 0.82; n.vy *= 0.82;
        n.x = Math.max(18, Math.min(W - 18, n.x));
        n.y = Math.max(18, Math.min(H - 18, n.y));
      });
    }
    var alpha = 1, running = true;
    function step() {
      if (!running) return;
      tick(alpha); draw();
      alpha *= 0.975;
      if (alpha > 0.015) requestAnimationFrame(step); else { running = false; }
    }
    draw(); requestAnimationFrame(step);

    document.querySelectorAll('.legend [data-rel]').forEach(function (lg) {
      lg.onclick = function () {
        var r = lg.getAttribute('data-rel');
        activeRel[r] = activeRel[r] === false ? true : false;
        lg.classList.toggle('off', activeRel[r] === false);
        draw();
      };
    });
    $('graphReset').onclick = function () { initForceGraph(); };

    var tx = 0, ty = 0, k = 1;
    function applyView() { viewport.setAttribute('transform', 'translate(' + tx + ',' + ty + ') scale(' + k + ')'); }
    applyView();
    var dragNode = null, panning = false, px = 0, py = 0;
    svg.addEventListener('mousedown', function (e) {
      var t = e.target;
      if (t.tagName === 'circle') {
        nodes.forEach(function (n) { if (n.el === t) dragNode = n; });
        if (dragNode) { running = false; return; }
      }
      panning = true; px = e.clientX; py = e.clientY; box.classList.add('dragging');
    });
    nodes.forEach(function (n) {
      n.el.addEventListener('click', function () { openTechPanel(findTech(n.id)); });
    });
    window.addEventListener('mousemove', function (e) {
      if (dragNode) {
        var rect = svg.getBoundingClientRect();
        dragNode.x = (e.clientX - rect.left - tx) / k;
        dragNode.y = (e.clientY - rect.top - ty) / k;
        draw();
      } else if (panning) {
        tx += e.clientX - px; ty += e.clientY - py; px = e.clientX; py = e.clientY; applyView();
      }
    });
    window.addEventListener('mouseup', function () { dragNode = null; panning = false; box.classList.remove('dragging'); });
    svg.addEventListener('wheel', function (e) {
      e.preventDefault();
      var rect = svg.getBoundingClientRect();
      var mx = e.clientX - rect.left, my = e.clientY - rect.top;
      var nk = k * (e.deltaY > 0 ? 0.9 : 1.1);
      nk = Math.max(0.4, Math.min(4, nk));
      tx = mx - (mx - tx) * (nk / k); ty = my - (my - ty) * (nk / k);
      k = nk; applyView();
    }, { passive: false });
  }

  /* ==================== 技术专题详情面板 ==================== */
  function techTabs(tech) {
    var tabs = [];
    tabs.push({ key: 'assess', name: '评估表', html: assessHTML(tech), fill: false });
    if (tech.image) tabs.push({ key: 'image', name: '一张图概述', html: onePageHTML(tech), fill: true });
    if (tech.hypeCycle) tabs.push({ key: 'hypecycle', name: '技术成熟度曲线', html: hypeCycleHTML(tech), fill: true });
    if (tech.reportPdf || tech.reportDocx) tabs.push({ key: 'word', name: 'Word 报告', html: wordHTML(tech), fill: true });
    if (tech.slidesPdf || tech.slidesPptx) tabs.push({ key: 'ppt', name: 'PPT 报告', html: pptHTML(tech), fill: true });
    return tabs;
  }
  function onePageHTML(tech) {
    var dl = '<div class="preview-toolbar">' +
      '<a href="' + esc(tech.image) + '" download>⬇ 下载一张图</a>' +
      '<a href="' + esc(tech.image) + '" target="_blank">↗ 新窗口打开</a>' +
      '<button class="btn" data-fs="1" title="全屏查看">⛶ 全屏</button>' +
      '</div>';
    return dl + '<div class="preview-stage onepage-stage" data-stage="1"><div class="onepage-wrap"><img id="onepageImg" src="' + esc(tech.image) + '" alt="' + esc(tech.name) + ' 一张图概述" title="点击放大查看"></div></div>';
  }
  function hypeCycleHTML(tech) {
    var dl = '<div class="preview-toolbar">' +
      '<a href="' + esc(tech.hypeCycle) + '" download>⬇ 下载技术成熟度曲线原图</a>' +
      '<a href="' + esc(tech.hypeCycle) + '" target="_blank">↗ 新窗口打开</a>' +
      '<button class="btn" data-fs="1" title="全屏查看">⛶ 全屏</button>' +
      '</div>';
    return dl + '<div class="preview-stage onepage-stage" data-stage="1"><div class="onepage-wrap"><img class="hypecycle-img" src="' + esc(tech.hypeCycle) + '" alt="' + esc(tech.name) + ' 技术成熟度曲线" title="点击放大查看"></div></div>';
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
  function wordHTML(tech) {
    return previewHTML(tech, tech.reportDocx, tech.reportPdf, 'Word 报告');
  }
  function pptHTML(tech) {
    return previewHTML(tech, tech.slidesPptx, tech.slidesPdf, 'PPT 报告');
  }
  function previewHTML(tech, docx, pdf, label) {
    var dl = '<div class="preview-toolbar">';
    if (docx) dl += '<a href="' + esc(docx) + '" download>⬇ 下载 ' + esc(label) + '</a>';
    if (pdf) dl += '<a href="' + esc(pdf) + '" download>⬇ 下载 PDF</a><a href="' + esc(pdf) + '" target="_blank">↗ 新窗口打开</a>';
    dl += '<button class="btn" data-fs="1" title="全屏预览">⛶ 全屏</button></div>';
    if (!pdf) return dl + '<div class="preview-empty">暂无在线预览，请下载后查看。</div>';
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
      if (img) img.onclick = function () { openLightbox(img.src, tech.name + ' · 一张图概述'); };
      document.querySelectorAll('#panelBody .hypecycle-img').forEach(function (hcImg) {
        hcImg.onclick = function () { openLightbox(hcImg.src, tech.name + ' · Gartner技术成熟度曲线'); };
      });
      document.querySelectorAll('#panelBody [data-fs]').forEach(function (b) {
        b.onclick = function () {
          var pane = b.closest('.tabpane');
          toggleFullscreen(pane ? pane.querySelector('.preview-stage') : null);
        };
      });
    }, true);
  }

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
      if ('技术影响力雷达图 影响力雷达 impact radar 1.4'.toLowerCase().indexOf(ql) >= 0) {
        hits.push({ id: '_radar', name: '1.4 技术影响力雷达图（Impact Radar）', cat: '第一篇 · 整体成果', tier: '全景雷达', sum: '5大企业级架构维度 · 4大影响时间圈层 · 36项长名单全景' });
      }
      if ('各项前沿技术关系图谱 关系图谱 1.5 graph'.toLowerCase().indexOf(ql) >= 0) {
        hits.push({ id: '_graph', name: '1.5 各项前沿技术关系图谱', cat: '第一篇 · 整体成果', tier: '力导向图', sum: '36项技术依赖 / 互补 / 竞争 / 同族关系网络' });
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
          if (h.id === '_radar') openRadarPanel();
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
  function setMode(m) {
    mode = m;
    $('bookView').classList.toggle('hidden', m !== 'book');
    $('webView').classList.toggle('hidden', m !== 'web');
    $('btnBook').classList.toggle('active', m === 'book');
    $('btnWeb').classList.toggle('active', m === 'web');
    if (m === 'book') renderSpread();
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
      btn.innerHTML = fxEnabled ? '✨ 动效: 开' : '✨ 动效: 关';
      btn.classList.toggle('active', fxEnabled);
    }
    if (!quiet) {
      toast(fxEnabled ? '已开启【动效增强】模式 (翻页流光/悬停掀角/图表生长)' : '已切换为【经典极简】模式 (0开销纯净静态)');
    }
  }

  /* ==================== 大屏自动巡航放映模式 ==================== */
  var autoPlaying = false, autoPlayTimer = null, autoProgressTimer = null, autoInterval = 6000;
  function startAutoPlay() {
    autoPlaying = true;
    if (mode !== 'book') setMode('book');
    $('btnAutoPlay').textContent = '⏹ 停止放映';
    $('btnAutoPlay').classList.add('active');
    $('presenterBar').classList.remove('hidden');
    runPresenterTick();
  }
  function stopAutoPlay() {
    autoPlaying = false;
    if (autoPlayTimer) clearTimeout(autoPlayTimer);
    if (autoProgressTimer) clearInterval(autoProgressTimer);
    $('btnAutoPlay').textContent = '▶ 自动放映';
    $('btnAutoPlay').classList.remove('active');
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

  /* ==================== 初始化 ==================== */
  function init() {
    try { var t = localStorage.getItem('dsh-theme'); if (t) document.documentElement.setAttribute('data-theme', t); } catch (e) {}
    bindOverlayClose();
    initSearch();
    $('brandBtn').onclick = function () { setMode('book'); jumpToPage(1); };
    $('btnBook').onclick = function () { setMode('book'); };
    $('btnWeb').onclick = function () { setMode('web'); };
    $('btnTheme').onclick = toggleTheme;
    $('btnFxToggle').onclick = function () { setFxMode(!fxEnabled); };
    $('btnAutoPlay').onclick = toggleAutoPlay;
    $('pbExit').onclick = stopAutoPlay;
    var nNext = $('navNext'), nPrev = $('navPrev');
    if (nNext) nNext.onclick = flipForward;
    if (nPrev) nPrev.onclick = flipBackward;
    var peekR = $('cornerPeekR'), peekL = $('cornerPeekL');
    if (peekR) peekR.onclick = function (e) { e.stopPropagation(); flipForward(); };
    if (peekL) peekL.onclick = function (e) { e.stopPropagation(); flipBackward(); };

    document.addEventListener('keydown', function (e) {
      if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight') flipForward();
      else if (e.key === 'ArrowLeft') flipBackward();
      else if (e.key === 'Home') jumpToPage(1);
      else if (e.key === 'Escape') {
        if (autoPlaying) stopAutoPlay();
      }
    });

    // 缓存书本尺寸，避免鼠标滑动时调用 getBoundingClientRect() 触发强制同步重排 (Zero Forced Reflow)
    var cachedBookRect = null;
    function updateBookRect() {
      var bookEl = $('book');
      if (bookEl) cachedBookRect = bookEl.getBoundingClientRect();
    }
    updateBookRect();

    var sideLeft = $('bookSideLeft'), sideRight = $('bookSideRight');
    if (sideLeft) sideLeft.addEventListener('click', function (e) { e.stopPropagation(); });
    if (sideRight) sideRight.addEventListener('click', function (e) { e.stopPropagation(); });

    // 鼠标位于书本外侧感应区时显示书签，在书页内阅读时不显示 (零 CPU 重绘开销，状态防抖)
    var prevRevealedL = false, prevRevealedR = false;
    window.addEventListener('mousemove', function (e) {
      if (mode !== 'book' || !sideLeft || !sideRight || activeOverlayCount > 0) return;
      if (!cachedBookRect) updateBookRect();
      if (!cachedBookRect) return;
      var rect = cachedBookRect;
      var cx = e.clientX, cy = e.clientY;
      var inVertical = (cy >= rect.top - 50 && cy <= rect.bottom + 50);
      var isOutsideLeft = inVertical && (cx < rect.left + 25 && cx > rect.left - 300);
      var isOutsideRight = inVertical && (cx > rect.right - 25 && cx < rect.right + 300);

      if (prevRevealedL !== isOutsideLeft) {
        prevRevealedL = isOutsideLeft;
        sideLeft.classList.toggle('is-revealed', isOutsideLeft);
      }
      if (prevRevealedR !== isOutsideRight) {
        prevRevealedR = isOutsideRight;
        sideRight.classList.toggle('is-revealed', isOutsideRight);
      }
    }, { passive: true });

    var book = $('book');
    book.addEventListener('click', function (e) {
      if (flipping || isSingle()) return;
      if (e.target.closest('button, li, a, iframe, .book-side-col, .edge-tab, .book-nav, .book-page-no, .btn, .corner-peek, .book-edge-stack')) return;
      if (!cachedBookRect) updateBookRect();
      var rect = cachedBookRect || book.getBoundingClientRect();
      var x = e.clientX - rect.left;
      if (x < rect.width * 0.18) flipBackward();
      else if (x > rect.width * 0.82) flipForward();
    });
    window.addEventListener('resize', function () {
      updateBookRect();
      if (mode === 'book') renderSpread();
    });
    setFxMode(fxEnabled, true);
    renderSpread();

    // URL 深链
    if (location.hash) {
      var h = location.hash.substring(1);
      setTimeout(function () {
        if (h === 'library') openLibraryPanel();
        else if (h === 'graph') openGraphPanel();
        else if (h === 'web') setMode('web');
        else if (h.indexOf('tech-') === 0) openTechPanel(findTech(h.substring(5)));
      }, 0);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
