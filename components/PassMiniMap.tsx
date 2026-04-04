"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

interface Props {
  passId: string;
  lat: number;
  lon: number;
  isRidden: boolean;
}

export default function PassMiniMap({ passId, lat, lon, isRidden }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((mapRef.current as any)._leaflet_id != null) return;

    let cancelled = false;

    const init = async () => {
      const L = await import("leaflet");
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [lat, lon],
        zoom: 11,
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: true,
      });

      // Satellite base
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { maxZoom: 19 }
      ).addTo(map);

      // Dark cinematic veil
      L.tileLayer(
        "https://basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        { opacity: 0.55, maxZoom: 20 }
      ).addTo(map);

      // Labels pane
      map.createPane("labelsPane");
      map.getPane("labelsPane")!.style.zIndex = "450";
      map.getPane("labelsPane")!.style.pointerEvents = "none";
      L.tileLayer(
        "https://basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
        { pane: "labelsPane", maxZoom: 20 }
      ).addTo(map);

      const color = isRidden ? "#D4AF37" : "#39FF14";

      // Load polyline
      try {
        const res = await fetch(`/api/polyline/${passId}`);
        if (res.ok) {
          const data = await res.json();
          const pts: { lat: number; lon: number }[] = data.points ?? [];
          if (pts.length >= 2) {
            const line = L.polyline(
              pts.map(p => [p.lat, p.lon] as [number, number]),
              { color, weight: 3, opacity: 0.9, smoothFactor: 1.5 }
            ).addTo(map);
            const el = line.getElement() as SVGPathElement | null;
            el?.style.setProperty("filter", `drop-shadow(0 0 8px ${color})`);
            map.fitBounds(line.getBounds(), { padding: [48, 48], animate: false });
          }
        }
      } catch { /* no polyline */ }

      // Dot marker
      L.marker([lat, lon], {
        icon: L.divIcon({
          className: "",
          html: `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 0 10px ${color}"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6],
        }),
        zIndexOffset: 1000,
      }).addTo(map);
    };

    init();

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passId, lat, lon, isRidden]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%", background: "#0A0A0B", minHeight: 320 }}
    />
  );
}
