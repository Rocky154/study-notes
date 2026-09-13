#!/bin/bash
# 双击本文件：重建索引并把笔记发布到 GitHub Pages
cd "$(dirname "$0")" || exit 1

python3 tools/build_index.py || exit 1

if [ ! -d .git ]; then
  echo "❌ 还没有连接 GitHub。请先看 README.md 里的「一次性设置」。"
  read -r -p "按回车键关闭…" _
  exit 1
fi

git add -A
if git diff --cached --quiet; then
  echo "没有新的改动，无需发布。"
else
  git commit -m "更新笔记：$(date '+%Y-%m-%d %H:%M')" || exit 1
fi

if git push; then
  URL=$(git remote get-url origin 2>/dev/null | sed -E 's#(git@github.com:|https://github.com/)([^/]+)/(.+)(\.git)?#https://\2.github.io/\3#' | sed 's/\.git$//')
  echo ""
  echo "✅ 发布成功！约 1 分钟后可访问："
  echo "   $URL"
else
  echo "❌ 推送失败，请看上面的报错信息。"
fi

echo ""
read -r -p "按回车键关闭…" _
