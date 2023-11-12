import {
  Gltf,
  OrbitControls,
  TransformControls,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { val } from "@theatre/core";
import { PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";

const Expirience = () => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    if (sheet) {
      // the length of our sequence
      const sequenceLength = val(sheet.sequence.pointer.length);
      // update the "position" of the playhead in the sequence, as a fraction of its whole length
      sheet.sequence.position = scroll.offset * sequenceLength;
    }
  });

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
      <fog attach="fog" color={bgColor} near={-4} far={10} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <Gltf
        src="/3dmodels/post-apocalyptic_camp.glb"
        castShadow
        receiveShadow
      />
      {/* <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      /> */}
      <OrbitControls makeDefault />
    </>
  );
};

export default Expirience;
