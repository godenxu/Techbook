param (
    [string]$src,
    [string]$dst
)

$src = (Resolve-Path $src).Path
$dst = [System.IO.Path]::GetFullPath($dst)
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $doc = $word.Documents.Open($src, $false, $true)
    # 17 = wdExportFormatPDF, 1 = wdExportCreateHeadingBookmarks (生成大纲/目录结构书签)
    $doc.ExportAsFixedFormat($dst, 17, $false, 0, 0, 1, 1, 0, $true, $true, 1, $true, $true, $false)
    $doc.Close([ref]0)
    Write-Host "Converted $src to $dst successfully."
} finally {
    $word.Quit()
}
