"use client";

import { useEffect, useRef, useState } from "react";
import type {
  Map as LeafletMap,
  LayerGroup,
  LeafletMouseEvent,
} from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

interface RouteMapProps {
  stops: MapStop[];
  /** driving geometry from OSRM as [lat, lng]; null → dashed straight line */
  route: [number, number][] | null;
  onAdd: (lat: number, lng: number) => void;
  onMove: (id: string, lat: number, lng: number) => void;
  className?: string;
}

const WARSAW: [number, number] = [52.2319, 21.0067];

/**
 * Real Leaflet map (CARTO light tiles) for the route step. Clicking adds a
 * numbered pin, pins are draggable, consecutive stops are joined by the
 * actual driving route when available.
 */
export function RouteMap({
  stops,
  route,
  onAdd,
  onMove,
  className = "",
}: RouteMapProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const [ready, setReady] = useState(false);

  // keep latest callbacks without re-initialising the map
  const onAddRef = useRef(onAdd);
  const onMoveRef = useRef(onMove);
  onAddRef.current = onAdd;
  onMoveRef.current = onMove;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("leaflet");
      const L = (mod as { default?: typeof import("leaflet") }).default ?? mod;
      if (cancelled || !elRef.current || mapRef.current) return;

      const map = L.map(elRef.current, {
        center: WARSAW,
        zoom: 10,
      });
      // drop the default "Leaflet" prefix (with the flag emoji) — keep only
      // the required OSM/CARTO credits
      map.attributionControl.setPrefix(false);
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);
      map.on("click", (e: LeafletMouseEvent) =>
        onAddRef.current(e.latlng.lat, e.latlng.lng)
      );

      leafletRef.current = L;
      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      setReady(true);
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // sync pins + route line — keyed by coordinates, so renaming a stop
  // doesn't clear markers or re-zoom the map
  const coordsKey = stops
    .map((s) => `${s.lat.toFixed(5)},${s.lng.toFixed(5)}`)
    .join(";");
  const stopsRef = useRef(stops);
  stopsRef.current = stops;

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer || !ready) return;

    const current = stopsRef.current;
    layer.clearLayers();

    current.forEach((s, i) => {
      const icon = L.divIcon({
        className: "route-pin",
        html: `<span class="route-pin-badge">${i + 1}</span><span class="route-pin-tail"></span>`,
        iconSize: [30, 42],
        iconAnchor: [15, 40],
      });
      const marker = L.marker([s.lat, s.lng], {
        icon,
        draggable: true,
        autoPan: true,
        // larger touch tolerance makes pins easy to grab on phones
        riseOnHover: true,
      }).addTo(layer);
      marker.on("dragend", () => {
        const p = marker.getLatLng();
        onMoveRef.current(s.id, p.lat, p.lng);
      });
    });

    if (route && route.length > 1) {
      L.polyline(route, { color: "#6E1E2C", weight: 3, opacity: 0.85 }).addTo(
        layer
      );
    } else if (current.length > 1) {
      L.polyline(
        current.map((s) => [s.lat, s.lng] as [number, number]),
        { color: "#6E1E2C", weight: 2, dashArray: "4 8", opacity: 0.7 }
      ).addTo(layer);
    }

    if (current.length > 0) {
      const bounds = L.latLngBounds(
        current.map((s) => [s.lat, s.lng] as [number, number])
      );
      if (route) route.forEach((p) => bounds.extend(p));
      map.fitBounds(bounds.pad(0.3), { maxZoom: 13 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordsKey, route, ready]);

  return (
    <div
      ref={elRef}
      className={className}
      role="application"
      aria-label="Mapa trasy — kliknij, aby dodać punkt"
    />
  );
}
