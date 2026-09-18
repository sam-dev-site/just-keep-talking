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

test("direct URLs server-render each destination in both languages", async () => {
  for (const lang of ["en", "es"]) {
    const home = await render(`?lang=${lang}`);
    assert.match(home, lang === "en" ? /Build the confidence/ : /Gana confianza/);
    assert.match(home, lang === "en" ? /Online English for Adults/ : /Inglés en línea para adultos/);
    assert.equal((home.match(/<title>/g) ?? []).length, 1);
    assert.doesNotMatch(home, /<details[^>]*\sopen(?:=|\s|>)/i);
    const about = await render(`?lang=${lang}&page=about`);
    assert.equal((about.match(/class="team-card"/g) ?? []).length, 6);
    for (const name of ["Audrey", "Iain", "Shay", "Monique", "Cristian", "Charlie"]) assert.match(about, new RegExp(name));
    const policies = await render(`?lang=${lang}&page=policies`);
    assert.match(policies, lang === "en" ? /Upcoming 2027 policy/ : /Próxima política de 2027/);
    assert.doesNotMatch(policies, /Venmo|majority|mayoría/);
    const teach = await render(`?lang=${lang}&page=teach`);
    assert.match(teach, lang === "en" ? /Apply on WhatsApp/ : /Postúlate por WhatsApp/);
  }
});

test("all owner-confirmed two-plan prices and schedules render in both languages and currencies", async () => {
  const offers = [
    ["adults", "private", "2", [65000,125000], [150,285]],
    ["adults", "group", "2", [48000,92000], [110,210]],
    ["adults", "group", "3", [41000,79000], [95,180]],
    ["adults", "group", "4+", [35000,67000], [80,150]],
    ["kids", "private", "2", [33000,63000], [75,145]],
    ["kids", "group", "2", [26000,50000], [60,110]],
    ["kids", "group", "3", [22000,42000], [50,95]],
    ["kids", "group", "4+", [18000,36000], [42,80]],
  ];
  for (const lang of ["en","es"]) for (const [audience,format,size,crc,usd] of offers) {
    for (const [currency,amounts] of [["CRC",crc],["USD",usd]]) {
      const html = await render(`?${new URLSearchParams({page:"classes",lang,audience,format,size,currency})}`);
      assert.equal((html.match(/class="plan-card"/g) ?? []).length, 2);
      for (const amount of amounts) assert.ok(html.includes(`${new Intl.NumberFormat(lang === "en" ? "en-US" : "es-CR").format(amount)} ${currency}`));
      const kidsGroup=audience === "kids" && format === "group";
      assert.match(html, kidsGroup ? /Explorer/ : /Essential/);
      assert.match(html, kidsGroup ? /Builder/ : /Standard/);
      assert.match(html, kidsGroup ? (lang === "en" ? /30 minutes weekly/ : /30 minutos semanales/) : (lang === "en" ? /2 hours weekly/ : /2 horas semanales/));
      assert.doesNotMatch(html,/Intensive|Immersion|Achiever|Fluent|1\. hours/);
    }
  }
});

test("named portraits and equal-frame placeholders are present", async () => {
  const html=await render("?page=about");
  for (const name of ["audrey-founder","audrey-teacher","cristian-teacher","monique-teacher"]) assert.ok(html.includes(`/brand/${name}.webp`));
  assert.equal((html.match(/class="portrait"/g) ?? []).length,6);
  assert.equal((html.match(/class="portrait-placeholder"/g) ?? []).length,3);
});
