"use client";
import HeaderContent from './TigerContent';
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Mesh } from "three";

// Model component for the seated lion
function SeatedLion({ color, position }: { color: string; position: [number, number, number] }) {
  const { scene } = useGLTF("/3dModels/lion.glb");
  const ref = useRef<Mesh>(null);

  // Rotate the model slowly
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
    }
  });

  // Set the color of the model
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.color.set(color);
      }
    });
  }, [scene, color]);

  // Render the 3D model
  return <primitive ref={ref} object={scene} scale={[0.02, 0.02, 0.02]} position={position} />;
}

// Main component
export default function ZeroLimitPage() {
  const [cameraPosition] = useState([15, 5, 20]); // Original camera position, no changes

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <Canvas className="w-full h-full">
        {/* Use the original camera position */}
        <PerspectiveCamera makeDefault position={[cameraPosition[0],cameraPosition[1],cameraPosition[2]]} fov={50} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        {/* Two lions positioned lower and further apart */}
        <SeatedLion color="#FFD700" position={[-1.5, -1.5, 0]} /> {/* Golden lion */}
        <SeatedLion color="#C0C0C0" position={[1.5, -1.5, 0]} /> {/* Silver lion */}

        <Environment preset="city" background />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <HeaderContent/>
    </div>
  );
}

// Preload the 3D model to improve performance
useGLTF.preload("/3dModels/lion.glb");
