# 使用 Chrome 无头模式，将演示报告/幻灯片 HTML 打印为 PDF 预览
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$reportHtml = Join-Path $Root "scripts\print\report.html"
$slidesHtml = Join-Path $Root "scripts\print\slides.html"
$ids = @("T01", "T07", "T16")

foreach ($id in $ids) {
  $dir = Join-Path $Root ("assets\preview\" + $id)
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
  $reportPdf = Join-Path $dir "report.pdf"
  $slidesPdf = Join-Path $dir "slides.pdf"
  $reportUrl = "file:///" + ($reportHtml -replace '\\', '/')
  $slidesUrl = "file:///" + ($slidesHtml -replace '\\', '/')
  & $chrome --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer "--print-to-pdf=$reportPdf" $reportUrl
  & $chrome --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer "--print-to-pdf=$slidesPdf" $slidesUrl
  $r = (Test-Path $reportPdf) -and ((Get-Item $reportPdf).Length -gt 0)
  $s = (Test-Path $slidesPdf) -and ((Get-Item $slidesPdf).Length -gt 0)
  Write-Host ("{0}: report.pdf={1} slides.pdf={2}" -f $id, $r, $s)
}
Write-Host "print done."
