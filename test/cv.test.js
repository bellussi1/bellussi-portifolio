import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const siteRoot = new URL("../", import.meta.url);

test("publishes both ATS-oriented resumes", async () => {
  for (const file of ["curriculo-en.pdf", "curriculo-pt.pdf"]) {
    const url = new URL(`public/${file}`, siteRoot);
    const info = await stat(url);
    assert.ok(info.size > 15_000, `${file} is unexpectedly small`);
    const buffer = await readFile(url);
    assert.equal(buffer.subarray(0, 5).toString(), "%PDF-");
  }
});
