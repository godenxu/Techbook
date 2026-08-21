# =====================================================================
# docx2html.ps1 —— 从 Word(docx) 提取正文（段落/标题/表格）为 HTML 与纯文本
# 用途：在无 Office 环境下为真实研究报告生成"文字版预览"。
# 用法：& .\scripts\docx2html.ps1
# 产出：scripts\print\_build\<ID>\report.html 与 report.txt
# =====================================================================
$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.IO.Compression.FileSystem

$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$docsRoot = Join-Path $Root "assets\docs"
$outRoot = Join-Path $Root "scripts\print\_build"
$enc = New-Object System.Text.UTF8Encoding($false)

$WNS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'

function Get-ParaText($p, $ns) {
  # 按文档顺序取 w:t / w:tab / w:br / w:cr
  $sb = New-Object System.Text.StringBuilder
  foreach ($node in $p.SelectNodes('.//w:t | .//w:tab | .//w:br | .//w:cr | .//w:noBreakHyphen', $ns)) {
    switch -Regex ($node.LocalName) {
      't' { [void]$sb.Append($node.InnerText) }
      'tab' { [void]$sb.Append(' ') }
      'br' { [void]$sb.Append("`n") }
      'cr' { [void]$sb.Append("`n") }
      'noBreakHyphen' { [void]$sb.Append('-') }
    }
  }
  return $sb.ToString()
}

function Get-ParaStyle($p, $ns) {
  $ps = $p.SelectSingleNode('w:pPr/w:pStyle', $ns)
  if ($ps) {
    $av = $ps.Attributes | Where-Object { $_.LocalName -eq 'val' } | Select-Object -First 1
    if ($av) { return $av.Value }
  }
  return ''
}

function Get-ParaBold($p, $ns) {
  return ($p.SelectNodes('.//w:r/w:rPr/w:b', $ns).Count -gt 0) -and ($p.SelectNodes('.//w:r/w:rPr/w:b[@w:val="0" or @w:val="false"]', $ns).Count -eq 0)
}

function Get-ParaSizeHalf($p, $ns) {
  $sz = $p.SelectSingleNode('.//w:r/w:rPr/w:sz', $ns)
  if ($sz) {
    $av = $sz.Attributes | Where-Object { $_.LocalName -eq 'val' } | Select-Object -First 1
    if ($av) { $n = 0; if ([int]::TryParse($av.Value, [ref]$n)) { return $n } }
  }
  return 0
}

function Test-PageBreak($p, $ns) {
  $br = $p.SelectSingleNode('.//w:br[@w:type="page"]', $ns)
  if ($br) { return $true }
  if ($p.SelectSingleNode('.//w:lastRenderedPageBreak', $ns)) { return $true }
  return $false
}

