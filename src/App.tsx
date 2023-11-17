import { Route, Routes } from "react-router-dom";
// components
import Header from "./components/Header/Header";
// route pages components
import FirstThreeScenes from "@pages/ThreeScenes/FirstScene";
import SecondThreeScenes from "@pages/ThreeScenes/SecondScene";
import HomePage from "@pages/Home";
import BlogPage from "@pages/Blog/Blog";
// models
import { NavNamesPaths } from "@configs/navigation";
import { IRouterConfiguration } from "@models/navigation.model";
// providers
import { Providers } from "@providers/nextui/providers";

import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { Box, Layers } from "lucide-react";

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
    ],
  },
];

function App() {
  return (
    <>
      <Providers>
        <Header></Header>
        <Routes>
          {ROUTE_PATH_CONFIG.map((i) => {
            if (i.children && i.children.length) {
              return i.children.map((iCh) => {
                return (
                  <Route
                    key={iCh.title}
                    path={iCh.path}
                    element={iCh.element}
                  ></Route>
                );
              });
            } else {
              return (
                <Route key={i.title} path={i.path} element={i.element}></Route>
              );
            }
          })}
        </Routes>
      </Providers>
    </>
  );
}

export default App;
