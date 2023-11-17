import { Gltf } from "@react-three/drei";
import { useDispatch } from "react-redux";
import { Vector3 } from "three";
// components
import Expirience from "@components/Three/Expirience/Expirience";
import SceneWrap from "@components/Three/SceneWrap/SceneWrap";
// storage
import { onChangeCameraPosition } from "@store/slices/changeThreeScene";

const FirstThreeScenes = () => {
  const dispatch = useDispatch();
  dispatch(onChangeCameraPosition(new Vector3(-100, 145, 220)));

  return (
    <>
      <SceneWrap>
        <Expirience>
          <Gltf
            scale={[0.1, 0.1, 0.1]}
            src="/3dmodels/low_poly_ufo_scene.glb"
            castShadow
            receiveShadow
          />
        </Expirience>
      </SceneWrap>
    </>
  );
};

export default FirstThreeScenes;
