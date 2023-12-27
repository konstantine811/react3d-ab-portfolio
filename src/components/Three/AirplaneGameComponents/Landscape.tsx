import { useGLTF } from "@react-three/drei";

const Landscape = () => {
  const { nodes, materials } = useGLTF(
    "/3dmodels/airPlaneGame/scene.glb"
  ) as any;
  return (
    <group dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.landscape_gltf.geometry}
        material={materials["Material.009"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.landscape_borders.geometry}
        material={materials["Material.010"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.trees_light.geometry}
        material={materials["Material.008"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.lights.geometry}
        material={materials["Material.001"]}
      />
    </group>
  );
};

useGLTF.preload("/3dmodels/airPlaneGame/scene.glb");

export default Landscape;
