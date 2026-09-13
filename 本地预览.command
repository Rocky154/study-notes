#!/bin/bash
# 双击本文件即可在本机预览笔记站（会自动打开浏览器）
cd "$(dirname "$0")" || exit 1
python3 tools/build_index.py || exit 1
PORT=8765
echo ""
echo "笔记站已启动： http://localhost:$PORT"
echo "关掉这个窗口或按 Control+C 即可停止。"
echo ""
( sleep 1; open "http://localhost:$PORT" ) &
python3 -m http.server $PORT
