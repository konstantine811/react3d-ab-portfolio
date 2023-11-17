import { TransformControls } from "@react-three/drei";
import { useControls } from "leva";
import { useDispatch } from "react-redux";
import { Vector3 } from "three";
// components
import Expirience from "@components/Three/Expirience/Expirience";
import SceneWrap from "@components/Three/SceneWrap/SceneWrap";
import AnimatedCustomMesh from "@components/Three/CustomMesh/AnimatedCustomMesh";
// storage
import { onChangeCameraPosition } from "@store/slices/changeThreeScene";

const SecondThreeScenes = () => {
  const { isWireframe } = useControls("is wireframe", { isWireframe: true });
  const dispatch = useDispatch();
  dispatch(onChangeCameraPosition(new Vector3(-1, 5, 10)));
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
