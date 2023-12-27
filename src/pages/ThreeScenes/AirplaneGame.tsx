import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useSelector } from "react-redux";
// storage
import { headerHeightState } from "@store/slices/changeComponentSize";
// components
import SphereEnv from "@components/Three/AirplaneGameComponents/SphereEnv";
import Landscape from "@components/Three/AirplaneGameComponents/Landscape";

const AirplaneGame = () => {
  const headerHeight = useSelector(headerHeightState);
  return (
    <div style={{ height: `calc(100vh - ${headerHeight}px)` }}>
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true }}
        className="touch-none"
      >
        <SphereEnv />
        <Environment background={false} files={"/textures/envmap.hdr"} />
        <PerspectiveCamera makeDefault position={[0, 10, 10]} />
        <OrbitControls target={[0, 0, 0]} />
        <Landscape />
        <directionalLight
          castShadow
          color={"#f3d29a"}
          intensity={2}
          position={[10, 5, 4]}
          shadow-bias={-0.0005}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.01}
          shadow-camera-far={20}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-camera-left={-6.2}
          shadow-camera-right={-6.4}
        />
      </Canvas>
    </div>
  );
};

export default AirplaneGame;
