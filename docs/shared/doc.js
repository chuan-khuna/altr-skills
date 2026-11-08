/* Shared behaviour for HTML documents in docs/.
   Load in <head> without defer, so the theme is set before first paint:
     <script src="../../shared/doc.js"></script>
   Provides: theme switcher (Auto / Moon / Dawn), code-theme cycle
   (Rosé Pine / Catppuccin / Everforest) with Shiki, Mermaid diagrams
   rendered by Pele (expand, close, zoom, pan), and the table of contents. */

(() => {
  "use strict";

  const SHIKI_URL = "https://esm.sh/shiki@4.5.0";
  const PELE_URL = "https://cdn.jsdelivr.net/npm/pele@1.12.0/dist/pele.global.js";

  const CODE_THEMES = [
    { id: "rose-pine", name: "Rosé Pine", light: "rose-pine-dawn", dark: "rose-pine-moon", key: "rp" },
    { id: "catppuccin", name: "Catppuccin", light: "catppuccin-latte", dark: "catppuccin-macchiato", key: "cp" },
    { id: "everforest", name: "Everforest", light: "everforest-light", dark: "everforest-dark", key: "ef" },
  ];

  const ICONS = {
    auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    dawn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
    expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',
    zoomIn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/></svg>',
    zoomOut: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M8 11h6"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
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
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  /* ---------- Theme ---------- */

  let themeChoice = store.get("doc-theme") || "auto";

  function applyTheme() {
    const mode = themeChoice === "auto" ? (darkQuery.matches ? "moon" : "dawn") : themeChoice;
    root.dataset.theme = mode;
    document.querySelectorAll("[data-theme-choice]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.themeChoice === themeChoice));
    });
  }

  let codeTheme = CODE_THEMES.find((t) => t.id === store.get("doc-code-theme")) || CODE_THEMES[0];

  function applyCodeTheme() {
    root.dataset.codeTheme = codeTheme.id;
    document.querySelectorAll("[data-code-theme-cycle]").forEach((b) => {
      const label = `Code theme: ${codeTheme.name}`;
      b.title = label;
      b.setAttribute("aria-label", label);
    });
  }

  applyTheme();
  applyCodeTheme();
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

  function buildControls(host) {
    host.classList.add("controls");

    const group = document.createElement("div");
    group.className = "segmented";
    group.setAttribute("role", "group");
    group.setAttribute("aria-label", "Theme");
    for (const [id, label] of [
      ["auto", "Auto"],
      ["moon", "Moon"],
      ["dawn", "Dawn"],
    ]) {
      const b = button(id, label, { "data-theme-choice": id });
      b.addEventListener("click", () => {
        themeChoice = id;
        store.set("doc-theme", id);
        applyTheme();
      });
      group.append(b);
    }

    const cycle = button("palette", "Code theme", { "data-code-theme-cycle": "" });
    cycle.classList.add("solo");
    cycle.addEventListener("click", () => {
      const i = CODE_THEMES.indexOf(codeTheme);
      codeTheme = CODE_THEMES[(i + 1) % CODE_THEMES.length];
      store.set("doc-code-theme", codeTheme.id);
      applyCodeTheme();
    });

    host.append(group, cycle);
    applyTheme();
    applyCodeTheme();
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

    const themes = {};
    for (const t of CODE_THEMES) {
      themes[`${t.key}-light`] = t.light;
      themes[`${t.key}-dark`] = t.dark;
    }

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

  /* ---------- Boot ---------- */

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-doc-controls]").forEach(buildControls);
    document.querySelectorAll("nav.toc[data-auto]").forEach(buildToc);
    highlightCode();
    renderDiagrams();
  });
})();
