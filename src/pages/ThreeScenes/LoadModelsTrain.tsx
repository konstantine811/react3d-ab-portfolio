import { Perf } from "r3f-perf";
import { useSelector } from "react-redux";
import { Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
// storage
import { headerHeightState } from "@store/slices/changeComponentSize";

// components
import SceneWrap from "@components/Three/SceneWrap/SceneWrap";
import Placeholder from "@components/Three/Placeholder/Placeholder";
import Hamburger from "../../components/Three/Model/Hamburger";

const LoadModelsTrain = () => {
  const headerHeight = useSelector(headerHeightState);

  return (
    <>
      <SceneWrap cameraPosition={new Vector3(-1, 5, 10)}>
        <Perf style={{ top: headerHeight }} />
        <OrbitControls makeDefault />
        {/*  shadow-normalBias={0.04} for fix shadow when we are imported 3d model by react-fiber */}
        <directionalLight
          castShadow
          position={[1, 2, 3]}
          intensity={1.5}
          shadow-normalBias={0.04}
        />
        <ambientLight intensity={0.5} />

        <mesh
          receiveShadow
          position-y={-1}
          rotation-x={-Math.PI * 0.5}
          scale={10}
        >
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
        <Suspense fallback={<Placeholder position-y={0.5} scale={[2, 3, 4]} />}>
          {/* <Model /> */}
          <Hamburger />
        </Suspense>
      </SceneWrap>
    </>
  );
};

export default LoadModelsTrain;
