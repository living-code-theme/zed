import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
test("fresh registry entry uses the root extension, current version and no retired path override", async () => {
  execFileSync(process.execPath, ["scripts/package.mjs"], { cwd: root, stdio: "pipe" });
  const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url)));
  const entry = await readFile(new URL("../dist/zed-registry.toml", import.meta.url), "utf8");
  assert.equal(entry, `[living-code-theme]\nsubmodule = "extensions/living-code-theme"\nversion = "${pkg.version}"\n`);
  assert.ok((await readFile(new URL("../extension.toml", import.meta.url), "utf8")).includes(`version = "${pkg.version}"`));
});
