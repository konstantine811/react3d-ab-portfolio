import { Gltf, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { val } from "@theatre/core";

const Expirience = () => {
  const bgColor = "#84a4f4";
  return (
    <>
      {/*  <TransformControls mode="translate">
        <mesh receiveShadow castShadow>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </TransformControls>
       */}
      <fog attach="fog" color={bgColor} near={-4} far={30} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <Gltf src="/3dmodels/low_poly_farm_v2.glb" castShadow receiveShadow />

      <OrbitControls makeDefault />
    </>
  );
};

export default Expirience;
