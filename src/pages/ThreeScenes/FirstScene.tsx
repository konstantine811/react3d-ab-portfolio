import { useSelector } from "react-redux";
import Expirience from "@components/Three/Expirience/Expirience";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
// store
import { headerHeightState } from "@store/slices/changeComponentSize";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
// models
import { NEXTUIVars } from "@models/nextUIVars.model";

const FirstThreeScenes = () => {
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
      <div style={{ height: `calc(100vh - ${headerHeight}px)` }}>
        <Canvas className="touch-none">
          <color attach="background" args={[backColor]} />
          <Expirience />
        </Canvas>
      </div>
    </>
  );
};

export default FirstThreeScenes;
