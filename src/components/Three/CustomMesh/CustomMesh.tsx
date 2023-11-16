import { Euler, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { BufferAttribute, DoubleSide, Vector3 } from "three";

export interface ICustomMesh {
  position: Vector3;
  rotation: Euler;
  isWareframe?: boolean;
  grid: {
    width: number;
    height: number;
    sep: number;
  };
  colorOfXYZT: (
    x: number,
    y: number,
    z: number,
    t: number
  ) => {
    r: number;
    g: number;
    b: number;
  };
  zOfXYT: (x: number, y: number, t: number) => number;
  anim: {
    init: number;
    update: (t: number) => number;
  };
}

const CustomMesh = ({
  position,
  isWareframe = false,
  rotation,
  grid: { height, width, sep },
  colorOfXYZT,
  zOfXYT,
  anim: { init, update },
}: ICustomMesh) => {
  let t = init; // time
  const posRef = useRef<BufferAttribute>(null),
    colorRef = useRef<BufferAttribute>(null);
  // vertex buffer
  let { positions, colors, normals } = useMemo(() => {
    let positions = [],
      colors = [],
      normals = [];

    for (let yi = 0; yi < height; yi++) {
      for (let xi = 0; xi < width; xi++) {
        let x = sep * (xi - (width - 1) / 2);
        let y = sep * (yi - (height + 1) / 2);
        let z = zOfXYT(x, y, t);
        positions.push(x, y, z);
        let color = colorOfXYZT(x, y, z, t);
        colors.push(color.r, color.g, color.b);
        normals.push(0, 0, 1);
      }
    }
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      normals: new Float32Array(normals),
    };
  }, [width, height, sep, zOfXYT, colorOfXYZT, t]);

  // index buffer

  let indices = useMemo(() => {
    let indices = [];
    let i = 0;
    for (let yi = 0; yi < height - 1; yi++) {
      for (let xi = 0; xi < width - 1; xi++) {
        indices.push(i, i + 1, i + width + 1); // bottom right triangle
        indices.push(i + width + 1, i + width, i); // top left triangle
        i++;
      }
      i++;
    }
    return new Uint16Array(indices);
  }, [width, height]);

  useFrame(() => {
    if (posRef.current && colorRef.current) {
      t = update(t);
      const positions = posRef.current.array,
        colors = colorRef.current.array;
      let i = 0;
      if (positions && positions.length && colors && colors.length) {
        for (let yi = 0; yi < height; yi++) {
          for (let xi = 0; xi < width; xi++) {
            positions[i + 2] = zOfXYT(positions[i], positions[i + 1], t);
            let c = colorOfXYZT(
              positions[i],
              positions[i + 1],
              positions[i + 2],
              t
            );
            colors[i] = c.r;
            colors[i + 1] = c.g;
            colors[i + 2] = c.b;
            i += 3;
          }
        }
      }
      posRef.current.needsUpdate = true;
      colorRef.current.needsUpdate = true;
    }
  });
  return (
    <>
      <mesh position={position} rotation={rotation}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            ref={posRef}
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            ref={colorRef}
            attach="attributes-color"
            array={colors}
            count={colors.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-normal"
            array={normals}
            count={normals.length / 3}
            itemSize={3}
          />
          <bufferAttribute
            attach="index"
            array={indices}
            count={indices.length}
            itemSize={1}
          />
        </bufferGeometry>
        <meshStandardMaterial
          vertexColors
          side={DoubleSide}
          wireframe={isWareframe}
        />
      </mesh>
    </>
  );
};

export default CustomMesh;
