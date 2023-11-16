import { TransformControls } from "@react-three/drei";
import { Leva, useControls } from "leva";
// components
import Expirience from "@components/Three/Expirience/Expirience";
import SceneWrap from "@components/Three/SceneWrap/SceneWrap";
import AnimatedCustomMesh from "@components/Three/CustomMesh/AnimatedCustomMesh";

const SecondThreeScenes = () => {
  const { isWireframe } = useControls("is wireframe", { isWireframe: true });
  return (
    <>
      <SceneWrap>
        <Expirience>
          <TransformControls mode="translate">
            <mesh receiveShadow castShadow>
              <boxGeometry />
              <meshNormalMaterial />
            </mesh>
          </TransformControls>
          <AnimatedCustomMesh isWireframe={isWireframe} />
        </Expirience>
      </SceneWrap>
    </>
  );
};

export default SecondThreeScenes;
