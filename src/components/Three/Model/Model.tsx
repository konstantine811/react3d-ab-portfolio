import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Clone, useGLTF } from "@react-three/drei";

const Model = () => {
  // simple model loader
  /* const model = useLoader(GLTFLoader, "/3dmodels/from_simon/hamburger.glb"); */
  // hamburger draco loader example
  /*  const model = useLoader(
    GLTFLoader,
    "/3dmodels/from_simon/hamburger-draco.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/3dmodels/from_simon/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  ); */
  /* const model = useLoader(
    GLTFLoader,
    "/3dmodels/from_simon/FlightHelmet/gltf/FlightHelmet.gltf",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/3dmodels/from_simon/draco/");
      loader.setDRACOLoader(dracoLoader);
    }
  ); */
  // use drei gltf loader
  const model = useGLTF("/3dmodels/from_simon/hamburger-draco.glb");
  // console.log(model);

  return (
    <>
      {/* simple primitve */}
      {/*  <primitive object={model.scene} scale={0.35} position-y={-0.99} /> */}
      {/* for clonning */}
      <Clone object={model.scene} scale={0.35} position-x={4} />
      <Clone object={model.scene} scale={0.35} position-x={0} />
      <Clone object={model.scene} scale={0.35} position-x={-4} />
    </>
  );
};

useGLTF.preload("/3dmodels/from_simon/hamburger-draco.glb");

export default Model;
