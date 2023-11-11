import { PresentationControls } from "@react-three/drei";

const Expirience = () => {
  return (
    <>
      <PresentationControls
        speed={1.5}
        global
        zoom={0.7}
        polar={[-0.1, Math.PI / 4]}
      >
        <mesh>
          <boxGeometry></boxGeometry>
          <meshNormalMaterial></meshNormalMaterial>
        </mesh>
      </PresentationControls>
    </>
  );
};

export default Expirience;
