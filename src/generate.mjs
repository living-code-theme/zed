// This port owns its application mappings. Inputs come only from the pinned local palette.
import { ANSI_ORDER } from '../scripts/palette.mjs';

const zed = { files: () => [], all: (fs) => {
const a = (h, x) => h + Math.round(x * 255).toString(16).padStart(2, "0");
const theme = (f) => {
      const r = f.r, c = f.c;
      const syn = (role) => ({ color: r(role), font_style: f.styles[role] === "italic" ? "italic" : null, font_weight: f.styles[role] === "bold" ? 700 : null });
      return {
        name: f.name,
        appearance: f.light ? "light" : "dark",
        style: {
          background: r("bgDeep"), "surface.background": r("bgDeep"), "elevated_surface.background": r("bgAlt"),
          "editor.background": r("bg"), "editor.foreground": r("fg"), "editor.gutter.background": r("bg"),
          "editor.active_line.background": r("lineHighlight"), "editor.line_number": r("lineNumber"),
          "editor.active_line_number": r("lineNumberActive"), "editor.indent_guide": c("surface0"),
          "editor.indent_guide_active": c("surface2"), "editor.wrap_guide": c("surface0"),
          "editor.document_highlight.read_background": a(c("steel"), 0.15),
          border: r("border"), "border.variant": r("border"), "border.focused": r("accent"), "border.selected": r("accent"),
          text: r("fg"), "text.muted": r("fgMuted"), "text.placeholder": r("lineNumber"), "text.accent": r("accent"),
          icon: r("fgMuted"), "icon.accent": r("accent"),
          "element.background": c("surface0"), "element.hover": c("surface0"), "element.selected": c("surface1"),
          "ghost_element.hover": a(c("surface1"), 0.5), "ghost_element.selected": c("surface1"),
          "tab_bar.background": r("bgDeep"), "tab.active_background": r("bg"), "tab.inactive_background": r("bgDeep"),
          "toolbar.background": r("bg"), "title_bar.background": r("bgDeep"),
          // Unset, an unfocused window falls back to Zed's own gray title bar.
          "title_bar.inactive_background": r("bgDeep"), "status_bar.background": r("bgDeep"),
          "panel.background": r("bgDeep"), "panel.focused_border": r("accent"),
          "scrollbar.thumb.background": a(c("surface2"), 0.6), "scrollbar.track.background": "#00000000",
          "search.match_background": a(c("amber"), 0.3),
          "terminal.background": r("bg"), "terminal.foreground": r("fg"),
          ...Object.fromEntries(ANSI_ORDER.flatMap((n, i) => [[`terminal.ansi.${n}`, f.ansi.normal[i]], [`terminal.ansi.bright_${n}`, f.ansi.bright[i]]])),
          error: r("error"), warning: r("warning"), info: r("info"), hint: r("hint"), success: r("success"),
          created: r("added"), modified: r("modified"), deleted: r("removed"), conflict: c("orchid"),
          ignored: r("lineNumber"), hidden: r("lineNumber"),
          players: [{ cursor: r("cursor"), selection: r("selection"), background: r("accent") }],
          syntax: {
            comment: syn("comment"), "comment.doc": syn("comment"), keyword: syn("keyword"),
            function: syn("function"), string: syn("string"), "string.escape": syn("escape"), "string.regex": syn("regex"),
            number: syn("number"), boolean: syn("constant"), constant: syn("variable"), "constant.builtin": syn("constant"), type: syn("type"),
            constructor: syn("type"), operator: syn("operator"), punctuation: syn("punctuation"),
            "punctuation.bracket": syn("punctuation"), "punctuation.delimiter": syn("punctuation"),
            "punctuation.special": syn("keyword"), attribute: syn("decorator"), tag: syn("tag"),
            property: syn("property"), variable: syn("variable"), "variable.special": syn("builtin"),
            namespace: syn("namespace"), label: syn("decorator"), title: syn("heading"),
            link_uri: syn("link"), link_text: syn("link"), "text.literal": syn("code"), emphasis: { font_style: "italic" },
            "emphasis.strong": { font_weight: 700 }, embedded: syn("variable"), text: syn("variable"), nested: syn("variable"),
            // The rest of the names Zed's own grammars capture (test/fixtures/captures.json), with the roles of
            // the contract in test/contract.mjs. A missing name falls back to plain text in Zed.
            "variable.builtin": syn("builtin"), "variable.parameter": syn("parameter"), "variable.jsdoc": syn("parameter"),
            enum: syn("type"), variant: syn("property"), concept: syn("type"), "tag.component": syn("type"),
            "attribute.jsx": syn("attribute"), preproc: syn("decorator"), "keyword.directive": syn("decorator"),
            "keyword.preproc": syn("decorator"), "function.decorator": syn("decorator"), "function.special": syn("decorator"),
            lifetime: syn("decorator"), module: syn("namespace"), "string.doc": syn("comment"), "string.special": syn("escape"),
            "string.special.symbol": syn("constant"), "punctuation.list_marker": syn("accent"),
            "selector.class": syn("type"), "selector.id": syn("type"), "selector.pseudo": syn("decorator"),
            "diff.plus": syn("added"), "diff.minus": syn("removed"), hint: syn("fgSubtle"),
          },
        },
      };
    };
return [{
        path: "themes/living-code.json",
        content: JSON.stringify({ $schema: "https://zed.dev/schema/themes/v0.2.0.json", name: "Living Code", author: "Living Code", themes: fs.map(theme) }, null, 2) + "\n",
      }];
} };

export function generate(flavors) {
  return [...flavors.flatMap(f => zed.files(f)), ...(zed.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
