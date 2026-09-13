#!/usr/bin/env python3
"""扫描 notes/ 下的所有 .md 笔记，生成 notes/index.json。

用法：python3 tools/build_index.py
每次新增或修改笔记后运行一次即可（发布.command 会自动调用）。
"""

import json
import os
import re
import sys
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOTES_DIR = os.path.join(ROOT, "notes")
INDEX_PATH = os.path.join(NOTES_DIR, "index.json")


def split_front_matter(text):
    """把 '---' 包裹的头部元数据和正文拆开。没有头部时返回空 dict。"""
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    if end == -1:
        return {}, text
    head = text[3:end].strip("\n")
    body = text[end + 4:].lstrip("\n")
    meta = {}
    for line in head.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or ":" not in line:
            continue
        key, value = line.split(":", 1)
        meta[key.strip().lower()] = value.strip()
    return meta, body


def parse_tags(raw):
    if not raw:
        return []
    raw = raw.strip()
    if raw.startswith("[") and raw.endswith("]"):
        raw = raw[1:-1]
    parts = re.split(r"[,，、]", raw)
    return [p.strip().strip("\"'") for p in parts if p.strip()]


def first_heading(body):
    for line in body.splitlines():
        if line.startswith("#"):
            return line.lstrip("#").strip()
    return ""


def auto_summary(body):
    """取正文第一段普通文字作为摘要。"""
    in_code = False
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code = not in_code
            continue
        if in_code or not stripped:
            continue
        if stripped.startswith(("#", ">", "|", "-", "*", "1.")):
            continue
        text = re.sub(r"[*_`\[\]]", "", stripped)
        return text[:80]
    return ""


def build():
    if not os.path.isdir(NOTES_DIR):
        print("找不到 notes/ 文件夹", file=sys.stderr)
        return 1

    notes = []
    for name in sorted(os.listdir(NOTES_DIR)):
        if not name.endswith(".md"):
            continue
        path = os.path.join(NOTES_DIR, name)
        with open(path, encoding="utf-8") as f:
            text = f.read()
        meta, body = split_front_matter(text)
        slug = os.path.splitext(name)[0]
        notes.append({
            "slug": slug,
            "file": name,
            "title": meta.get("title") or first_heading(body) or slug,
            "date": meta.get("date") or date.fromtimestamp(os.path.getmtime(path)).isoformat(),
            "source": meta.get("source", ""),
            "tags": parse_tags(meta.get("tags", "")),
            "summary": meta.get("summary") or auto_summary(body),
            "body": body,
        })

    notes.sort(key=lambda n: (n["date"], n["title"]), reverse=True)

    payload = {"generated": date.today().isoformat(), "count": len(notes), "notes": notes}
    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)

    print(f"已索引 {len(notes)} 篇笔记 -> notes/index.json")
    for n in notes:
        print(f"  · {n['date']}  {n['title']}")
    return 0


if __name__ == "__main__":
    sys.exit(build())
