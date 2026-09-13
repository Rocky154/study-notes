/* 我的学习笔记 —— 前端逻辑
   数据来自 notes/index.json（由 tools/build_index.py 生成）。 */

const $ = (sel) => document.querySelector(sel);

const state = {
  notes: [],
  query: "",
  tag: null,
  current: null,
};

/* ---------------- 工具 ---------------- */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function terms(q) {
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

function matches(note, q) {
  if (!q) return true;
  const hay = [note.title, note.body, note.source, note.summary, (note.tags || []).join(" ")]
    .join("\n").toLowerCase();
  return terms(q).every((t) => hay.includes(t));
}

/** 在正文里为搜索词加高亮（只处理文本节点，不破坏标签） */
function highlight(root, q) {
  const words = terms(q);
  if (!words.length) return;
  const re = new RegExp("(" + words.map(escRe).join("|") + ")", "gi");
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const targets = [];
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (n.nodeValue.trim() && re.test(n.nodeValue)) targets.push(n);
    re.lastIndex = 0;
  }
  for (const n of targets) {
    const span = document.createElement("span");
    span.innerHTML = esc(n.nodeValue).replace(re, "<mark>$1</mark>");
    n.parentNode.replaceChild(span, n);
  }
}

/** 摘要里带高亮的一小段上下文 */
function snippet(note, q) {
  const words = terms(q);
  if (!words.length) return esc(note.summary || "");
  const body = note.body.replace(/\s+/g, " ");
  const i = body.toLowerCase().indexOf(words[0]);
  if (i === -1) return esc(note.summary || "");
  const raw = body.slice(Math.max(0, i - 24), i + 70);
  const re = new RegExp("(" + words.map(escRe).join("|") + ")", "gi");
  return "…" + esc(raw).replace(re, "<mark>$1</mark>") + "…";
}

/* ---------------- 渲染 ---------------- */

function visibleNotes() {
  return state.notes.filter((n) =>
    (!state.tag || (n.tags || []).includes(state.tag)) && matches(n, state.query));
}

function renderTags() {
  const counts = new Map();
  for (const n of state.notes) for (const t of n.tags || []) counts.set(t, (counts.get(t) || 0) + 1);
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "zh"));
  const bar = $("#tagbar");
  bar.innerHTML =
    `<button class="tag ${state.tag ? "" : "on"}" data-tag="">全部 ${state.notes.length}</button>` +
    sorted.map(([t, c]) =>
      `<button class="tag ${state.tag === t ? "on" : ""}" data-tag="${esc(t)}">${esc(t)} ${c}</button>`).join("");
  bar.onclick = (e) => {
    const btn = e.target.closest(".tag");
    if (!btn) return;
    state.tag = btn.dataset.tag || null;
    renderTags();
    renderList();
  };
}

function renderList() {
  const list = visibleNotes();
  const ul = $("#note-list");
  ul.innerHTML = list.length
    ? list.map((n) => `
      <li data-slug="${esc(n.slug)}" class="${state.current === n.slug ? "on" : ""}">
        <span class="t">${esc(n.title)}</span>
        <span class="m">${esc(n.date)}${n.source ? " · " + esc(n.source) : ""}</span>
        <span class="s">${snippet(n, state.query)}</span>
      </li>`).join("")
    : `<li class="m" style="cursor:default">没有匹配的笔记</li>`;

  ul.onclick = (e) => {
    const li = e.target.closest("li[data-slug]");
    if (!li) return;
    location.hash = "#/" + li.dataset.slug;
    $("#sidebar").classList.remove("open");
  };

  $("#search-count").textContent = state.query ? `${list.length} 条` : "";
  $("#total-count").textContent = `共 ${state.notes.length} 篇笔记`;
}

function renderArticle(opts = {}) {
  const art = $("#article");
  const note = state.notes.find((n) => n.slug === state.current);

  if (!note) {
    const latest = state.notes[0];
    art.innerHTML = `
      <div class="empty">
        <h2>📒 欢迎回来</h2>
        <p>${state.notes.length ? "从左边挑一篇笔记开始阅读。" : "还没有笔记。点右上角「＋ 新建笔记」写第一篇吧。"}</p>
        ${latest ? `<p><button class="btn" id="open-latest">打开最新一篇：${esc(latest.title)}</button></p>` : ""}
      </div>`;
    const b = $("#open-latest");
    if (b) b.onclick = () => (location.hash = "#/" + latest.slug);
    return;
  }

  const tags = (note.tags || []).map((t) => `<button class="tag" data-tag="${esc(t)}">${esc(t)}</button>`).join(" ");
  art.innerHTML = `
    <div class="note-head">
      <h1>${esc(note.title)}</h1>
      <div class="note-meta">
        <span>🗓 ${esc(note.date)}</span>
        ${note.source ? `<span>📖 ${esc(note.source)}</span>` : ""}
        ${tags ? `<span>${tags}</span>` : ""}
      </div>
    </div>
    <div class="md" id="md-body"></div>`;

  $("#md-body").innerHTML = marked.parse(note.body || "");
  highlight($("#md-body"), state.query);

  art.querySelectorAll(".note-meta .tag").forEach((btn) => {
    btn.onclick = () => {
      state.tag = btn.dataset.tag;
      renderTags();
      renderList();
      $("#sidebar").classList.add("open");
    };
  });

  document.title = note.title + " · 我的学习笔记";

  // 切换笔记时回到顶部；正在搜索时则滚到第一个命中处，不打断阅读位置
  if (opts.scroll === "top") {
    window.scrollTo(0, 0);
  } else if (opts.scroll === "match") {
    const first = $("#md-body mark");
    if (first) first.scrollIntoView({ block: "center", behavior: "smooth" });
  }
}

