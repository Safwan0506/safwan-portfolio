"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useMemo, useState, useCallback } from "react";
import * as THREE from "three";

interface NeuralNode {
  id: string;
  label: string;
  position: [number, number, number];
  color: string;
  section: string;
}

const NODES: NeuralNode[] = [
  { id: "core", label: "SD", position: [0, 0, 0], color: "#7c6aff", section: "#accueil" },
  { id: "projects", label: "Projets", position: [2.8, 1.2, 0.5], color: "#e040fb", section: "#projets" },
  { id: "skills", label: "Skills", position: [-2.5, 1.5, -0.5], color: "#00e5ff", section: "#competences" },
  { id: "about", label: "Parcours", position: [-2.2, -1.5, 0.8], color: "#7c6aff", section: "#apropos" },
  { id: "contact", label: "Contact", position: [2.5, -1.3, -0.3], color: "#ff6b6b", section: "#contact" },
  { id: "ia", label: "IA", position: [0, 2.8, -0.5], color: "#ffd93d", section: "#competences" },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 4], [2, 3], [2, 5], [1, 5], [3, 4],
];

function Neuron({
  node,
  isCore,
  hovered,
  onHover,
  onUnhover,
  onClick,
}: {
  node: NeuralNode;
  isCore: boolean;
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
      const s = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
    if (glowRef.current) {
      const glowScale = isCore ? 2.5 + Math.sin(t * 2) * 0.3 : hovered ? 2.2 : 1.8;
      glowRef.current.scale.set(glowScale, glowScale, glowScale);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        isCore ? 0.12 + Math.sin(t * 2) * 0.04 : hovered ? 0.12 : 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * (isCore ? 0.5 : 0.3);
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
    }
  });

  const size = isCore ? 0.35 : 0.18;

  return (
    <group position={node.position}>
      <Float speed={isCore ? 1.5 : 2.5} rotationIntensity={0.1} floatIntensity={isCore ? 0.3 : 0.5}>
        {/* Glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.05} />
        </mesh>

        {/* Main sphere */}
        <mesh
          ref={meshRef}
          onPointerEnter={(e) => { e.stopPropagation(); onHover(); }}
          onPointerLeave={onUnhover}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered ? 1.5 : isCore ? 0.8 : 0.4}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Orbital ring */}
        {isCore && (
          <mesh ref={ringRef}>
            <torusGeometry args={[0.6, 0.008, 16, 64]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.4}
            />
          </mesh>
        )}

        {/* Pulse ring on hover */}
        {hovered && !isCore && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.35, 0.005, 16, 64]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1}
              transparent
              opacity={0.5}
            />
          </mesh>
        )}
      </Float>
    </group>
  );
}

function SynapseParticles({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 6;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      arr[i * 3] = start[0] + (end[0] - start[0]) * t;
      arr[i * 3 + 1] = start[1] + (end[1] - start[1]) * t;
      arr[i * 3 + 2] = start[2] + (end[2] - start[2]) * t;
    }
    return arr;
  }, [start, end, count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const progress = ((i / count) + t * 0.3) % 1;
      pos.setX(i, start[0] + (end[0] - start[0]) * progress);
      pos.setY(i, start[1] + (end[1] - start[1]) * progress);
      pos.setZ(i, start[2] + (end[2] - start[2]) * progress);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.03}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function ConnectionLine({ start, end, color, active }: { start: [number, number, number]; end: [number, number, number]; color: string; active: boolean }) {
  const ref = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const mid: [number, number, number] = [
      (start[0] + end[0]) / 2 + (start[0] > end[0] ? 0.3 : -0.3),
      (start[1] + end[1]) / 2 + (start[1] > end[1] ? 0.2 : -0.2),
      (start[2] + end[2]) / 2,
    ];
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(...mid),
      new THREE.Vector3(...end)
    );
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
  }, [start, end]);

  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.08 }),
    [color]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    (ref.current.material as THREE.LineBasicMaterial).opacity = active
      ? 0.5 + Math.sin(t * 3) * 0.2
      : 0.08 + Math.sin(t) * 0.03;
  });

  return (
    <group>
      <primitive ref={ref} object={new THREE.Line(geometry, material)} />
      {active && <SynapseParticles start={start} end={end} color={color} />}
    </group>
  );
}

function Connections({ hoveredId }: { hoveredId: string | null }) {
  return (
    <group>
      {CONNECTIONS.map(([a, b], i) => {
        const isActive = hoveredId === NODES[a].id || hoveredId === NODES[b].id;
        return (
          <ConnectionLine
            key={i}
            start={NODES[a].position}
            end={NODES[b].position}
            color={isActive ? NODES[a].color : "#7c6aff"}
            active={isActive}
          />
        );
      })}
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.01) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7c6aff"
        size={0.015}
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

function Scene({ onNodeClick }: { onNodeClick: (section: string) => void }) {
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
      <ambientLight intensity={0.15} />
      <pointLight position={[8, 8, 8]} intensity={0.8} color="#7c6aff" />
      <pointLight position={[-8, -5, -5]} intensity={0.5} color="#e040fb" />
      <pointLight position={[0, 5, -8]} intensity={0.3} color="#00e5ff" />

      <Connections hoveredId={hoveredId} />

      {NODES.map((node) => (
        <Neuron
          key={node.id}
          node={node}
          isCore={node.id === "core"}
          hovered={hoveredId === node.id}
          onHover={() => handleHover(node.id)}
          onUnhover={handleUnhover}
          onClick={() => onNodeClick(node.section)}
        />
      ))}

      <FloatingParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </>
  );
}

export default function NeuralNetwork({ onNavigate }: { onNavigate: (section: string) => void }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene onNodeClick={onNavigate} />
        </Suspense>
      </Canvas>
    </div>
  );
}
