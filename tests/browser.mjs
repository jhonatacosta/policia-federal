import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import {mkdirSync, existsSync} from "node:fs";
mkdirSync("test-results", {recursive:true});
const baseUrl=process.env.TEST_BASE_URL || "http://localhost:5173";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(baseUrl);
await page.screenshot({
  path: "test-results/mobile-preview.png",
  fullPage: true,
  animations:"disabled",
});
await page.getByRole("button", { name: "Começar investigação" }).click();
await page.getByPlaceholder("Primeira pessoa").fill("Ana");
await page.getByPlaceholder("Segunda pessoa").fill("Leo");
await page.getByRole("button", { name: "Abrir o caso", exact: true }).click();
for (let chapter = 0; chapter < 5; chapter++) {
  await page.getByRole("button", { name: "Investigar este capítulo" }).click();
  await page.getByRole("button", { name: "Pronto para investigar" }).click();
  for (let person = 0; person < 2; person++) {
    await assert.equal(
      await page.getByRole("button", { name: "Li minhas pistas" }).isEnabled(),
      false,
    );
    for (let clue = 0; clue < 2; clue++) {
      await page.locator(".clue-card").nth(clue).click();
      await page.getByRole("button", { name: "Guardar a pista" }).click();
    }
    await page.getByRole("button", { name: "Li minhas pistas" }).click();
    await page
      .getByRole("button", { name: person === 0 ? "Sou Leo" : "Sou Ana" })
      .click();
  }
  if (chapter === 0) {
    await page.locator(".answers button").nth(0).click();
    await page.getByRole("button", { name: "Confirmar hipótese" }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "Essa hipótese" })
      .waitFor();
    await page.getByRole("tab", { name: "Caderno" }).click();
    await page
      .getByRole("textbox", { name: "Anotações da investigação" })
      .fill("Relógio atrasado: 7 minutos.");
    await page.reload();
    await page.getByRole("tab", { name: "Caderno" }).click();
    assert.equal(
      await page.getByRole("textbox").inputValue(),
      "Relógio atrasado: 7 minutos.",
    );
    await page.getByRole("tab", { name: "Pistas" }).click();
  }
  if (chapter === 2) await page.locator(".code-label input").fill("19982");
  else
    await page
      .locator(".answers button")
      .nth([2, 2, null, 1, 0][chapter])
      .click();
  await page.getByRole("button", { name: "Confirmar hipótese" }).click();
  await page.getByRole("dialog").waitFor();
  if (chapter === 0)
    await page.screenshot({
      path: "test-results/revelation-preview.png",
      fullPage: true,
  animations:"disabled",
    });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
    false,
  );
  await page
    .getByRole("button", {
      name: chapter === 4 ? "Encerrar o caso" : "Próximo capítulo",
    })
    .click();
}
await page.getByRole("heading", { name: "A verdade veio à tona." }).waitFor();
assert.equal(
  await page.locator(".ending-stats strong").nth(1).textContent(),
  "1",
);
await page.getByRole("button", { name: "Jogar novamente" }).click();
await page.getByRole("button", { name: "Reiniciar o jogo" }).click();
await page.getByRole("button", { name: "Começar investigação" }).click();
await page.getByRole("button", { name: "Cada um no seu celular" }).click();
await page.getByRole("button", { name: "Escolher este papel" }).click();
await page.getByRole("button", { name: "Abrir o caso", exact: true }).click();
await page.getByRole("button", { name: "Investigar este capítulo" }).click();
await page.getByRole("button", { name: "Pronto para investigar" }).click();
assert.match(await page.locator(".identity").textContent(), /Investigador/);
for (let i = 0; i < 2; i++) {
  await page.locator(".clue-card").nth(i).click();
  await page.getByRole("button", { name: "Guardar a pista" }).click();
}
await page.getByRole("button", { name: "Li minhas pistas" }).click();
await page.getByRole("button", { name: "Pronto para investigar" }).click();
await page.locator(".answers button").nth(2).click();
await page.getByRole("button", { name: "Confirmar hipótese" }).click();
await page.getByRole("button", { name: "Próximo capítulo" }).click();
const desktop = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
});
await desktop.goto(baseUrl);
await desktop.evaluate(() => document.fonts.ready);
await desktop.screenshot({
  path: "test-results/desktop-preview.png",
  fullPage: true,
  animations:"disabled",
});
assert.equal(
  await desktop.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  ),
  false,
);
assert.deepEqual(errors, []);
console.log(
  "PASS: five chapters, shared handoff, wrong-answer retry, cofre, save/reload, ending, reset, second-device role and mobile/desktop layout. No browser errors.",
);
await browser.close();
