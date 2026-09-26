import { test, expect, type Page } from "@playwright/test";

async function downloadReport(page: Page) {
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descargar informe de preparación" }).click();
  const download = await pending;
  expect(download.suggestedFilename()).toBe("preparacion-epou-9465.html");
  const chunks = [];
  for await (const chunk of (await download.createReadStream())!) chunks.push(chunk);
  const report = await page.context().newPage();
  await report.setContent(Buffer.concat(chunks).toString());
  return report;
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Buscar espacio o barrio").fill("epou-9465");
  await page.locator(".record").first().click();
  await page.getByRole("button", { name: "Preparar este espacio", exact: true }).click();
});

test("informe legible conserva necesidades, pendientes y seguimiento; permite imprimir", async ({ page }) => {
  await page.getByLabel("Personas del escenario SIMULADO").fill("301");
  await page.getByLabel("Seguimiento de Baños").selectOption("En revisión");
  const report = await downloadReport(page);
  await expect(report.locator(".metrics")).toContainText("16 baños");
  await expect(report.locator(".metrics")).toContainText("4.515 L/día");
  await expect(report.locator(".metrics")).toContainText("1.053,5 m²");
  await expect(report.locator(".metrics")).toContainText("16 kits");
  await expect(report.locator("body")).toContainText("Por determinar: medir la existencia");
  await expect(report.locator("body")).toContainText("En revisión");
  await expect(report.locator("body")).toContainText("Cisterna de lona");
  await expect(report.locator("body")).toContainText("Panel solar portátil");
  await expect(report.locator("body")).toContainText("Faltan datos para calcular");
  await report.evaluate(() => { window.print = () => { document.body.dataset.printed = "yes"; }; });
  await report.getByRole("button", { name: "Imprimir / guardar como PDF" }).click();
  await expect(report.locator("body")).toHaveAttribute("data-printed", "yes");
  await report.pdf({ path: "/tmp/territorio-preparacion-informe.pdf", format: "A4", printBackground: true });
  await report.setViewportSize({ width: 390, height: 844 });
  expect(await report.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await report.screenshot({ path: "/tmp/territorio-preparacion-movil.png", fullPage: true });
  await report.close();
});

test("informe refleja sobreocupación y bloqueo por falta de evidencia", async ({ page }) => {
  const fields = page.locator(".acopio-capacity input");
  for (const [index,value] of ["0","10","10","0","1","1000000"].entries()) await fields.nth(index).fill(value);
  const overflow = await downloadReport(page);
  await expect(overflow.locator("body")).toContainText("La propuesta no cabe");
  await expect(overflow.locator("body")).toContainText("No incluido");
  await expect(overflow.locator("body")).toContainText("Módulos en exceso");
  await overflow.close();
  await page.getByLabel("Amenaza del escenario").selectOption("building-fire");
  await page.getByLabel("Seguimiento de Área afectada y restricciones").selectOption("En revisión");
  const fire = await downloadReport(page);
  await expect(fire.locator(".notice")).toContainText("Sin evidencia suficiente para preseleccionar");
  await expect(fire.locator("body")).toContainText("Edificación afectada y entorno");
  await expect(fire.locator("body")).toContainText("En revisión");
  await expect(fire.locator("body")).toContainText("No hay candidatos");
  await fire.close();
});
