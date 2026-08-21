# =====================================================================
# 生成 3 份样例专题报告（Word + PPT）并转换为 PDF，用于演示展示效果。
# 依赖：Microsoft Word / PowerPoint（COM）
# 用法：pwsh -File scripts/make_sample_docs.ps1
# =====================================================================
$ErrorActionPreference = "Stop"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

$techs = @(
  @{
    id = 'T01'; name = '生成式人工智能'; cat = '人工智能'; trl = 'TRL 8';
    summary = '以大模型为核心的生成式人工智能正重塑内容生产与知识工作方式，是当前最具战略牵引力的技术方向之一，已从技术验证进入规模化应用阶段。'
    keytech = @('大模型预训练与对齐（RLHF/DPO）','多模态理解与生成','检索增强生成（RAG）与长上下文','高效推理与端侧部署','智能体（Agent）与工具调用')
    apps = @('智能办公与内容生产','医疗辅助与药物研发','自动驾驶与具身智能','科学发现（材料/分子/代码）','工业质检与知识服务')
    conclusion = '优先布局、重点投入。在大模型基础能力、算力自主与安全治理三条线同步发力，防范关键技术卡点与安全风险。'
  },
  @{
    id = 'T07'; name = '量子计算'; cat = '量子科技'; trl = 'TRL 4';
    summary = '量子计算在特定问题上具备指数级加速潜力，是未来计算能力跃升的战略制高点，当前处于从实验室原理验证向工程化、实用化过渡的关键期。'
    keytech = @('超导/离子阱/光量子等多路线并行','量子纠错与容错计算','量子比特保真度与规模化集成','量子-经典混合计算架构','抗量子密码（PQC）同步布局')
    apps = @('密码破译与信息安全','药物分子与新材料模拟','金融组合优化与风险建模','物流路径优化与气象预报','量子精密测量与传感')
    conclusion = '前瞻布局、长期投入。重点突破量子纠错与规模化集成，同步布局抗量子密码，应对"先存储后破解"风险。'
  },
  @{
    id = 'T16'; name = '固态电池'; cat = '新能源'; trl = 'TRL 6';
    summary = '固态电池以更高能量密度与本质安全优势，被视为下一代动力电池与储能的主流技术路线，产业化进程持续加速，半固态已进入量产验证。'
    keytech = @('硫化物/氧化物/聚合物电解质路线','固固界面工程与离子电导率提升','锂金属负极与高镍正极匹配','规模化制备与干法电极工艺','成本控制与一致性保障')
    apps = @('新能源汽车（长续航/快充）','电网级储能电站','消费电子与可穿戴设备','低空经济/电动航空','特种装备与极端环境电源')
    conclusion = '加速产业化、抢占量产先机。重点突破固固界面、规模化制备与成本控制，强化产业链上下游协同。'
  }
)

