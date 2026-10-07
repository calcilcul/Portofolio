"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, BallCollider, CylinderCollider } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// The invisible sphere that follows the cursor to push objects
function CursorSphere() {
  const ref = useRef<any>(null);
  const { pointer, viewport } = useThree();

  useFrame(() => {
    if (ref.current) {
      const x = (pointer.x * viewport.width) / 2;
      const y = (pointer.y * viewport.height) / 2;
      ref.current.setNextKinematicTranslation({ x, y, z: 0 });
    }
  });

  return (
    <RigidBody ref={ref} type="kinematicPosition" colliders={false} mass={10}>
      <BallCollider args={[2]} />
    </RigidBody>
  );
}


function CrossShape({ bodyRef, color, position, rotation }: { bodyRef: any, color: string, position: any, rotation: any }) {
  const radius = 0.85; 
  const length = 4.2;  
  
  return (
    <RigidBody 
      ref={bodyRef}
      colliders={false} 
      restitution={0.2} 
      friction={0.8}
      position={position}
      rotation={rotation}
      mass={3}
      linearDamping={4}
      angularDamping={4}
    >
      {/* Compound Colliders forming a 3D Cross */}
      <CylinderCollider args={[length / 2, radius]} />
      <CylinderCollider args={[length / 2, radius]} rotation={[Math.PI / 2, 0, 0]} />
      <CylinderCollider args={[length / 2, radius]} rotation={[0, 0, Math.PI / 2]} />

      {/* Visual Meshes */}
      <group>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[radius, radius, length, 32]} />
          <meshStandardMaterial color={color} roughness={0.15} metalness={0.3} envMapIntensity={1.5} />
        </mesh>
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[radius, radius, length, 32]} />
          <meshStandardMaterial color={color} roughness={0.15} metalness={0.3} envMapIntensity={1.5} />
        </mesh>
        <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius, radius, length, 32]} />
          <meshStandardMaterial color={color} roughness={0.15} metalness={0.3} envMapIntensity={1.5} />
        </mesh>
        
        {/* The center hole detail (Lusion aesthetic) */}
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0, length / 2 + 0.01]}>
            <circleGeometry args={[radius * 0.4, 32]} />
            <meshStandardMaterial color="#000" roughness={0.5} />
        </mesh>
        <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -length / 2 - 0.01]}>
            <circleGeometry args={[radius * 0.4, 32]} />
            <meshStandardMaterial color="#000" roughness={0.5} />
        </mesh>
      </group>
    </RigidBody>
  );
}

function Shapes() {
  const COUNT = 16; 
  const bodies = useRef<any[]>([]);

  useFrame((state, delta) => {
    // Cap delta to prevent physics explosions when tab is inactive
    const safeDelta = Math.min(delta, 0.1);
    
    bodies.current.forEach((api) => {
      if (!api) return;
      
      const pos = api.translation();
      // Calculate a force vector pointing towards center (0,0,0)
      // We want a fast, strong magnetic pull!
      const forceStrength = 80.0; 
      
      // Calculate distance to center to prevent infinite force
      const distance = Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z);
      
      // The further they are, the stronger the pull, but we add a minimum pull
      const forceX = -pos.x * forceStrength;
      const forceY = -pos.y * forceStrength;
      const forceZ = -pos.z * forceStrength * 2.0; // Pull back to Z=0 even faster
      
      api.applyImpulse({ 
        x: forceX * safeDelta, 
        y: forceY * safeDelta, 
        z: forceZ * safeDelta 
      }, true);
    });
  });
  
  return (
    <>
      {Array.from({ length: COUNT }).map((_, i) => {
        let color = "#111111"; 
        if (i % 3 === 1) color = "#ffffff"; 
        if (i % 3 === 2) color = "#cbff00"; 

        return (
          <CrossShape 
            key={i} 
            bodyRef={(el: any) => (bodies.current[i] = el)}
            color={color}
            position={[
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 2
            ]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
          />
        );
      })}
    </>
  );
}

export default function Interactive3DBoxes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full pb-24 flex flex-col items-center justify-center px-4 z-20">
      
      {/* The Lusion-like Wide Curved Container */}
      <div className="w-full max-w-[96vw] xl:max-w-[90vw] h-[65vh] rounded-[2.5rem] overflow-hidden relative bg-[#151515] shadow-2xl cursor-crosshair">
        
        <div className="absolute inset-0 z-0">
          <Canvas shadows={{ type: THREE.PCFShadowMap }} camera={{ position: [0, 0, 15], fov: 35 }}>
            <ambientLight intensity={0.8} />
            <spotLight position={[20, 20, 25]} penumbra={1} angle={0.2} color="white" castShadow shadow-mapSize={[1024, 1024]} />
            <directionalLight position={[0, 5, -4]} intensity={1.5} />
            
            <Physics gravity={[0, 0, 0]}>
              <CursorSphere />
              <Shapes />
            </Physics>

            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-difference z-10">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter text-center leading-[0.9]">
            OUTSTANDING<br/>EXPERIENCES
          </h2>
        </div>
      </div>

      {/* Bottom Bar matching Lusion aesthetic */}
      <div className="w-full max-w-[96vw] xl:max-w-[90vw] mt-6 flex justify-between items-center px-4 text-gray-500 font-medium text-sm tracking-widest">
        <span>+</span>
        <span>SCROLL TO EXPLORE</span>
        <span>+</span>
      </div>
    </section>
  );
}
