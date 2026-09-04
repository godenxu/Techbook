@echo off
chcp 65001 >nul
title 前沿技术专题研究书
echo ======================================================
echo   正在自动扫描技术专属文件夹并同步最新母版资产...
echo ======================================================
where node >nul 2>nul
if %errorlevel% equ 0 (
    node "%~dp0scripts\pack.js"
) else (
    echo [提示] 未检测到 Node.js 环境，跳过自动编译同步...
)
echo.
echo 同步完成，正在打开电子研究书...
if exist "%~dp0index-standalone.html" (
    start "" "%~dp0index-standalone.html"
) else (
    start "" "%~dp0index.html"
)
