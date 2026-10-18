"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import { Suspense, useRef, useMemo, useState, useCallback } from "react";
import * as THREE from "three";
import type { PageId } from "@/app/page";

interface HubNode {
  id: PageId;
  label: string;
  sublabel: string;
  position: [number, number, number];
  color: string;
  icon: string;
}

const HUB_NODES: HubNode[] = [
  { id: "accueil", label: "Accueil", sublabel: "Bienvenue", position: [0, 2.2, 0], color: "#7c6aff", icon: "SD" },
  { id: "parcours", label: "Parcours", sublabel: "A Propos & CV", position: [-2.8, 0.3, 0.5], color: "#00e5ff", icon: "CV" },
  { id: "competences", label: "Skills", sublabel: "Competences", position: [2.8, 0.3, -0.5], color: "#e040fb", icon: "SK" },
  { id: "projets", label: "Projets", sublabel: "Realisations", position: [-1.8, -2, 0.3], color: "#ffd93d", icon: "PJ" },
  { id: "contact", label: "Contact", sublabel: "Transmission", position: [1.8, -2, -0.3], color: "#ff6b6b", icon: "CT" },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 2], [2, 4], [3, 4], [1, 3],
];

function HubNeuron({
  node,
  hovered,
  onHover,
  onUnhover,
  onClick,
}: {
  node: HubNode;
  hovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      const s = hovered ? 1.25 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
    if (glowRef.current) {
      const gs = hovered ? 2.8 : 2.0;
      glowRef.current.scale.lerp(new THREE.Vector3(gs, gs, gs), 0.08);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        hovered ? 0.15 + Math.sin(t * 3) * 0.05 : 0.06;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
      const rs = hovered ? 1.3 : 1;
      ringRef.current.scale.lerp(new THREE.Vector3(rs, rs, rs), 0.08);
      (ringRef.current.material as THREE.MeshStandardMaterial).opacity = hovered ? 0.7 : 0.3;
    }
  });

  return (
    <group position={node.position}>
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.4}>
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.06} />
        </mesh>

        <mesh
          ref={meshRef}
          onPointerEnter={(e) => { e.stopPropagation(); onHover(); }}
          onPointerLeave={onUnhover}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered ? 1.5 : 0.6}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>

        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.006, 16, 64]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.3}
          />
        </mesh>

        <Text
          position={[0, -0.55, 0]}
          fontSize={0.15}
          color={hovered ? "#ffffff" : "#8a8a9e"}
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {node.label}
        </Text>
        <Text
          position={[0, -0.72, 0]}
          fontSize={0.08}
          color={node.color}
          anchorX="center"
          anchorY="middle"
          font={undefined}
        >
          {node.sublabel}
        </Text>
      </Float>
    </group>
  );
}

function SynapseTravel({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 5;
  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const progress = ((i / count) + t * 0.25) % 1;
      pos.setX(i, start[0] + (end[0] - start[0]) * progress);
      pos.setY(i, start[1] + (end[1] - start[1]) * progress);
      pos.setZ(i, start[2] + (end[2] - start[2]) * progress);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.025} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Connection({ start, end, color, active }: { start: [number, number, number]; end: [number, number, number]; color: string; active: boolean }) {
  const ref = useRef<THREE.Line>(null);
  const geometry = useMemo(() => {
    const mid: [number, number, number] = [
      (start[0] + end[0]) / 2 + (start[1] > end[1] ? 0.2 : -0.2),
      (start[1] + end[1]) / 2 + 0.15,
      (start[2] + end[2]) / 2,
    ];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start), new THREE.Vector3(...mid), new THREE.Vector3(...end)
    );
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
  }, [start, end]);

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.06 }),
    [color]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    (ref.current.material as THREE.LineBasicMaterial).opacity = active
      ? 0.5 + Math.sin(t * 3) * 0.15
      : 0.06 + Math.sin(t * 0.5) * 0.02;
  });

  return (
    <group>
      <primitive ref={ref} object={new THREE.Line(geometry, material)} />
      {active && <SynapseTravel start={start} end={end} color={color} />}
    </group>
  );
}

function OrbitalRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.08;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2.2, 0, 0]} position={[0, -2.8, 0]}>
      <torusGeometry args={[3.5, 0.008, 16, 128]} />
      <meshStandardMaterial
        color="#7c6aff"
        emissive="#7c6aff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

function BackgroundParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 150;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.015;
    ref.current.rotation.x = Math.sin(t * 0.008) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7c6aff" size={0.012} transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

function HubScene({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { gl } = useThree();

  const handleHover = useCallback((id: string) => {
    setHoveredId(id);
    gl.domElement.style.cursor = "pointer";
  }, [gl]);

  const handleUnhover = useCallback(() => {
    setHoveredId(null);
    gl.domElement.style.cursor = "default";
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.12} />
      <pointLight position={[8, 8, 8]} intensity={0.7} color="#7c6aff" />
      <pointLight position={[-8, -5, -5]} intensity={0.4} color="#e040fb" />
      <pointLight position={[0, 5, -8]} intensity={0.3} color="#00e5ff" />

      {CONNECTIONS.map(([a, b], i) => {
        const isActive = hoveredId === HUB_NODES[a].id || hoveredId === HUB_NODES[b].id;
        return (
          <Connection
            key={i}
            start={HUB_NODES[a].position}
            end={HUB_NODES[b].position}
            color={isActive ? HUB_NODES[a].color : "#7c6aff"}
            active={isActive}
          />
        );
      })}

      {HUB_NODES.map((node) => (
        <HubNeuron
          key={node.id}
          node={node}
          hovered={hoveredId === node.id}
          onHover={() => handleHover(node.id)}
          onUnhover={handleUnhover}
          onClick={() => onNavigate(node.id)}
        />
      ))}

      <OrbitalRing />
      <BackgroundParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.25}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </>
  );
}

export default function NeuralHub({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <HubScene onNavigate={onNavigate} />
        </Suspense>
      </Canvas>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 glass rounded-full px-5 py-2.5 pointer-events-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-50" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
        </span>
        <span className="text-xs text-[var(--text-muted)]">
          Cliquez sur un neurone pour explorer
        </span>
      </div>
    </div>
  );
}
