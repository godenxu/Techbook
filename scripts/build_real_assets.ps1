# =====================================================================
# build_real_assets.ps1 —— 为 4 篇真实专题报告生成 PPT 预览 PDF
# 内容从 docx2html 提取的 report.txt 中选取（执行摘要/研判/技术背景/同业实践）
# 产出：assets\preview\<ID>\slides.pdf
# =====================================================================
$ErrorActionPreference = "Stop"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$enc = New-Object System.Text.UTF8Encoding($false)

$accent = @{
  'ZT010' = @('#1e3a8a', '#4f8cff');
  'ZT018' = @('#4c1d95', '#8b5cf6');
  'ZT031' = @('#0f766e', '#14b8a6');
  'ZT033' = @('#b45309', '#f59e0b')
}

function Esc-Html($s) {
  return ([System.Net.WebUtility]::HtmlEncode($s))
}

# 将长文本切成若干短句（按标点切分，长度上限 chars）
function Split-Bullets($text, $max) {
  $parts = @()
  $seg = ''
  foreach ($ch in $text.ToCharArray()) {
    $seg += $ch
    if (($seg.Length -ge $max) -and ($ch -match '[，。；、,.!?]')) {
      $parts += $seg.Trim()
      $seg = ''
    }
  }
  if ($seg.Trim().Length -gt 0) { $parts += $seg.Trim() }
  if ($parts.Count -eq 0) { $parts += $text.Trim() }
  return $parts | Select-Object -First 4
}

