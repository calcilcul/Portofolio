"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const HalideTopo: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;

      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;

      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 15;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    // Entrance animation
    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(90deg) rotateZ(0deg) scale(0.8)";

    const timeout = setTimeout(() => {
      canvas.style.transition = "all 2.5s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.transform = "rotateX(55deg) rotateZ(-25deg) scale(1)";
    }, 300);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');

        .halide-root {
          --bg: transparent;
          --silver: #e0e0e0;
          --lime: #cbff00;
          --accent: #cbff00;
          --grain-opacity: 0.12;

          background-color: var(--bg);
          color: var(--silver);
          font-family: 'Syncopate', 'Inter', sans-serif;
          overflow: hidden;
          height: 100vh;
          width: 100%;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        /* Subtle lime vignette glow at bottom */
        .halide-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 50% at 50% 100%, rgba(203,255,0,0.07), transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        .halide-grain {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 100;
          opacity: var(--grain-opacity);
        }

        .halide-viewport {
          perspective: 2000px;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        .halide-canvas-3d {
          position: relative;
          width: 800px;
          height: 500px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .halide-layer {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(203, 255, 0, 0.08);
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }

        /* Layer 1: Clean Bliss - base */
        .halide-layer-1 {
          background-image: url('/winxp-bliss.jpg');
          filter: contrast(1.1) brightness(0.55) saturate(0.8);
        }

        /* Layer 2: CRT Bliss - middle depth */
        .halide-layer-2 {
          background-image: url('/winxp-crt.jpg');
          filter: contrast(1.15) brightness(0.75) saturate(1.1);
          opacity: 0.55;
          mix-blend-mode: screen;
        }

        /* Layer 3: Pure lime-tinted noise */
        .halide-layer-3 {
          background: radial-gradient(circle at 30% 60%, rgba(203,255,0,0.12), transparent 50%),
                      radial-gradient(circle at 70% 30%, rgba(203,255,0,0.08), transparent 50%);
          opacity: 0.7;
          mix-blend-mode: overlay;
        }

        /* Topographic contour lines */
        .halide-contours {
          position: absolute;
          width: 200%; height: 200%;
          top: -50%; left: -50%;
          background-image: repeating-radial-gradient(
            circle at 50% 50%,
            transparent 0,
            transparent 38px,
            rgba(203,255,0,0.06) 39px,
            transparent 40px
          );
          transform: translateZ(120px);
          pointer-events: none;
        }

        /* Scanlines overlay on the whole canvas */
        .halide-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.12) 2px,
            rgba(0,0,0,0.12) 4px
          );
          pointer-events: none;
          z-index: 50;
          transform: translateZ(160px);
        }

        /* Interface grid overlay */
        .halide-interface {
          position: absolute;
          inset: 0;
          padding: 5rem 4rem 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 10;
          pointer-events: none;
          gap: 0;
        }

        /* Top-left: brand tag */
        .halide-brand {
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: var(--lime);
          align-self: start;
        }

        /* Top-right: tech specs */
        .halide-specs {
          text-align: right;
          font-family: 'Courier New', monospace;
          color: rgba(203, 255, 0, 0.6);
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          line-height: 1.8;
          align-self: start;
        }

        /* Hero title */
        .halide-title {
          grid-column: 1 / -1;
          align-self: center;
          font-size: clamp(2.2rem, 7vw, 8rem);
          line-height: 0.88;
          letter-spacing: -0.04em;
          mix-blend-mode: difference;
          color: #ffffff;
          font-weight: 700;
          text-align: left;
          padding-left: 0.05em;
        }

        .halide-title span.lime {
          color: var(--lime);
          mix-blend-mode: normal;
          -webkit-text-stroke: 0px;
        }

        /* Bottom bar */
        .halide-bottom {
          grid-column: 1 / -1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .halide-tagline {
          font-family: 'Courier New', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          line-height: 2;
          color: rgba(224, 224, 224, 0.55);
        }

        .halide-tagline strong {
          color: var(--lime);
          font-weight: 400;
        }

        /* CTA Button */
        .halide-cta {
          pointer-events: auto;
          background: var(--lime);
          color: #0d0d0d;
          padding: 0.85rem 2rem;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 88% 100%, 0 100%);
          transition: all 0.3s ease;
          display: inline-block;
        }

        .halide-cta:hover {
          background: #ffffff;
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(203,255,0,0.4);
        }

        /* Scroll hint line */
        .halide-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, var(--lime), transparent);
          z-index: 20;
          animation: halideFlow 2s infinite ease-in-out;
        }

        @keyframes halideFlow {
          0%, 100% { transform: translateX(-50%) scaleY(0); transform-origin: top; }
          50%       { transform: translateX(-50%) scaleY(1); transform-origin: top; }
        }

        /* Edge gradient vignette */
        .halide-edge-vignette {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right, #1C1C1A 0%, transparent 15%, transparent 85%, #1C1C1A 100%),
            linear-gradient(to bottom, transparent 0%, transparent 85%, #1C1C1A 100%);
          pointer-events: none;
          z-index: 150; /* Above grain to hide the hard line */
        }

        /* Horizontal rule decorators */
        .halide-hr {
          border: none;
          border-top: 1px solid rgba(203,255,0,0.15);
          margin: 0.4rem 0;
          width: 100%;
        }
      `}</style>

      {/* SVG Grain Filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="halide-grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div className="halide-root">
        {/* Grain Overlay */}
        <div
          className="halide-grain"
          style={{ filter: "url(#halide-grain-filter)" }}
        />

        {/* Edge vignette */}
        <div className="halide-edge-vignette" />

        {/* Interface HUD Grid */}
        <div className="halide-interface">
          {/* Top-left brand */}
          <div className="halide-brand">
            MY PORTOFOLIO
            <div className="halide-hr" />
          </div>


          {/* Hero Title */}
          <h1 className="halide-title">
            FAISAL
            <br />
            <span className="lime">RAM</span>DHANI
          </h1>

          {/* Bottom bar */}
          <div className="halide-bottom">
            <div className="halide-tagline">
              <p>[ PORTFOLIO 2025 ]</p>
              <p>
                <strong>FULL-STACK DEVELOPER</strong> &amp; DIGITAL CRAFTSMAN
              </p>
            </div>

          </div>
        </div>

        {/* 3D Parallax Viewport */}
        <div className="halide-viewport">
          <div className="halide-canvas-3d" ref={canvasRef}>
            {/* Layer 1: Base Bliss */}
            <div
              className="halide-layer halide-layer-1"
              ref={(el) => {
                if (el) layersRef.current[0] = el;
              }}
            />
            {/* Layer 2: CRT Bliss */}
            <div
              className="halide-layer halide-layer-2"
              ref={(el) => {
                if (el) layersRef.current[1] = el;
              }}
            />
            {/* Layer 3: Lime glow */}
            <div
              className="halide-layer halide-layer-3"
              ref={(el) => {
                if (el) layersRef.current[2] = el;
              }}
            />
            {/* Topographic contour lines */}
            <div className="halide-contours" />
            {/* CRT Scanlines */}
            <div className="halide-scanlines" />
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="halide-scroll-hint" />
      </div>
    </>
  );
};

export default HalideTopo;
