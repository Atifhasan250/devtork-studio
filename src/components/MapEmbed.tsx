"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapEmbedProps {
  className?: string;
}

export default function MapEmbed({ className = "" }: MapEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [90.4125, 23.8103],
      zoom: 8,
      attributionControl: false,
      cooperativeGestures: true,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    new maplibregl.Marker({ color: "#9200bd" }).setLngLat([90.4125, 23.8103]).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const handleMouseEnter = () => document.body.classList.add("cursor-hidden");
  const handleMouseLeave = () => document.body.classList.remove("cursor-hidden");

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
}
