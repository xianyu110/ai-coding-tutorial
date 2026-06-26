const chapterList = document.querySelector("#chapterList");
const chapterTitle = document.querySelector("#chapterTitle");
const content = document.querySelector("#content");
const sourceLink = document.querySelector("#sourceLink");

let chapters = [];
let currentChapterPath = "";

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function resolveUrl(url) {
  if (/^(https?:|mailto:|#|data:)/.test(url)) return url;
  return new URL(url, new URL(currentChapterPath, window.location.href)).href;
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, url) => `<img src="${resolveUrl(url)}" alt="${alt}">`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => `<a href="${resolveUrl(url)}" target="_blank" rel="noreferrer">${label}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderTable(lines) {
  const rows = lines
    .filter((line) => line.trim())
    .map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean));
  if (rows.length < 2) return lines.map((line) => `<p>${inlineMarkdown(line)}</p>`).join("");
  const head = rows[0].map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("");
  const body = rows
    .slice(2)
    .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`)
    .join("");
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let list = [];
  let quote = [];
  let table = [];
  let code = [];
  let inCode = false;
  let codeLang = "";

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      list = [];
    }
  };
  const flushQuote = () => {
    if (quote.length) {
      blocks.push(`<blockquote>${quote.map((item) => `<p>${inlineMarkdown(item)}</p>`).join("")}</blockquote>`);
      quote = [];
    }
  };
  const flushTable = () => {
    if (table.length) {
      blocks.push(renderTable(table));
      table = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
    flushTable();
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
        codeLang = "";
      } else {
        flushAll();
        inCode = true;
        codeLang = line.slice(3).trim();
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (!line.trim()) {
      flushAll();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushAll();
      const level = heading[1].length;
      blocks.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushParagraph();
      flushQuote();
      flushTable();
      list.push(line.replace(/^\s*[-*]\s+/, ""));
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flushParagraph();
      flushQuote();
      flushTable();
      list.push(line.replace(/^\s*\d+\.\s+/, ""));
      continue;
    }

    if (line.startsWith(">")) {
      flushParagraph();
      flushList();
      flushTable();
      quote.push(line.replace(/^>\s?/, ""));
      continue;
    }

    if (line.includes("|") && /^\|?[\s\S]+\|[\s\S]*$/.test(line)) {
      flushParagraph();
      flushList();
      flushQuote();
      table.push(line);
      continue;
    }

    flushList();
    flushQuote();
    flushTable();
    paragraph.push(line.trim());
  }

  flushAll();
  return blocks.join("\n");
}

function renderChapterList(activeId) {
  chapterList.innerHTML = chapters
    .map((chapter, index) => {
      const active = chapter.id === activeId ? " active" : "";
      const status = chapter.status === "published" ? "已发布到 CSDN" : "待发布";
      return `
        <button class="chapter-button${active}" type="button" data-id="${chapter.id}">
          <span class="chapter-index">${String(index).padStart(2, "0")}</span>
          <span>${chapter.title}<span class="chapter-meta">${status}</span></span>
        </button>
      `;
    })
    .join("");
}

async function loadChapter(id) {
  const chapter = chapters.find((item) => item.id === id) || chapters[0];
  if (!chapter) return;

  renderChapterList(chapter.id);
  chapterTitle.textContent = chapter.title;
  sourceLink.href = chapter.file;
  sourceLink.textContent = chapter.csdnUrl ? "CSDN" : "Markdown";
  sourceLink.href = chapter.csdnUrl || chapter.file;
  currentChapterPath = chapter.file;
  content.textContent = "正在加载章节内容...";
  window.location.hash = chapter.id;

  const response = await fetch(chapter.file);
  const markdown = await response.text();
  content.innerHTML = markdownToHtml(markdown);
}

async function init() {
  const response = await fetch("./chapters.json");
  chapters = await response.json();
  const initialId = window.location.hash.replace("#", "") || chapters[0]?.id;
  renderChapterList(initialId);
  chapterList.addEventListener("click", (event) => {
    const button = event.target.closest(".chapter-button");
    if (button) loadChapter(button.dataset.id);
  });
  await loadChapter(initialId);
}

init().catch((error) => {
  content.textContent = `加载失败：${error.message}`;
});
