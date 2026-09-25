import { test, expect } from "@playwright/test";
test("incendios separados, tareas sin aprobación y exportación honesta", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page
    .getByLabel("Inventario", { exact: true })
    .selectOption("publicSpaces");
  await page.locator(".record").first().click();
  await page
    .getByRole("button", { name: "Preparar este espacio", exact: true })
    .click();
  await page.getByLabel("Amenaza del escenario").selectOption("wildfire");
  const panel = page.getByLabel("Preparación ante incendio");
  await expect(panel).toContainText("Amenaza e interfaz con vegetación");
  await expect(panel).toContainText("Humo y condiciones del entorno");
  await expect(panel).toContainText("no son caudal de extinción");
  await expect(page.locator(".candidate-grid")).toHaveCount(0);
  await expect(
    page.getByText("Ampliar el sector no resuelve", { exact: false }),
  ).toBeVisible();
  await page
    .getByLabel("Seguimiento de Humo y condiciones del entorno")
    .selectOption("En revisión");
  await expect(page.locator(".candidate-grid")).toHaveCount(0);
  await page.getByLabel("Amenaza del escenario").selectOption("building-fire");
  await expect(panel).toContainText("Edificación afectada y entorno");
  await expect(panel).not.toContainText("Amenaza e interfaz con vegetación");
  await expect(
    page.getByLabel("Seguimiento de Área afectada y restricciones"),
  ).toHaveValue("Por medir");
  await page.getByLabel("Personas del escenario SIMULADO").fill("300");
  await expect(page.locator(".gap-table")).toContainText("4.500 L/día");
  const pending = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Descargar borrador de preparación" })
    .click();
  const download = await pending,
    stream = await download.createReadStream(),
    buffers = [];
  for await (const chunk of stream!) buffers.push(chunk);
  const plan = JSON.parse(Buffer.concat(buffers).toString());
  expect(plan.scenario.threat).toBe("building-fire");
  expect(plan.candidates).toEqual([]);
  expect(plan.decision.status).toBe("pending");
  expect(plan.screening.pendingEvidence).toBeGreaterThan(0);
  expect(plan.screening.excludedByIntersection).toBe(0);
  expect(plan.fire.evidence).toHaveLength(4);
  expect(
    plan.fire.evidence.every((r: { evidence: unknown }) => r.evidence === null),
  ).toBe(true);
  expect(plan.fire.limitations.join(" ")).toContain("caudal de extinción");
  await page.getByRole("button", { name: "01 Mapa de espacios" }).click();
  await page.getByRole("button", { name: "03 Preparar intervención" }).click();
  await page.getByLabel("Amenaza del escenario").selectOption("wildfire");
  await expect(
    page.getByLabel("Seguimiento de Humo y condiciones del entorno"),
  ).toHaveValue("En revisión");
  await page.screenshot({
    path: "deliverables/renders/incendio_forestal.png",
    fullPage: true,
  });
  await page.getByLabel("Amenaza del escenario").selectOption("flood");
  await expect(panel).toHaveCount(0);
  await expect(page.locator(".candidate-grid article")).toHaveCount(3);
  expect(errors).toEqual([]);
});
test("incendio en móvil conserva geometría real y no ofrece espacios habilitados", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByLabel("Inventario", { exact: true }).selectOption("sports");
  await page.locator(".record").first().click();
  await page
    .getByRole("button", { name: "Preparar este espacio", exact: true })
    .click();
  await page.getByLabel("Amenaza del escenario").selectOption("building-fire");
  await expect(page.getByTestId("point-only")).toBeVisible();
  await expect(page.locator(".candidate-grid")).toHaveCount(0);
  const select = page.getByLabel(
    "Seguimiento de Inspecciones y condiciones para el uso",
  );
  await select.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(select).toHaveValue("En revisión");
  await expect(page.locator(".candidate-grid")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
