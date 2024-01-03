import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";
/* import { isMobile } from "react-device-detect"; */
import "threebox-plugin/dist/threebox.css";
const threebox = require("threebox-plugin");

interface IMapProps {
  className?: string;
  isChapterView?: HomeChapters;
}

export enum HomeChapters {
  vasilivka = "vasilivka ",
  zp = "zp",
}

const chapters = {
  [HomeChapters.vasilivka]: {
    bearing: -0.17444209059999594,
    center: [35.27611793816064, 47.43453823094302],
    zoom: 12.347797638410174,
    pitch: 41.12693734772193,
  },
  [HomeChapters.zp]: {
    duration: 6000,
    center: [35.11537870324764, 47.83901285853585],
    bearing: 20.164718801389768,
    zoom: 11.038809484936078,
    pitch: 47.42841197315624,
  },
};

export default function Map({ className, isChapterView }: IMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [lng] = useState(-70.9);
  const [lat] = useState(42.35);
  const [zoom] = useState(0);
  const satelliteUrl = "mapbox://styles/mapbox/satellite-v9";
  const ownMap = "mapbox://styles/konstantine811/clbgrp235006a14o0pebuoyuo";
  const [activeChapterName, setActiveChapterName] = useState<HomeChapters>();

  useEffect(() => {
    if (isChapterView && map && activeChapterName !== isChapterView) {
      map.flyTo(chapters[isChapterView] as any);
      setActiveChapterName(isChapterView);
    }
  }, [isChapterView, activeChapterName, map]);

  useEffect(() => {
    if (map) {
      /*  map.on("click", (e) => {
        console.log("center", map.getCenter());
        console.log("pitch", map.getPitch());
        console.log("zoom", map.getZoom());
        console.log("bearing", map.getBearing());
      }); */
      const tb = ((window as any).tb = new threebox.Threebox(
        map,
        map.getCanvas().getContext("webgl"),
        {
          defaultLights: true,
        }
      ));

      map.on("style.load", () => {
        map.addLayer({
          id: "custom-threebox-model",
          type: "custom",
          renderingMode: "3d",
          onAdd: function () {
            // Creative Commons License attribution:  Metlife Building model by https://sketchfab.com/NanoRay
            // https://sketchfab.com/3d-models/metlife-building-32d3a4a1810a4d64abb9547bb661f7f3
            const scale = 3.2;
            const options = {
              obj: "/3dmodels/home-page/wrath_of_the_dragon/scene.gltf",
              type: "gltf",
              scale: { x: scale, y: scale, z: scale },
              units: "meters",
              rotation: { x: 90, y: -90, z: 0 },
            };
            console.log(tb);
            tb.loadObj(options, (model: any) => {
              console.log("on add model", model);
              model.setCoords([35.27840968748217, 47.447331944920194]);
              model.setRotation({ x: 0, y: 0, z: 250 });
              if (tb) {
                tb.add(model);
              }
            });
          },

          render: function () {
            tb.update();
          },
        });
      });
    }
  }, [map]);

  useEffect(() => {
    if (mapRef.current) return; // initialize map only once
    if (mapContainer && mapContainer.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        /*  style: isMobile ? satelliteUrl : ownMap, */
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });
      setMap(mapRef.current);
    }
  }, [lng, lat, zoom]);
  return (
    <>
      <div ref={mapContainer} className={className} />
    </>
  );
}
