import { test, expect } from "@playwright/test";
test("mapa real, filtros, ficha, ausencia de resultados y vista 3D", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByText("Una red por conocer", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".stats")).toContainText("1.970");
  await expect(page.locator(".stats")).toContainText("1.021");
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({
    path: "deliverables/renders/mapa_cali.png",
    fullPage: true,
  });
  await page.getByLabel("Comuna", { exact: true }).selectOption("unassigned");
  await expect(page.locator(".map-heading")).toContainText("52 registros");
  await page.getByLabel("Comuna", { exact: true }).selectOption("06");
  await expect(page.locator(".map-heading")).toContainText("Comuna 06");
  const neighborhoods = await page
    .getByLabel("Barrio / sector", { exact: true })
    .locator("option")
    .allTextContents();
  expect(neighborhoods.length).toBeGreaterThan(2);
  await page.locator(".record").first().click();
  await expect(page.locator(".detail")).toContainText(
    "Disponibilidad por confirmar",
  );
  await expect(page.locator(".detail")).toContainText(
    "Sin evidencia registrada",
  );
  await page
    .getByRole("combobox", { name: "Amenaza consultada", exact: true })
    .selectOption("seismic");
  await page.getByLabel("Cruce geográfico").selectOption("no");
  await page.getByRole("button", { name: "Limpiar", exact: true }).click();
  await page
    .getByLabel("Buscar espacio o barrio")
    .fill("no-existe-espacio-xyz");
  await expect(
    page.getByText("No hay registros para estos filtros."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Limpiar", exact: true }).click();
  await page
    .getByRole("button", { name: "02 Demostración de refugio" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Demostración conceptual de refugio y acopio" }),
  ).toBeVisible();
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator(".scene-label").first()).toBeVisible();
  await page.getByRole("button", { name: "Coliseo", exact: true }).click();
  await page.getByRole("button", { name: "General", exact: true }).click();
  await page.waitForTimeout(1500);
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "deliverables/renders/general.png" });
  expect(errors).toEqual([]);
});
test("filtros y mapa utilizables en móvil sin desbordamiento", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByText("Una red por conocer", { exact: true }),
  ).toBeVisible();
  await page.getByLabel("Inventario", { exact: true }).selectOption("sports");
  await expect(page.locator(".stats")).toContainText("1.021");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "deliverables/renders/mapa_movil.png",
    fullPage: true,
  });
});
