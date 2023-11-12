import { Gltf } from "@react-three/drei";
// components
import Expirience from "@components/Three/Expirience/Expirience";
import SceneWrap from "@components/Three/SceneWrap/SceneWrap";

const FirstThreeScenes = () => {
  return (
    <>
      <SceneWrap>
        <Expirience>
          <Gltf src="/3dmodels/low_poly_farm_v2.glb" castShadow receiveShadow />
        </Expirience>
      </SceneWrap>
    </>
  );
};

export default FirstThreeScenes;
