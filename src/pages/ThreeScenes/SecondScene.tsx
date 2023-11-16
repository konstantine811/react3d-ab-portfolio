import { TransformControls } from "@react-three/drei";
import { Euler, Vector3 } from "three";
// components
import Expirience from "@components/Three/Expirience/Expirience";
import SceneWrap from "@components/Three/SceneWrap/SceneWrap";
import CustomMesh from "@components/Three/CustomMesh/CustomMesh";
// lib helpers
import noise, { perlin3 } from "@lib/three/noise";

const SecondThreeScenes = () => {
  const seed = Math.floor(Math.random() * 2 ** 16);
  noise.seed(seed);
  const sampleNoise = (x: number, y: number, z: number) => {
    let scale = 1 / 8;
    let octaves = 20;
    let persistence = 0.6;
    let lacunarity = 2;

    let amp = 1;
    let freq = 1;

    let value = 0;
    for (let i = 0; i < octaves; i++) {
      value += amp * perlin3(x * freq * scale, y * freq * scale, z);
      amp *= persistence;
      freq *= lacunarity;
    }
    return value;
  };
  const zOfXYT = (x: number, y: number, t: number) => {
    return sampleNoise(x, y, t);
  };
  const colorOfXYZT = (x: number, y: number, z: number, t: number) => {
    return {
      r: z,
      g: z / 5,
      b: Math.sqrt(x ** 2 + y ** 2) / 75,
    };
  };
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
          <CustomMesh
            position={new Vector3(0, 0, 0)}
            rotation={new Euler(-Math.PI / 2, 0, 0)}
            grid={{ height: 100, width: 100, sep: 0.2 }}
            zOfXYT={zOfXYT}
            colorOfXYZT={colorOfXYZT}
            anim={{
              init: 0,
              update: (t) => t + 0.002,
            }}
          />
        </Expirience>
      </SceneWrap>
    </>
  );
};

export default SecondThreeScenes;
