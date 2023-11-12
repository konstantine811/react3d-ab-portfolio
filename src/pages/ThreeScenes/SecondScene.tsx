import { Gltf, TransformControls } from "@react-three/drei";
// components
import Expirience from "@components/Three/Expirience/Expirience";
import SceneWrap from "@components/Three/SceneWrap/SceneWrap";

const SecondThreeScenes = () => {
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
        </Expirience>
      </SceneWrap>
    </>
  );
};

export default SecondThreeScenes;
