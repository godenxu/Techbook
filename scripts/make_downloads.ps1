# =====================================================================
# 生成下载用样例 docx / pptx（纯 .NET ZipFile 组装 OOXML，无需 Office）
# =====================================================================
$ErrorActionPreference = "Stop"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression

$techs = @(
  @{ id = 'T01';  name = '生成式人工智能';                       note = '样例演示版'; points = '· 大模型基础能力与多模态生成&#10;· 检索增强（RAG）与智能体&#10;· 建议列为重点跟踪 / 优先布局方向' },
  @{ id = 'T07';  name = '量子计算';                             note = '样例演示版'; points = '· 量子比特与纠错技术快速演进&#10;· 面向特定问题的量子优势验证&#10;· 建议列为重点跟踪 / 优先布局方向' },
  @{ id = 'T16';  name = '固态电池';                             note = '样例演示版'; points = '· 高能量密度固态电解质研发&#10;· 规模化制备与成本控制&#10;· 建议列为重点跟踪 / 优先布局方向' },
  @{ id = 'ZT010'; name = '算力网络（Compute Network）';         note = '储备库专题 · 研究层'; points = '· 东数西算枢纽进入规模运营期（八大枢纽 215.5 EFLOPS）&#10;· 以选址布局＋算力租用获取成本与韧性收益&#10;· 维持"研究层/深入研究"定档，不投入未成熟的跨域调度' },
  @{ id = 'ZT018'; name = '人工智能安全平台（AISP / AI TRiSM）'; note = '储备库专题 · 论证层'; points = '· 智能体规模化落地的前置护栏，具有强制属性&#10;· 先行 AI 资产台账与试点场景护栏 POC&#10;· 维持"论证层/系统论证"定档' },
  @{ id = 'ZT031'; name = '业务编排与自动化（BOAT）';            note = '储备库专题 · 论证层'; points = '· 以统一平台替代碎片化自动化工具拼接&#10;· 以零采购的自动化资产地图盘点为先行动作&#10;· 维持"论证层/系统论证"定档' },
  @{ id = 'ZT033'; name = '决策智能平台（DIP）';                 note = '储备库专题 · 论证层'; points = '· 银行核心业务本质即决策，与业务契合度高&#10;· 以 9 个月为期启动决策资产盘点与双场景 POC&#10;· 维持"论证层/系统论证"定档' }
)

function Write-Zip($parts, $destZip) {
  $tmp = Join-Path $env:TEMP ("zip_" + [guid]::NewGuid().ToString("N"))
  New-Item -ItemType Directory -Path $tmp -Force | Out-Null
  $enc = New-Object System.Text.UTF8Encoding($false)
  foreach ($k in $parts.Keys) {
    $fp = Join-Path $tmp $k
    $d = Split-Path $fp -Parent
    if (-not (Test-Path $d)) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
    [System.IO.File]::WriteAllText($fp, $parts[$k], $enc)
  }
  $destDir = Split-Path $destZip -Parent
  if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
  if (Test-Path $destZip) { Remove-Item $destZip -Force }
  [System.IO.Compression.ZipFile]::CreateFromDirectory($tmp, $destZip)
  Remove-Item -Recurse -Force $tmp
}

# ---------------- DOCX 部件 ----------------
$docxContentTypes = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>
'@
$docxRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>
'@
$docxDocument = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>
<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="40"/></w:rPr><w:t>__NAME__ 前沿技术专题研究报告</w:t></w:r></w:p>
<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:color w:val="808080"/><w:sz w:val="20"/></w:rPr><w:t>前沿技术研究组 · 样例演示版（正式报告约 2 万字 / 20 页）</w:t></w:r></w:p>
<w:p/>
<w:p><w:r><w:rPr><w:b/><w:sz w:val="28"/></w:rPr><w:t>一、技术概述</w:t></w:r></w:p>
<w:p><w:r><w:t>本报告围绕 __NAME__ 方向开展专题研究，基于多源情报交叉研判，系统梳理该技术的定义内涵、发展现状、竞争态势与战略价值。</w:t></w:r></w:p>
<w:p><w:r><w:rPr><w:b/><w:sz w:val="28"/></w:rPr><w:t>二、技术成熟度与竞争态势</w:t></w:r></w:p>
<w:p><w:r><w:t>该技术整体处于快速演进期，国际主要经济体均将其列为战略优先方向，国内外差距整体处于并跑或跟跑状态，产业化与工程化是下一阶段的关键瓶颈。</w:t></w:r></w:p>
<w:p><w:r><w:rPr><w:b/><w:sz w:val="28"/></w:rPr><w:t>三、关键技术点</w:t></w:r></w:p>
<w:p><w:r><w:t>· 核心技术机理与工程化实现路径；</w:t></w:r></w:p>
<w:p><w:r><w:t>· 关键材料 / 器件 / 系统的自主研发；</w:t></w:r></w:p>
<w:p><w:r><w:t>· 规模化制备与良率、成本控制。</w:t></w:r></w:p>
<w:p><w:r><w:rPr><w:b/><w:sz w:val="28"/></w:rPr><w:t>四、研判结论</w:t></w:r></w:p>
<w:p><w:r><w:t>建议将 __NAME__ 列为重点跟踪 / 优先布局方向，持续投入关键技术攻关，强化产业链协同，并建立动态跟踪与滚动评估机制。</w:t></w:r></w:p>
<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>
</w:body></w:document>
'@

