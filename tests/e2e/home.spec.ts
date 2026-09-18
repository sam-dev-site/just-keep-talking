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
  await expect(page.locator("details[open]")).toHaveCount(0);
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.getByRole("link", { name: "Cambiar a español" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Gana confianza");
  await noOverflow(page);
  await page.getByRole("link", { name: /Para tu hijo o hija/ }).click();
  await expect(page.getByRole("button", { name: "Niños", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".plan-card")).toHaveCount(2);
  await noOverflow(page);
  expect(errors).toEqual([]);
});

test("pricing preserves selections, switches currency independently and carries inquiry context", async ({ page }) => {
  await page.goto("/?page=classes");
  await expect(page.locator(".site-shell")).toHaveAttribute("data-hydrated", "true");
  await expect(page.locator(".plan-card")).toHaveCount(2);
  await expect(page.locator(".plan-card").first()).toContainText("₡65,000 CRC");
  await page.getByRole("button", { name: "USD", exact: true }).click();
  await expect(page.locator(".plan-card").first()).toContainText("$150 USD");
  const href = await page.locator(".plan-card a").nth(1).getAttribute("href");
  const message = new URL(href!).searchParams.get("text");
  expect(message).toContain("Adults · Private · USD");
  expect(message).toContain("Standard, 2 hours weekly, $285 USD per month");
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
  await expect(page.locator(".plan-card")).toHaveCount(2);
  await noOverflow(page);
  await page.getByRole("button", { name: "Privadas", exact: true }).click();
  await expect(page.getByRole("group", { name: "Tamaño del grupo" })).toHaveCount(0);
  await page.getByRole("button", { name: "Adultos", exact: true }).click();
  await expect(page.locator(".plan-card")).toHaveCount(2);
  await expect(page.locator(".enrollment")).toContainText("$35 USD");
});

test("secondary pages, contacts, image loading and layout work in both languages", async ({ page }) => {
  test.setTimeout(90_000);
  for (const lang of ["en", "es"]) {
    for (const destination of ["home", "classes", "about", "policies", "teach"]) {
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
    for (const destination of ["home", "classes", "about", "policies", "teach"]) {
      await page.goto(`/?page=${destination}&lang=${lang}`);
      const results = await new AxeBuilder({ page }).analyze();
      const blocking = results.violations.filter(item => item.impact === "serious" || item.impact === "critical");
      expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
    }
  }
});

