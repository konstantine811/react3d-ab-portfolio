import { Route, Routes } from "react-router-dom";
// models
import { NavNamesPaths } from "@configs/navigation";
import { IRouterConfiguration } from "@models/navigation.model";
// providers
import { Providers } from "@providers/nextui/providers";

import mapboxgl from "mapbox-gl";
import { Box, Layers } from "lucide-react";
import React, { Suspense } from "react";

// components
import Header from "./components/Header/Header";
import Loader from "@components/Loader/Loader";
// route pages components
import FirstThreeScenes from "@pages/ThreeScenes/FirstScene";
import SecondThreeScenes from "@pages/ThreeScenes/SecondScene";
import HomePage from "@pages/Home";
import BlogPage from "@pages/Blog/Blog";
import AirplaneGame from "@pages/ThreeScenes/AirplaneGame";
import LoadModelsTrain from "@pages/ThreeScenes/LoadModelsTrain";
import BlogArticlePage from "@pages/Blog/BlogArticlePage";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia29uc3RhbnRpbmU4MTEiLCJhIjoiY2themphMDhpMGsyazJybWlpbDdmMGthdSJ9.m2RIe_g8m5dqbce0JrO73w";

export const ROUTE_PATH_CONFIG: IRouterConfiguration[] = [
  {
    title: "header.nav-links.home",
    path: NavNamesPaths.home,
    element: <HomePage />,
  },
  {
    title: "header.nav-links.blog",
    path: NavNamesPaths.blog,
    element: <BlogPage />,
    byId: {
      param: ":id",
      element: <BlogArticlePage />,
    },
  },
  {
    title: "header.nav-links.three-scenes.title",
    element: <FirstThreeScenes />,
    children: [
      {
        title: "header.nav-links.three-scenes.first-scene",
        path: NavNamesPaths.threeFirstScene,
        element: <FirstThreeScenes />,
        icon: <Box />,
      },
      {
        title: "header.nav-links.three-scenes.second-scene",
        path: NavNamesPaths.threeSecondScene,
        element: <SecondThreeScenes />,
        icon: <Layers />,
      },
      {
        title: "header.nav-links.three-scenes.load-models-train",
        path: NavNamesPaths.threeLoadModelTrain,
        element: <LoadModelsTrain />,
        icon: <Layers />,
      },
      {
        title: "header.nav-links.three-scenes.airplane-game",
        path: NavNamesPaths.threeAirplaneGame,
        element: <AirplaneGame />,
        icon: <Layers />,
      },
    ],
  },
];

function App() {
  return (
    <>
      <Providers>
        <Header></Header>
        <Suspense fallback={<Loader />}>
          <Routes>
            {ROUTE_PATH_CONFIG.map((i) => {
              if (i.children && i.children.length) {
                return i.children.map((iCh) => {
                  return (
                    <Route
                      key={iCh.title}
                      path={iCh.path}
                      element={iCh.element}
                    />
                  );
                });
              } else {
                return (
                  <React.Fragment key={i.title}>
                    <Route path={i.path} element={i.element} />
                    {i.byId ? (
                      <Route
                        path={`${i.path}/${i.byId.param}`}
                        element={i.byId.element}
                      />
                    ) : null}
                  </React.Fragment>
                );
              }
            })}
          </Routes>
        </Suspense>
      </Providers>
    </>
  );
}

export default App;
