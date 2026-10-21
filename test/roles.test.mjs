// Port-owned role-contract tests, exercising generated files and real grammars.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {resolveAll} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';
import {CAPTURE_UI,captureRole} from './contract.mjs';

const root = new URL("../", import.meta.url);

const read = (path) => readFileSync(new URL(path, root), "utf8");

const captures = JSON.parse(read("test/fixtures/captures.json"));

const flavors = resolveAll();

function fallback(table, name) {
  for (let n = name; n; n = n.includes(".") ? n.slice(0, n.lastIndexOf(".")) : "") if (Object.hasOwn(table, n)) return table[n];
  return undefined;
}

const norm = (hex) => hex?.toLowerCase().slice(0, 7);

const TERMINALS = {"zed (terminal)": (f) => {
    const t = JSON.parse(read("themes/living-code.json")).themes.find((x) => x.name === f.name).style;
    const names = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
    return { ansi: [...names.map((n) => t[`terminal.ansi.${n}`]), ...names.map((n) => t[`terminal.ansi.bright_${n}`])] };
  }};

const EDITOR_UI = {zed: (f) => {
    const t = JSON.parse(read("themes/living-code.json")).themes.find((x) => x.name === f.name).style;
    return { bg: t["editor.background"], fg: t["editor.foreground"], cursor: t.players[0].cursor, selection: t.players[0].selection, lineNumber: t["editor.line_number"], lineNumberActive: t["editor.active_line_number"], lineHighlight: t["editor.active_line.background"] };
  }};

test("every capture an editor uses has a role in the contract", () => {
  for (const engine of ["zed"]) {
    const ui = new Set(CAPTURE_UI[engine]);
    const undecided = captures[engine].filter((n) => !ui.has(n) && captureRole(engine, n) === undefined);
    assert.deepEqual(undecided, [], `${engine}: decide these captures' roles in scripts/roles.mjs`);
  }
});

test("Zed colors every capture it highlights with its role", () => {
  const family = JSON.parse(read("themes/living-code.json"));
  const failures = [];
  const ui = new Set(CAPTURE_UI.zed);
  for (const f of flavors) {
    const syntax = family.themes.find((t) => t.name === f.name).style.syntax;
    const table = Object.fromEntries(Object.entries(syntax).map(([k, v]) => [k, v.color]));
    for (const name of captures.zed) {
      const role = captureRole("zed", name);
      if (!role || ui.has(name)) continue;
      const got = fallback(table, name);
      if (norm(got) !== norm(f.r(role))) failures.push(`zed ${f.id} ${name}: ${role} is ${f.r(role)}, got ${got}`);
    }
  }
  assert.deepEqual(failures, []);
});

test("every terminal has the same ANSI colors, background, foreground, cursor and selection", () => {
  const failures = [];
  for (const f of flavors) {
    const want = { bg: f.r("bg"), fg: f.r("fg"), cursor: f.r("cursor"), selection: f.r("selection"), ansi: [...f.ansi.normal, ...f.ansi.bright] };
    for (const [port, load] of Object.entries(TERMINALS)) {
      const got = load(f);
      for (const k of ["bg", "fg", "cursor", "selection"]) {
        if (k in got && norm(got[k]) !== norm(want[k])) failures.push(`${port} ${f.id} ${k}: ${want[k]}, got ${got[k]}`);
      }
      got.ansi.forEach((c, i) => { if (norm(c) !== norm(want.ansi[i])) failures.push(`${port} ${f.id} ANSI ${i}: ${want.ansi[i]}, got ${c}`); });
    }
  }
  assert.deepEqual(failures, []);
});

test("every editor draws its editing surface with the same roles", async () => {
  const failures = [];
  for (const f of flavors) {
    for (const [port, load] of Object.entries(EDITOR_UI)) {
      const got = await load(f);
      for (const [role, color] of Object.entries(got)) {
        if (norm(color) !== norm(f.r(role))) failures.push(`${port} ${f.id} ${role}: ${f.r(role)}, got ${color}`);
      }
    }
  }
  assert.deepEqual(failures, []);
});
