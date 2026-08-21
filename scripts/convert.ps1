# =====================================================================
# 通用文档转换脚本：将 assets/docs 下所有 .docx / .pptx 转为 PDF
# （输出到 assets/preview 下，目录结构保持一致）
# 依赖：本机安装 Microsoft Office（Word / PowerPoint）
# 用法：pwsh -File scripts/convert.ps1
# =====================================================================
$ErrorActionPreference = "Stop"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$docsRoot = Join-Path $Root "assets\docs"
$prevRoot = Join-Path $Root "assets\preview"

if (-not (Test-Path $docsRoot)) { Write-Host "[skip] 未找到 assets\docs 目录"; exit 0 }

$docxFiles = @(Get-ChildItem -Path $docsRoot -Recurse -Filter *.docx -ErrorAction SilentlyContinue)
$pptxFiles = @(Get-ChildItem -Path $docsRoot -Recurse -Filter *.pptx -ErrorAction SilentlyContinue)

Write-Host ("发现 Word 文档 {0} 个，PPT 文档 {1} 个" -f $docxFiles.Count, $pptxFiles.Count)

# ---------- Word -> PDF ----------
if ($docxFiles.Count -gt 0) {
  Write-Host "[Word] 启动转换..."
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $word.DisplayAlerts = 0
  try {
    foreach ($f in $docxFiles) {
      $rel = $f.FullName.Substring($docsRoot.Length).TrimStart('\')
      $pdfPath = Join-Path $prevRoot ($rel -replace '\.docx$', '.pdf')
      $dir = Split-Path $pdfPath -Parent
      if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
      try {
        $doc = $word.Documents.Open($f.FullName, $false, $true)  # ConfirmConversions=false, ReadOnly=true
        try { $doc.SaveAs2($pdfPath, 17); Write-Host ("  OK  {0} -> pdf" -f $rel) }
        finally { $doc.Close($false) }
      } catch { Write-Host ("  FAIL {0} : {1}" -f $rel, $_.Exception.Message) }
    }
  } finally { $word.Quit(); [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null }
}

# ---------- PowerPoint -> PDF ----------
if ($pptxFiles.Count -gt 0) {
  Write-Host "[PowerPoint] 启动转换..."
  $ppt = New-Object -ComObject PowerPoint.Application
  try {
    foreach ($f in $pptxFiles) {
      $rel = $f.FullName.Substring($docsRoot.Length).TrimStart('\')
      $pdfPath = Join-Path $prevRoot ($rel -replace '\.pptx$', '.pdf')
      $dir = Split-Path $pdfPath -Parent
      if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
      try {
        $pres = $ppt.Presentations.Open($f.FullName, $true, $false, $false)  # ReadOnly, WithWindow=false
        try { $pres.SaveAs($pdfPath, 32); Write-Host ("  OK  {0} -> pdf" -f $rel) }
        finally { $pres.Close() }
      } catch { Write-Host ("  FAIL {0} : {1}" -f $rel, $_.Exception.Message) }
    }
  } finally { $ppt.Quit(); [System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null }
}

Write-Host "转换完成。"
