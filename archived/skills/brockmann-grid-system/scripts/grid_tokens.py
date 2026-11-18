#!/usr/bin/env python3
"""
grid_tokens.py — Müller-Brockmann editorial grid scaffold generator.

Emits a battle-tested, self-contained CSS + JS scaffold for building an
editorial/magazine webpage on a REAL, VERIFIED modular grid:

  • ONE source of truth: all grid params live in :root CSS variables, so
    every element places against the same columns at every viewport width.
  • Subgrid "bands" so every element is placed by column LINE, not eyeballed.
  • Vertical rhythm locked to an 8px baseline (24px leading).
  • Runtime OPTICAL ALIGNMENT: display type is nudged so its INK (not its box)
    lands on the column line — large letterforms carry a left side-bearing, so
    a headline whose box is on the grid still looks misaligned vs body text.

It only ALIGNS content to the grid. It does NOT change colours — it emits no
palette tokens and sets no background/text colour, so pasting the CSS block
into an existing page leaves that design system's colours untouched. It also
does not draw a visible grid overlay or a show/hide-grid control. (Use
scripts/verify_grid.js to measure adherence.)

No network, no credentials. Deterministic.

Usage:
  python3 grid_tokens.py                      # print CSS + JS block
  python3 grid_tokens.py --scaffold           # print a full minimal HTML page
  python3 grid_tokens.py --cols 12 --baseline 8 --gutter 24 --margin 72 --maxw 1296
"""
import argparse, sys

def build(cfg):
    c = cfg
    lh = c.baseline * 3  # leading = 3 baselines
    css = f""":root{{
  --cols:{c.cols};
  --bl:{c.baseline}px;            /* baseline unit */
  --lh:{lh}px;                    /* leading = 3 x baseline */
  --gutter:{c.gutter}px;
  --margin:{c.margin}px;
  --pad:{c.baseline*12}px;        /* spread top/bottom pad (x baseline) */
  --maxw:{c.maxw}px;
}}
/* NOTE: grid/layout/rhythm only — this scaffold sets NO colours. Keep the
   host page's palette (background, text, accents) exactly as it is. */
*{{box-sizing:border-box;}}
body{{margin:0;
  font-family:"Inter",system-ui,sans-serif;font-size:16px;line-height:var(--lh);
  -webkit-font-smoothing:antialiased;}}
img{{display:block;width:100%;height:100%;object-fit:cover;}}

/* ---- spread + grid scaffold (ONE source of truth) ---- */
.spread{{position:relative;width:100%;}}
.wrap{{position:relative;max-width:var(--maxw);margin:0 auto;padding:var(--pad) var(--margin);}}
.grid{{display:grid;grid-template-columns:repeat(var(--cols),1fr);
  column-gap:var(--gutter);row-gap:var(--lh);}}
/* a band spans all columns and re-exposes them as a subgrid so children
   align to the SAME lines as everything else on the page */
.band{{grid-column:1 / -1;display:grid;grid-template-columns:subgrid;
  column-gap:var(--gutter);row-gap:var(--lh);align-items:start;}}
@supports not (grid-template-columns:subgrid){{
  .band{{grid-template-columns:repeat(var(--cols),1fr);}}
}}
/* place children with: style="grid-column: <startline> / <endline>" */

/* ---- vertical rhythm helpers (keep ALL spacing a multiple of --bl) ----
   line-heights for display type MUST be px multiples of --bl, never unitless,
   or the box height drifts off the baseline. Media heights = multiples of --lh
   so photo top AND bottom land on lines. */"""

    js = """/* ---- OPTICAL ALIGNMENT --------------------------------------------------
   Large display glyphs carry a left side-bearing: the ink sits inside the
   layout box, so a headline whose BOX is on the column line still LOOKS
   indented (or overhangs) vs body text. Measure each display glyph's actual
   ink offset and nudge the element so its visible ink lands on the line.
   Scales with fluid type; re-runs after the webfont loads and on resize.
   Add the selector list to match your display elements. */
(function(){
  var cvs=document.createElement('canvas'),ctx=cvs.getContext('2d');
  var sel='.masthead, .numeral, .shead h2, .h2b';   /* <-- your display selectors */
  function align(){
    document.querySelectorAll(sel).forEach(function(el){
      el.style.marginLeft='0px';
      var cs=getComputedStyle(el),ch=(el.textContent||'').trim().charAt(0); if(!ch) return;
      if(cs.textTransform==='uppercase') ch=ch.toUpperCase();
      ctx.font=cs.fontStyle+' '+cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;
      ctx.textAlign='left';
      var abl=ctx.measureText(ch).actualBoundingBoxLeft; /* +ve = ink overhangs left */
      if(isFinite(abl)) el.style.marginLeft=abl.toFixed(2)+'px'; /* ink -> on the line */
    });
  }
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(align);}
  align();
  var t;window.addEventListener('resize',function(){clearTimeout(t);t=setTimeout(align,120);});
})();"""

    band = """      <!-- a band: children placed by column LINE -->
      <div class="band">
        <div style="grid-column:1 / 6;"><!-- text col --></div>
        <figure style="grid-column:6 / 13;"><!-- image col (height = x --lh) --></figure>
      </div>"""

    if cfg.scaffold:
        return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Editorial — modular grid</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
{css}
</style></head>
<body>
<section class="spread">
  <div class="wrap">
    <div class="grid">
{band}
    </div>
  </div>
</section>

<script>
{js}
</script>
</body></html>"""
    else:
        return ("/* ===== CSS (paste in <style>) ===== */\n" + css +
                "\n\n/* ===== JS (paste in <script>, after the DOM) ===== */\n" + js +
                "\n\n/* ===== band markup pattern ===== */\n" + band + "\n")

def main():
    ap = argparse.ArgumentParser(description="Müller-Brockmann editorial grid scaffold generator")
    ap.add_argument("--cols", type=int, default=12)
    ap.add_argument("--baseline", type=int, default=8, help="baseline unit in px (leading = 3x)")
    ap.add_argument("--gutter", type=int, default=24)
    ap.add_argument("--margin", type=int, default=72)
    ap.add_argument("--maxw", type=int, default=1296)
    ap.add_argument("--scaffold", action="store_true", help="emit a full minimal HTML page")
    cfg = ap.parse_args()
    for name, v in (("gutter", cfg.gutter), ("margin", cfg.margin)):
        if v % cfg.baseline != 0:
            print(f"# WARNING: --{name} ({v}) is not a multiple of --baseline ({cfg.baseline}); "
                  f"vertical/spacing rhythm will drift off the grid.", file=sys.stderr)
    sys.stdout.write(build(cfg) + "\n")

if __name__ == "__main__":
    main()
