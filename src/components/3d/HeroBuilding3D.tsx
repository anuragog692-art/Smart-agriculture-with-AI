import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Html } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Skyscraper Component
const SkyscraperMesh = ({ isWireframe, showScanner }: { isWireframe: boolean; showScanner: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);

  // Animate building rotation and laser scanner pulse
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (scannerRef.current && showScanner) {
      scannerRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 4 + 2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Central High-Tech Skyscraper Tower */}
      {/* Base Podium */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[4, 0.8, 4]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.2}
          wireframe={isWireframe}
          emissive="#00f0ff"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Main Glass Tower Tier 1 */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[3, 3.4, 3]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.1}
          wireframe={isWireframe}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Main Glass Tower Tier 2 */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial
          color="#00f0ff"
          metalness={0.9}
          roughness={0.1}
          wireframe={isWireframe}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Top Spire Tier */}
      <mesh position={[0, 7, 0]}>
        <coneGeometry args={[1.2, 2.2, 4]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.9}
          roughness={0.1}
          wireframe={isWireframe}
        />
      </mesh>

      {/* Crown Antenna */}
      <mesh position={[0, 8.8, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1.8, 16]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={1} />
      </mesh>

      {/* Architectural Column Ribs */}
      {[ -1.5, 1.5 ].map((x, i) => (
        [ -1.5, 1.5 ].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, 2.5, z]}>
            <cylinderGeometry args={[0.08, 0.08, 3.4, 12]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} />
          </mesh>
        ))
      ))}

      {/* Floating Floor Slabs */}
      {Array.from({ length: 8 }).map((_, idx) => (
        <mesh key={idx} position={[0, 0.9 + idx * 0.7, 0]}>
          <boxGeometry args={[3.1, 0.05, 3.1]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Animated Scanning Laser Ring */}
      {showScanner && (
        <mesh ref={scannerRef} position={[0, 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.4, 64]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Interactive Spatial Measurement HTML Badges */}
      <Html position={[2.2, 4, 0]} distanceFactor={10} zIndexRange={[100, 0]}>
        <div className="bg-slate-900/90 border border-cyan-400/50 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-cyan-300 font-mono shadow-lg whitespace-nowrap flex items-center gap-1.5 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span>HEIGHT: 128.5m</span>
        </div>
      </Html>

      <Html position={[-2.2, 1.5, 1.5]} distanceFactor={10} zIndexRange={[100, 0]}>
        <div className="bg-slate-900/90 border border-purple-400/50 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-purple-300 font-mono shadow-lg whitespace-nowrap flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          <span>BIM SYNC: 99.8%</span>
        </div>
      </Html>

      <Html position={[0, 7.8, -1.5]} distanceFactor={10} zIndexRange={[100, 0]}>
        <div className="bg-slate-900/90 border border-emerald-400/50 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-emerald-300 font-mono shadow-lg whitespace-nowrap flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>AI STRUCTURAL OPTIMAL</span>
        </div>
      </Html>
    </group>
  );
};

// Ground Blueprint Grid
const GroundGrid = () => {
  return (
    <gridHelper
      args={[30, 30, '#00f0ff', '#1e293b']}
      position={[0, -2.1, 0]}
    />
  );
};

// Particle Starfield Backdrop
const FloatingParticles = () => {
  const count = 100;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 12 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  });

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00f0ff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export interface HeroBuilding3DProps {
  isWireframe?: boolean;
  showScanner?: boolean;
}

export const HeroBuilding3D: React.FC<HeroBuilding3DProps> = ({
  isWireframe = false,
  showScanner = true,
}) => {
  return (
    <div className="relative w-full h-[520px] md:h-[640px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/30">
      {/* HUD overlay elements */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs text-cyan-400 font-mono">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>AI 3D ENGINE ACTIVE — REALTIME BIM</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-right bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-[11px] text-slate-400 font-mono">
        <div>DRAG TO ROTATE 3D MODEL</div>
        <div className="text-cyan-400">SCROLL TO ZOOM</div>
      </div>

      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[9, 6, 11]} fov={45} />
        <OrbitControls
          enableZoom={true}
          maxDistance={22}
          minDistance={5}
          maxPolarAngle={Math.PI / 2 + 0.05}
          autoRotate={false}
        />

        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 15, 10]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-8, 6, -8]} intensity={1.5} color="#a855f7" />
        <pointLight position={[8, 2, 8]} intensity={1.8} color="#00f0ff" />

        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <SkyscraperMesh isWireframe={isWireframe} showScanner={showScanner} />
        </Float>

        <GroundGrid />
        <FloatingParticles />
      </Canvas>
    </div>
  );
};

export default HeroBuilding3D;