function Build-SlidesHtml($id) {
  $txt = [System.IO.File]::ReadAllText((Join-Path $Root "scripts\print\_build\$id\report.txt"), [System.Text.Encoding]::UTF8)
  $lines = $txt -split "`n" | ForEach-Object { $_.TrimEnd("`r") }

  # 报告名（## 行）
  $name = '前沿技术专题研究报告'
  foreach ($l in $lines) { if ($l -match '^##\s+(.+)$') { $name = $Matches[1]; break } }

  # 分段：按一级标题(# )切分
  $sections = @{}
  $cur = ''
  $curKey = ''
  $order = @()
  foreach ($l in $lines) {
    if ($l -match '^#\s+(.+)$') {
      if ($curKey -ne '') { $sections[$curKey] = ($cur -join "`n") }
      $curKey = $Matches[1]; $order += $curKey; $cur = @()
    } elseif ($curKey -ne '') {
      if (($l.Trim() -ne '') -and ($l -notmatch '^##\s')) { $cur += $l.Trim() }
    }
  }
  if ($curKey -ne '') { $sections[$curKey] = ($cur -join "`n") }

  $execText = ''
  foreach ($k in $order) {
    if ($k -match '执行摘要') { $execText = $sections[$k]; break }
  }
  if (-not $execText) { $execText = $sections[$order[1]] }
  $execParas = $execText -split "`n" | Where-Object { $_.Trim().Length -gt 10 }

  $bgText = ''
  foreach ($k in $order) { if ($k -match '技术背景') { $bgText = $sections[$k]; break } }
  $bgParas = $bgText -split "`n" | Where-Object { $_.Trim().Length -gt 10 }

  $peerText = ''
  foreach ($k in $order) { if ($k -match '同业|应用') { $peerText = $sections[$k]; break } }
  $peerParas = $peerText -split "`n" | Where-Object { $_.Trim().Length -gt 10 }

  $ac = $accent[$id]
  $g1 = $ac[0]; $g2 = $ac[1]

  $execBullets = @()
  if ($execParas.Count -ge 2) { $execBullets = (Split-Bullets $execParas[0] 45) }
  if ($execBullets.Count -lt 2 -and $execParas.Count -ge 2) { $execBullets += (Split-Bullets $execParas[1] 45)[0..([Math]::Min(1, (Split-Bullets $execParas[1] 45).Count - 1))] }
  $execBullets = @($execBullets | Select-Object -First 4)

  $judge = ''
  foreach ($p in $execParas) { if ($p -match '建议|研判|结论') { $judge = $p; break } }
  if (-not $judge -and $execParas.Count -ge 1) { $judge = $execParas[$execParas.Count - 1] }
  $judgeBullets = Split-Bullets $judge 50

  $bgBullets = @()
  if ($bgParas.Count -ge 1) { $bgBullets = Split-Bullets $bgParas[0] 45 }
  $bgBullets = @($bgBullets | Select-Object -First 4)

  $peerBullets = @()
  if ($peerParas.Count -ge 1) { $peerBullets = Split-Bullets $peerParas[0] 45 }
  if ($peerBullets.Count -lt 2 -and $peerParas.Count -ge 2) { $peerBullets += (Split-Bullets $peerParas[1] 45)[0] }
  $peerBullets = @($peerBullets | Select-Object -First 4)

  function Ul($items) {
    return '<ul>' + (($items | ForEach-Object { '<li>' + (Esc-Html $_) + '</li>' }) -join '') + '</ul>'
  }

  $html = @()
  $html += '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>' + (Esc-Html $name) + '</title><style>'
  $html += '@page{size:338.7mm 190.5mm;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0}'
  $html += '.slide{width:338.7mm;height:190.5mm;position:relative;overflow:hidden;page-break-after:always;break-after:page;font-family:"Microsoft YaHei","PingFang SC","Segoe UI",sans-serif}'
  $html += '.slide:last-child{page-break-after:auto}'
  $html += '.s1{background:linear-gradient(135deg,' + $g1 + ',' + $g2 + ');color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}'
  $html += '.s1 h1{font-size:46px;letter-spacing:3px;margin:0 24px 14px;line-height:1.35}'
  $html += '.s1 .sub{font-size:20px;opacity:.92;letter-spacing:2px}'
  $html += '.s1 .meta{margin-top:34px;font-size:15px;opacity:.75;letter-spacing:1px}'
  $html += '.bar{position:absolute;top:0;left:0;right:0;height:14mm;background:linear-gradient(90deg,' + $g1 + ',' + $g2 + ');display:flex;align-items:center;padding:0 16mm;color:#fff}'
  $html += '.bar h2{font-size:28px;margin:0;letter-spacing:2px}'
  $html += '.content{position:absolute;top:26mm;left:16mm;right:16mm;bottom:12mm;font-size:19px;color:#1f2937;line-height:1.85;overflow:hidden}'
  $html += '.content li{margin:12px 0}'
  $html += '.kicker{position:absolute;bottom:8mm;left:16mm;font-size:12px;color:#9ca3af}'
  $html += '</style></head><body>'

  $html += '<div class="slide s1"><h1>' + (Esc-Html $name) + '</h1><div class="sub">前沿技术专题研究报告</div><div class="meta">' + $id + ' · 储备库专题 · 信息采集截至 2026-08-17</div></div>'

  $html += '<div class="slide"><div class="bar"><h2>执行摘要</h2></div><div class="content">' + (Ul $execBullets) + '</div><div class="kicker">前沿技术研究组</div></div>'

  $html += '<div class="slide"><div class="bar"><h2>核心研判与处置建议</h2></div><div class="content">' + (Ul $judgeBullets) + '</div><div class="kicker">前沿技术研究组</div></div>'

  $html += '<div class="slide"><div class="bar"><h2>技术背景要点</h2></div><div class="content">' + (Ul $bgBullets) + '</div><div class="kicker">前沿技术研究组</div></div>'

  $html += '<div class="slide"><div class="bar"><h2>同业实践与落地路径</h2></div><div class="content">' + (Ul $peerBullets) + '</div><div class="kicker">前沿技术研究组</div></div>'

  $html += '<div class="slide"><div class="bar"><h2>结语</h2></div><div class="content"><ul><li>持续跟踪技术演进与政策变化</li><li>以先行动作验证价值、控制风险</li><li>动态更新储备库定档与评估</li></ul></div><div class="kicker">谢谢 · 前沿技术研究组</div></div>'

  $html += '</body></html>'

  $outDir = Join-Path $Root "scripts\print\_build\$id"
  $outHtml = Join-Path $outDir 'slides.html'
  [System.IO.File]::WriteAllText($outHtml, ($html -join "`n"), $enc)
  Write-Host ("{0}: slides.html built ({1}K)" -f $id, [Math]::Round(($html -join '').Length / 1024))
}

# ---------- 主流程 ----------
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe" }

foreach ($id in @('ZT010', 'ZT018', 'ZT031', 'ZT033')) {
  Build-SlidesHtml $id
  $src = Join-Path $Root "scripts\print\_build\$id\slides.html"
  $pdfDir = Join-Path $Root "assets\preview\$id"
  if (-not (Test-Path $pdfDir)) { New-Item -ItemType Directory -Path $pdfDir | Out-Null }
  $pdf = Join-Path $pdfDir "slides.pdf"
  $url = "file:///" + ($src -replace '\\', '/')
  $err = Join-Path $Root "_test\cerr_slides_$id.txt"
  $p = Start-Process -FilePath $chrome -ArgumentList @("--headless=new", "--disable-gpu", "--no-sandbox", "--no-pdf-header-footer", "--print-to-pdf=$pdf", $url) -Wait -NoNewWindow -RedirectStandardError $err -PassThru
  Write-Host ("{0}: slides.pdf -> {1}" -f $id, $pdf)
}
Start-Sleep -Seconds 2
Get-ChildItem (Join-Path $Root "assets\preview") -Recurse -Filter slides.pdf | ForEach-Object { $_.FullName.Substring($Root.Length + 1) + "  " + $_.Length }