function route() {
  state.current = decodeURIComponent(location.hash.replace(/^#\/?/, "")) || null;
  renderList();
  renderArticle({ scroll: "top" });
}

/* ---------------- 新建笔记 ---------------- */

function frontMatter() {
  const v = (id) => $(id).value.trim();
  const lines = [
    "---",
    `title: ${v("#f-title") || "未命名笔记"}`,
    `date: ${v("#f-date") || new Date().toISOString().slice(0, 10)}`,
    `source: ${v("#f-source")}`,
    `tags: [${v("#f-tags")}]`,
  ];
  if (v("#f-summary")) lines.push(`summary: ${v("#f-summary")}`);
  lines.push("---", "", v("#f-body"), "");
  return lines.join("\n");
}

function slugify() {
  const s = $("#f-slug").value.trim() || $("#f-title").value.trim() || "note";
  return s.replace(/[\\/:*?"<>|\s]+/g, "-").replace(/^-+|-+$/g, "") || "note";
}

function setupModal() {
  const modal = $("#modal");
  const open = () => {
    $("#f-date").value = new Date().toISOString().slice(0, 10);
    modal.classList.remove("hidden");
    $("#f-title").focus();
  };
  const close = () => modal.classList.add("hidden");

  $("#new-btn").onclick = open;
  $("#modal-close").onclick = close;
  modal.onclick = (e) => { if (e.target === modal) close(); };
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  $("#btn-copy").onclick = async () => {
    try {
      await navigator.clipboard.writeText(frontMatter());
      $("#btn-copy").textContent = "已复制 ✓";
      setTimeout(() => ($("#btn-copy").textContent = "复制全文"), 1500);
    } catch {
      alert("复制失败，请手动选中正文框内容复制。");
    }
  };

  $("#btn-download").onclick = () => {
    const blob = new Blob([frontMatter()], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = slugify() + ".md";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  $("#btn-preview").onclick = () => {
    const w = window.open("", "_blank");
    w.document.write(`<meta charset="utf-8"><title>预览</title>
      <link rel="stylesheet" href="${location.origin + location.pathname.replace(/[^/]*$/, "")}assets/style.css">
      <div class="main"><article class="article"><div class="md">${marked.parse($("#f-body").value)}</div></article></div>`);
    w.document.close();
  };
}

/* ---------------- 启动 ---------------- */

function setupChrome() {
  const html = document.documentElement;
  const saved = localStorage.getItem("notes-theme");
  if (saved) html.dataset.theme = saved;
  else if (matchMedia("(prefers-color-scheme: dark)").matches) html.dataset.theme = "dark";

  $("#theme-btn").onclick = () => {
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("notes-theme", html.dataset.theme);
  };

  $("#menu-btn").onclick = () => $("#sidebar").classList.toggle("open");

  let timer;
  $("#search").oninput = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.query = e.target.value.trim();
      renderList();
      renderArticle({ scroll: state.query ? "match" : "none" });
    }, 120);
  };

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); $("#search").focus(); }
  });

  window.addEventListener("hashchange", route);
}

async function init() {
  setupChrome();
  setupModal();
  marked.setOptions({ gfm: true, breaks: false });

  try {
    const res = await fetch("notes/index.json?v=" + Date.now());
    if (!res.ok) throw new Error(res.status);
    state.notes = (await res.json()).notes || [];
  } catch (err) {
    $("#article").innerHTML = `
      <div class="empty">
        <h2>读不到笔记数据</h2>
        <p>请先运行 <code>python3 tools/build_index.py</code> 生成 notes/index.json。</p>
        <p>如果你是直接双击 index.html 打开的，浏览器会禁止本地读取文件，
           请改用 <code>本地预览.command</code> 启动。</p>
      </div>`;
    return;
  }

  renderTags();
  route();
}

init();
