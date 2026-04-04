"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { Pass, PolylinePoint } from "@/types/pass";

interface Props {
  passes: Pass[];
  onSelectPass: (pass: Pass | null) => void;
  selectedPass: Pass | null;
}

const NEON = "#39FF14";
const NEON_RIDDEN = "#D4AF37";

// 1. Satellite base (Esri World Imagery)
const TILE_SATELLITE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const TILE_SATELLITE_ATTR =
  '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics';

// 2. City/road labels (CartoCDN dark — white text on transparent)
const TILE_LABELS_URL =
  "https://basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png";

const LABEL_MIN_ZOOM = 9;   // dots below this
const LABEL_ALL_ZOOM = 11;  // all labels above this
const BORDER_MIN_ZOOM = 9;  // borders only from zoom 9

// px diameter of the dot marker depending on zoom
const dotSize = (z: number) => z < 9 ? 5 : z < 11 ? 6 : 8;

// Zoom 9-10: only label "important" passes
function shouldShowLabel(pass: Pass, zoom: number): boolean {
  if (zoom < LABEL_MIN_ZOOM) return false;
  if (zoom >= LABEL_ALL_ZOOM) return true;
  return parseFloat(pass.ride_score) >= 4.0 || pass.elevation >= 2000;
}

export default function PassMap({ passes, onSelectPass, selectedPass }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<Map<string, import("leaflet").Marker>>(new Map());
  const selectedIdRef = useRef<string | null>(null);
  const bordersLoadedRef = useRef(false);
  const borderGroupRef = useRef<import("leaflet").LayerGroup | null>(null);
  const polylinesRef = useRef<Map<string, import("leaflet").Polyline>>(new Map());
  const [mapReady, setMapReady] = useState(false);

  // ─── Init map ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((mapRef.current as any)._leaflet_id != null) return;

    let cancelled = false;

    const initMap = async () => {
      const L = await import("leaflet");

      if (cancelled) return;
      if (!mapRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((mapRef.current as any)._leaflet_id != null) return;

      const map = L.map(mapRef.current, {
        center: [46.5, 10.0],
        zoom: 6,
        zoomControl: true,
        attributionControl: true,
      });

      map.createPane("labelsPane");
      map.getPane("labelsPane")!.style.zIndex = "450";
      map.getPane("labelsPane")!.style.pointerEvents = "none";

      // Layer 1: Satellite imagery
      L.tileLayer(TILE_SATELLITE_URL, {
        attribution: TILE_SATELLITE_ATTR,
        maxZoom: 19,
      }).addTo(map);

      // Layer 2: Dark cinematic veil over satellite (keeps terrain visible but muted)
      L.tileLayer(
        "https://basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        { attribution: "", maxZoom: 20, opacity: 0.6 }
      ).addTo(map);

      // Layer 3: Labels above polylines, below markers
      L.tileLayer(TILE_LABELS_URL, {
        attribution: "",
        maxZoom: 20,
        pane: "labelsPane",
      }).addTo(map);

      leafletMapRef.current = map;
      if (!cancelled) setMapReady(true);
    };

    initMap();

    return () => {
      cancelled = true;
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        setMapReady(false);
      }
    };
  }, []);

  // ─── Borders (loaded once) ───────────────────────────────────────────────────
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current || bordersLoadedRef.current) return;
    bordersLoadedRef.current = true;

    const map = leafletMapRef.current;

    import("leaflet").then(async (L) => {
      try {
        const res = await fetch("/borders.geojson");
        if (!res.ok) return;
        const geojson = await res.json();

        const group = L.layerGroup();

        // Glow layer — subtle halo
        L.geoJSON(geojson, {
          style: {
            color: "rgba(255,255,255,0.15)",
            weight: 2,
            opacity: 1,
            fill: false,
            lineCap: "round",
            lineJoin: "round",
          },
        }).addTo(group);

        // Sharp dashed line on top
        L.geoJSON(geojson, {
          style: {
            color: "rgba(255,255,255,0.55)",
            weight: 1,
            opacity: 1,
            fill: false,
            dashArray: "8 5",
            lineCap: "round",
          },
        }).addTo(group);

        borderGroupRef.current = group;
        // Only show borders from zoom 9+
        if (map.getZoom() >= BORDER_MIN_ZOOM) group.addTo(map);
      } catch {
        // borders optional
      }
    });
  }, [mapReady]);

  // ─── Border zoom visibility ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return;
    const map = leafletMapRef.current;
    const onZoom = () => {
      const g = borderGroupRef.current;
      if (!g) return;
      if (map.getZoom() >= BORDER_MIN_ZOOM) {
        if (!map.hasLayer(g)) g.addTo(map);
      } else {
        if (map.hasLayer(g)) g.remove();
      }
    };
    map.on("zoomend", onZoom);
    return () => { map.off("zoomend", onZoom); };
  }, [mapReady]);

  // ─── Markers ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return;

    import("leaflet").then((L) => {
      const map = leafletMapRef.current!;

      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();

      const makeDotIcon = (color: string, selected: boolean, sz: number) =>
        L.divIcon({
          className: "",
          html: `<div class="ac-dot${selected ? " ac-dot--selected" : ""}" style="background:${color};width:${sz}px;height:${sz}px"></div>`,
          iconSize: [sz, sz],
          iconAnchor: [Math.round(sz / 2), Math.round(sz / 2)],
        });

      const peakSvg = (color: string) =>
        `<svg width="12" height="10" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M9 0L18 14H0L9 0Z" fill="${color}"/>
         </svg>`;

      const makeLabelIcon = (name: string, color: string, selected: boolean, ds: number) =>
        L.divIcon({
          className: "",
          html: `<div class="ac-label-wrap">
                   <div class="ac-label${selected ? " ac-label--selected" : ""}" style="--accent:${color}">
                     <span class="ac-label-peak">${peakSvg(color)}</span>
                     <span class="ac-label-name">${name}</span>
                   </div>
                   <div class="ac-label-dot" style="background:${color};width:${ds}px;height:${ds}px"></div>
                 </div>`,
          iconSize: undefined,
          iconAnchor: [0, 0],
        });

      const zoom = map.getZoom();

      passes.forEach((pass) => {
        const isRidden = pass.status === "gefahren";
        const color = isRidden ? NEON_RIDDEN : NEON;
        const isSel = selectedIdRef.current === pass.id;

        const icon = shouldShowLabel(pass, zoom)
          ? makeLabelIcon(pass.name, color, isSel, dotSize(zoom))
          : makeDotIcon(color, isSel, dotSize(zoom));

        const marker = L.marker([pass.lat, pass.lon], { icon }).addTo(map);

        marker.on("click", (e) => {
          L.DomEvent.stopPropagation(e);
          onSelectPass(pass);
        });

        markersRef.current.set(pass.id, marker);
      });

      // Swap icons on zoom
      const onZoom = () => {
        const z = map.getZoom();
        markersRef.current.forEach((marker, id) => {
          const pass = passes.find((p) => p.id === id);
          if (!pass) return;
          const color = pass.status === "gefahren" ? NEON_RIDDEN : NEON;
          const isSel = selectedIdRef.current === id;
          marker.setIcon(
            shouldShowLabel(pass, z)
              ? makeLabelIcon(pass.name, color, isSel, dotSize(z))
              : makeDotIcon(color, isSel, dotSize(z))
          );
        });
      };
      map.off("zoomend", onZoom);
      map.on("zoomend", onZoom);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, passes]);

  // ─── Polylines (always visible) ───────────────────────────────────────────
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return;

    import("leaflet").then(async (L) => {
      const map = leafletMapRef.current!;

      polylinesRef.current.forEach((p) => p.remove());
      polylinesRef.current.clear();

      await Promise.allSettled(
        passes.map(async (pass) => {
          try {
            const res = await fetch(`/api/polyline/${pass.id}`);
            if (!res.ok) return;
            const data = await res.json();
            const points: PolylinePoint[] = data.points ?? [];
            if (points.length < 2) return;

            const isRidden = pass.status === "gefahren";
            const color = isRidden ? NEON_RIDDEN : NEON;

            const line = L.polyline(
              points.map((p) => [p.lat, p.lon] as [number, number]),
              { color, weight: 2, opacity: 0.5, smoothFactor: 1.5 }
            ).addTo(map);

            line.on("click", (e) => {
              L.DomEvent.stopPropagation(e);
              onSelectPass(pass);
            });
            line.on("mouseover", () => line.setStyle({ weight: 4, opacity: 1 }));
            line.on("mouseout", () => {
              const isSel = selectedPass?.id === pass.id;
              line.setStyle({ weight: isSel ? 4 : 2, opacity: isSel ? 1 : 0.5 });
            });

            polylinesRef.current.set(pass.id, line);
          } catch { /* no polyline for this pass */ }
        })
      );
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, passes]);

  // ─── Highlight selected ───────────────────────────────────────────────────
  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return;

    selectedIdRef.current = selectedPass?.id ?? null;
    const map = leafletMapRef.current;
    const zoom = map.getZoom();

    import("leaflet").then((L) => {
      markersRef.current.forEach((marker, id) => {
        const pass = passes.find((p) => p.id === id);
        if (!pass) return;
        const color = pass.status === "gefahren" ? NEON_RIDDEN : NEON;
        const isSel = id === selectedPass?.id;
        marker.setIcon(
          shouldShowLabel(pass, zoom)
            ? L.divIcon({
                className: "",
                html: `<div class="ac-label-wrap">
                         <div class="ac-label${isSel ? " ac-label--selected" : ""}" style="--accent:${color}">
                           <span class="ac-label-peak"><svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M9 0L18 14H0L9 0Z" fill="${color}"/></svg></span>
                           <span class="ac-label-name">${pass.name}</span>
                         </div>
                         <div class="ac-label-dot" style="background:${color};width:${dotSize(zoom)}px;height:${dotSize(zoom)}px"></div>
                       </div>`,
                iconSize: undefined,
                iconAnchor: [0, 0],
              })
            : L.divIcon({
                className: "",
                html: `<div class="ac-dot${isSel ? " ac-dot--selected" : ""}" style="background:${color};width:${dotSize(zoom)}px;height:${dotSize(zoom)}px"></div>`,
                iconSize: [dotSize(zoom), dotSize(zoom)],
                iconAnchor: [Math.round(dotSize(zoom) / 2), Math.round(dotSize(zoom) / 2)],
              })
        );
      });
    });

    polylinesRef.current.forEach((line, id) => {
      const pass = passes.find((p) => p.id === id);
      const color = pass?.status === "gefahren" ? NEON_RIDDEN : NEON;
      if (id === selectedPass?.id) {
        line.setStyle({ weight: 4, opacity: 1, color });
        line.bringToFront();
      } else {
        line.setStyle({ weight: 2, opacity: 0.5, color });
      }
    });

    if (selectedPass && leafletMapRef.current) {
      const currentZoom = leafletMapRef.current.getZoom();
      leafletMapRef.current.setView(
        [selectedPass.lat, selectedPass.lon],
        Math.max(currentZoom, 10),
        { animate: true, duration: 0.6 }
      );
    }
  }, [selectedPass, passes, mapReady]);

  // ─── Map click closes selection ───────────────────────────────────────────
  const handleMapClick = useCallback(() => { onSelectPass(null); }, [onSelectPass]);

  useEffect(() => {
    if (!mapReady || !leafletMapRef.current) return;
    leafletMapRef.current.on("click", handleMapClick);
    return () => { leafletMapRef.current?.off("click", handleMapClick); };
  }, [mapReady, handleMapClick]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        background: "#0A0A0B",
      }}
    />
  );
}
