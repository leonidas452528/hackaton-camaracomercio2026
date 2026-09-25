import { test, expect } from "@playwright/test";
test("agua y cubiertas: funcionamiento, corte explícito y vista móvil", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "02 Demostración de refugio" })
    .click();
  await page
    .getByRole("button", { name: "Sistema de agua", exact: true })
    .click();
  await expect(
    page.getByLabel("Funcionamiento propuesto del agua"),
  ).toContainText("Solo uso no potable");
  await expect(
    page.getByLabel("Funcionamiento propuesto del agua"),
  ).toContainText("caudal");
  await expect(
    page.getByRole("checkbox", { name: "Mostrar cubiertas" }),
  ).toBeChecked();
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(750);
  await page.screenshot({ path: "deliverables/renders/sistema_agua.png" });
  await page.getByRole("checkbox", { name: "Mostrar cubiertas" }).uncheck();
  await expect(page.locator(".cutaway-notice")).toContainText("Vista de corte");
  await expect(
    page.getByRole("button", { name: "Descargar emergencia en GLB" }),
  ).toBeDisabled();
  await page.getByRole("checkbox", { name: "Mostrar cubiertas" }).check();
  await expect(page.locator(".cutaway-notice")).toHaveCount(0);
  await page.getByRole("button", { name: "Coliseo", exact: true }).click();
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "deliverables/renders/coliseo_cubierto.png" });
  await page
    .getByRole("button", { name: "Albergue exterior", exact: true })
    .click();
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "deliverables/renders/albergue_exterior.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page
    .getByRole("button", { name: "Sistema de agua", exact: true })
    .click();
  await expect(
    page.getByLabel("Funcionamiento propuesto del agua"),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
