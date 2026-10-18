"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralCore() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.25;
      coreRef.current.rotation.z = t * 0.15;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = -t * 0.1;
      outerRef.current.rotation.z = t * 0.08;
    }
  });

  const particlePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < 60; i++) {
      const theta = (i / 60) * Math.PI * 2;
      const phi = Math.acos(2 * ((i + 0.5) / 60) - 1);
      const r = 1.8 + (i % 4) * 0.2;
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* Inner glowing core */}
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color="#7c6aff"
            emissive="#7c6aff"
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Distorted sphere */}
        <mesh>
          <icosahedronGeometry args={[0.7, 8]} />
          <MeshDistortMaterial
            color="#7c6aff"
            transparent
            opacity={0.15}
            distort={0.3}
            speed={2}
            roughness={0.2}
          />
        </mesh>

        {/* Wireframe icosahedron */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial
            color="#7c6aff"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Outer wireframe */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial
            color="#e040fb"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>

      {/* Orbital rings */}
      {[
        { radius: 1.7, color: "#7c6aff", rotation: [Math.PI / 3, 0, 0] as [number, number, number], opacity: 0.3 },
        { radius: 2.0, color: "#e040fb", rotation: [Math.PI / 5, 0.5, 0.3] as [number, number, number], opacity: 0.2 },
        { radius: 2.3, color: "#00e5ff", rotation: [Math.PI / 4, -0.3, 0.6] as [number, number, number], opacity: 0.15 },
        { radius: 2.6, color: "#7c6aff", rotation: [Math.PI / 6, 0.8, -0.2] as [number, number, number], opacity: 0.1 },
      ].map((ring, i) => (
        <mesh key={i} rotation={ring.rotation}>
          <torusGeometry args={[ring.radius, 0.006, 16, 128]} />
          <meshStandardMaterial
            color={ring.color}
            emissive={ring.color}
            emissiveIntensity={0.8}
            transparent
            opacity={ring.opacity}
          />
        </mesh>
      ))}

      {/* Floating particles */}
      {particlePositions.map((pos, i) => (
        <mesh key={`p-${i}`} position={pos}>
          <sphereGeometry args={[0.015 + (i % 3) * 0.008, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#7c6aff" : i % 3 === 1 ? "#e040fb" : "#00e5ff"}
            emissive={i % 3 === 0 ? "#7c6aff" : i % 3 === 1 ? "#e040fb" : "#00e5ff"}
            emissiveIntensity={3}
          />
        </mesh>
      ))}
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[8, 8, 8]} intensity={1} color="#7c6aff" />
      <pointLight position={[-8, -5, -5]} intensity={0.6} color="#e040fb" />
      <pointLight position={[0, 5, -8]} intensity={0.3} color="#00e5ff" />
    </>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Lights />
          <NeuralCore />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI * 0.75}
            minPolarAngle={Math.PI * 0.25}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
