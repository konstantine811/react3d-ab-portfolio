import {
  Float,
  MeshReflectorMaterial,
  PresentationControls,
  Stage,
} from "@react-three/drei";
import { Color } from "three";

const Expirience = () => {
  return (
    <>
      <PresentationControls
        speed={3.5}
        global
        zoom={0.7}
        polar={[-0.1, Math.PI / 2]}
      >
        <Stage
          environment={"forest"}
          adjustCamera={2}
          intensity={0.6}
          shadows={{ opacity: 0, type: "accumulative" }}
        >
          <Float
            speed={1}
            rotationIntensity={1}
            floatIntensity={1}
            floatingRange={[0, 1]}
          >
            <mesh>
              <boxGeometry />
              <meshNormalMaterial></meshNormalMaterial>
            </mesh>
          </Float>
        </Stage>
        <mesh position={[0, -0.501, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[170, 170]} />
          <MeshReflectorMaterial
            color={new Color("#101010")}
            mirror={1}
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            metalness={0.5}
          />
        </mesh>
      </PresentationControls>
    </>
  );
};

export default Expirience;
