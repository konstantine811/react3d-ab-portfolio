import { Route, Routes } from "react-router-dom";
// components
import Header from "./components/Header/Header";
// route pages components
import FirstThreeScenes from "@pages/ThreeScenes/FirstScene";
import HomePage from "@pages/Home";
// models
import { NavNamesPaths } from "@configs/navigation";
import { IRouterConfiguration } from "@models/navigation.model";
// providers
import { Providers } from "@providers/nextui/providers";

export const ROUTE_PATH_CONFIG: IRouterConfiguration[] = [
  {
    title: "Home",
    path: NavNamesPaths.home,
    element: <HomePage />,
  },
  {
    title: "Three Scenes",
    element: <FirstThreeScenes />,
    children: [
      {
        title: "First Scene",
        path: NavNamesPaths.threeFirstScene,
        element: <FirstThreeScenes />,
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
