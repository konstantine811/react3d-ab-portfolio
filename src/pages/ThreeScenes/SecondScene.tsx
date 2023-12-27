import { TransformControls } from "@react-three/drei";
import { useControls } from "leva";
import { Vector3 } from "three";
// components
import Expirience from "@components/Three/Expirience/Expirience";
import SceneWrap from "@components/Three/SceneWrap/SceneWrap";
import AnimatedCustomMesh from "@components/Three/CustomMesh/AnimatedCustomMesh";

const SecondThreeScenes = () => {
  const { isWireframe } = useControls("is wireframe", { isWireframe: true });
  return (
    <>
      <SceneWrap cameraPosition={new Vector3(-1, 5, 10)}>
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