# ---------- 生成 Word ----------
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
  foreach ($t in $techs) {
    $dir = Join-Path $Root ("assets\docs\{0}-{1}" -f $t.id, $t.name)
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $docxPath = Join-Path $dir "report.docx"
    $doc = $word.Documents.Add()
    $sel = $word.Selection

    function P($text, $size, $bold, $align) {
      $sel.Font.Bold = $bold
      $sel.Font.Size = $size
      $sel.ParagraphFormat.Alignment = $align
      $sel.TypeText($text)
      $sel.TypeParagraph()
    }

    P ($t.name + " 前沿技术专题研究报告") 20 $true 1
    P ("所属领域：" + $t.cat + "   ·   " + $t.trl + "   ·   样例演示版") 11 $false 1
    P "" 12 $false 1
    P "一、技术概述" 15 $true 0
    P $t.summary 12 $false 0
    P "" 12 $false 0
    P "二、技术成熟度与竞争态势" 15 $true 0
    P "本技术整体处于" + $t.trl + "阶段，主要竞争方包括国际领先企业与国内头部机构，国内外差距整体处于并跑/跟跑状态，需持续跟踪研判。" 12 $false 0
    $range = $sel.Range
    $table = $doc.Tables.Add($range, 5, 3)
    $table.Borders.Enable = $true
    $data = @(
      @('评估维度','评分(10分制)','权重'),
      @('技术成熟度','' ,'15%'),
      @('战略重要度','' ,'25%'),
      @('自主可控','' ,'15%'),
      @('产业带动','' ,'20%')
    )
    for ($r = 0; $r -lt 5; $r++) {
      for ($c = 0; $c -lt 3; $c++) { $table.Cell($r + 1, $c + 1).Range.Text = $data[$r][$c] }
    }
    $sel.EndKey(6) | Out-Null
    $sel.TypeParagraph()
    P "三、关键技术点" 15 $true 0
    foreach ($k in $t.keytech) { P ("•  " + $k) 12 $false 0 }
    P "四、典型应用场景" 15 $true 0
    foreach ($a in $t.apps) { P ("•  " + $a) 12 $false 0 }
    P "五、研判结论" 15 $true 0
    P $t.conclusion 12 $false 0
    P "" 12 $false 0
    P ("（本报告为样例演示文档，正式报告约 2 万字 / 20 页）") 10 $false 1

    $doc.SaveAs2($docxPath, 12)   # wdFormatXMLDocument = 12 (.docx)
    $doc.Close($false)
    Write-Host ("已生成 Word: {0}" -f $docxPath)
  }
} finally {
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
}

# ---------- 生成 PPT ----------
$ppt = New-Object -ComObject PowerPoint.Application
try {
  foreach ($t in $techs) {
    $dir = Join-Path $Root ("assets\docs\{0}-{1}" -f $t.id, $t.name)
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $pptxPath = Join-Path $dir "slides.pptx"
    $pres = $ppt.Presentations.Add($false)   # WithWindow = false

    function AddSlide($title, $bullets) {
      $slide = $pres.Slides.Add($pres.Slides.Count + 1, 12)   # 12 = ppLayoutBlank
      $tb = $slide.Shapes.AddTextbox(1, 40, 30, 680, 60)
      $tb.TextFrame.TextRange.Text = $title
      $tb.TextFrame.TextRange.Font.Size = 30
      $tb.TextFrame.TextRange.Font.Bold = $true
      $body = $slide.Shapes.AddTextbox(1, 50, 110, 660, 330)
      $body.TextFrame.TextRange.Text = ($bullets -join "`r`n")
      $body.TextFrame.TextRange.Font.Size = 18
    }

    AddSlide ($t.name + " 专题研究报告") @("所属领域：" + $t.cat + "  " + $t.trl, "前沿技术研究组 · 样例演示版")
    AddSlide "研究背景" @("• " + $t.summary, "• 技术处于快速演进期，竞争态势持续变化", "• 本报告基于多源情报交叉研判形成")
    AddSlide "技术成熟度与竞争态势" @("• 整体处于 " + $t.trl + " 阶段", "• 国内外差距：并跑/跟跑，局部领先", "• 产业化与工程化是下一阶段重点")
    AddSlide "关键技术" ($t.keytech | ForEach-Object { "• " + $_ })
    AddSlide "典型应用" ($t.apps | ForEach-Object { "• " + $_ })
    AddSlide "研判结论" @("• " + $t.conclusion, "• 建议：持续跟踪、动态调整布局", "• 谢谢")

    $pres.SaveAs($pptxPath, 24)   # ppSaveAsOpenXMLPresentation = 24 (.pptx)
    $pres.Close()
    Write-Host ("已生成 PPT: {0}" -f $pptxPath)
  }
} finally {
  $ppt.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
}

Write-Host "样例文档生成完成，开始转换为 PDF ..."
& (Join-Path $PSScriptRoot "convert.ps1")
