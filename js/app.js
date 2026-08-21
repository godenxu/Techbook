/* =====================================================================
 * 银行金融科技前沿技术研究成果 · 电子研究书 —— 应用逻辑
 * 纯原生 JS，无任何外部依赖；双击 index.html 即可离线运行。
 * 三视图：书籍 / 网页（目录+滚动内容）/ 科技树
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
  function scoreBar(v, max) {
    max = max || 10;
    var pct = Math.round(v / max * 100);
    var color = pct >= 80 ? 'var(--good)' : (pct >= 60 ? 'var(--accent2)' : (pct >= 40 ? 'var(--warn)' : 'var(--bad)'));
    return '<div class="bar"><i style="width:' + pct + '%;background:' + color + '"></i></div>';
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

  /* ==================== 覆盖层 ==================== */
  function openPanel(title, html, onMount, flexBody) {
    $('panelTitle').innerHTML = title;
    $('panelBody').innerHTML = html;
    $('panelBody').classList.toggle('flex', !!flexBody);
    $('panel').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (onMount) setTimeout(onMount, 0);
  }
  function closePanel() {
    $('panel').classList.add('hidden');
    $('panelBody').innerHTML = '';
    $('panelBody').classList.remove('flex');
    document.body.style.overflow = '';
  }
  function openModal(title, html) {
    $('modalTitle').innerHTML = title;
    $('modalBody').innerHTML = html;
    $('modal').classList.remove('hidden');
  }
  function closeModal() { $('modal').classList.add('hidden'); $('modalBody').innerHTML = ''; }
  function openLightbox(src, title) {
    $('lightboxImg').src = src; $('lightboxTitle').textContent = title || '';
    $('lightbox').classList.remove('hidden'); $('lightbox').style.display = 'flex';
  }
  function closeLightbox() { $('lightbox').classList.add('hidden'); $('lightbox').style.display = ''; }
  function bindOverlayClose() {
    $('panelClose').onclick = closePanel;
    $('modalClose').onclick = closeModal;
    $('lightboxClose').onclick = closeLightbox;
    $('panel').onclick = function (e) { if (e.target === this) closePanel(); };
    $('modal').onclick = function (e) { if (e.target === this) closeModal(); };
    $('lightbox').onclick = function (e) { if (e.target === this) closeLightbox(); };
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closePanel(); closeModal(); closeLightbox(); }
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
    var W = 320, H = compact ? 230 : 250;
    var cx = W / 2, cy = H / 2, R = compact ? 78 : 86;
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
      s += '<polygon points="' + pts2.join(' ') + '" fill="' + col + '" fill-opacity="' + (ri === 0 ? 0.32 : 0.16) + '" stroke="' + col + '" stroke-width="2"/>';
      for (k = 0; k < n; k++) {
        var pp2 = pt(k, rd.scores[k] / (dims[k].max || 5) * R);
        s += '<circle cx="' + pp2[0].toFixed(1) + '" cy="' + pp2[1].toFixed(1) + '" r="' + (compact ? '3' : '3.5') + '" fill="' + col + '"/>';
      }
    });
    for (k = 0; k < n; k++) {
      var offset = compact ? 16 : 18;
      var lp = pt(k, R + offset), a = angle(k);
      var anchor = Math.abs(Math.cos(a)) < 0.25 ? 'middle' : (Math.cos(a) > 0 ? 'start' : 'end');
      var scoreVal = dims[k].score;
      s += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] + (compact ? 3.5 : 4)).toFixed(1) + '" font-size="' + (compact ? '10' : '11') + '" text-anchor="' + anchor + '" style="fill:var(--dim)" font-weight="600">' + esc(dims[k].label) + (compact ? (' <tspan style="fill:' + dimColor(dims[k]) + '" font-weight="700">' + scoreVal + '</tspan>') : '') + '</text>';
    }
    s += '</svg>';
    var legend = (!compact && rounds.length > 1) ? '<div style="text-align:center;font-size:12px;color:var(--dim);margin-top:4px">' +
      rounds.map(function (rd, ri) {
        return '<span style="margin:0 8px"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + (ri === 0 ? '#4f8cff' : '#f59e0b') + ';margin-right:4px"></span>' + esc(rd.name) + '</span>';
      }).join('') + '</div>' : '';
    return s + legend;
  }
  function barSVG(tech) {
    var dims = tech.assessment.dimensions;
    var W = 340, rowH = 34, H = rowH * dims.length + 10, maxW = W - 128;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img">';
    dims.forEach(function (d, i) {
      var y = i * rowH + 14, bw = Math.round(d.score / (d.max || 5) * maxW);
      s += '<text x="0" y="' + (y + 5) + '" font-size="11" style="fill:var(--dim)">' + esc(d.label) + '</text>';
      s += '<rect x="112" y="' + y + '" width="' + maxW + '" height="9" rx="4" style="fill:var(--border)"/>';
      s += '<rect x="112" y="' + y + '" width="' + bw + '" height="9" rx="4" fill="' + dimColor(d) + '"/>';
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
    return '<div class="cover-full">' + orbs +
      '<div class="cov-kicker">BANK FINTECH RESEARCH</div>' +
      '<div class="cov-title">' + esc(b.title) + '</div>' +
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
    var edges = DATA.graph.edges.length;
    return '<div class="page-pad">' +
      '<div class="page-title">' + esc(b.title) + '</div>' +
      '<div class="page-subtitle">' + esc(b.subtitle) + '</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-p">本电子研究书系统汇集银行金融科技前沿技术研究成果，分为两篇：<b>第一篇 · 整体研究成果</b>（工作方案、情报源评判、前沿技术储备库、技术关系图谱）与<b>第二篇 · 各项前沿技术研究</b>（评估表、专题报告、一张图概述）。</div>' +
      '<div class="stat-grid">' +
      '<div class="stat"><div class="num">' + lib + '</div><div class="lbl">长名单技术项</div></div>' +
      '<div class="stat"><div class="num">' + cats + '</div><div class="lbl">战略方向</div></div>' +
      '<div class="stat"><div class="num">' + srcs + '</div><div class="lbl">情报源</div></div>' +
      '<div class="stat"><div class="num">' + techs + '</div><div class="lbl">专题研究项</div></div>' +
      '</div>' +
      '<div class="pg-p dim">储备库按「布局 / 论证 / 研究 / 观察」四层动态滚动管理；关系图谱共 ' + DATA.graph.nodes.length + ' 个节点、' + edges + ' 条关系边；每项技术含完整台账字段（定义 / 趋势 / 研判依据等）与六维评级（1–5 分制）。</div>' +
      '<div class="pg-p dim">顶部可切换「书籍 / 网页 / 科技树」三种阅读方式；「网页」左侧目录可快速定位；「科技树」梳理技术间的前提依赖关系。</div>' +
      '<div class="pg-section" style="margin-top:20px">' +
      '<div class="pg-h">编制说明</div>' +
      '<table class="tbl"><tr><th>编制单位</th><td>' + esc(b.org) + '</td></tr>' +
      '<tr><th>编制时间</th><td>' + esc(b.date) + '</td></tr>' +
      '<tr><th>研究范围</th><td>前沿技术长名单36项（布局6 / 论证10 / 研究10 / 观察10），覆盖人工智能、数据要素、量子科技等战略方向。</td></tr></table></div>' +
      '</div>';
  }
  function tocHTML() {
    var items = [];
    function add(no, label, idx, part) { items.push({ no: no, label: label, idx: idx, part: part }); }
    add('', '扉页 · 成果总览', 2, false);
    add('', '目录', 3, false);
    add('第一篇', '整体研究成果', 4, true);
    add('1.1', '工作方案', 5, false);
    add('1.2', '情报源评判报告', 6, false);
    add('1.3', '前沿技术储备库（长名单）', 7, false);
    add('1.4', '各项前沿技术关系图谱', 8, false);
    add('第二篇', '各项前沿技术研究', 9, true);
    DATA.technologies.forEach(function (t, i) {
      add('2.' + (i + 1), t.name, 10 + i, false);
    });
    add('附录', '术语 · 数据来源 · 版本', 10 + DATA.technologies.length, false);
    add('', '结语', 11 + DATA.technologies.length, false);
    var lis = items.map(function (it) {
      var cls = it.part ? 'toc-part' : (it.idx > 9 ? 'toc-indent' : '');
      return '<li data-jump="' + it.idx + '" class="' + cls + '"><span class="toc-no">' + esc(it.no) + '</span><span class="toc-label">' + esc(it.label) + '</span></li>';
    }).join('');
    return '<div class="page-pad"><div class="page-title">目录</div><div class="h-rule"></div><ul class="toc-list">' + lis + '</ul></div>';
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
    var head = '<tr><th>情报源</th><th>类型</th>' + crit.map(function (c) { return '<th>' + esc(c.label) + '<br><span style="font-weight:400;color:var(--faint)">(' + c.weight + ')</span></th>'; }).join('') + '<th>加权得分</th></tr>';
    var rows = items.map(function (it) {
      return '<tr><td><b>' + esc(it.name) + '</b></td><td><span class="tag">' + esc(it.type) + '</span></td>' +
        crit.map(function (c) { return '<td><span class="score-dot" style="background:' + scoreColor(it[c.key]) + '"></span>' + it[c.key] + '</td>'; }).join('') +
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
      '<div class="pg-section"><div class="pg-h">评判汇总表</div><div style="overflow:auto"><table class="tbl">' + head + rows + '</table></div></div>' +
      '<div class="pg-section"><div class="pg-h">逐源评判</div><div class="cards">' + cards + '</div></div>' +
      '</div>';
  }
  function libraryPreviewHTML() {
    var tierOrder = { '布局层': 0, '论证层': 1, '研究层': 2, '观察层': 3 };
    var items = DATA.library.items.slice().sort(function (a, b) { return (tierOrder[a.tier] || 9) - (tierOrder[b.tier] || 9); }).slice(0, 8);
    var rows = items.map(function (it) {
      var mainName = it.short || it.name.replace(/（[^）]+）|\([^)]+\)/g, '').trim() || it.name;
      return '<tr><td><b>' + esc(mainName) + '</b></td><td><span class="tag" style="border-color:' + catColor(it.category) + ';color:' + catColor(it.category) + '">' + esc(it.category) + '</span></td><td>' + tierPill(it.tier) + '</td><td>' + scorePill(it.maturity) + '</td><td>' + scorePill(it.strategicFit) + '</td><td>' + esc(it.disposal) + '</td></tr>';
    }).join('');
    return '<div class="page-pad">' +
      '<div class="page-title">前沿技术储备库</div>' +
      '<div class="page-subtitle">长名单 · ' + DATA.library.items.length + ' 项 × ' + DATA.library.fields.length + ' 字段</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-p">储备库覆盖 ' + DATA.categories.length + ' 大战略方向，按「布局 / 论证 / 研究 / 观察」四层动态滚动管理，每项技术按完整台账字段维护，支持全文检索、多维筛选与排序。</div>' +
      '<div class="pg-section"><div class="pg-h">分层预览（节选）</div><table class="tbl"><tr><th>技术名称</th><th>战略方向</th><th>层级</th><th>成熟度</th><th>匹配度</th><th>处置档位</th></tr>' + rows + '</table></div>' +
      '<div style="text-align:center;margin-top:14px"><button class="btn active" data-action="open-library">打开完整储备库（检索 / 筛选 / 全字段）</button></div>' +
      '</div>';
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
      '<div class="page-title">各项前沿技术关系图谱</div>' +
      '<div class="page-subtitle">' + g.nodes.length + ' 个技术节点 · ' + g.edges.length + ' 条关系边</div>' +
      '<div class="h-rule"></div>' +
      '<div class="pg-p">以力导向图刻画 ' + g.nodes.length + ' 项技术之间的「同族 / 依赖 / 互补 / 竞争」关系，支持拖拽、缩放、按关系筛选，点击节点直达对应技术详情。</div>' +
      '<div class="pg-section"><div class="pg-h">关系类型</div><div class="legend">' + relLegend + '</div></div>' +
      '<div class="pg-section"><div class="pg-h">战略方向</div><div class="legend">' + catLegend + '</div></div>' +
      '<div style="text-align:center;margin-top:14px"><button class="btn active" data-action="open-graph">打开交互式关系图谱</button></div>' +
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
          '<button class="btn btn-sm active bk-btn" data-action="open-tech" data-id="' + tech.id + '">📄 完整专题</button>' +
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
          '<div class="page-title tech-title">' +
            '<span class="tech-no-badge">' + esc(tech.id) + '</span> ' +
            '<span>' + esc(tech.name) + '</span>' +
            '<span style="font-size:13px;color:var(--dim);font-weight:400;margin-left:8px">' + esc(tech.nameEn || '') + '</span>' +
          '</div>' +
          '<div class="tech-sub-tags">' + tags + '</div>' +
        '</div>' +
        '<div class="wth-right">' +
          '<button class="btn active" data-action="open-tech" data-id="' + tech.id + '">📄 查看完整专题（报告 / PPT / 一张图）</button>' +
        '</div>' +
      '</div>' +
      '<div class="h-rule" style="margin:10px 0 16px"></div>' +
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
      '<tr><td>科技树</td><td>梳理技术间"前提技术→依赖技术"的层次关系，节点不限于长名单。</td></tr>' +
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
      '<div class="pg-p">本电子研究书以「整体研究成果 + 重点技术专题」双层结构汇集银行金融科技前沿技术研究的关键结论：长名单识别重点方向与分层，关系图谱刻画技术间同族、依赖、互补与竞争关系，科技树梳理技术间的前提依赖层次，专题报告与评估表支撑逐项研判。</div>' +
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

  addPage('inside', '', insideCoverHTML());
  addPage('cover', '封面', coverHTML());
  addPage('title', '扉页 · 成果总览', titlePageHTML());
  addPage('toc', '目录', tocHTML(), true);
  addPage('part1', '第一篇', dividerHTML('第一篇', '整体研究成果', '工作方案 · 情报源评判 · 前沿技术储备库 · 技术关系图谱', '01'));
  addPage('workplan', '第一篇 · 工作方案', workplanHTML());
  addPage('sources', '第一篇 · 情报源评判报告', sourcesHTML());
  addPage('library', '第一篇 · 前沿技术储备库', libraryPreviewHTML());
  addPage('graph', '第一篇 · 关系图谱', graphPreviewHTML());
  addPage('part2', '第二篇', dividerHTML('第二篇', '各项前沿技术研究', '评估表 · 专题研究报告（Word / PPT）· 一张图概述', '02'));
  DATA.technologies.forEach(function (t) { addPage('tech-' + t.id, '第二篇 · ' + t.name, techBookHTML(t)); });
  addPage('appendix', '附录', appendixHTML());
  addPage('closing', '结语', closingHTML());
  addPage('back', '封底', backCoverHTML());
  addPage('blankEnd', '', '');
  var maxSpread = Math.floor((pages.length - 1) / 2);

  /* ==================== 左右双侧技术书签系统 (Dynamic Left/Right Side Tabs) ==================== */
  function getAllBookmarks() {
    var bms = [
      { id: 'cover', no: '封面', short: '成果总览', name: '封面 · 成果总览', page: pageKeyMap['cover'] != null ? pageKeyMap['cover'] : 1, color: '#818cf8', tier: '前序' },
      { id: 'toc', no: '目录', short: '本书目录', name: '目录', page: pageKeyMap['toc'] != null ? pageKeyMap['toc'] : 3, color: '#818cf8', tier: '前序' },
      { id: 'part1', no: '第一篇', short: '成果总览', name: '第一篇 · 整体研究成果', page: pageKeyMap['part1'] != null ? pageKeyMap['part1'] : 4, color: '#6366f1', tier: '第一篇' },
      { id: 'workplan', no: '1.1', short: '工作方案', name: '第一篇 · 工作方案', page: pageKeyMap['workplan'] != null ? pageKeyMap['workplan'] : 5, color: '#6366f1', tier: '第一篇' },
      { id: 'sources', no: '1.2', short: '情报源评判', name: '第一篇 · 情报源评判报告', page: pageKeyMap['sources'] != null ? pageKeyMap['sources'] : 6, color: '#6366f1', tier: '第一篇' },
      { id: 'library', no: '1.3', short: '技术储备库', name: '第一篇 · 前沿技术储备库（长名单）', page: pageKeyMap['library'] != null ? pageKeyMap['library'] : 7, color: '#6366f1', tier: '第一篇' },
      { id: 'graph', no: '1.4', short: '关系图谱', name: '第一篇 · 各项前沿技术关系图谱', page: pageKeyMap['graph'] != null ? pageKeyMap['graph'] : 8, color: '#6366f1', tier: '第一篇' },
      { id: 'part2', no: '第二篇', short: '专题研究', name: '第二篇 · 各项前沿技术研究', page: pageKeyMap['part2'] != null ? pageKeyMap['part2'] : 9, color: '#a855f7', tier: '第二篇' }
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
      var dirArrow = isLeft ? '◂ 回翻至 ' : '▸ 前往 ';
      return '<div class="edge-tab" data-page="' + b.page + '" style="--tab-color:' + b.color + '">' +
        '<span class="et-no" style="color:' + b.color + '">' + esc(b.no) + '</span>' +
        '<span class="et-name" title="' + esc(b.name) + '">' + esc(b.short) + '</span>' +
        '<div class="edge-tab-tip">' + dirArrow + esc(b.name) + '</div>' +
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
    if (isSingle()) {
      var label = pageLabels[singleIdx] || '';
      $('pageNo').textContent = label ? (label + ' · ' + (singleIdx + 1) + ' / ' + pages.length) : '';
    } else {
      var l = pageLabels[spread * 2] || '', r = pageLabels[spread * 2 + 1] || '';
      if (spread === 0) {
        $('pageNo').textContent = '封面 · 成果总览';
      } else if (spread === maxSpread) {
        $('pageNo').textContent = (l || '封底') + ' · 跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
      } else if (l && r) {
        $('pageNo').textContent = l + '　·　' + r + ' · 跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
      } else if (l) {
        $('pageNo').textContent = l + ' · 跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
      } else if (r) {
        $('pageNo').textContent = r + ' · 跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
      } else {
        $('pageNo').textContent = '跨页 ' + (spread + 1) + ' / ' + (maxSpread + 1);
      }
    }
  }
  function fitPage(el, idx) {
    if (!el) return;
    if (pageScroll[idx]) { el.classList.add('scroll'); return; }
    el.classList.remove('scroll');
    var pad = el.querySelector('.page-pad');
    if (!pad) return;
    pad.style.transform = '';
    var aw = el.clientWidth, ah = el.clientHeight;
    var nw = pad.scrollWidth, nh = pad.scrollHeight;
    if (nw <= aw + 1 && nh <= ah + 1) return;
    var s = Math.min(aw / nw, ah / nh);
    if (s >= 1) return;
    pad.style.transformOrigin = 'top left';
    pad.style.transform = 'scale(' + s + ')';
  }
  function fitSpread() {
    if (isSingle()) { fitPage($('pageRightInner'), singleIdx); return; }
    fitPage($('pageLeftInner'), spread * 2);
    fitPage($('pageRightInner'), spread * 2 + 1);
  }
  function renderSpread() {
    if (isSingle()) {
      var sHtml = pages[singleIdx] || '';
      $('pageLeftInner').innerHTML = '';
      $('pageRightInner').innerHTML = sHtml;
      $('pageLeft').classList.add('page-blank');
      $('pageRight').classList.toggle('page-blank', !sHtml.trim());
      $('pageRightInner').parentElement.style.width = '100%';
      $('pageRightInner').classList.toggle('scroll', !!pageScroll[singleIdx]);
    } else {
      var leftHtml = pages[spread * 2] || '';
      var rightHtml = pages[spread * 2 + 1] || '';
      $('pageLeftInner').innerHTML = leftHtml;
      $('pageRightInner').innerHTML = rightHtml;
      $('pageRightInner').parentElement.style.width = '';

      // 封面前（左侧空白）和 封底后（右侧空白）不渲染白色底板，直接透出背景，呈现真实闭合封面效果
      $('pageLeft').classList.toggle('page-blank', !leftHtml.trim());
      $('pageRight').classList.toggle('page-blank', !rightHtml.trim());

      $('pageLeftInner').classList.toggle('scroll', !!pageScroll[spread * 2]);
      $('pageRightInner').classList.toggle('scroll', !!pageScroll[spread * 2 + 1]);
    }
    updatePageNo();
    renderSideBookmarks();
    bindPageActions();
    fitSpread();
  }
  function bindPageActions() {
    var tocLis = document.querySelectorAll('#bookView .toc-list li');
    tocLis.forEach(function (li) {
      li.onclick = function (e) {
        if (e) e.stopPropagation();
        jumpToPage(parseInt(li.getAttribute('data-jump'), 10));
      };
    });
    document.querySelectorAll('[data-action]').forEach(function (el) {
      el.onclick = function (e) {
        if (e) e.stopPropagation();
        var action = el.getAttribute('data-action');
        var id = el.getAttribute('data-id');
        if (action === 'open-library') openLibraryPanel();
        else if (action === 'open-graph') openGraphPanel();
        else if (action === 'open-tech') openTechPanel(findTech(id), el.getAttribute('data-tab'));
      };
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
    var oldRight = pages[spread * 2 + 1] || '';
    var newLeft = pages[spread * 2 + 2] || '';
    var newRight = pages[spread * 2 + 3] || '';
    $('pageRightInner').innerHTML = newRight;
    $('turnFrontInner').innerHTML = oldRight;
    $('turnBackInner').innerHTML = newLeft;
    $('pageRight').classList.toggle('page-blank', !newRight.trim());
    $('pageLeft').classList.toggle('page-blank', !newLeft.trim());
    var sheet = $('turnSheet');
    sheet.classList.remove('back');
    sheet.style.display = 'block';
    sheet.classList.remove('turning');
    void sheet.offsetWidth;
    fitPage($('turnFrontInner'), spread * 2 + 1);
    fitPage($('turnBackInner'), spread * 2 + 2);
    fitPage($('pageRightInner'), spread * 2 + 3);
    sheet.classList.add('turning');
    setTimeout(function () {
      spread++;
      var leftHtml = pages[spread * 2] || '';
      var rightHtml = pages[spread * 2 + 1] || '';
      $('pageLeftInner').innerHTML = leftHtml;
      $('pageRightInner').innerHTML = rightHtml;
      $('pageLeft').classList.toggle('page-blank', !leftHtml.trim());
      $('pageRight').classList.toggle('page-blank', !rightHtml.trim());
      $('pageLeftInner').classList.toggle('scroll', !!pageScroll[spread * 2]);
      $('pageRightInner').classList.toggle('scroll', !!pageScroll[spread * 2 + 1]);
      fitSpread();
      updatePageNo();
      renderSideBookmarks();
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
    var oldLeft = pages[spread * 2] || '';
    var newLeft = pages[spread * 2 - 2] || '';
    var newRight = pages[spread * 2 - 1] || '';
    $('pageLeftInner').innerHTML = newLeft;
    $('turnFrontInner').innerHTML = oldLeft;
    $('turnBackInner').innerHTML = newRight;
    $('pageLeft').classList.toggle('page-blank', !newLeft.trim());
    var sheet = $('turnSheet');
    sheet.classList.add('back');
    sheet.style.display = 'block';
    sheet.classList.remove('turning');
    void sheet.offsetWidth;
    fitPage($('turnFrontInner'), spread * 2);
    fitPage($('turnBackInner'), spread * 2 - 1);
    fitPage($('pageLeftInner'), spread * 2 - 2);
    sheet.classList.add('turning');
    setTimeout(function () {
      spread--;
      var leftHtml = pages[spread * 2] || '';
      var rightHtml = pages[spread * 2 + 1] || '';
      $('pageLeftInner').innerHTML = leftHtml;
      $('pageRightInner').innerHTML = rightHtml;
      $('pageLeft').classList.toggle('page-blank', !leftHtml.trim());
      $('pageRight').classList.toggle('page-blank', !rightHtml.trim());
      $('pageLeftInner').classList.toggle('scroll', !!pageScroll[spread * 2]);
      $('pageRightInner').classList.toggle('scroll', !!pageScroll[spread * 2 + 1]);
      fitSpread();
      updatePageNo();
      renderSideBookmarks();
      bindPageActions();
      sheet.style.display = 'none';
      sheet.classList.remove('turning');
      sheet.classList.remove('back');
      flipping = false;
    }, 860);
  }

  /* ==================== 网页视图（目录 + 滚动内容） ==================== */
  function webSection(id, no, title, bodyHtml) {
    return '<div class="sec" id="' + id + '"><div class="sec-head"><span class="sec-no">' + esc(no) + '</span><span class="sec-title">' + esc(title) + '</span></div><div class="sec-body">' + bodyHtml + '</div></div>';
  }
  function renderWeb() {
    var b = DATA.book;
    var sections = [];
    sections.push('<div class="sec" id="s-title"><div class="sec-head"><span class="sec-title">' + esc(b.title) + '</span></div><div class="sec-body">' + titlePageHTML() + '</div></div>');
    sections.push(webSection('s-workplan', '1.1', '工作方案', workplanHTML()));
    sections.push(webSection('s-sources', '1.2', '情报源评判报告', sourcesHTML()));
    sections.push(webSection('s-library', '1.3', '前沿技术储备库（长名单）', libraryPreviewHTML()));
    sections.push(webSection('s-graph', '1.4', '各项前沿技术关系图谱', graphPreviewHTML()));
    DATA.technologies.forEach(function (t, i) {
      sections.push(webSection('s-tech-' + t.id, '2.' + (i + 1), t.name + ' 专题研究', techWebHTML(t)));
    });
    sections.push(webSection('s-appendix', '附录', '术语 · 数据来源 · 版本', appendixHTML()));
    sections.push(webSection('s-closing', '结语', '结语', closingHTML()));
    $('webContent').innerHTML = sections.join('');

    // 目录
    var toc = ['<h3>目录</h3>'];
    toc.push('<div class="web-toc-item" data-target="s-title"><span class="wt-no"></span>扉页 · 成果总览</div>');
    toc.push('<div class="web-toc-item part" data-target="s-workplan">第一篇 · 整体研究成果</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-workplan"><span class="wt-no">1.1</span>工作方案</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-sources"><span class="wt-no">1.2</span>情报源评判报告</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-library"><span class="wt-no">1.3</span>前沿技术储备库</div>');
    toc.push('<div class="web-toc-item sub" data-target="s-graph"><span class="wt-no">1.4</span>技术关系图谱</div>');
    toc.push('<div class="web-toc-item part" data-target="s-tech-' + DATA.technologies[0].id + '">第二篇 · 各项前沿技术研究</div>');
    DATA.technologies.forEach(function (t, i) {
      toc.push('<div class="web-toc-item sub" data-target="s-tech-' + t.id + '"><span class="wt-no">2.' + (i + 1) + '</span>' + esc(t.name) + '</div>');
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

  /* ==================== 科技树（文明式分层） ==================== */
  function renderTree() {
    var legend = '<div class="tree-title">科技树 · 技术前提依赖（分层时代）</div>' +
      '<div class="tree-legend">' +
      '<span class="lg"><span class="line" style="background:#64748b"></span>前提依赖（主）</span>' +
      '<span class="lg"><span class="line" style="background:#94a3b8;opacity:.5;border-top:2px dashed #94a3b8"></span>前提依赖（次）</span>' +
      '<span class="lg"><span class="dot" style="background:#1e293b;border:1px dashed #64748b"></span>基础底座（长名单外）</span>' +
      DATA.categories.map(function (c) { return '<span class="lg"><span class="dot" style="background:' + catColor(c) + '"></span>' + esc(c) + '</span>'; }).join('') +
      '</div>' +
      '<button class="btn" id="treeReset" style="margin-left:auto">重置视图</button>';
    $('treeToolbar').innerHTML = legend;
    initTechTree();
  }

  function initTechTree() {
    var stage = $('treeStage');
    if (!stage) return;
    var tt = DATA.techTree;
    var nodeIdx = {};
    tt.nodes.forEach(function (n) { nodeIdx[n.id] = n; });
    var children = {}, parent = {};
    tt.edges.forEach(function (e) { (children[e.from] = children[e.from] || []).push(e.to); parent[e.to] = e.from; });
    var roots = tt.nodes.filter(function (n) { return !parent[n.id]; });

    // 深度（时代层）
    var depth = {}, maxDepth = 0;
    var queue = roots.map(function (r) { return r.id; });
    queue.forEach(function (id) { depth[id] = 0; });
    var qi = 0;
    while (qi < queue.length) {
      var qid = queue[qi++];
      (children[qid] || []).forEach(function (c) { depth[c] = depth[qid] + 1; maxDepth = Math.max(maxDepth, depth[c]); queue.push(c); });
    }

    // 逐层排序：BFS 传播，子节点紧随父节点，减少连线交叉
    var order = [], seen = {};
    order[0] = roots.map(function (r) { seen[r.id] = true; return r.id; });
    var lv = 0;
    while (order[lv] && order[lv].length) {
      order[lv].forEach(function (id) {
        (children[id] || []).forEach(function (c) {
          if (seen[c]) return; seen[c] = true;
          order[lv + 1] = order[lv + 1] || [];
          order[lv + 1].push(c);
        });
      });
      lv++;
    }

    // 布局参数
    var nodeW = 172, nodeH = 46, colW = 244, rowStep = 58, padX = 28, headH = 46, padTop = 18;
    var pos = {}, maxRows = 0;
    for (var l = 0; l <= maxDepth; l++) {
      var arr = order[l] || [];
      maxRows = Math.max(maxRows, arr.length);
      arr.forEach(function (id, r) { pos[id] = { x: padX + l * colW, y: padTop + headH + r * rowStep }; });
    }
    var totalW = padX + (maxDepth + 1) * colW + 40;
    var totalH = padTop + headH + maxRows * rowStep + 40;
    var levelLabels = { 0: '第 0 层 · 基础底座', 1: '第 1 层 · 使能技术', 2: '第 2 层 · 系统与应用' };

    var svgNS = 'http://www.w3.org/2000/svg';
    stage.innerHTML = '';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + totalW + ' ' + totalH);
    svg.style.width = '100%'; svg.style.height = '100%';
    var viewport = document.createElementNS(svgNS, 'g');
    svg.appendChild(viewport); stage.appendChild(svg);

    var defs = document.createElementNS(svgNS, 'defs');
    defs.innerHTML = '<marker id="tarrow" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#64748b" opacity=".65"/></marker>';
    svg.appendChild(defs);

    // 时代列背景 + 标题
    for (var l2 = 0; l2 <= maxDepth; l2++) {
      var bandX = padX + l2 * colW - 12;
      var bandW = nodeW + 24;
      var band = document.createElementNS(svgNS, 'rect');
      band.setAttribute('x', bandX);
      band.setAttribute('y', padTop - 6);
      band.setAttribute('width', bandW);
      band.setAttribute('height', totalH - padTop - 14);
      band.setAttribute('rx', 14);
      band.setAttribute('fill', l2 % 2 ? 'rgba(148,163,184,.05)' : 'rgba(148,163,184,.10)');
      band.style.pointerEvents = 'none';
      viewport.appendChild(band);
      var ht = document.createElementNS(svgNS, 'text');
      ht.setAttribute('x', bandX + bandW / 2);
      ht.setAttribute('y', padTop + 8);
      ht.setAttribute('text-anchor', 'middle');
      ht.setAttribute('font-size', '13');
      ht.setAttribute('font-weight', '700');
      ht.setAttribute('fill', 'var(--accent)');
      ht.style.pointerEvents = 'none';
      ht.textContent = levelLabels[l2] || ('第 ' + l2 + ' 层');
      viewport.appendChild(ht);
    }

    function drawEdge(from, to, co) {
      var a = pos[from], b = pos[to];
      if (!a || !b) return;
      var x1 = a.x + nodeW, y1 = a.y + nodeH / 2;
      var x2 = b.x, y2 = b.y + nodeH / 2;
      var mx = (x1 + x2) / 2;
      var line = document.createElementNS(svgNS, 'path');
      var d = 'M' + x1 + ' ' + y1 + ' C ' + mx + ' ' + y1 + ', ' + mx + ' ' + y2 + ', ' + x2 + ' ' + y2;
      line.setAttribute('d', d);
      line.setAttribute('fill', 'none');
      line.setAttribute('stroke', co ? '#94a3b8' : '#64748b');
      line.setAttribute('stroke-width', co ? 1.1 : 1.6);
      line.setAttribute('opacity', co ? 0.35 : 0.55);
      if (co) line.setAttribute('stroke-dasharray', '5 5');
      if (!co) line.setAttribute('marker-end', 'url(#tarrow)');
      viewport.appendChild(line);
    }

    tt.edges.forEach(function (e) { drawEdge(e.from, e.to, false); });
    tt.coEdges.forEach(function (e) { drawEdge(e.from, e.to, true); });

    tt.nodes.forEach(function (n) {
      var g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'tree-node');
      g.setAttribute('transform', 'translate(' + pos[n.id].x + ',' + pos[n.id].y + ')');
      var isLib = n.kind === 'library';
      var fill = isLib ? catColor(n.categoryKey) : '#1e293b';
      var label = n.name.length > 12 ? n.name.slice(0, 12) + '…' : n.name;
      var sub = isLib ? (n.tier || '') : '基础底座';
      var rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', 0); rect.setAttribute('y', 0);
      rect.setAttribute('width', nodeW); rect.setAttribute('height', nodeH);
      rect.setAttribute('rx', 10);
      rect.setAttribute('fill', isLib ? fill : '#1e293b');
      rect.setAttribute('stroke', isLib ? fill : '#64748b');
      rect.setAttribute('stroke-width', 1.4);
      rect.setAttribute('opacity', isLib ? 0.88 : 1);
      if (!isLib) rect.setAttribute('stroke-dasharray', '6 4');
      g.appendChild(rect);
      if (isLib) {
        var bar = document.createElementNS(svgNS, 'rect');
        bar.setAttribute('x', 3); bar.setAttribute('y', 9);
        bar.setAttribute('width', 4); bar.setAttribute('height', nodeH - 18);
        bar.setAttribute('rx', 2);
        bar.setAttribute('fill', '#ffffff');
        bar.setAttribute('opacity', '0.55');
        g.appendChild(bar);
      }
      var txt = document.createElementNS(svgNS, 'text');
      txt.setAttribute('x', 14); txt.setAttribute('y', nodeH / 2 + 1);
      txt.setAttribute('font-size', '12.5');
      txt.setAttribute('font-weight', '600');
      txt.setAttribute('fill', isLib ? '#fff' : 'var(--dim)');
      txt.style.pointerEvents = 'none';
      txt.textContent = label;
      g.appendChild(txt);
      var subTxt = document.createElementNS(svgNS, 'text');
      subTxt.setAttribute('x', 14); subTxt.setAttribute('y', nodeH - 10);
      subTxt.setAttribute('font-size', '9.5');
      subTxt.setAttribute('fill', 'var(--faint)');
      subTxt.style.pointerEvents = 'none';
      subTxt.textContent = sub;
      g.appendChild(subTxt);
      g.addEventListener('click', function () {
        if (isLib) { openTechPanel(findTech(n.libId)); }
        else { openModal(n.name + ' · 基础底座', '<div class="pg-p">' + esc(n.desc || '') + '</div><div class="pg-p dim">此为基础技术底座，不属于 36 项长名单，是上层技术的前提。其上派生的长名单技术：' + (children[n.id] || []).map(function (c) { return esc(nodeIdx[c].name); }).join('、') + '</div>'); }
      });
      viewport.appendChild(g);
    });

    var tx = 0, ty = 0, k = 1;
    function applyView() { viewport.setAttribute('transform', 'translate(' + tx + ',' + ty + ') scale(' + k + ')'); }
    function fitTree() {
      var sw = stage.clientWidth, sh = stage.clientHeight;
      var s = Math.min((sw - 32) / totalW, (sh - 32) / totalH, 1);
      k = Math.max(0.15, s);
      tx = (sw - totalW * k) / 2;
      ty = (sh - totalH * k) / 2;
      applyView();
    }
    fitTree();
    var panning = false, px = 0, py = 0;
    svg.addEventListener('mousedown', function (e) {
      var tag = e.target.tagName;
      if (tag === 'rect' || tag === 'text') return;
      panning = true; px = e.clientX; py = e.clientY; stage.classList.add('dragging');
    });
    window.addEventListener('mousemove', function (e) {
      if (!panning) return;
      tx += e.clientX - px; ty += e.clientY - py; px = e.clientX; py = e.clientY; applyView();
    });
    window.addEventListener('mouseup', function () { panning = false; stage.classList.remove('dragging'); });
    svg.addEventListener('wheel', function (e) {
      e.preventDefault();
      var rect = svg.getBoundingClientRect();
      var mx = e.clientX - rect.left, my = e.clientY - rect.top;
      var nk = k * (e.deltaY > 0 ? 0.9 : 1.1);
      nk = Math.max(0.12, Math.min(3, nk));
      tx = mx - (mx - tx) * (nk / k); ty = my - (my - ty) * (nk / k);
      k = nk; applyView();
    }, { passive: false });
    $('treeReset').onclick = fitTree;
  }
  /* ==================== 长名单面板 ==================== */
  function libraryHTML() {
    var catOpts = '<option value="">全部战略方向</option>' + DATA.categories.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join('');
    var tierOpts = '<option value="">全部层级</option>' + DATA.tiers.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join('');
    return '<div class="lib-toolbar">' +
      '<input id="libSearch" type="text" placeholder="搜索技术名称 / 关键词 / 应用…">' +
      '<select id="libCat">' + catOpts + '</select>' +
      '<select id="libTier">' + tierOpts + '</select>' +
      '<span class="lib-count" id="libCount"></span></div>' +
      '<div class="lib-table-wrap"><table class="lib-table"><thead><tr>' +
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
      '<th data-sort="attention">关注度</th>' +
      '<th data-sort="status">处置状态</th>' +
      '<th>操作</th>' +
      '</tr></thead><tbody id="libTbody"></tbody></table></div>' +
      '<div class="pager"><button id="pgPrev">‹ 上一页</button><span id="pgInfo"></span><button id="pgNext">下一页 ›</button></div>';
  }
  var libState = { q: '', cat: '', tier: '', sort: 'no', dir: 1, page: 0, pageSize: 15 };
  function initLibrary(prefilter) {
    libState = { q: prefilter || '', cat: '', tier: '', sort: 'no', dir: 1, page: 0, pageSize: 15 };
    if (prefilter) $('libSearch').value = prefilter;
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
      $('pgInfo').textContent = (total ? (start + 1) : 0) + '–' + Math.min(start + libState.pageSize, total) + ' / ' + total + ' 项';
      $('pgPrev').disabled = libState.page === 0;
      $('pgNext').disabled = libState.page >= pages - 1;
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
          '<td>' + esc(it.attention || '—') + '</td>' +
          '<td>' + esc(it.status || '—') + '</td>' +
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
  function openLibraryPanel(prefilter) { openPanel('前沿技术储备库（长名单 · 36 项）', libraryHTML(), function () { initLibrary(prefilter); }); }

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
  function openGraphPanel() { openPanel('各项前沿技术关系图谱', graphToolbarHTML() + '<div id="graphBox"></div><div class="graph-tip" style="margin-top:8px">滚轮缩放 · 拖拽空白平移 · 拖拽节点调整 · 点击节点查看详情</div>', function () { initForceGraph(); }); }

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
    if (tech.image) tabs.push({ key: 'image', name: '一张图概述', html: onePageHTML(tech), fill: true });
    tabs.push({ key: 'assess', name: '评估表', html: assessHTML(tech), fill: false });
    if (tech.reportPdf || tech.reportDocx) tabs.push({ key: 'word', name: 'Word 报告', html: wordHTML(tech), fill: true });
    if (tech.slidesPdf || tech.slidesPptx) tabs.push({ key: 'ppt', name: 'PPT 报告', html: pptHTML(tech), fill: true });
    return tabs;
  }
  function onePageHTML(tech) {
    return '<div class="onepage-wrap"><img id="onepageImg" src="' + esc(tech.image) + '" alt="' + esc(tech.name) + ' 一张图概述"></div>';
  }
  function assessHTML(tech) {
    var dims = tech.assessment.dimensions;
    var rows = dims.map(function (d) {
      return '<tr><th>' + esc(d.label) + '</th><td style="width:180px">' + scoreBar(d.score, d.max || 5) + '</td><td><b style="color:' + dimColor(d) + '">' + d.score + '/5</b></td></tr>';
    }).join('');
    var info = '';
    if (tech.definition) info += '<div class="pg-section"><div class="pg-h">定义</div><div class="pg-p">' + esc(tech.definition) + '</div></div>';
    if (tech.trend) info += '<div class="pg-section"><div class="pg-h">颠覆性趋势</div><div class="pg-p">' + esc(tech.trend) + '</div></div>';
    if (tech.bankValue) info += '<div class="pg-section"><div class="pg-h">对银行的价值</div><div class="pg-p">' + esc(tech.bankValue) + '</div></div>';
    if (tech.limitation) info += '<div class="pg-section"><div class="pg-h">当前局限性</div><div class="pg-p">' + esc(tech.limitation) + '</div></div>';
    var basis = '';
    var basisFields = [['maturityBasis', '技术成熟度'], ['strategicFitBasis', '战略匹配度'], ['valueBasis', '价值贡献度'], ['feasibilityBasis', '引入可行度'], ['urgencyBasis', '战略紧迫度'], ['opennessBasis', '生态开放度']];
    var basisRows = basisFields.map(function (bf) {
      if (!tech[bf[0]]) return '';
      return '<div class="pg-section"><div class="pg-h">' + bf[1] + ' · 研判依据</div><div class="pg-p dim">' + esc(tech[bf[0]]) + '</div></div>';
    }).join('');
    if (basisRows) basis = '<div class="chart-card" style="margin-top:14px"><h4>六维研判依据</h4>' + basisRows + '</div>';
    return '<div class="chart-card" style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start">' +
      '<div style="flex:1.2;min-width:320px"><h4>多轮评估雷达对比</h4>' + radarSVG(tech) + '</div>' +
      '<div style="flex:1;min-width:260px"><h4>评估表（六维）</h4><table class="tbl"><tr><th>评估维度</th><th>评分</th><th>得分</th></tr>' + rows + '</table></div>' +
      '</div>' +
      '<div class="chart-card" style="margin-top:14px"><h4>研判结论与处置逻辑</h4><div class="pg-p">' + esc(tech.conclusion) + '</div></div>' +
      basis + info;
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
  function techDetailHTML(tech) {
    var tabs = techTabs(tech);
    var head = '<div class="tech-head"><h2>' + esc(tech.name) + '</h2><span class="tag" style="border-color:' + catColor(tech.category) + ';color:' + catColor(tech.category) + '">' + esc(tech.category) + '</span>' +
      tierPill(tech.tier) + '<span class="badge acc">成熟度 ' + tech.maturity + '/5</span>' +
      '<span style="font-size:12px;color:var(--dim)">' + esc(tech.nameEn || '') + '</span></div>';
    var sum = '<div class="tech-detail-sum">' + esc(tech.summary) + '</div>';
    var tabBtns = tabs.map(function (t, i) { return '<button class="tab' + (i === 0 ? ' active' : '') + '" data-name="' + t.key + '">' + esc(t.name) + '</button>'; }).join('');
    var panes = tabs.map(function (t, i) {
      var cls = 'tabpane' + (i === 0 ? ' active' : '') + (t.fill ? ' fill' : '');
      return '<div class="' + cls + '" data-name="' + t.key + '">' + t.html + '</div>';
    }).join('');
    return '<div class="tech-detail"><div class="tech-detail-bar">' + head + '</div>' + sum + '<div class="tabs">' + tabBtns + '</div><div class="tech-detail-body">' + panes + '</div></div>';
  }
  function openTechPanel(tech, tab) {
    if (!tech) return;
    openPanel(tech.name + ' · 专题研究', techDetailHTML(tech), function () {
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
          openTechPanel(findTech(h.id));
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

  /* ==================== 主题 / 模式切换 ==================== */
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
    $('treeView').classList.toggle('hidden', m !== 'tree');
    $('btnBook').classList.toggle('active', m === 'book');
    $('btnWeb').classList.toggle('active', m === 'web');
    $('btnTree').classList.toggle('active', m === 'tree');
    if (m === 'book') renderSpread();
    else if (m === 'web') renderWeb();
    else if (m === 'tree') renderTree();
  }

  /* ==================== 初始化 ==================== */
  function init() {
    try { var t = localStorage.getItem('dsh-theme'); if (t) document.documentElement.setAttribute('data-theme', t); } catch (e) {}
    bindOverlayClose();
    initSearch();
    $('brandBtn').onclick = function () { setMode('book'); jumpToPage(1); };
    $('btnBook').onclick = function () { setMode('book'); };
    $('btnWeb').onclick = function () { setMode('web'); };
    $('btnTree').onclick = function () { setMode('tree'); };
    $('btnTheme').onclick = toggleTheme;
    $('navNext').onclick = flipForward;
    $('navPrev').onclick = flipBackward;
    document.addEventListener('keydown', function (e) {
      if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight') flipForward();
      else if (e.key === 'ArrowLeft') flipBackward();
      else if (e.key === 'Home') jumpToPage(1);
    });
    if ($('bookSideLeft')) $('bookSideLeft').addEventListener('click', function (e) { e.stopPropagation(); });
    if ($('bookSideRight')) $('bookSideRight').addEventListener('click', function (e) { e.stopPropagation(); });
    var book = $('book');
    book.addEventListener('click', function (e) {
      if (flipping || isSingle()) return;
      if (e.target.closest('button, li, a, iframe, .book-side-col, .edge-tab, .book-nav, .book-page-no, .btn')) return;
      var rect = book.getBoundingClientRect();
      var x = e.clientX - rect.left;
      if (x < rect.width * 0.18) flipBackward();
      else if (x > rect.width * 0.82) flipForward();
    });
    window.addEventListener('resize', function () { if (mode === 'book') renderSpread(); });
    renderSpread();

    // URL 深链
    if (location.hash) {
      var h = location.hash.substring(1);
      setTimeout(function () {
        if (h === 'library') openLibraryPanel();
        else if (h === 'graph') openGraphPanel();
        else if (h === 'web') setMode('web');
        else if (h === 'tree') setMode('tree');
        else if (h.indexOf('tech-') === 0) openTechPanel(findTech(h.substring(5)));
      }, 0);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
