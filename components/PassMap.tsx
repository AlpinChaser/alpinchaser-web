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

// ─── Arc animation: sliding polyline beam ────────────────────────────────────
const ARC_DURATION = 3500; // ms

function runArcAnimation(
  map: import("leaflet").Map,
  L: typeof import("leaflet"),
  points: [number, number][],
  isRidden: boolean,
  onDone: () => void
): () => void {
  const n = points.length;
  const accentColor = isRidden ? "#D4AF37" : "#39FF14";
  // Beam window: 18% of path, min 5 points
  const WINDOW = Math.max(5, Math.round(n * 0.18));
  // Head (front 30% of window): white, brighter
  const HEAD = Math.max(2, Math.round(WINDOW * 0.3));

  // Tail: accent color, semi-transparent
  const tail = L.polyline(points.slice(0, 2) as import("leaflet").LatLngExpression[], {
    color: accentColor, weight: 3, opacity: 0.55,
    interactive: false, smoothFactor: 1,
  }).addTo(map);
  (tail.getElement() as SVGPathElement | null)?.style.setProperty(
    "filter", `drop-shadow(0 0 6px ${accentColor})`
  );

  // Head: white with accent glow
  const beam = L.polyline(points.slice(0, 2) as import("leaflet").LatLngExpression[], {
    color: "#ffffff", weight: 4, opacity: 1,
    interactive: false, smoothFactor: 1,
  }).addTo(map);
  (beam.getElement() as SVGPathElement | null)?.style.setProperty(
    "filter", `drop-shadow(0 0 8px #ffffff) drop-shadow(0 0 18px ${accentColor})`
  );

  const startTime = performance.now();
  let rafId: number;

  const tick = (now: number) => {
    const t = Math.min((now - startTime) / ARC_DURATION, 1);
    const endIdx = Math.min(n - 1, Math.round(t * (n - 1)));
    const winStart = Math.max(0, endIdx - WINDOW);
    const headStart = Math.max(winStart, endIdx - HEAD);

    if (endIdx > winStart)
      tail.setLatLngs(points.slice(winStart, headStart + 1) as import("leaflet").LatLngExpression[]);
    if (endIdx > headStart)
      beam.setLatLngs(points.slice(headStart, endIdx + 1) as import("leaflet").LatLngExpression[]);

    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      tail.remove();
      beam.remove();
      onDone();
    }
  };

  rafId = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(rafId);
    tail.remove();
    beam.remove();
  };
}

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
  const polylinePointsRef = useRef<Map<string, [number, number][]>>(new Map());
  const arcCleanupRef = useRef<(() => void) | null>(null);
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
        scrollWheelZoom: false, // always off — Ctrl+scroll zooms instead
      });

      // ── Ctrl+scroll to zoom, plain scroll passes through to page ─────────────
      const container = map.getContainer();

      // Hint overlay
      const hint = document.createElement("div");
      hint.style.cssText = [
        "position:absolute", "top:50%", "left:50%",
        "transform:translate(-50%,-50%)",
        "background:rgba(10,10,11,0.88)",
        "backdrop-filter:blur(16px)",
        "-webkit-backdrop-filter:blur(16px)",
        "border:1px solid rgba(255,255,255,0.12)",
        "border-radius:12px",
        "padding:10px 18px",
        "color:rgba(255,255,255,0.75)",
        "font-size:13px",
        "font-family:Inter,system-ui,sans-serif",
        "font-weight:500",
        "letter-spacing:0.02em",
        "pointer-events:none",
        "z-index:9999",
        "opacity:0",
        "transition:opacity 0.2s ease",
        "white-space:nowrap",
      ].join(";");
      hint.innerHTML =
        '<span style="opacity:0.5;margin-right:8px">⌨</span>' +
        '<kbd style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:4px;padding:1px 6px;font-size:11px;font-family:inherit">Strg</kbd>' +
        '<span style="margin:0 6px;opacity:0.5">+</span>Scrollen zum Zoomen';
      container.style.position = "relative";
      container.appendChild(hint);

      let hintTimer: ReturnType<typeof setTimeout> | null = null;
      const showHint = () => {
        hint.style.opacity = "1";
        if (hintTimer) clearTimeout(hintTimer);
        hintTimer = setTimeout(() => { hint.style.opacity = "0"; }, 1600);
      };

      container.addEventListener("wheel", (e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          e.stopPropagation();
          const delta = e.deltaY < 0 ? 1 : -1;
          map.setZoom(map.getZoom() + delta, { animate: true });
        } else {
          showHint();
        }
      }, { passive: false });

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
          html: `<div class="ac-dot${selected ? " ac-dot--selected" : ""}" style="background:${color};border-color:${color};width:${sz}px;height:${sz}px"></div>`,
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
                   <div class="ac-label${selected ? " ac-label--selected" : ""}" style="--accent:${color};--accent-50:${color}80;--accent-80:${color}CC;--accent-30:${color}4D">
                     <span class="ac-label-peak">${peakSvg(color)}</span>
                     <span class="ac-label-name">${name}</span>
                   </div>
                   <div class="ac-label-dot" style="background:${color};border-color:${color};width:${ds}px;height:${ds}px"></div>
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
          if (selectedIdRef.current === pass.id) {
            window.location.href = `/pass/${pass.id}`;
          } else {
            onSelectPass(pass);
          }
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
      polylinePointsRef.current.clear();

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
              if (selectedIdRef.current === pass.id) {
                window.location.href = `/pass/${pass.id}`;
              } else {
                onSelectPass(pass);
              }
            });
            line.on("mouseover", () => line.setStyle({ weight: 4, opacity: 1 }));
            line.on("mouseout", () => {
              const isSel = selectedPass?.id === pass.id;
              line.setStyle({ weight: isSel ? 4 : 2, opacity: isSel ? 1 : 0.5 });
            });

            polylinesRef.current.set(pass.id, line);
            polylinePointsRef.current.set(pass.id, points.map((p) => [p.lat, p.lon] as [number, number]));
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
                         <div class="ac-label${isSel ? " ac-label--selected" : ""}" style="--accent:${color};--accent-50:${color}80;--accent-80:${color}CC;--accent-30:${color}4D">
                           <span class="ac-label-peak"><svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M9 0L18 14H0L9 0Z" fill="${color}"/></svg></span>
                           <span class="ac-label-name">${pass.name}</span>
                         </div>
                         <div class="ac-label-dot" style="background:${color};border-color:${color};width:${dotSize(zoom)}px;height:${dotSize(zoom)}px"></div>
                       </div>`,
                iconSize: undefined,
                iconAnchor: [0, 0],
              })
            : L.divIcon({
                className: "",
                html: `<div class="ac-dot${isSel ? " ac-dot--selected" : ""}" style="background:${color};border-color:${color};width:${dotSize(zoom)}px;height:${dotSize(zoom)}px"></div>`,
                iconSize: [dotSize(zoom), dotSize(zoom)],
                iconAnchor: [Math.round(dotSize(zoom) / 2), Math.round(dotSize(zoom) / 2)],
              })
        );
        // pulse class is added later in onDone, after the arc finishes
      });
    });

    polylinesRef.current.forEach((line, id) => {
      const pass = passes.find((p) => p.id === id);
      const color = pass?.status === "gefahren" ? NEON_RIDDEN : NEON;
      const el = line.getElement() as SVGPathElement | null;
      if (id === selectedPass?.id) {
        line.setStyle({ weight: 3, opacity: 1, color });
        line.bringToFront();
        // pulse starts only after arc finishes (onDone)
        el?.classList.remove("ac-polyline-pulse");
        el?.classList.remove("ac-polyline-pulse--gold");
      } else {
        line.setStyle({ weight: 2, opacity: 0.5, color });
        el?.classList.remove("ac-polyline-pulse");
        el?.classList.remove("ac-polyline-pulse--gold");
      }
    });

    // Arc animation: cancel previous, start new
    if (arcCleanupRef.current) { arcCleanupRef.current(); arcCleanupRef.current = null; }
    if (selectedPass) {
      const selId = selectedPass.id;
      const selIsRidden = selectedPass.status === "gefahren";
      const pts = polylinePointsRef.current.get(selId);
      if (pts && pts.length >= 2) {
        import("leaflet").then((L) => {
          const m = leafletMapRef.current;
          if (!m) return;
          arcCleanupRef.current = runArcAnimation(m, L, pts, selIsRidden, () => {
            arcCleanupRef.current = null;
            // Both pulse animations start simultaneously after the arc
            const polylineEl = polylinesRef.current.get(selId)?.getElement() as SVGPathElement | null;
            polylineEl?.classList.add(selIsRidden ? "ac-polyline-pulse--gold" : "ac-polyline-pulse");
            const labelEl = markersRef.current.get(selId)?.getElement()
              ?.querySelector(".ac-label") as HTMLElement | null;
            labelEl?.classList.add(selIsRidden ? "ac-label--pulse--gold" : "ac-label--pulse");
          });
        });
      }
    }

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