function Convert-OneDocx {
  param($DocxPath, $Id)
  $zip = [System.IO.Compression.ZipFile]::OpenRead($DocxPath)
  try {
    # ---- 标题（docProps/core.xml） ----
    $title = ''
    try {
      $core = $zip.Entries | Where-Object { $_.FullName -eq 'docProps/core.xml' } | Select-Object -First 1
      if ($core) {
        $sr2 = New-Object System.IO.StreamReader($core.Open(), [System.Text.Encoding]::UTF8)
        $cx = New-Object System.Xml.XmlDocument
        $cx.LoadXml($sr2.ReadToEnd()); $sr2.Close()
        $n2 = New-Object System.Xml.XmlNamespaceManager($cx.NameTable)
        $n2.AddNamespace('dc', 'http://purl.org/dc/elements/1.1/')
        $n2.AddNamespace('cp', 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties')
        $tn = $cx.SelectSingleNode('//dc:title', $n2)
        if ($tn -and $tn.InnerText) { $title = $tn.InnerText.Trim() }
      }
    } catch {}

    # ---- 正文 ----
    $docEntry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' } | Select-Object -First 1
    if (-not $docEntry) { throw "no document.xml in $DocxPath" }
    $sr = New-Object System.IO.StreamReader($docEntry.Open(), [System.Text.Encoding]::UTF8)
    $xmlText = $sr.ReadToEnd(); $sr.Close()
    $doc = New-Object System.Xml.XmlDocument
    $doc.LoadXml($xmlText)
    $ns = New-Object System.Xml.XmlNamespaceManager($doc.NameTable)
    $ns.AddNamespace('w', $WNS)

    $body = $doc.SelectSingleNode('//w:body', $ns)
    $html = New-Object System.Collections.Generic.List[string]
    $txt = New-Object System.Collections.Generic.List[string]
    if ($title) { $html.Add('<h1>' + [System.Net.WebUtility]::HtmlEncode($title) + '</h1>') }

    $pendingPageBreak = $false
    foreach ($child in $body.ChildNodes) {
      if ($child.LocalName -eq 'p') {
        $style = Get-ParaStyle $child $ns
        $text = Get-ParaText $child $ns
        $t = $text.Trim()
        if ($t -eq '') { continue }
        $bold = Get-ParaBold $child $ns
        $half = Get-ParaSizeHalf $child $ns
        $pb = Test-PageBreak $child $ns
        if ($pb) { $pendingPageBreak = $true }

        # 标题判定：样式名 Heading/标题/数字，或大字号加粗
        $level = 0
        if ($style -match '^(heading\s*|标题\s*)?([1-9])$') { $level = [int]$Matches[2] }
        elseif ($style -match '(?i)^title$' -or $style -match '^标题$') { $level = 1 }
        elseif ($bold -and $half -ge 32 -and $t.Length -le 60) { $level = 1 }
        elseif ($bold -and $half -ge 24 -and $t.Length -le 80) { $level = 2 }

        $encText = [System.Net.WebUtility]::HtmlEncode($t)
        if ($level -ge 1) {
          $h = [Math]::Min(4, $level)
          $html.Add(('{0}<h{1}>{2}</h{1}>' -f ($(if ($pendingPageBreak) { '<div class="pb"></div>' } else { '' })), $h, $encText))
          $txt.Add(('#' * $h) + ' ' + $t)
        } else {
          $html.Add(('{0}<p{1}>{2}</p>' -f ($(if ($pendingPageBreak) { '<div class="pb"></div>' } else { '' })), $(if ($bold) { ' class="b"' } else { '' }), $encText))
          $txt.Add($t)
        }
        $pendingPageBreak = $false
      }
      elseif ($child.LocalName -eq 'tbl') {
        $html.Add('<div class="pb"></div>')
        $html.Add('<table>')
        foreach ($tr in $child.SelectNodes('w:tr', $ns)) {
          $html.Add('<tr>')
          foreach ($tc in $tr.SelectNodes('w:tc', $ns)) {
            $cellParts = @()
            foreach ($tp in $tc.SelectNodes('w:p', $ns)) {
              $ct = (Get-ParaText $tp $ns).Trim()
              if ($ct -ne '') { $cellParts += [System.Net.WebUtility]::HtmlEncode($ct) }
            }
            $html.Add('<td>' + ($cellParts -join '<br/>') + '</td>')
          }
          $html.Add('</tr>')
        }
        $html.Add('</table>')
      }
    }

    # ---- 组装 HTML ----
    $css = '<style>@page{size:A4;margin:18mm 16mm}body{font-family:"Microsoft YaHei","PingFang SC",sans-serif;font-size:13px;color:#1f2937;line-height:1.75;max-width:180mm;margin:0 auto}h1{font-size:22px;color:#0f172a;border-bottom:2px solid #3b82f6;padding-bottom:8px}h2{font-size:17px;color:#1d4ed8;margin-top:18px}h3{font-size:15px;color:#1e40af;margin-top:14px}h4{font-size:14px;color:#374151;margin-top:12px}p{margin:6px 0;text-align:justify}p.b{font-weight:600}table{border-collapse:collapse;width:100%;margin:8px 0}td,th{border:1px solid #94a3b8;padding:4px 7px;font-size:12px;text-align:left}div.pb{page-break-before:always}</style>'
    $outHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + [System.Net.WebUtility]::HtmlEncode($title) + '</title>' + $css + '</head><body>' + ($html -join "`n") + '</body></html>'

    $outDir = Join-Path $outRoot $Id
    if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
    [System.IO.File]::WriteAllText((Join-Path $outDir 'report.html'), $outHtml, $enc)
    [System.IO.File]::WriteAllText((Join-Path $outDir 'report.txt'), ($txt -join "`n"), $enc)
    Write-Host ("OK  {0}  html={1}KB  txt={2}行  title={3}" -f $Id, [Math]::Round($outHtml.Length / 1024), $txt.Count, $title)
  } finally {
    $zip.Dispose()
  }
}

# 处理 4 篇真实报告（ZT 开头文件夹下的 docx）
Get-ChildItem $docsRoot -Directory | Where-Object { $_.Name -match '^ZT' } | ForEach-Object {
  $id = $_.Name
  $docx = Get-ChildItem $_.FullName -Filter *.docx | Select-Object -First 1
  if ($docx) { Convert-OneDocx $docx.FullName $id }
}
Write-Host "完成。产物位于 scripts\print\_build\<ID>\"
