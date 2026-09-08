param (
    [string]$src,
    [string]$dst
)
$src = (Resolve-Path $src).Path
$dst = [System.IO.Path]::GetFullPath($dst)
$ppt = New-Object -ComObject PowerPoint.Application
try {
    $pres = $ppt.Presentations.Open($src, -1, 0, 0)
    $pres.SaveAs($dst, 32)
    $pres.Close()
    Write-Host "Converted $src to $dst successfully."
} finally {
    $ppt.Quit()
}
