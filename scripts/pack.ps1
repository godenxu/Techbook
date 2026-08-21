# =====================================================================
# 打包为"单文件"版本：将 data.js 与 js/app.js 内联进 index.html
# 产出 index-standalone.html（CSS/JS/数据全部内联，双击即可打开）
# 注意：assets/ 素材（图片、PDF、Word/PPT）仍需与本文件同目录。
# =====================================================================
$ErrorActionPreference = "Stop"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$enc = New-Object System.Text.UTF8Encoding($false)

$index = [System.IO.File]::ReadAllText((Join-Path $Root "index.html"), [System.Text.Encoding]::UTF8)
$data  = [System.IO.File]::ReadAllText((Join-Path $Root "data.js"), [System.Text.Encoding]::UTF8)
$app   = [System.IO.File]::ReadAllText((Join-Path $Root "js\app.js"), [System.Text.Encoding]::UTF8)

$out = $index
$out = $out.Replace('<script src="data.js"></script>', '<script>' + $data + '</script>')
$out = $out.Replace('<script src="js/app.js"></script>', '<script>' + $app + '</script>')

$dest = Join-Path $Root "index-standalone.html"
[System.IO.File]::WriteAllText($dest, $out, $enc)
Write-Host ("已生成单文件版: {0}  ({1} 字符)" -f $dest, $out.Length)
