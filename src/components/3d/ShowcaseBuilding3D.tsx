import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

export type BuildingStyle = 'villa' | 'tower' | 'commercial' | 'structural' | 'floorplan';

interface ShowcaseBuildingProps {
  styleType: BuildingStyle;
  isWireframe: boolean;
  isExploded: boolean;
  showScanner: boolean;
}

// 1. Residential Modern Luxury Villa
const VillaModel = ({ isWireframe, isExploded }: { isWireframe: boolean; isExploded: boolean }) => {
  const explodeOffset = isExploded ? 1.2 : 0;
  return (
    <group position={[0, -1, 0]}>
      {/* Ground Foundation Slab */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.3, 5]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} wireframe={isWireframe} />
      </mesh>

      {/* Main Ground Living Floor */}
      <mesh position={[ -0.8, 0.9 + explodeOffset * 0.2, 0 ]}>
        <boxGeometry args={[3.8, 1.5, 4.2]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.85} wireframe={isWireframe} />
      </mesh>

      {/* Glass Front Wall Accent */}
      <mesh position={[0.8, 0.9 + explodeOffset * 0.2, 1.2]}>
        <boxGeometry args={[2.2, 1.4, 1.8]} />
        <meshStandardMaterial color="#00f0ff" transparent opacity={0.5} metalness={0.9} wireframe={isWireframe} />
      </mesh>

      {/* Upper Floor Cantilever */}
      <mesh position={[0.5, 2.3 + explodeOffset * 0.8, -0.2]}>
        <boxGeometry args={[4.2, 1.3, 3.8]} />
        <meshStandardMaterial color="#334155" metalness={0.7} wireframe={isWireframe} />
      </mesh>

      {/* Infinity Pool & Deck */}
      <mesh position={[ -1.8, 0.2, 1.8 ]}>
        <boxGeometry args={[2.0, 0.15, 1.5]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} />
      </mesh>

      {/* Roof Canopy */}
      <mesh position={[0.5, 3.1 + explodeOffset * 1.4, -0.2]}>
        <boxGeometry args={[4.6, 0.15, 4.2]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} wireframe={isWireframe} />
      </mesh>
    </group>
  );
};

