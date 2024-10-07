"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Mesh } from "three";

// Model component for the seated lion
function SeatedLion({ color, position }: { color: string, position: [number, number, number] }) {
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
  const [cameraPosition, setCameraPosition] = useState([15, 5, 20]); // Default camera position

  useEffect(() => {
    const updateCameraPosition = () => {
      // Adjust the x-axis and overall position for mobile screens
      setCameraPosition(window.innerWidth < 768 ? [20, 2, 10] : [15, 5, 20]);
    };

    updateCameraPosition(); // Initial check

    // Update position on resize
    window.addEventListener("resize", updateCameraPosition);
    return () => window.removeEventListener("resize", updateCameraPosition); // Clean up
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <Canvas className="w-full h-full">
        {/* Use the state for camera position */}
        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        {/* Two lions positioned lower and further apart */}
        <SeatedLion color="#FFD700" position={[-1.5, -1.5, 0]} /> {/* Golden lion */}
        <SeatedLion color="#C0C0C0" position={[1.5, -1.5, 0]} /> {/* Silver lion */}

        <Environment preset="city" background />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 text-shadow-lg">
          Zero Limit
        </h1>
        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl max-w-sm sm:max-w-md md:max-w-lg lg:max-w-4xl text-center text-shadow">
          Unleash your wild side with Zero Limit Clothing. Embrace your strength and style with our unique collections designed for those who dare to stand out.
        </p>
      </div>
    </div>
  );
}

// Preload the 3D model to improve performance
useGLTF.preload("/3dModels/lion.glb");
