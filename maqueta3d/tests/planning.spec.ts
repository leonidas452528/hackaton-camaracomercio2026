import { test, expect } from "@playwright/test";
test("selección real adapta huella, compara y exporta brechas desconocidas", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 1100 });
  await page.goto("/");
  await page
    .getByLabel("Inventario", { exact: true })
    .selectOption("publicSpaces");
  await page.locator(".record").first().click();
  const id = (await page.locator(".detail .eyebrow").innerText())
    .split(" · ")
    .at(-1)!;
  await page
    .getByRole("button", { name: "Preparar este espacio", exact: true })
    .click();
  await expect(page.locator(".planning-target")).toContainText(id);
  await expect(page.locator(".selected-footprint")).toHaveAttribute(
    "data-space-id",
    id,
  );
  await expect(page.locator(".selected-footprint canvas")).toBeVisible();
  await expect(page.locator(".candidate-grid article")).toHaveCount(3);
  await page.getByLabel("Personas del escenario SIMULADO").fill("300");
  await expect(page.locator(".gap-table")).toContainText("15 baños");
  await expect(page.locator(".gap-table")).toContainText("4.500 L/día");
  await expect(page.locator(".gap-table")).toContainText("No calculable");
  await page.getByLabel("Seguimiento de Baños").selectOption("En revisión");
  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Descargar borrador de preparación" })
    .click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  const buffers = [];
  for await (const chunk of stream!) buffers.push(chunk);
  const plan = JSON.parse(Buffer.concat(buffers).toString());
  expect(plan.targetId).toBe(id);
  expect(plan.scenario.people).toBe(300);
  expect(plan.scenario.status).toBe("SIMULADO");
  expect(plan.gaps.every((g: { missing: unknown }) => g.missing === null)).toBe(
    true,
  );
  expect(plan.gaps[0].followup).toBe("En revisión");
  await page.getByRole("button", { name: "01 Mapa de espacios" }).click();
  await page.getByRole("button", { name: "03 Preparar intervención" }).click();
  await expect(page.getByLabel("Seguimiento de Baños")).toHaveValue(
    "En revisión",
  );
  const second = page.locator(".candidate-grid button").nth(1);
  const secondId = (await second.innerText()).replace("Revisar ", "");
  await second.click();
  await expect(page.locator(".selected-footprint")).toHaveAttribute(
    "data-space-id",
    secondId,
  );
  await page.getByLabel("Amenaza del escenario").selectOption("earthquake");
  await expect(page.locator(".candidate-grid")).toContainText(
    "requiere inspección",
  );
  await page.getByLabel("Amenaza del escenario").selectOption("drought");
  await expect(
    page.getByText("No hay candidatos para esta amenaza", { exact: false }),
  ).toBeVisible();
  await expect(page.locator(".candidate-grid article")).toHaveCount(0);
  await page.getByLabel("Personas del escenario SIMULADO").fill("-1");
  await expect(
    page.getByRole("button", { name: "Descargar borrador de preparación" }),
  ).toBeDisabled();
  await page.getByLabel("Personas del escenario SIMULADO").fill("300");
  await page.getByLabel("Amenaza del escenario").selectOption("flood");
  await page.locator(".planning-target").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: "deliverables/renders/intervencion.png",
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
test("punto sin geometría y preparación vacía en móvil no copian el piloto", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "03 Preparar intervención" }).click();
  await expect(
    page.getByText("Selecciona un espacio del mapa", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Volver al mapa" }).click();
  await page.getByLabel("Inventario", { exact: true }).selectOption("sports");
  await page.locator(".record").first().click();
  await page.getByRole("button", { name: "Preparar este espacio" }).click();
  await expect(page.getByTestId("point-only")).toBeVisible();
  await expect(page.locator(".selected-footprint")).toHaveCount(0);
  await expect(page.locator(".registration-screen")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("button", { name: "02 Demostración de refugio" })
    .click();
  await expect(
    page.getByText("Esta demostración es fija", { exact: false }),
  ).toBeVisible();
});
