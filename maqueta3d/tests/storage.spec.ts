import { test, expect } from "@playwright/test";
test("acopio interactivo, descarte separado, trazabilidad vacía y ruta conceptual", async ({
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
    .getByRole("button", { name: "02 Demostración de refugio" })
    .click();
  await page.getByRole("button", { name: "Acopio", exact: true }).click();
  await expect(page.locator(".storage-label")).toHaveCount(7);
  await page
    .getByRole("button", {
      name: "Seleccionar Clasificación: alimentos, agua, aseo, abrigo, kits",
      exact: true,
    })
    .click();
  await expect(page.locator(".category-list li")).toHaveCount(5);
  await expect(page.locator(".storage-detail")).toContainText(
    "Lo aceptado sigue a la bodega",
  );
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "deliverables/renders/acopio.png" });
  await page
    .locator(".storage-steps")
    .getByRole("button", { name: "4 Descarte", exact: true })
    .click();
  await expect(page.locator(".storage-detail")).toContainText(
    "no hay flujo desde descarte hacia bodega",
  );
  await page
    .locator(".storage-steps")
    .getByRole("button", { name: "7 Trazabilidad", exact: true })
    .click();
  await expect(page.locator(".traceability-screen")).toContainText(
    "Sin registro verificado",
  );
  await expect(page.locator(".traceability-screen")).toContainText(
    "Sin hash: falta un registro verificado",
  );
  await expect(page.locator(".physical-screen")).toBeVisible();
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "deliverables/renders/trazabilidad.png" });
  await page
    .getByRole("button", { name: "Ruta al refugio", exact: true })
    .click();
  await expect(
    page.locator(".scene-label").filter({ hasText: "Despacho → refugio" }),
  ).toBeVisible();
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "deliverables/renders/ruta_refugio.png" });
  await page
    .getByRole("checkbox", { name: "Mostrar ruta conceptual", exact: true })
    .uncheck();
  await expect(
    page.locator(".scene-label").filter({ hasText: "Despacho → refugio" }),
  ).toHaveCount(0);
  await page
    .getByRole("checkbox", { name: "Mostrar ruta conceptual", exact: true })
    .check();
  await expect(
    page.locator(".scene-label").filter({ hasText: "Despacho → refugio" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});
test("proceso de acopio accesible en móvil y por teclado", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByText("Una red por conocer", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "02 Demostración de refugio" })
    .click();
  const button = page
    .locator(".storage-steps")
    .getByRole("button", { name: "6 Despacho", exact: true });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".storage-detail")).toContainText(
    "no ruta vial ni de evacuación",
  );
  await expect(page.locator(".storage-label")).toHaveCount(7);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
