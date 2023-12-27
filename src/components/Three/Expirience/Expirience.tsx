import { OrbitControls } from "@react-three/drei";
import { ReactNode } from "react";

export interface IExpirience {
  children: ReactNode;
}

const Expirience = ({ children }: IExpirience) => {
  return (
    <>
      {/*  <TransformControls mode="translate">
        <mesh receiveShadow castShadow>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </TransformControls>
       */}
      {/* <fog attach="fog" color={bgColor} near={-4} far={30} /> */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <OrbitControls makeDefault />
      {children}
    </>
  );
};

export default Expirience;
