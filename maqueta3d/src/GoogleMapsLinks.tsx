import { googleMapsLinks } from "./googleMaps";
export default function GoogleMapsLinks({
  coordinates,
  zoom = 18,
  area = false,
}: {
  coordinates: readonly [number, number];
  zoom?: number;
  area?: boolean;
}) {
  const links = googleMapsLinks(coordinates, zoom);
  return (
    <div
      className="google-links"
      aria-label={
        area ? "Google Maps de la zona visible" : "Google Maps del espacio"
      }
    >
      <a
        className="google-primary"
        href={area ? links.map : links.place}
        target="_blank"
        rel="noopener noreferrer"
      >
        {area ? "Abrir zona en Google Maps" : "Abrir espacio en Google Maps"} ↗
      </a>
      <a href={links.satellite} target="_blank" rel="noopener noreferrer">
        Vista satélite ↗
      </a>
      {!area && (
        <a href={links.streetView} target="_blank" rel="noopener noreferrer">
          Street View ↗
        </a>
      )}
    </div>
  );
}
