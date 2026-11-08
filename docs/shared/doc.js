/* Shared behaviour for HTML documents in docs/.
   Load in <head> without defer, so the theme is set before first paint:
     <script src="../../shared/doc.js"></script>
   Provides: theme dropdown (Auto, then Light / Dark groups of Rosé Pine,
   Catppuccin, Everforest and Kanagawa; code blocks use the matching Shiki
   theme), Mermaid diagrams rendered by Pele (zoom, reset, expand, pan),
   glossary pop-ups, and the table of contents. */

(() => {
  "use strict";

  /* Resolve sibling files (glossary data, glossary page) from this script's URL. */
  const BASE = document.currentScript?.src || location.href;
  const GLOSSARY_DATA_URL = new URL("glossary-data.js", BASE).href;
  const GLOSSARY_PAGE_URL = new URL("../documents/glossary.html", BASE).href;

  const SHIKI_URL = "https://esm.sh/shiki@4.5.0";
  const PELE_URL = "https://cdn.jsdelivr.net/npm/pele@1.12.0/dist/pele.global.js";
  /* MIT, not on npm: pinned to a commit of github.com/Robincodes-Sandbox/marker-highlight. */
  const MARKER_URL =
    "https://cdn.jsdelivr.net/gh/Robincodes-Sandbox/marker-highlight@77fb1c06495cdc09cf4c3d12710a6bc38988b050/dist/marker-highlight.min.js";

  /* Each id is both the data-theme value (colour tokens in globals.css)
     and the Shiki theme name used for code blocks. */
  const THEMES = [
    { id: "rose-pine-dawn", name: "Rosé Pine Dawn", mode: "light" },
    { id: "catppuccin-latte", name: "Catppuccin Latte", mode: "light" },
    { id: "everforest-light", name: "Everforest Light", mode: "light" },
    { id: "kanagawa-lotus", name: "Kanagawa Lotus", mode: "light" },
    { id: "rose-pine-moon", name: "Rosé Pine Moon", mode: "dark" },
    { id: "catppuccin-macchiato", name: "Catppuccin Macchiato", mode: "dark" },
    { id: "everforest-dark", name: "Everforest Dark", mode: "dark" },
    { id: "kanagawa-wave", name: "Kanagawa Wave", mode: "dark" },
  ];
  /* Auto follows the system light/dark setting with Rosé Pine. */
  const AUTO = { light: "rose-pine-dawn", dark: "rose-pine-moon" };
  const LEGACY = { dawn: "rose-pine-dawn", moon: "rose-pine-moon" };

  const ICONS = {
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.56-2.5 5.56-5.55C21.97 6.01 17.46 2 12 2z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
    zoomIn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/></svg>',
    zoomOut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  };

  const store = {
    get(k) {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
      } catch {
        /* storage blocked: keep the in-memory choice */
      }
    },
  };

  const root = document.documentElement;
  let marker; /* MarkerHighlighter instance, set by highlightMarks() */
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  /* ---------- Theme ---------- */

  let themeChoice = store.get("doc-theme") || "auto";
  themeChoice = LEGACY[themeChoice] || themeChoice;
  if (themeChoice !== "auto" && !THEMES.some((t) => t.id === themeChoice)) themeChoice = "auto";

  function applyTheme() {
    const id = themeChoice === "auto" ? AUTO[darkQuery.matches ? "dark" : "light"] : themeChoice;
    const theme = THEMES.find((t) => t.id === id);
    root.dataset.theme = theme.id;
    root.dataset.mode = theme.mode;
    document.querySelectorAll("[data-theme-menu]").forEach((m) => m._sync?.());
    refreshMarks();
  }

  applyTheme();
  darkQuery.addEventListener("change", applyTheme);

  /* ---------- Controls ---------- */

  function button(icon, label, attrs = {}) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "icon-btn";
    b.innerHTML = ICONS[icon];
    b.title = label;
    b.setAttribute("aria-label", label);
    for (const [k, v] of Object.entries(attrs)) b.setAttribute(k, v);
    return b;
  }

  /* Swatch markup: the theme's own base, text and accent colours.
     data-theme-preview pulls that theme's tokens from globals.css. */
  function swatchPart(id) {
    return `<span data-theme-preview="${id}"><span class="dots"><i></i><i></i><i></i></span></span>`;
  }
  function swatch(choice) {
    if (choice === "auto") return `<span class="theme-swatch split" aria-hidden="true">${swatchPart(AUTO.light)}${swatchPart(AUTO.dark)}</span>`;
    return `<span class="theme-swatch" aria-hidden="true">${swatchPart(choice)}</span>`;
  }
  const choiceName = (choice) => (choice === "auto" ? "Auto (system)" : THEMES.find((t) => t.id === choice).name);

  /* Custom listbox: a native <select> list cannot show previews or take theme colours. */
  let menuCount = 0;
  function buildControls(host) {
    host.classList.add("controls");
    const uid = `theme-list-${++menuCount}`;

    const menu = document.createElement("div");
    menu.className = "theme-menu";
    menu.setAttribute("data-theme-menu", "");

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "theme-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", uid);
    trigger.title = "Theme";

    const list = document.createElement("ul");
    list.className = "theme-list";
    list.id = uid;
    list.hidden = true;
    list.tabIndex = -1;
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-label", "Theme");

    const option = (choice) => {
      const li = document.createElement("li");
      li.className = "theme-option";
      li.id = `${uid}-${choice}`;
      li.dataset.choice = choice;
      li.setAttribute("role", "option");
      li.innerHTML = `${swatch(choice)}<span>${choiceName(choice)}</span>${ICONS.check.replace("<svg", '<svg class="check"')}`;
      return li;
    };

    list.append(option("auto"));
    for (const [mode, label] of [
      ["light", "Light"],
      ["dark", "Dark"],
    ]) {
      const head = document.createElement("li");
      head.className = "theme-group";
      head.setAttribute("role", "presentation");
      head.textContent = label;
      list.append(head);
      for (const t of THEMES.filter((t) => t.mode === mode)) list.append(option(t.id));
    }
    const options = [...list.querySelectorAll(".theme-option")];

    let active = -1;
    const setActive = (i) => {
      active = (i + options.length) % options.length;
      options.forEach((o, n) => o.classList.toggle("active", n === active));
      list.setAttribute("aria-activedescendant", options[active].id);
      options[active].scrollIntoView({ block: "nearest" });
    };
    const open = () => {
      list.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      setActive(options.findIndex((o) => o.dataset.choice === themeChoice));
      list.focus();
    };
    const close = (refocus = true) => {
      list.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      if (refocus) trigger.focus();
    };
    const choose = (choice) => {
      themeChoice = choice;
      store.set("doc-theme", choice);
      applyTheme();
      close();
    };

    trigger.addEventListener("click", () => (list.hidden ? open() : close()));
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        open();
      }
    });
    list.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") setActive(active + 1);
      else if (e.key === "ArrowUp") setActive(active - 1);
      else if (e.key === "Home") setActive(0);
      else if (e.key === "End") setActive(options.length - 1);
      else if (e.key === "Enter" || e.key === " ") choose(options[active].dataset.choice);
      else if (e.key === "Escape") close();
      else if (e.key === "Tab") close(false);
      else return;
      e.preventDefault();
    });
    list.addEventListener("mousemove", (e) => {
      const o = e.target.closest(".theme-option");
      if (o) setActive(options.indexOf(o));
    });
    list.addEventListener("click", (e) => {
      const o = e.target.closest(".theme-option");
      if (o) choose(o.dataset.choice);
    });
    document.addEventListener("pointerdown", (e) => {
      if (!list.hidden && !menu.contains(e.target)) close(false);
    });

    menu._sync = () => {
      trigger.innerHTML = `${ICONS.palette}<span>${choiceName(themeChoice)}</span>${ICONS.chevron.replace("<svg", '<svg class="chev"')}`;
      trigger.setAttribute("aria-label", `Theme: ${choiceName(themeChoice)}`);
      options.forEach((o) => o.setAttribute("aria-selected", String(o.dataset.choice === themeChoice)));
    };

    menu.append(trigger, list);
    host.append(menu);
    applyTheme();
  }

  /* ---------- Table of contents ---------- */

  function slug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-|-$/g, "");
  }

  function buildToc(nav) {
    const content = document.querySelector(".content");
    if (!content) return;
    const heads = [...content.querySelectorAll("h2")];
    if (!heads.length) return;

    const title = document.createElement("p");
    title.className = "toc-title";
    title.textContent = "Contents";
    const list = document.createElement("ul");

    for (const h of heads) {
      if (!h.id) h.id = slug(h.textContent);
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent;
      li.append(a);
      list.append(li);
    }
    nav.replaceChildren(title, list);

    const links = new Map([...list.querySelectorAll("a")].map((a) => [a.hash.slice(1), a]));
    const visible = new Set();
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id);
        const current = heads.find((h) => visible.has(h.id)) || heads.filter((h) => h.getBoundingClientRect().top < 0).pop();
        links.forEach((a) => a.classList.remove("active"));
        if (current) links.get(current.id)?.classList.add("active");
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    heads.forEach((h) => spy.observe(h));
  }

  /* ---------- Code blocks ---------- */

  async function highlightCode() {
    const blocks = [...document.querySelectorAll("pre > code[class*='language-']")];
    if (!blocks.length) return;

    const themes = Object.fromEntries(THEMES.map((t) => [t.id, t.id]));

    let codeToHtml;
    try {
      ({ codeToHtml } = await import(SHIKI_URL));
    } catch {
      return; /* offline: keep the plain <pre> */
    }

    for (const code of blocks) {
      const pre = code.parentElement;
      const lang = (code.className.match(/language-([\w-]+)/) || [])[1] || "text";
      const wrap = document.createElement("div");
      wrap.className = "code-block";
      try {
        wrap.innerHTML = await codeToHtml(code.textContent.replace(/\n$/, ""), { lang, themes, defaultColor: false });
      } catch {
        wrap.append(pre.cloneNode(true));
      }
      const tag = document.createElement("span");
      tag.className = "code-lang";
      tag.textContent = lang;
      wrap.append(tag);
      pre.replaceWith(wrap);
    }
  }

  /* ---------- Diagrams ---------- */

  let pelePromise;
  function loadPele() {
    if (window.pele) return Promise.resolve(window.pele);
    pelePromise ||= new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = PELE_URL;
      s.onload = () => resolve(window.pele);
      s.onerror = reject;
      document.head.append(s);
    });
    return pelePromise;
  }

  const ZOOM_STEP = 1.25;

  /* One horizontal toolbar: [zoom in | zoom out | reset | extra].
     getMounted() returns the current Pele mount, so the same toolbar
     works for the inline diagram and the expanded dialog. */
  function diagramToolbar(getMounted, extra) {
    const bar = document.createElement("div");
    bar.className = "diagram-toolbar";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Diagram controls");
    const zoom = () => getMounted()?.zoom;
    const actions = [
      ["zoomIn", "Zoom in", () => zoom()?.zoomBy(ZOOM_STEP)],
      ["zoomOut", "Zoom out", () => zoom()?.zoomBy(1 / ZOOM_STEP)],
      ["reset", "Reset", () => zoom()?.reset()],
    ];
    for (const [icon, label, fn] of actions) {
      const b = button(icon, label);
      b.addEventListener("click", fn);
      bar.append(b);
    }
    bar.append(extra);
    return bar;
  }

  const ZOOM_OPTS = { always: true, controls: false };

  let dialog;
  function getDialog() {
    if (dialog) return dialog;
    dialog = document.createElement("dialog");
    dialog.className = "diagram-dialog";
    dialog.innerHTML = '<div class="dialog-bar"><span class="dialog-title"></span></div><div class="dialog-body"><div></div></div>';
    const close = button("close", "Close");
    close.addEventListener("click", () => dialog.close());
    dialog.querySelector(".dialog-bar").append(diagramToolbar(() => dialog._mounted, close));
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      dialog._mounted?.destroy();
      dialog._mounted = null;
    });
    document.body.append(dialog);
    return dialog;
  }

  async function renderDiagrams() {
    const figures = [...document.querySelectorAll("figure.diagram")];
    if (!figures.length) return;

    let pele;
    try {
      pele = await loadPele();
    } catch {
      figures.forEach((f) => f.querySelector("pre.mermaid")?.style.setProperty("display", "block"));
      return;
    }

    for (const fig of figures) {
      const src = fig.querySelector("pre.mermaid")?.textContent.trim();
      if (!src) continue;
      const target = document.createElement("div");
      target.className = "diagram-render";
      fig.querySelector("pre.mermaid").after(target);
      const mounted = pele.mount(target, src, { zoom: ZOOM_OPTS });

      const caption = fig.querySelector("figcaption")?.textContent || "Diagram";
      const expand = button("expand", "Expand");
      expand.addEventListener("click", () => {
        const d = getDialog();
        d.querySelector(".dialog-title").textContent = caption;
        d.showModal();
        const host = d.querySelector(".dialog-body > div");
        host.replaceChildren();
        d._mounted = pele.mount(host, src, { zoom: { ...ZOOM_OPTS, maxScale: 6 } });
      });
      fig.append(diagramToolbar(() => mounted, expand));
    }
  }

  /* ---------- Glossary ---------- */

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.append(s);
    });
  }

  async function loadGlossary() {
    if (!window.DOC_GLOSSARY) {
      try {
        await loadScript(GLOSSARY_DATA_URL);
      } catch {
        return [];
      }
    }
    return window.DOC_GLOSSARY || [];
  }

  const termHref = (id) => `${GLOSSARY_PAGE_URL}#${id}`;

  /* Link the first use of each glossary term in the page body.
     Skips code, links, headings, diagrams and the page header.
     Write <a class="term" data-term="id"> by hand to pick a specific spot. */
  const SKIP = "pre, code, a, h1, h2, h3, h4, figure, .header, .toc, .topbar, .no-terms";

  function linkTerms(entries) {
    const content = document.querySelector(".content");
    if (!content) return;
    const done = new Set([...content.querySelectorAll(".term[data-term]")].map((a) => a.dataset.term));

    for (const entry of entries) {
      if (done.has(entry.id) || !entry.match) continue;
      const re = new RegExp(entry.match, "i");
      const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => (n.parentElement.closest(SKIP) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
      });
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const m = re.exec(node.nodeValue);
        if (!m) continue;
        const hit = node.splitText(m.index);
        hit.splitText(m[0].length);
        const a = document.createElement("a");
        a.className = "term";
        a.dataset.term = entry.id;
        a.textContent = hit.nodeValue;
        hit.replaceWith(a);
        done.add(entry.id);
        break;
      }
    }

    const byId = new Map(entries.map((e) => [e.id, e]));
    content.querySelectorAll(".term[data-term]").forEach((a) => {
      if (!byId.has(a.dataset.term)) return;
      a.href = termHref(a.dataset.term);
      a.setAttribute("aria-describedby", "term-pop");
      attachPopup(a, byId.get(a.dataset.term));
    });
  }

  let pop;
  let hideTimer;
  function getPopup() {
    if (pop) return pop;
    pop = document.createElement("div");
    pop.id = "term-pop";
    pop.className = "term-pop";
    pop.setAttribute("role", "tooltip");
    pop.hidden = true;
    pop.innerHTML = `<div class="term-pop-head"><span class="term-pop-kicker">${ICONS.book}Glossary</span><span class="term-pop-title"></span></div><p class="term-pop-body"></p><a class="term-pop-link">Read definition <span aria-hidden="true">→</span></a>`;
    pop.addEventListener("mouseenter", () => clearTimeout(hideTimer));
    pop.addEventListener("mouseleave", scheduleHide);
    document.addEventListener("keydown", (e) => e.key === "Escape" && hidePopup());
    window.addEventListener("scroll", () => !pop.hidden && pop._anchor && place(pop._anchor), { passive: true });
    document.body.append(pop);
    return pop;
  }

  function place(anchor) {
    const r = anchor.getBoundingClientRect();
    const w = Math.min(320, window.innerWidth - 32);
    pop.style.width = `${w}px`;
    const left = Math.max(16, Math.min(r.left, window.innerWidth - w - 16));
    const below = r.bottom + 8;
    const h = pop.offsetHeight;
    const top = below + h > window.innerHeight - 8 && r.top - h - 8 > 8 ? r.top - h - 8 : below;
    pop.style.left = `${left + window.scrollX}px`;
    pop.style.top = `${top + window.scrollY}px`;
  }

  function showPopup(anchor, entry) {
    const p = getPopup();
    clearTimeout(hideTimer);
    p.querySelector(".term-pop-title").textContent = entry.term;
    p.querySelector(".term-pop-body").textContent = entry.short;
    p.querySelector(".term-pop-link").href = termHref(entry.id);
    p._anchor = anchor;
    p.hidden = false;
    place(anchor);
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hidePopup, 150);
  }
  function hidePopup() {
    if (pop) pop.hidden = true;
  }

  function attachPopup(a, entry) {
    let showTimer;
    a.addEventListener("mouseenter", () => {
      showTimer = setTimeout(() => showPopup(a, entry), 120);
    });
    a.addEventListener("mouseleave", () => {
      clearTimeout(showTimer);
      scheduleHide();
    });
    a.addEventListener("focus", () => showPopup(a, entry));
    a.addEventListener("blur", scheduleHide);
    /* Touch: first tap shows the pop-up, second tap follows the link. */
    a.addEventListener("click", (e) => {
      const open = pop && !pop.hidden && pop._anchor === a;
      if (window.matchMedia("(hover: none)").matches && !open) {
        e.preventDefault();
        showPopup(a, entry);
      }
    });
  }

  /* Glossary page: <div data-glossary></div> renders every entry by group. */
  function renderGlossary(host, entries) {
    const groups = new Map();
    for (const e of [...entries].sort((a, b) => a.term.localeCompare(b.term))) {
      if (!groups.has(e.group)) groups.set(e.group, []);
      groups.get(e.group).push(e);
    }
    const frag = document.createDocumentFragment();
    for (const [group, list] of groups) {
      const h2 = document.createElement("h2");
      h2.textContent = group;
      h2.id = slug(group);
      const dl = document.createElement("dl");
      dl.className = "glossary";
      for (const e of list) {
        const dt = document.createElement("dt");
        dt.id = e.id;
        const anchor = document.createElement("a");
        anchor.href = `#${e.id}`;
        anchor.textContent = e.term;
        dt.append(anchor);
        const dd = document.createElement("dd");
        const p = document.createElement("p");
        p.textContent = e.short;
        dd.append(p);
        if (e.more) {
          const more = document.createElement("p");
          more.textContent = e.more;
          dd.append(more);
        }
        dl.append(dt, dd);
      }
      frag.append(h2, dl);
    }
    host.replaceChildren(frag);
    if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
  }

  /* ---------- Marker highlight ---------- */

  /* Use <mark> only for the few passages a reader must not miss. */

  /* marker-highlight parses only hex/rgb, so resolve the theme colour
     (oklch / color-mix) to rgb() through a 1px canvas. */
  let probe;
  function toRgb(color) {
    probe ||= document.createElement("canvas").getContext("2d", { willReadFrequently: true });
    probe.clearRect(0, 0, 1, 1);
    probe.fillStyle = "#000";
    probe.fillStyle = color;
    probe.fillRect(0, 0, 1, 1);
    const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
  }

  function markColours(marks) {
    for (const m of marks) {
      m.style.backgroundColor = "";
      m.removeAttribute("data-original-bgcolor");
      /* Computed background-color has color-mix() already resolved. */
      m.setAttribute("data-original-bgcolor", toRgb(getComputedStyle(m).backgroundColor));
    }
  }

  async function highlightMarks() {
    const content = document.querySelector(".content");
    const marks = content ? [...content.querySelectorAll("mark")] : [];
    if (!marks.length) return;
    let MarkerHighlighter;
    try {
      ({ MarkerHighlighter } = await import(MARKER_URL));
    } catch {
      return; /* offline: <mark> keeps its plain CSS background */
    }
    await document.fonts?.ready;
    markColours(marks);
    marker = new MarkerHighlighter(content, {
      drawingMode: "highlight",
      animationTrigger: "scrollIntoView",
      animationSpeed: 900,
      height: 0.9,
      padding: 0.1,
    });
  }

  function refreshMarks() {
    if (!marker) return;
    markColours(document.querySelectorAll(".content mark"));
    marker.rerunHighlight();
  }

  /* ---------- Boot ---------- */

  document.addEventListener("DOMContentLoaded", async () => {
    document.querySelectorAll("[data-doc-controls]").forEach(buildControls);
    highlightCode();
    renderDiagrams();
    highlightMarks();

    const entries = await loadGlossary();
    const glossaryHost = document.querySelector("[data-glossary]");
    if (glossaryHost) renderGlossary(glossaryHost, entries);
    else linkTerms(entries);

    /* Build the TOC last, so it sees headings the glossary page adds. */
    document.querySelectorAll("nav.toc[data-auto]").forEach(buildToc);
  });
})();
