import React from "react";
import { useGLTF } from "@react-three/drei";

export function Ferrari(props) {
  const { nodes, materials } = useGLTF("models/ferrari.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01} position={[4, 0, 0]}>
        <mesh geometry={nodes.Mesh.geometry} material={materials.Mat} />
        <mesh geometry={nodes.Mesh_1.geometry} material={materials.Mirrors} />
        <mesh geometry={nodes.Mesh_2.geometry} material={materials.Fillers} />
      </group>
    </group>
  );
}

useGLTF.preload("models/ferrari.glb");
