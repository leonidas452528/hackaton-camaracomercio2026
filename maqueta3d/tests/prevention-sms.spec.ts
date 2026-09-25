import { test, expect } from "@playwright/test";

test("SMS simulado sin llamadas de envío, valida audiencia y reinicia al editar", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", r => { if (r.method() === "POST" || r.url().includes("/api/sms")) requests.push(r.url()); });
  await page.goto("/");
  await page.getByLabel("Buscar espacio o barrio").fill("epou-9465");
  await page.locator(".record").first().click();
  await page.getByRole("button", { name: "Preparar este espacio", exact: true }).click();
  await page.getByText("Preparar aviso SMS de acopio", { exact: true }).click();
  const send = page.getByRole("button", { name: "Simular envío masivo", exact: true });
  await page.getByLabel("Destinatarios simulados").fill("0");
  await expect(send).toBeDisabled();
  await page.getByLabel("Destinatarios simulados").fill("100");
  await send.click();
  await expect(page.getByRole("button", { name: "Simulando envío…" })).toBeDisabled();
  await expect(page.locator(".sms-results")).toContainText("95 entregas simuladas · 5 pendientes simulados");
  await expect(page.locator(".sms-results")).toContainText("Envíos reales: 0");
  await page.getByLabel("Horario propuesto").fill("Dato de demostración");
  await expect(page.locator(".sms-results")).toHaveCount(0);
  await expect(send).toBeEnabled();
  await page.getByLabel("Escenario de entrega simulado").selectOption("complete");
  await send.click();
  await expect(page.locator(".sms-results")).toContainText("1000 entregas simuladas · 0 pendientes simulados");
  expect(requests).toEqual([]);
});

test("educación preventiva móvil: amenazas, aprendizaje y regreso al mapa", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "04 Análisis preventivo" }).click();
  await expect(page.getByRole("heading", { name: "Análisis preventivo y cultura ciudadana" })).toBeVisible();
  await page.getByLabel("Amenaza para aprender").selectOption("1");
  await expect(page.locator(".prevention")).toContainText("Agáchate, cúbrete y sujétate");
  await page.getByLabel("Amenaza para aprender").selectOption("2");
  await expect(page.locator(".prevention")).toContainText("Evita quemar basura");
  await page.getByRole("checkbox").first().check();
  await expect(page.locator(".prevention")).toContainText("1 de 4 pasos revisados");
  await page.getByRole("button", { name: "Sí, porque aparece en el mapa" }).click();
  await expect(page.locator(".prevention")).toContainText("Revisa esta diferencia:");
  await page.getByRole("button", { name: "No, debo confirmar su apertura" }).click();
  await expect(page.locator(".prevention")).toContainText("Correcto.");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "/tmp/cali-prevencion.png", fullPage: true });
  await page.getByRole("button", { name: "Consultar espacios en el mapa" }).click();
  await expect(page.getByLabel("Buscar espacio o barrio")).toBeVisible();
});
