"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── 3D PC Model ────────────────────────────────────────────────────────────
function RetroPC({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05 - 0.05;
    const scale = Math.max(0, 1 - scrollProgress * 2.5);
    groupRef.current.scale.setScalar(scale);
    groupRef.current.position.z = scrollProgress * -8;
    groupRef.current.position.y = scrollProgress * -2;
  });

  const beige = "#d4c5a9";
  const darkGray = "#2a2a2a";
  const screenColor = "#1a1a2e";

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Monitor foot */}
      <mesh position={[0, -2.2, 0.3]}>
        <boxGeometry args={[1.8, 0.15, 1.2]} />
        <meshStandardMaterial color={beige} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Monitor stand */}
      <mesh position={[0, -1.6, 0.1]}>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color={beige} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Monitor casing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 3.4, 1.6]} />
        <meshStandardMaterial color={beige} roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0, 0.78]}>
        <boxGeometry args={[3.8, 3.0, 0.1]} />
        <meshStandardMaterial color={darkGray} roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.1, 0.84]}>
        <boxGeometry args={[3.4, 2.6, 0.05]} />
        <meshStandardMaterial color={screenColor} emissive="#0a0a1a" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Screen glow lines */}
      {[-0.6, -0.2, 0.2, 0.6].map((y, i) => (
        <mesh key={i} position={[0, y + 0.1, 0.87]}>
          <boxGeometry args={[2.8, 0.04, 0.01]} />
          <meshStandardMaterial color="#4fc3f7" emissive="#4fc3f7" emissiveIntensity={0.8} roughness={0.2} />
        </mesh>
      ))}
      {/* Power button */}
      <mesh position={[1.5, -1.2, 0.82]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial color="#888880" roughness={0.4} />
      </mesh>
      {/* LED */}
      <mesh position={[1.5, -1.2, 0.87]}>
        <cylinderGeometry args={[0.05, 0.05, 0.05, 8]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={2} />
      </mesh>
      {/* Drive slots */}
      <mesh position={[-0.3, -1.1, 0.82]}>
        <boxGeometry args={[1.4, 0.15, 0.05]} />
        <meshStandardMaterial color={darkGray} roughness={0.5} />
      </mesh>
      <mesh position={[-0.3, -1.3, 0.82]}>
        <boxGeometry args={[1.4, 0.12, 0.05]} />
        <meshStandardMaterial color={darkGray} roughness={0.5} />
      </mesh>

      {/* Keyboard */}
      <group position={[0, -2.1, 2.5]} rotation={[-0.1, 0, 0]}>
        <mesh>
          <boxGeometry args={[4.5, 0.2, 1.8]} />
          <meshStandardMaterial color={beige} roughness={0.7} metalness={0.1} />
        </mesh>
        {[0, 0.4, 0.8, 1.2].map((z, ri) =>
          [-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((x, ci) => (
            <mesh key={`${ri}-${ci}`} position={[x, 0.12, z - 0.7]}>
              <boxGeometry args={[0.45, 0.08, 0.3]} />
              <meshStandardMaterial color="#c8b99a" roughness={0.6} />
            </mesh>
          ))
        )}
      </group>

      {/* Mouse */}
      <group position={[2.8, -2.05, 2.0]}>
        <mesh>
          <capsuleGeometry args={[0.3, 0.5, 8, 12]} />
          <meshStandardMaterial color="#d0c09a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.3, 0.1]}>
          <boxGeometry args={[0.55, 0.05, 0.4]} />
          <meshStandardMaterial color="#b0a080" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// ─── Ransom Note Letter ──────────────────────────────────────────────────────
const RANSOM_COLORS = [
  { bg: "#ff4444", text: "#ffffff" },
  { bg: "#ffdd00", text: "#000000" },
  { bg: "#ffffff", text: "#000000" },
  { bg: "#000000", text: "#ffffff" },
  { bg: "#ff8800", text: "#000000" },
  { bg: "#00aaff", text: "#ffffff" },
  { bg: "#cbff00", text: "#000000" },
  { bg: "#ff44aa", text: "#ffffff" },
];

const RANSOM_FONTS = [
  "'Impact', sans-serif",
  "'Georgia', serif",
  "'Courier New', monospace",
  "'Arial Black', sans-serif",
  "'Times New Roman', serif",
  "'Verdana', sans-serif",
];

// Pre-seeded random-like values to avoid hydration issues
const LETTER_CONFIGS = Array.from({ length: 60 }, (_, i) => ({
  rotation: ((i * 137 + 23) % 36) - 18,
  scaleX: 0.85 + ((i * 71) % 30) / 100,
  scaleY: 0.9 + ((i * 53) % 20) / 100,
  shakeDuration: 0.5 + ((i * 89) % 80) / 100,
  shakeDelay: ((i * 61) % 20) / 10,
}));

function RansomLetter({ char, index, totalDelay }: { char: string; index: number; totalDelay: number }) {
  const cfg = LETTER_CONFIGS[index % LETTER_CONFIGS.length];
  const color = RANSOM_COLORS[(index * 3 + Math.floor(index / 2)) % RANSOM_COLORS.length];
  const font = RANSOM_FONTS[index % RANSOM_FONTS.length];

  if (char === " ") return <span className="inline-block w-3 md:w-5" />;

  return (
    <motion.span
      initial={{ opacity: 0, y: -40, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: totalDelay + index * 0.06,
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      style={{
        display: "inline-block",
        backgroundColor: color.bg,
        color: color.text,
        fontFamily: font,
        fontWeight: "900",
        transform: `scaleX(${cfg.scaleX}) scaleY(${cfg.scaleY}) rotate(${cfg.rotation}deg)`,
        padding: "0.05em 0.12em",
        margin: "0 0.03em",
        lineHeight: 1,
        boxShadow: "3px 3px 0 rgba(0,0,0,0.5)",
        border: "2px solid rgba(0,0,0,0.3)",
        userSelect: "none" as const,
        animation: `ransomShake ${cfg.shakeDuration}s ease-in-out ${cfg.shakeDelay}s infinite alternate`,
      }}
    >
      {char}
    </motion.span>
  );
}

function RansomText({ text, delay, size = "normal" }: { text: string; delay: number; size?: "small" | "normal" | "large" }) {
  const sizeClass = {
    small: "text-xl md:text-3xl",
    normal: "text-3xl md:text-5xl",
    large: "text-5xl md:text-7xl lg:text-8xl",
  }[size];

  return (
    <div className={`${sizeClass} leading-none flex flex-wrap justify-center gap-y-2`}>
      {text.split("").map((char, i) => (
        <RansomLetter key={i} char={char} index={i} totalDelay={delay} />
      ))}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function RetroIntro() {
  const [phase, setPhase] = useState<"winxp" | "pc3d" | "done">("winxp");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Lock body scroll during winxp phase
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // After 3.5s → go to PC phase
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("pc3d");
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Wheel handler for PC phase
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (phase !== "pc3d") return;
      e.preventDefault();
      setScrollProgress((prev) => {
        const next = Math.min(1, Math.max(0, prev + e.deltaY * 0.003));
        if (next >= 0.95) {
          setPhase("done");
          document.body.style.overflow = "";
        }
        return next;
      });
    },
    [phase]
  );

  const lastTouchY = useRef(0);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    lastTouchY.current = e.touches[0].clientY;
  }, []);
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (phase !== "pc3d") return;
      e.preventDefault();
      const delta = lastTouchY.current - e.touches[0].clientY;
      lastTouchY.current = e.touches[0].clientY;
      setScrollProgress((prev) => {
        const next = Math.min(1, Math.max(0, prev + delta * 0.008));
        if (next >= 0.95) {
          setPhase("done");
          document.body.style.overflow = "";
        }
        return next;
      });
    },
    [phase]
  );

  useEffect(() => {
    if (phase !== "pc3d") return;
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [phase, handleWheel, handleTouchStart, handleTouchMove]);

  if (phase === "done") return null;

  return (
    <>
      <style>{`
        @keyframes ransomShake {
          0%   { transform: translate(0px, 0px) rotate(0deg); }
          25%  { transform: translate(-1px, 1px) rotate(0.5deg); }
          50%  { transform: translate(1px, -1px) rotate(-0.5deg); }
          75%  { transform: translate(-1px, 0px) rotate(0.3deg); }
          100% { transform: translate(1px, 1px) rotate(0deg); }
        }
        @keyframes crtFlicker {
          0%,91%,95%,100% { opacity: 1; }
          92%,94%          { opacity: 0.85; }
          93%              { opacity: 0.7; }
        }
        @keyframes scanline {
          0%   { top: -120px; }
          100% { top: 100vh; }
        }
        @keyframes noiseShift {
          0%   { background-position: 0% 0%; }
          10%  { background-position: -3% -5%; }
          20%  { background-position: 5% 2%; }
          30%  { background-position: -2% 8%; }
          40%  { background-position: 4% -4%; }
          50%  { background-position: -5% 6%; }
          60%  { background-position: 2% -8%; }
          70%  { background-position: -4% 4%; }
          80%  { background-position: 6% -2%; }
          90%  { background-position: -2% 6%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {/* ──────── PHASE 1: Windows XP Screen ──────── */}
        {phase === "winxp" && (
          <motion.div
            key="winxp"
            className="fixed inset-0 z-[9990]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
          >
            {/* BG */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/winxp-bliss.jpg')", animation: "crtFlicker 5s ease-in-out infinite" }}
            />

            {/* CRT Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
                zIndex: 1,
              }}
            />

            {/* Moving scanline */}
            <div
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                height: "120px",
                background: "linear-gradient(transparent, rgba(200,220,255,0.05), transparent)",
                animation: "scanline 3s linear infinite",
                zIndex: 2,
              }}
            />

            {/* Grain noise */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.09,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "300px 300px",
                animation: "noiseShift 0.3s steps(1) infinite",
                zIndex: 3,
              }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
                zIndex: 4,
              }}
            />

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4" style={{ zIndex: 5 }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <RansomText text="WELCOME" delay={0.4} size="small" />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                <RansomText text="PORTFOLIO OF" delay={0.9} size="small" />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mt-2">
                <RansomText text="FAISAL" delay={1.4} size="large" />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }} className="-mt-2">
                <RansomText text="RAMDHANI" delay={1.9} size="large" />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                <RansomText text="FULL-STACK DEVELOPER" delay={2.5} size="small" />
              </motion.div>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute bottom-0 left-0 h-[3px]"
              style={{
                background: "linear-gradient(90deg, #cbff00, #ffffff)",
                boxShadow: "0 0 12px rgba(203,255,0,0.8)",
                zIndex: 6,
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 3.0, ease: "linear" }}
            />
          </motion.div>
        )}

        {/* ──────── PHASE 2: 3D PC Zoom Out ──────── */}
        {phase === "pc3d" && (
          <motion.div
            key="pc3d"
            className="fixed inset-0 z-[9990] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Faint bliss BG */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/winxp-bliss.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: Math.max(0, 0.25 - scrollProgress * 0.5),
                filter: `blur(${scrollProgress * 10}px)`,
              }}
            />

            {/* Darkening overlay */}
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: Math.min(0.9, 0.3 + scrollProgress * 1.2) }}
            />

            {/* 3D Canvas */}
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 1, 10], fov: 45 }} shadows={{ type: THREE.PCFShadowMap }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-5, -2, 3]} intensity={0.5} color="#4fc3f7" />
                <spotLight position={[0, 8, 4]} angle={0.4} penumbra={0.5} intensity={1} castShadow />
                <RetroPC scrollProgress={scrollProgress} />
              </Canvas>
            </div>

            {/* Scroll hint */}
            <motion.div
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 text-white pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: Math.max(0, 1 - scrollProgress * 10) }}
              transition={{ delay: 0.8 }}
              style={{ zIndex: 10 }}
            >
              <span
                className="text-xs tracking-[0.35em] uppercase opacity-60"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Scroll to continue
              </span>
              <div style={{ animation: "scrollBounce 1.5s ease-in-out infinite" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12l7 7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                </svg>
              </div>
            </motion.div>

            {/* Top label */}
            <div
              className="absolute top-8 left-0 right-0 flex justify-center pointer-events-none"
              style={{ opacity: Math.max(0, 0.5 - scrollProgress * 3), zIndex: 10 }}
            >
              <span
                className="text-white text-[11px] tracking-[0.5em] uppercase opacity-50"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Faisal Ramdhani — Portfolio
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
