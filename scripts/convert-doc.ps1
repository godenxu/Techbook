param (
    [string]$src,
    [string]$dst
)

$src = (Resolve-Path $src).Path
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $doc = $word.Documents.Open($src, $false, $true)
    # wdFormatPDF = 17
    $doc.SaveAs([ref]$dst, [ref]17)
    $doc.Close([ref]0)
    Write-Host "Converted $src to $dst successfully."
} finally {
    $word.Quit()
}
