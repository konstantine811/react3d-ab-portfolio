import { Gltf } from "@react-three/drei";
import { Vector3 } from "three";
// components
import Expirience from "@components/Three/Expirience/Expirience";
import SceneWrap from "@components/Three/SceneWrap/SceneWrap";

const FirstThreeScenes = () => {
  return (
    <>
      <SceneWrap cameraPosition={new Vector3(-100, 145, 220)}>
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
