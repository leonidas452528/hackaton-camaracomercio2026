import { test, expect } from "@playwright/test";
test("balance limita acopio, exporta supuestos e invalida al editar o cambiar espacio", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByLabel("Buscar espacio o barrio").fill("epou-9465");
  await page.locator(".record").first().click();
  await page
    .getByRole("button", { name: "Preparar este espacio", exact: true })
    .click();
  const panel = page.locator(".acopio-capacity");
  const include = panel.getByRole("button");
  await expect(include).toBeDisabled();
  const fields = panel.locator("input");
  for (const [i, value] of ["0", "10", "10", "0", "1", "1000000"].entries())
    await fields.nth(i).fill(value);
  await expect(panel).toContainText("Sobreocupación propuesta");
  await expect(include).toBeDisabled();
  await fields.nth(5).fill("1");
  await expect(panel).toContainText("Balance de área suficiente");
  await include.click();
  const pending = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Descargar borrador de preparación" })
    .click();
  const stream = await (await pending).createReadStream();
  const chunks = [];
  for await (const chunk of stream!) chunks.push(chunk);
  const plan = JSON.parse(Buffer.concat(chunks).toString());
  expect(plan.acopio.includedInDraft).toBe(true);
  expect(plan.acopio.activationAuthorized).toBe(false);
  expect(plan.acopio.availableM2).toBeCloseTo(
    plan.acopio.cartographicAreaM2 - 20,
  );
  await fields.nth(5).fill("1000000");
  await expect(include).toHaveText(
    "Incluir distribución de acopio en el borrador",
  );
  await expect(include).toBeDisabled();
  await page.locator(".candidate-grid button").nth(1).click();
  await expect(fields.nth(0)).toHaveValue("");
  await expect(include).toBeDisabled();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
