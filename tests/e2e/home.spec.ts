import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

async function noOverflow(page: import("@playwright/test").Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
}

test("home, audience paths, FAQs and mobile keyboard navigation", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Build the confidence");
  await expect(page.locator(".site-shell")).toHaveAttribute("data-hydrated", "true");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Menu", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.locator("#main-navigation a").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeFocused();
    await expect(page.locator("#main-navigation")).toBeHidden();
  }
  await expect(page.getByRole("heading", { name: "Language for you." })).toBeVisible();
  await expect(page.locator(".adult-needs .audience-card")).toHaveCount(4);
  await expect(page.locator(".quiz-callout")).toHaveCount(0);
  await page.getByRole("link", { name: "Cambiar a español" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Gana confianza");
  await noOverflow(page);
  await page.locator("a.kids-path").click();
  await expect(page.getByRole("button", { name: "Niños", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".plan-card")).toHaveCount(4);
  await expect(page.locator(".plan-card h3")).toHaveText(["Explorer", "Builder", "Achiever", "Fluent"]);
  await noOverflow(page);
  if (testInfo.project.name === "mobile") await page.getByRole("button", { name: "Menú", exact: true }).click();
  await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Preguntas frecuentes" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Preguntas frecuentes");
  await expect(page.locator("details[open]")).toHaveCount(0);
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  if (testInfo.project.name === "mobile") await page.getByRole("button", { name: "Menú", exact: true }).click();
  await page.getByRole("navigation", { name: "Navegación principal" }).getByRole("link", { name: "Nuestro enfoque" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Conversación que le prepara");
  await expect(page.locator(".process")).toHaveCount(0);
  await expect(page.locator(".method-bubble")).toHaveCount(5);
  await expect(page.locator(".learning-step")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: "Cómo se estructura su plan de aprendizaje" })).toBeVisible();
  await expect(page.getByText("reunión de entrevista").first()).toBeVisible();
  await noOverflow(page);
  expect(errors).toEqual([]);
});

test("pricing preserves selections, switches currency independently and carries inquiry context", async ({ page }) => {
  await page.goto("/?page=classes");
  await expect(page.locator(".site-shell")).toHaveAttribute("data-hydrated", "true");
  await expect(page.locator(".plan-card")).toHaveCount(4);
  await expect(page.locator(".plan-card h3")).toHaveText(["Essential", "Standard", "Intensive", "Immersion"]);
  await expect(page.locator(".plan-card").first()).toContainText("₡65,000 CRC");
  await expect(page.locator(".plan-card").nth(2)).toContainText("₡183,000 CRC");
  await expect(page.locator(".policy-link")).toHaveCount(0);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelector(".plan-grid")?.scrollIntoView({ block: "center" });
  });
  const scrollBeforeOption = await page.evaluate(() => window.scrollY);
  expect(scrollBeforeOption).toBeGreaterThan(0);
  await page.evaluate(() => {
    const kids = [...document.querySelectorAll("button")].find(button => button.textContent === "Kids");
    kids?.click();
  });
  await expect(page.getByRole("button", { name: "Kids", exact: true })).toHaveAttribute("aria-pressed", "true");
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollBeforeOption);
  await expect(page.locator(".plan-card h3")).toHaveText(["Explorer", "Builder", "Achiever", "Fluent"]);
  await page.getByRole("button", { name: "Adults", exact: true }).click();
  await page.getByRole("button", { name: "USD", exact: true }).click();
  await expect(page.locator(".plan-card").first()).toContainText("$150 USD");
  await expect(page.locator(".plan-card").nth(3)).toContainText("$545 USD");
  const href = await page.locator(".plan-card a").nth(1).getAttribute("href");
  const message = new URL(href!).searchParams.get("text");
  expect(message).toContain("Adults · Private · USD");
  expect(message).toContain("Standard, 2 hours weekly, $285 USD per month");
  const intensiveHref = await page.locator(".plan-card a").nth(2).getAttribute("href");
  expect(new URL(intensiveHref!).searchParams.get("text")).toContain("Intensive, 3 hours weekly, $420 USD per month");
  await page.getByRole("button", { name: "Small group", exact: true }).click();
  await page.getByRole("button", { name: "3 students", exact: true }).click();
  await page.getByRole("button", { name: "Kids", exact: true }).click();
  await page.getByRole("link", { name: "Cambiar a español" }).click();
  await expect(page.getByRole("button", { name: "USD", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Niños", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "3 estudiantes", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  const groupHref = await page.locator(".plan-card a").first().getAttribute("href");
  expect(new URL(groupHref!).searchParams.get("text")).toContain("Niños · Grupo pequeño · 3 estudiantes · USD");
  expect(new URL(groupHref!).searchParams.get("text")).toContain("Explorer");
  await expect(page.locator(".plan-card")).toHaveCount(4);
  await noOverflow(page);
  await page.getByRole("button", { name: "Privadas", exact: true }).click();
  await expect(page.getByRole("group", { name: "Tamaño del grupo" })).toHaveCount(0);
  await expect(page.locator(".plan-card").first()).toContainText("1 hora semanal");
  await expect(page.locator(".plan-card").nth(2)).toContainText("3 horas semanales");
  await page.getByRole("button", { name: "CRC", exact: true }).click();
  await expect(page.locator(".plan-card").first()).toContainText("30 minutos semanales");
  await expect(page.locator(".plan-card").nth(2)).toContainText("1,5 horas semanales");
  await page.getByRole("button", { name: "Adultos", exact: true }).click();
  await expect(page.locator(".plan-card")).toHaveCount(4);
  await page.getByRole("button", { name: "USD", exact: true }).click();
  await expect(page.locator(".enrollment")).toContainText("$35 USD");
});

test("secondary pages, contacts, image loading and layout work in both languages", async ({ page }) => {
  test.setTimeout(90_000);
  for (const lang of ["en", "es"]) {
    for (const destination of ["home", "classes", "approach", "about", "faq", "policies", "teach"]) {
      await page.goto(`/?page=${destination}&lang=${lang}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.locator(".site-shell")).toHaveAttribute("data-hydrated", "true");
      await noOverflow(page);
      for (const img of await page.locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
      }
      await expect(page.locator(`footer a[href="mailto:justkeeptalkingcr@gmail.com"]`)).toBeVisible();
      if (destination === "about") {
        await expect(page.locator(".team-card")).toHaveCount(6);
        await expect(page.locator(".team-card img")).toHaveCount(3);
        await expect(page.locator(".portrait-placeholder")).toHaveCount(3);
        await expect(page.locator(".team-card .role")).toHaveCount(6);
      }
      if (destination === "faq") {
        await expect(page.locator("details")).toHaveCount(7);
      }
      if (destination === "teach") {
        const href = await page.locator(".application .button").getAttribute("href");
        expect(new URL(href!).searchParams.get("text")).toMatch(/teaching|enseñar/);
      }
    }
  }
});

test("all views pass automated accessibility checks", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  test.skip(testInfo.project.name !== "desktop", "Desktop checks cover every view and both languages.");
  for (const lang of ["en", "es"]) {
    for (const destination of ["home", "classes", "approach", "about", "faq", "policies", "teach"]) {
      await page.goto(`/?page=${destination}&lang=${lang}`);
      const results = await new AxeBuilder({ page }).analyze();
      const blocking = results.violations.filter(item => item.impact === "serious" || item.impact === "critical");
      expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    }
  }
});

