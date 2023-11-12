import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
/* import { isMobile } from "react-device-detect"; */

interface IMapProps {
  className?: string;
}

export default function Map({ className }: IMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const [lng] = useState(-70.9);
  const [lat] = useState(42.35);
  const [zoom] = useState(0);
  /*   const satelliteUrl = "mapbox://styles/mapbox/satellite-v9"; */
  const ownMap = "mapbox://styles/konstantine811/clbgrp235006a14o0pebuoyuo";

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        /*  style: isMobile
          ? "mapbox://styles/mapbox/satellite-v9"
          : "mapbox://styles/konstantine811/clbgrp235006a14o0pebuoyuo", */
        style: ownMap,
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
