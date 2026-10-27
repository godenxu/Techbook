#!/bin/bash
cd "$(dirname "$0")"
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node 2>/dev/null | tail -n 1)/bin:$PATH"

echo "======================================================"
echo "  正在自动扫描技术专属文件夹并同步最新母版资产..."
echo "======================================================"
if command -v node >/dev/null 2>&1; then
    node "scripts/pack.js"
elif command -v python3 >/dev/null 2>&1; then
    python3 "scripts/pack.py"
else
    echo "[提示] 未检测到 Node.js 或 Python3 环境，跳过自动编译同步..."
fi
echo ""
echo "同步完成，正在打开电子研究书..."
if [ -f "index-standalone.html" ]; then
    open "index-standalone.html"
else
    open "index.html"
fi
