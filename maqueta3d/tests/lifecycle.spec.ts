import { test, expect } from "@playwright/test";
test("ciclo completo, interrupciones y regreso a emergencia", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "02 Maqueta del sitio piloto" })
    .click();
  const status = page.locator(".lifecycle-status");
  const everyday = page.getByRole("button", {
    name: "Uso cotidiano",
    exact: true,
  });
  const recovery = page.getByRole("button", {
    name: "Recuperación",
    exact: true,
  });
  await everyday.click();
  await expect(status).toHaveAttribute("data-transitioning", "true");
  await expect(status).toHaveAttribute("data-transitioning", "false", {
    timeout: 15000,
  });
  await expect(everyday).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".refuge-summary")).toHaveCount(0);
  await expect(page.locator(".storage-steps")).toHaveCount(0);
  await expect(
    page.getByRole("checkbox", { name: "Mostrar ruta conceptual" }),
  ).toBeDisabled();
  await expect(
    page.getByText("Riego de zonas verdes", { exact: true }),
  ).toBeVisible();
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "deliverables/renders/cotidiano.png" });
  await recovery.click();
  await expect(status).toHaveAttribute("data-transitioning", "false", {
    timeout: 15000,
  });
  await page.getByRole("button", { name: "Acopio", exact: true }).click();
  await expect(
    page.getByText("Kits desmontados en bodega", { exact: true }),
  ).toBeVisible();
  await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "deliverables/renders/recuperacion.png" });
  await everyday.click();
  await recovery.click();
  await page
    .getByRole("button", { name: "Emergencia (sismo)", exact: true })
    .click();
  await expect(status).toHaveAttribute("data-transitioning", "false", {
    timeout: 15000,
  });
  await expect(status).toHaveAttribute("data-state", "emergency");
  await expect(page.locator(".refuge-summary")).toBeVisible();
  await page
    .getByRole("button", { name: "Punto de registro", exact: true })
    .click();
  await expect(page.locator(".registration-screen")).toContainText("SIMULADO");
  expect(errors).toEqual([]);
});
test("movimiento reducido, teclado y móvil", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "02 Maqueta del sitio piloto" })
    .click();
  await expect(
    page.getByRole("checkbox", { name: "Reducir movimiento" }),
  ).toBeChecked();
  const button = page.getByRole("button", {
    name: "Uso cotidiano",
    exact: true,
  });
  await button.focus();
  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".lifecycle-status")).toHaveAttribute(
    "data-transitioning",
    "false",
  );
  await expect(page.locator(".registration-screen")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
