import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { getProject } from "@theatre/core";

import { useSelector } from "react-redux";
import Expirience from "@components/Three/Expirience/Expirience";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
// store
import { headerHeightState } from "@store/slices/changeComponentSize";
import { useTheme } from "next-themes";
import { Suspense, useEffect, useState } from "react";
// models
import { NEXTUIVars } from "@models/nextUIVars.model";
import { ScrollControls } from "@react-three/drei";
import { SheetProvider } from "@theatre/r3f";

studio.extend(extension);

const FirstThreeScenes = () => {
  const headerHeight = useSelector(headerHeightState);
  const { theme } = useTheme();
  const threeColorBack = new Color("#151515");
  const [backColor, setBackColor] = useState<Color>(threeColorBack);
  const sheet = getProject("Fly Through").sheet("Scene");

  function onSetBackColor() {
    setTimeout(() => {
      const globalColorTheme = getComputedStyle(document.body)
        .getPropertyValue(NEXTUIVars.background)
        .split(" ");
      setBackColor(
        new Color(
          `hsl(${globalColorTheme[0]}, ${globalColorTheme[1]}, ${globalColorTheme[2]})`
        )
      );
    });
  }

  useEffect(() => {
    onSetBackColor();
  }, [theme]);
  return (
    <>
      <Suspense fallback={null}>
        <div style={{ height: `calc(100vh - ${headerHeight}px)` }}>
          <Canvas
            shadows
            gl={{ alpha: false, preserveDrawingBuffer: true }}
            className="touch-none"
            dpr={[1, 2]}
            camera={{ fov: 45 }}
          >
            <ScrollControls pages={5}>
              <SheetProvider sheet={sheet}>
                <color attach="background" args={[backColor]} />
                <Expirience />
              </SheetProvider>
            </ScrollControls>
          </Canvas>
          <h1>Hello world</h1>
        </div>
      </Suspense>
    </>
  );
};

export default FirstThreeScenes;