// 2. High-Rise Tower
const TowerModel = ({ isWireframe, isExploded }: { isWireframe: boolean; isExploded: boolean }) => {
  const explodeOffset = isExploded ? 0.8 : 0;
  return (
    <group position={[0, -2, 0]}>
      {/* Base */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[2.5, 2.8, 0.6, 16]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} wireframe={isWireframe} />
      </mesh>

      {/* Tier 1 */}
      <mesh position={[0, 1.8 + explodeOffset * 0.3, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 2.4, 16]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.8} wireframe={isWireframe} />
      </mesh>

      {/* Tier 2 */}
      <mesh position={[0, 4.0 + explodeOffset * 0.9, 0]}>
        <cylinderGeometry args={[1.8, 2.1, 2.0, 16]} />
        <meshStandardMaterial color="#00f0ff" transparent opacity={0.6} wireframe={isWireframe} />
      </mesh>

      {/* Tier 3 Glass Crown */}
      <mesh position={[0, 5.8 + explodeOffset * 1.5, 0]}>
        <cylinderGeometry args={[1.4, 1.7, 1.6, 16]} />
        <meshStandardMaterial color="#a855f7" transparent opacity={0.7} wireframe={isWireframe} />
      </mesh>

      {/* Crown Spire */}
      <mesh position={[0, 7.2 + explodeOffset * 2.0, 0]}>
        <coneGeometry args={[0.8, 1.2, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#00f0ff" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
};

// 3. Commercial Hub Complex
const CommercialModel = ({ isWireframe, isExploded }: { isWireframe: boolean; isExploded: boolean }) => {
  const offset = isExploded ? 0.9 : 0;
  return (
    <group position={[0, -1, 0]}>
      {/* Main Atrium Block */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[4.5, 2, 3.5]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.85} wireframe={isWireframe} />
      </mesh>

      {/* Curved Glass Atrium Dome */}
      <mesh position={[0, 2.2 + offset * 0.8, 0]}>
        <sphereGeometry args={[1.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#00f0ff" transparent opacity={0.5} wireframe={isWireframe} />
      </mesh>

      {/* East Tower Wing */}
      <mesh position={[ -2.6 - offset * 0.6, 2, 0 ]}>
        <boxGeometry args={[1.6, 4, 2.5]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} wireframe={isWireframe} />
      </mesh>

      {/* West Tower Wing */}
      <mesh position={[ 2.6 + offset * 0.6, 2, 0 ]}>
        <boxGeometry args={[1.6, 4, 2.5]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} wireframe={isWireframe} />
      </mesh>
    </group>
  );
};

// 4. Structural Frame Skeleton
const StructuralModel = ({ isWireframe, isExploded }: { isWireframe: boolean; isExploded: boolean }) => {
  const gap = isExploded ? 0.4 : 0;
  return (
    <group position={[0, -1.8, 0]}>
      {/* Concrete Foundation Piles */}
      {Array.from({ length: 9 }).map((_, i) => {
        const x = ((i % 3) - 1) * 2;
        const z = (Math.floor(i / 3) - 1) * 2;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.8, 12]} />
              <meshStandardMaterial color="#64748b" />
            </mesh>
            {/* Columns extending upwards */}
            <mesh position={[0, 2.5 + gap * 0.5, 0]}>
              <boxGeometry args={[0.15, 4.2, 0.15]} />
              <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.4} wireframe={isWireframe} />
            </mesh>
          </group>
        );
      })}

      {/* Floor Beams Tier 1 */}
      <mesh position={[0, 1.2 + gap, 0]}>
        <boxGeometry args={[4.3, 0.12, 4.3]} />
        <meshStandardMaterial color="#a855f7" wireframe={true} />
      </mesh>

      {/* Floor Beams Tier 2 */}
      <mesh position={[0, 2.8 + gap * 2, 0]}>
        <boxGeometry args={[4.3, 0.12, 4.3]} />
        <meshStandardMaterial color="#a855f7" wireframe={true} />
      </mesh>

      {/* Floor Beams Tier 3 */}
      <mesh position={[0, 4.4 + gap * 3, 0]}>
        <boxGeometry args={[4.3, 0.12, 4.3]} />
        <meshStandardMaterial color="#a855f7" wireframe={true} />
      </mesh>
    </group>
  );
};

// 5. Interactive 3D Floor Plan Schematic
const FloorPlanModel = () => {
  return (
    <group position={[0, -0.2, 0]} rotation={[0.6, -0.4, 0]}>
      {/* Floor Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6, 0.08, 4.5]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Exterior Walls */}
      <mesh position={[0, 0.3, -2.2]}>
        <boxGeometry args={[6, 0.5, 0.1]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.3, 2.2]}>
        <boxGeometry args={[6, 0.5, 0.1]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-2.95, 0.3, 0]}>
        <boxGeometry args={[0.1, 0.5, 4.5]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[2.95, 0.3, 0]}>
        <boxGeometry args={[0.1, 0.5, 4.5]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.2} />
      </mesh>

      {/* Internal Partition Walls */}
      <mesh position={[-0.5, 0.3, -0.5]}>
        <boxGeometry args={[0.08, 0.5, 3.2]} />
        <meshStandardMaterial color="#a855f7" />
      </mesh>
      <mesh position={[1.2, 0.3, 0.5]}>
        <boxGeometry args={[3.4, 0.5, 0.08]} />
        <meshStandardMaterial color="#a855f7" />
      </mesh>

      {/* Room Labels */}
      <Html position={[-1.7, 0.6, -1]} distanceFactor={8}>
        <div className="text-[10px] bg-cyan-950/90 text-cyan-300 font-mono border border-cyan-500/40 px-2 py-0.5 rounded">
          MASTER BEDROOM (24m²)
        </div>
      </Html>
      <Html position={[1.2, 0.6, -1]} distanceFactor={8}>
        <div className="text-[10px] bg-purple-950/90 text-purple-300 font-mono border border-purple-500/40 px-2 py-0.5 rounded">
          LIVING HALL (42m²)
        </div>
      </Html>
      <Html position={[1.2, 0.6, 1.2]} distanceFactor={8}>
        <div className="text-[10px] bg-emerald-950/90 text-emerald-300 font-mono border border-emerald-500/40 px-2 py-0.5 rounded">
          AI KITCHEN & DINING (20m²)
        </div>
      </Html>
    </group>
  );
};

// Main Scene Component inside Canvas
const MainScene = ({ styleType, isWireframe, isExploded, showScanner }: ShowcaseBuildingProps) => {
  const scannerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (scannerRef.current && showScanner) {
      scannerRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 3 + 1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, 8, -10]} intensity={1.8} color="#a855f7" />
      <pointLight position={[10, 4, 10]} intensity={2} color="#00f0ff" />

      {/* Render Model based on active selection */}
      {styleType === 'villa' && <VillaModel isWireframe={isWireframe} isExploded={isExploded} />}
      {styleType === 'tower' && <TowerModel isWireframe={isWireframe} isExploded={isExploded} />}
      {styleType === 'commercial' && <CommercialModel isWireframe={isWireframe} isExploded={isExploded} />}
      {styleType === 'structural' && <StructuralModel isWireframe={isWireframe} isExploded={isExploded} />}
      {styleType === 'floorplan' && <FloorPlanModel />}

      {/* Ground Grid */}
      <gridHelper args={[24, 24, '#00f0ff', '#1e293b']} position={[0, -2.05, 0]} />

      {/* Laser Scanner Ring */}
      {showScanner && (
        <mesh ref={scannerRef} position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.0, 2.6, 64]} />
          <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      )}
    </>
  );
};

export const ShowcaseBuilding3D: React.FC<ShowcaseBuildingProps> = (props) => {
  return (
    <div className="relative w-full h-[480px] md:h-[580px] rounded-2xl overflow-hidden glass-panel border border-cyan-500/30">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[8, 5, 9]} fov={45} />
        <OrbitControls enableZoom={true} maxDistance={20} minDistance={4} />
        <MainScene {...props} />
      </Canvas>
    </div>
  );
};

export default ShowcaseBuilding3D;
