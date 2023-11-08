import { Route, Routes, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// components
import Header from "./components/Header/Header";
// route pages components
import FirstThreeScenes from "@pages/ThreeScenes/FirstScene";
import HomePage from "@pages/Home";
// models
import { NavNamesPaths } from "@configs/navigation";
import { IRouterConfiguration } from "@models/navigation.model";

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
  const navigate = useNavigate();
  return (
    <>
      <NextUIProvider navigate={navigate}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
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
                  <Route
                    key={i.title}
                    path={i.path}
                    element={i.element}
                  ></Route>
                );
              }
            })}
          </Routes>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  );
}

export default App;