# ---------------- PPTX 部件 ----------------
$pptxContentTypes = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/><Override PartName="/ppt/slides/slide1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/><Override PartName="/ppt/slides/slide2.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/></Types>
'@
$pptxRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>
'@
$pptxPresentation = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst><p:sldId id="256" r:id="rId2"/><p:sldId id="257" r:id="rId3"/></p:sldIdLst><p:sldSz cx="12192000" cy="6858000"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>
'@
$pptxPresentationRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide2.xml"/></Relationships>
'@
$pptxMaster = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst></p:sldMaster>
'@
$pptxMasterRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>
'@
$pptxLayout = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>
'@
$pptxLayoutRels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>
'@
$pptxSlide1 = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/><p:sp><p:nvSpPr><p:cNvPr id="2" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="1000000" y="2400000"/><a:ext cx="10192000" cy="1800000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:pPr algn="ctr"/><a:r><a:rPr lang="zh-CN" sz="4000" b="1"/><a:t>__NAME__ 前沿技术专题研究报告</a:t></a:r></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="3" name="Sub"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="1000000" y="4600000"/><a:ext cx="10192000" cy="800000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:pPr algn="ctr"/><a:r><a:rPr lang="zh-CN" sz="2000"/><a:t>前沿技术研究组 · __NOTE__</a:t></a:r></a:p></p:txBody></p:sp></p:spTree></p:cSld><p:clrMapOvr><a:overrideClrMapping bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/></p:clrMapOvr></p:sld>
'@
$pptxSlide2 = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/><p:sp><p:nvSpPr><p:cNvPr id="2" name="Title"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="600000" y="400000"/><a:ext cx="11000000" cy="900000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr lang="zh-CN" sz="2800" b="1"/><a:t>研究要点</a:t></a:r></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="3" name="Body"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="800000" y="1600000"/><a:ext cx="10500000" cy="4200000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr lang="zh-CN" sz="2000"/><a:t>__POINTS__</a:t></a:r></a:p></p:txBody></p:sp></p:spTree></p:cSld><p:clrMapOvr><a:overrideClrMapping bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/></p:clrMapOvr></p:sld>
'@
$pptxSlide1Rels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>
'@
$pptxSlide2Rels = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/></Relationships>
'@
$pptxTheme = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:srgbClr val="000000"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="1F497D"/></a:dk2><a:lt2><a:srgbClr val="EEECE1"/></a:lt2><a:accent1><a:srgbClr val="4F81BD"/></a:accent1><a:accent2><a:srgbClr val="C0504D"/></a:accent2><a:accent3><a:srgbClr val="9BBB59"/></a:accent3><a:accent4><a:srgbClr val="8064A2"/></a:accent4><a:accent5><a:srgbClr val="4BACC6"/></a:accent5><a:accent6><a:srgbClr val="F79646"/></a:accent6><a:hlink><a:srgbClr val="0000FF"/></a:hlink><a:folHlink><a:srgbClr val="800080"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln><a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>
'@

foreach ($t in $techs) {
  $id = $t.id
  $name = $t.name
  $docDir = Join-Path $Root ("assets\docs\" + $id)
  if (-not (Test-Path $docDir)) { New-Item -ItemType Directory -Path $docDir -Force | Out-Null }

  $docxParts = @{
    '[Content_Types].xml' = $docxContentTypes
    '_rels/.rels' = $docxRels
    'word/document.xml' = $docxDocument.Replace('__NAME__', $name)
  }
  # ZT* 为真实报告（已有真实 docx），只补 slides.pptx；T* 样例则同时生成占位 report.docx
  if ($id -notmatch '^ZT') {
    Write-Zip $docxParts (Join-Path $docDir "report.docx")
  }

  $pptxParts = @{
    '[Content_Types].xml' = $pptxContentTypes
    '_rels/.rels' = $pptxRels
    'ppt/presentation.xml' = $pptxPresentation
    'ppt/_rels/presentation.xml.rels' = $pptxPresentationRels
    'ppt/slideMasters/slideMaster1.xml' = $pptxMaster
    'ppt/slideMasters/_rels/slideMaster1.xml.rels' = $pptxMasterRels
    'ppt/slideLayouts/slideLayout1.xml' = $pptxLayout
    'ppt/slideLayouts/_rels/slideLayout1.xml.rels' = $pptxLayoutRels
    'ppt/slides/slide1.xml' = $pptxSlide1.Replace('__NAME__', $name).Replace('__NOTE__', $t.note)
    'ppt/slides/slide2.xml' = $pptxSlide2.Replace('__POINTS__', $t.points)
    'ppt/slides/_rels/slide1.xml.rels' = $pptxSlide1Rels
    'ppt/slides/_rels/slide2.xml.rels' = $pptxSlide2Rels
    'ppt/theme/theme1.xml' = $pptxTheme
  }
  Write-Zip $pptxParts (Join-Path $docDir "slides.pptx")

  Write-Host ("{0} ({1}): report.docx + slides.pptx generated" -f $id, $name)
}
Write-Host "downloads done."
