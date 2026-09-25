import { test, expect } from "@playwright/test";
for (const width of [1440, 390]) {
  test(`Revisar epou-9465 abre la ficha incluso al repetir selección (${width}px)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByLabel("Buscar espacio o barrio").fill("epou-9465");
    await page.locator(".record").first().click();
    await page
      .getByRole("button", { name: "Preparar este espacio", exact: true })
      .click();
    const review = page.getByRole("button", {
      name: "Revisar epou-9465",
      exact: true,
    });
    const heading = page.locator(".planning-target h2");
    await review.click();
    await expect(heading).toBeFocused();
    await expect(heading).toContainText("Colinas del Sur");
    await expect(heading).toBeInViewport();
    await expect(page.locator(".selected-footprint")).toHaveAttribute(
      "data-space-id",
      "epou-9465",
    );
    const another = page.locator(".candidate-grid button").nth(1);
    const otherId = (await another.innerText()).replace("Revisar ", "");
    await another.click();
    await expect(heading).toBeFocused();
    await expect(page.locator(".selected-footprint")).toHaveAttribute(
      "data-space-id",
      otherId,
    );
    await review.click();
    await expect(heading).toBeFocused();
    await expect(heading).toContainText("Colinas del Sur");
    // Repetir sobre el seleccionado también debe llevar al contenido; teclado incluido.
    await review.focus();
    await page.keyboard.press("Enter");
    await expect(heading).toBeFocused();
    await expect(heading).toBeInViewport();
    await page
      .getByRole("button", {
        name: "Revisar el espacio de referencia",
        exact: true,
      })
      .click();
    await expect(heading).toBeFocused();
    await expect(page.locator(".planning-target")).toContainText("epou-9465");
  });
}
