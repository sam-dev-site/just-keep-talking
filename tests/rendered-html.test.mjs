import assert from "node:assert/strict";
import test from "node:test";

const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url).href);
async function render(query = "") {
  const response = await worker.fetch(
    new Request(`http://localhost/${query}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /Phase [12]|class="savings"|per hour|por hora/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  return html;
}

test("the deployable shell server-renders the default home page", async () => {
  const html = await render();
  assert.match(html, /Build the confidence/);
  assert.match(html, /Online English for Adults/);
  assert.equal((html.match(/<title>/g) ?? []).length, 1);
  assert.doesNotMatch(html, /<details[^>]*\sopen(?:=|\s|>)/i);
  assert.match(html, /\/brand\/students-talking\.webp/);
  assert.match(html, /\/brand\/audrey-founder\.webp/);
});

test("query-driven views retain a complete static shell before hydration", async () => {
  const html = await render("?lang=es&page=classes&audience=kids&format=group&currency=USD&size=4%2B");
  assert.match(html, /Build the confidence/);
  assert.match(html, /<main id="main">/);
  assert.match(html, /WhatsApp/);
});
