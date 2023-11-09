import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";

interface IMapProps {
  className?: string;
}

export default function Map({ className }: IMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });
    }
  });
  return (
    <>
      <div ref={mapContainer} className={className} />
    </>
  );
}
