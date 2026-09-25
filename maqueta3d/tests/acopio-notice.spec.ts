import { test, expect } from "@playwright/test";
test("aviso general con ubicación real, descarga sin envío y sin arrastrar horario a otro espacio", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByLabel("Buscar espacio o barrio").fill("epou-9465");
  await page.locator(".record").first().click();
  await page
    .getByRole("button", { name: "Preparar este espacio", exact: true })
    .click();
  await page.getByText("Preparar aviso SMS de acopio", { exact: true }).click();
  const panel = page.locator(".acopio-notice");
  await expect(panel).toContainText("toda la población");
  await expect(panel).toContainText("sin registrar quién es damnificado");
  const draft = page.getByLabel("Borrador del mensaje");
  await expect(draft).toHaveValue(/epou-9465/);
  await expect(draft).toHaveValue(/por definir/);
  await expect(draft).toHaveValue(/No acudir todavía/);
  await page
    .getByLabel("Horario propuesto")
    .fill("Horario de prueba, no confirmado");
  await page
    .getByLabel("Información propuesta sobre recepción y entrega de ayudas")
    .fill("Información de prueba, no inventario");
  const pending = page.waitForEvent("download");
  await page.getByRole("button", { name: "Descargar aviso de acopio" }).click();
  const download = await pending,
    stream = await download.createReadStream(),
    buffers = [];
  for await (const c of stream!) buffers.push(c);
  const notice = JSON.parse(Buffer.concat(buffers).toString());
  expect(notice.audience).toBe("general-population");
  expect(notice.deliveryStatus).toBe("not-sent");
  expect(notice.openingConfirmed).toBe(false);
  expect(notice.recipients).toBeNull();
  const url = new URL(notice.location);
  expect(url.searchParams.get("query")).toBe("3.38967099,-76.552461215");
  await expect(panel).toContainText("No se ha enviado ningún SMS");
  const other = page.locator(".candidate-grid button").nth(1);
  const otherId = (await other.innerText()).replace("Revisar ", "");
  await other.click();
  await page.getByText("Preparar aviso SMS de acopio", { exact: true }).click();
  await expect(page.getByLabel("Horario propuesto")).toHaveValue("");
  await expect(draft).toHaveValue(new RegExp(otherId));
  await expect(draft).not.toHaveValue(/epou-9465/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
