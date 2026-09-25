/** Google Maps URLs oficiales. Coordenadas GeoJSON [longitud, latitud].
 * No requiere API key ni recopila la ubicación del usuario.
 */
export function googleMapsLinks(
  coordinates: readonly [number, number],
  zoom = 18,
) {
  const [longitude, latitude] = coordinates;
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    Math.abs(latitude) > 90 ||
    Math.abs(longitude) > 180
  ) {
    throw new Error("Coordenadas inválidas para Google Maps");
  }
  const location = `${latitude},${longitude}`;
  const url = (path: string, parameters: Record<string, string>) => {
    const link = new URL(`https://www.google.com/maps/${path}`);
    link.search = new URLSearchParams({ api: "1", ...parameters }).toString();
    return link.toString();
  };
  const mapZoom = String(
    Math.min(21, Math.max(0, Math.round(Number.isFinite(zoom) ? zoom : 18))),
  );
  return {
    place: url("search/", { query: location }),
    map: url("@", { map_action: "map", center: location, zoom: mapZoom }),
    satellite: url("@", {
      map_action: "map",
      center: location,
      zoom: mapZoom,
      basemap: "satellite",
    }),
    streetView: url("@", { map_action: "pano", viewpoint: location }),
  };
}
