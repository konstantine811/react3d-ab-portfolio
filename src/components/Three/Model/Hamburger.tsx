import { useGLTF } from "@react-three/drei";
// models
import { GLTFResult } from "@models/three-models/loader.model";

const Hamburger = () => {
  // use gltf pmnd(react-fiber) loader
  const { nodes, materials } = useGLTF(
    "/3dmodels/from_simon/hamburger-draco.glb"
  ) as GLTFResult;
  return (
    <>
      {/* use react-fiber loder for seperate 3d modl on the several chuck */}
      <group scale={0.35} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bottomBun.geometry}
          material={materials.BunMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.meat.geometry}
          material={materials.SteakMaterial}
          position={[0, 2.817, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cheese.geometry}
          material={materials.CheeseMaterial}
          position={[0, 3.04, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.topBun.geometry}
          material={materials.BunMaterial}
          position={[0, 1.771, 0]}
        />
      </group>
    </>
  );
};

export default Hamburger;
