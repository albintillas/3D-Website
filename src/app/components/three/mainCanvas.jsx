"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { MainScene } from "./mainScene";
import { Sky } from "./sceneSky";
import { ScrollContainer } from "./scrollContainer";

export function MainCanvas() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 55, ref: "camera" }}
      >
        <Environment files="/images/hdripic.jpg" />
        <ScrollContainer />
        {/*<OrbitControls />  Orbit around with mouse  */}
        <Sky />
      </Canvas>
    </div>
  );
}
