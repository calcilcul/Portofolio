"use client";

import { useEffect, useRef } from "react";

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && typeof window !== "undefined") {
      import("webgl-fluid").then((module) => {
        const WebGLFluid = module.default || module;
        WebGLFluid(canvasRef.current, {
          IMMEDIATE: true, // Trigger initial splats so it's instantly visible
          TRIGGER: "hover",
          SIM_RESOLUTION: 128,
          DYE_RESOLUTION: 1024,
          CAPTURE_RESOLUTION: 512,
          DENSITY_DISSIPATION: 1.5, 
          VELOCITY_DISSIPATION: 0.2, 
          PRESSURE: 0.8,
          PRESSURE_ITERATIONS: 20,
          CURL: 30, 
          SPLAT_RADIUS: 0.5,
          SPLAT_FORCE: 6000,
          SHADING: true,
          COLORFUL: false, // Turn off colorful. We'll use CSS to force neon green!
          COLOR_UPDATE_SPEED: 10,
          PAUSED: false,
          TRANSPARENT: true, 
          BLOOM: true,
          BLOOM_ITERATIONS: 8,
          BLOOM_RESOLUTION: 256,
          BLOOM_INTENSITY: 0.8,
          BLOOM_THRESHOLD: 0.6,
          BLOOM_SOFT_KNEE: 0.7,
          SUNRAYS: true,
          SUNRAYS_RESOLUTION: 196,
          SUNRAYS_WEIGHT: 0.7,
        });
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-90">
      <canvas
        ref={canvasRef}
        style={{ 
           width: "100%", 
           height: "100%", 
           position: "absolute", 
           top: 0, 
           left: 0,
           // CSS formula to shift standard colors to vibrant neon green #CBFF00
           filter: "sepia(100%) hue-rotate(50deg) saturate(300%) brightness(1.2)"
        }}
      />
    </div>
  );
}
