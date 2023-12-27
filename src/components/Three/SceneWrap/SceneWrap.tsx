import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { Color, Vector3 } from "three";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { useTheme } from "next-themes";
// store
import { headerHeightState } from "@store/slices/changeComponentSize";

// models
import { NEXTUIVars } from "@models/nextUIVars.model";
import { Leva } from "leva";
import Loader from "@components/Loader/Loader";

export interface ISceneWrap {
  children: ReactNode;
  cameraPosition?: Vector3;
}

const SceneWrap = ({
  children,
  cameraPosition = new Vector3(0, 0, 0),
}: ISceneWrap) => {
  const headerHeight = useSelector(headerHeightState);
  const { theme } = useTheme();
  const threeColorBack = new Color("#151515");
  const [backColor, setBackColor] = useState<Color>(threeColorBack);

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
      <Suspense fallback={<Loader />}>
        <Leva />
        <div style={{ height: `calc(100vh - ${headerHeight}px)` }}>
          <Canvas
            shadows
            gl={{ preserveDrawingBuffer: true }}
            className="touch-none"
            camera={{ fov: 75, position: cameraPosition }}
          >
            <color attach="background" args={[backColor]} />
            {children}
          </Canvas>
        </div>
      </Suspense>
    </>
  );
};

export default SceneWrap;
