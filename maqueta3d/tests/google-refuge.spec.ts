import { test, expect } from "@playwright/test";
test("enlaces Google sincronizados con espacio y zona; referencia vial y fallo de calles", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByText("Una red por conocer", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("checkbox", {
      name: "Calles (OpenStreetMap) · requiere internet",
      exact: true,
    }),
  ).toBeChecked();
  const initial = await page
    .getByRole("link", { name: "Abrir zona en Google Maps ↗", exact: true })
    .getAttribute("href");
  await page.getByLabel("Comuna", { exact: true }).selectOption("19");
  await expect
    .poll(() =>
      page
        .getByRole("link", {
          name: "Abrir zona en Google Maps ↗",
          exact: true,
        })
        .getAttribute("href"),
    )
    .not.toBe(initial);
  await page.getByLabel("Buscar espacio o barrio").fill("hockey");
  await page.locator(".record").first().click();
  const id = (await page.locator(".detail .eyebrow").innerText())
    .split(" · ")
    .at(-1);
  const data = await (await page.request.get("/data/spaces.json")).json();
  const record = data.features.find(
    (f: { properties: { id: string } }) => f.properties.id === id,
  );
  const [lng, lat] = record.properties.coordinates;
  const link = page
    .locator(".detail")
    .getByRole("link", {
      name: "Abrir espacio en Google Maps ↗",
      exact: true,
    });
  const url = new URL((await link.getAttribute("href"))!);
  expect(url.searchParams.get("query")).toBe(`${lat},${lng}`);
  await expect(link).toHaveAttribute("target", "_blank");
  const street = new URL(
    (await page
      .locator(".detail")
      .getByRole("link", { name: "Street View ↗" })
      .getAttribute("href"))!,
  );
  expect(street.searchParams.get("viewpoint")).toBe(`${lat},${lng}`);
  await page.locator(".map-panel").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: "deliverables/renders/mapa_google.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Consultar ficha ↓" }).click();
  await expect(page.locator("#space-detail")).toBeFocused();
  // Simula pérdida de las teselas externas, no datos geográficos ficticios.
  await page.route("**/*.tile.openstreetmap.org/**", (route) => route.abort());
  await page
    .getByRole("checkbox", {
      name: "Calles (OpenStreetMap) · requiere internet",
      exact: true,
    })
    .uncheck();
  await page
    .getByRole("checkbox", {
      name: "Calles (OpenStreetMap) · requiere internet",
      exact: true,
    })
    .check();
  await expect(
    page.getByText("No se pudieron cargar algunas calles.", { exact: false }),
  ).toBeVisible();
  await expect(page.locator(".detail")).toContainText(
    "Disponibilidad por confirmar",
  );
});

test("refugio con cantidades, cubiertas y registro agregado", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  await expect(
    page.getByText("Una red por conocer", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "02 Maqueta del sitio piloto" })
    .click();
  await expect(
    page.getByLabel("Resumen de la propuesta de refugio"),
  ).toContainText("5 kits interiores");
  await expect(
    page.getByLabel("Resumen de la propuesta de refugio"),
  ).toContainText("3 kits con cubierta");
  await expect(
    page.getByLabel("Resumen de la propuesta de refugio"),
  ).toContainText("8 baños portátiles");
  await page.getByRole("button", { name: "Coliseo", exact: true }).click();
  await expect(
    page
      .locator(".scene-label")
      .filter({ hasText: "Tanques · uso no potable" }),
  ).toBeVisible();
  await page.getByRole("checkbox", { name: "Mostrar cubiertas" }).uncheck();
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "deliverables/renders/refugio_coliseo.png" });
  await page
    .getByRole("button", { name: "Campo de hockey", exact: true })
    .click();
  await page.getByRole("checkbox", { name: "Mostrar cubiertas" }).check();
  await expect(
    page.locator(".scene-label").filter({ hasText: "3 kits con cubierta" }),
  ).toBeVisible();
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "deliverables/renders/refugio_campo.png" });
  await page
    .getByRole("button", { name: "Punto de registro", exact: true })
    .click();
  await expect(page.locator(".registration-screen")).toContainText(
    "143 personas · 40 menores",
  );
  await expect(page.locator(".registration-screen")).toContainText("SIMULADO");
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "deliverables/renders/registro.png" });
  expect(errors).toEqual([]);
});
