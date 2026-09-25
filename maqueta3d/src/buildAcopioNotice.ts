import type { Space } from "./types";
import { googleMapsLinks } from "./googleMaps.ts";
export function acopioNotice(space: Space, hours: string, items: string) {
  const location = googleMapsLinks(space.properties.coordinates).place;
  const text = [
    "BORRADOR — punto de acopio propuesto, apertura no confirmada.",
    `Cali Activa: ${space.properties.name} (${space.properties.id}).`,
    `Ubicación: ${location}`,
    `Horario propuesto: ${hours.trim() || "por definir"}.`,
    `Información propuesta sobre ayudas: ${items.trim() || "por definir"}.`,
    "Aviso a toda la población: cuando se confirme la apertura, quienes puedan aportar podrán consultar qué llevar; quienes necesiten ayudas podrán consultar su disponibilidad y las condiciones de entrega.",
    "No acudir todavía: falta confirmación oficial del punto, horario y condiciones de acceso.",
  ].join("\n");
  return {
    kind: "Borrador de aviso SMS de acopio",
    status: "draft",
    deliveryStatus: "not-sent",
    spaceId: space.properties.id,
    coordinates: space.properties.coordinates,
    location,
    audience: "general-population",
    proposedHours: hours.trim() || null,
    proposedItems: items.trim() || null,
    openingConfirmed: false,
    recipients: null,
    text,
  };
}
