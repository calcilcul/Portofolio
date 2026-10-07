"use client";

import { useEffect, useRef } from "react";
import webGLFluidEnhanced from "webgl-fluid";

export default function FluidSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let fluidInstance: any;

    if (canvasRef.current) {
      fluidInstance = webGLFluidEnhanced(canvasRef.current, {
        IMMEDIATE: true,
        TRIGGER: "hover",
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 512,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 1,
        VELOCITY_DISSIPATION: 0.2,
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 30,
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: true,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 10, g: 10, b: 10 },
        TRANSPARENT: false,
        BLOOM: true,
        BLOOM_ITERATIONS: 8,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.8,
        BLOOM_THRESHOLD: 0.6,
        BLOOM_SOFT_KNEE: 0.7,
        SUNRAYS: true,
        SUNRAYS_RESOLUTION: 196,
        SUNRAYS_WEIGHT: 1.0,
      });
    }

    return () => {
      // Basic cleanup if the library supports it, or we just rely on DOM cleanup
      // webgl-fluid might not have a strict cleanup method, but we can try removing the canvas context or just let React unmount it.
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ zIndex: 1 }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none mix-blend-difference px-4">
        <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">
          Interactive WebGL
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light">
          Move your mouse around to interact with the fluid simulation, bringing the interface to life.
        </p>
      </div>
    </section>
  );
}
