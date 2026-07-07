/**
 * Client-side geo helpers for the route step: address search (Nominatim),
 * reverse geocoding and driving-route distance (public OSRM). Everything
 * degrades gracefully offline — the map step must never block the flow.
 */

export interface GeoResult {
  label: string;
  lat: number;
  lng: number;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface DrivingRoute {
  km: number;
  /** driving geometry as [lat, lng] pairs; null when only estimated */
  geometry: [number, number][] | null;
}

const NOMINATIM = "https://nominatim.openstreetmap.org";
// bias results towards Warsaw and its surroundings
const VIEWBOX = "20.3,52.6,21.7,51.9";

/** trim Nominatim's very long display_name to the readable part */
function shortLabel(displayName: string): string {
  return displayName
    .split(",")
    .map((s) => s.trim())
    .filter((part) => !/^\d{2}-\d{3}$/.test(part) && part !== "Polska")
    .slice(0, 3)
    .join(", ");
}

export async function searchAddress(query: string): Promise<GeoResult[]> {
  try {
    const url = `${NOMINATIM}/search?format=jsonv2&limit=5&accept-language=pl&countrycodes=pl&viewbox=${VIEWBOX}&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return [];
    const data: { display_name: string; lat: string; lon: string }[] =
      await res.json();
    return data.map((d) => ({
      label: shortLabel(d.display_name),
      lat: Number(d.lat),
      lng: Number(d.lon),
    }));
  } catch {
    return [];
  }
}

export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = `${NOMINATIM}/reverse?format=jsonv2&accept-language=pl&lat=${lat}&lon=${lng}`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return null;
    const d = await res.json();
    return d?.display_name ? shortLabel(d.display_name) : null;
  } catch {
    return null;
  }
}

/** Warsaw city centre — origin for the standard-service radius */
export const WARSAW_CENTER: LatLng = { lat: 52.2319, lng: 21.0067 };
/** standard configurator serves points within this radius (km) */
export const SERVICE_RADIUS_KM = 100;

/** straight-line distance from Warsaw centre, km */
export function kmFromWarsaw(lat: number, lng: number): number {
  return haversineKm(WARSAW_CENTER, { lat, lng });
}

/** true when the point lies outside the standard 100 km service radius */
export function isOutsideRadius(lat: number, lng: number): boolean {
  return kmFromWarsaw(lat, lng) > SERVICE_RADIUS_KM;
}

function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** straight-line estimate with a road factor, used when OSRM is unreachable */
export function straightKm(points: LatLng[]): number {
  let km = 0;
  for (let i = 1; i < points.length; i++) km += haversineKm(points[i - 1], points[i]);
  return Math.max(1, Math.round(km * 1.3));
}

export async function fetchDrivingRoute(points: LatLng[]): Promise<DrivingRoute> {
  try {
    const coords = points.map((p) => `${p.lng},${p.lat}`).join(";");
    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`
    );
    if (res.ok) {
      const d = await res.json();
      const r = d?.routes?.[0];
      if (r?.geometry?.coordinates?.length) {
        return {
          km: Math.max(1, Math.round(r.distance / 1000)),
          geometry: r.geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
          ),
        };
      }
    }
  } catch {
    /* fall through to estimate */
  }
  return { km: straightKm(points), geometry: null };
}
