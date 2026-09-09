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
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
    Write-Host "Converted $src to $dst successfully."
} finally {
    try { $ppt.Quit() } catch {}
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
    [GC]::Collect()
    [GC]::WaitForPendingFinalizers()
}

