"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/* Stylized low-poly sports car built from primitives */
function SportsCar() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // gentle floating + slow rotation
    group.current.rotation.y = Math.sin(t * 0.25) * 0.35 + 0.4;
    group.current.position.y = Math.sin(t * 0.8) * 0.05;
  });

  return (
    <group ref={group} dispose={null}>
      {/* Lower body chassis */}
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[3.6, 0.5, 1.5]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Beveled side accent (lime neon) */}
      <mesh position={[0, 0.35, 0.76]}>
        <boxGeometry args={[3.5, 0.08, 0.02]} />
        <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.35, -0.76]}>
        <boxGeometry args={[3.5, 0.08, 0.02]} />
        <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      {/* Cabin / roof - tapered */}
      <mesh castShadow position={[-0.15, 0.85, 0]}>
        <boxGeometry args={[1.7, 0.55, 1.35]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Windshield glass (cyan tint, emissive) */}
      <mesh position={[0.78, 0.86, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.05, 0.6, 1.25]} />
        <meshStandardMaterial color="#00a8ff" emissive="#00a8ff" emissiveIntensity={1.2} transparent opacity={0.55} metalness={0.4} roughness={0.1} toneMapped={false} />
      </mesh>
      {/* Rear glass */}
      <mesh position={[-1.05, 0.86, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.05, 0.55, 1.25]} />
        <meshStandardMaterial color="#00a8ff" emissive="#00a8ff" emissiveIntensity={1.0} transparent opacity={0.5} metalness={0.4} roughness={0.1} toneMapped={false} />
      </mesh>
      {/* Hood nose taper */}
      <mesh castShadow position={[1.55, 0.5, 0]} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.9, 0.32, 1.45]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Rear taper */}
      <mesh castShadow position={[-1.7, 0.5, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.8, 0.32, 1.45]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.25} />
      </mesh>
      {/* Headlights (cyan) */}
      <mesh position={[2.02, 0.5, 0.5]}>
        <boxGeometry args={[0.06, 0.14, 0.3]} />
        <meshStandardMaterial color="#ffffff" emissive="#00a8ff" emissiveIntensity={4} toneMapped={false} />
      </mesh>
      <mesh position={[2.02, 0.5, -0.5]}>
        <boxGeometry args={[0.06, 0.14, 0.3]} />
        <meshStandardMaterial color="#ffffff" emissive="#00a8ff" emissiveIntensity={4} toneMapped={false} />
      </mesh>
      {/* Tail lights (red) */}
      <mesh position={[-2.12, 0.5, 0.5]}>
        <boxGeometry args={[0.05, 0.12, 0.35]} />
        <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh position={[-2.12, 0.5, -0.5]}>
        <boxGeometry args={[0.05, 0.12, 0.35]} />
        <meshStandardMaterial color="#ff3b30" emissive="#ff3b30" emissiveIntensity={3} toneMapped={false} />
      </mesh>

      {/* Wheels - 4 cylinders */}
      {[
        [1.2, 0.05, 0.78],
        [1.2, 0.05, -0.78],
        [-1.2, 0.05, 0.78],
        [-1.2, 0.05, -0.78],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.28, 24]} />
            <meshStandardMaterial color="#050505" metalness={0.6} roughness={0.5} />
          </mesh>
          {/* rim accent */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.02, 16]} />
            <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={1.5} metalness={0.8} roughness={0.2} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Underglow plane */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 1.8]} />
        <meshBasicMaterial color="#d4ff00" transparent opacity={0.18} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* Animated neon grid floor */
function NeonGrid() {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const mat = ref.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.35 + Math.sin(t * 1.5) * 0.1;
  });
  return (
    <gridHelper
      ref={ref}
      args={[40, 40, "#d4ff00", "#0a3a4a"]}
      position={[0, -0.6, 0]}
    >
      <lineBasicMaterial transparent opacity={0.35} />
    </gridHelper>
  );
}

/* Floating neon rings around the car */
function NeonRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.3;
      ring1.current.rotation.x = Math.PI / 2.2;
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.2;
      ring2.current.rotation.x = Math.PI / 2.2;
    }
  });
  return (
    <>
      <mesh ref={ring1} position={[0, 0.5, 0]}>
        <torusGeometry args={[3.4, 0.02, 16, 80]} />
        <meshStandardMaterial color="#d4ff00" emissive="#d4ff00" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh ref={ring2} position={[0, 0.5, 0]}>
        <torusGeometry args={[4.2, 0.015, 16, 80]} />
        <meshStandardMaterial color="#00a8ff" emissive="#00a8ff" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </>
  );
}

/* Floating geometric particles */
function FloatingShapes() {
  const shapes = useMemo(() => {
    const colors = ["#d4ff00", "#00a8ff", "#ff3b30", "#007aff"];
    return Array.from({ length: 14 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        Math.random() * 4 + 0.5,
        (Math.random() - 0.5) * 8,
      ] as [number, number, number],
      color: colors[i % colors.length],
      scale: Math.random() * 0.15 + 0.05,
      speed: Math.random() * 0.5 + 0.3,
      type: i % 3,
    }));
  }, []);

  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed * 2} rotationIntensity={1.5} floatIntensity={1.5}>
          <mesh position={s.position} scale={s.scale}>
            {s.type === 0 && <octahedronGeometry args={[1]} />}
            {s.type === 1 && <icosahedronGeometry args={[1]} />}
            {s.type === 2 && <tetrahedronGeometry args={[1]} />}
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={1.5}
              metalness={0.7}
              roughness={0.3}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

export function ThreeScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [5, 2.5, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.35} />
        <spotLight position={[6, 8, 4]} angle={0.4} penumbra={0.8} intensity={3} color="#d4ff00" castShadow />
        <spotLight position={[-6, 6, -4]} angle={0.4} penumbra={0.8} intensity={2.5} color="#00a8ff" />
        <pointLight position={[0, 3, 6]} intensity={2} color="#ff3b30" />
        <pointLight position={[0, 1, -4]} intensity={1.5} color="#007aff" />

        <group position={[0, -0.3, 0]}>
          <SportsCar />
          <NeonRings />
          <NeonGrid />
          <FloatingShapes />
          <Sparkles count={60} scale={10} size={3} speed={0.4} color="#d4ff00" opacity={0.7} />
          <Sparkles count={40} scale={8} size={2} speed={0.3} color="#00a8ff" opacity={0.6} />
          <ContactShadows position={[0, -0.59, 0]} opacity={0.6} scale={12} blur={2.5} far={4} color="#000000" />
        </group>

        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}

export default ThreeScene;
