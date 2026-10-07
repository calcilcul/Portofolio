"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const RetroIntro = dynamic(() => import("@/components/ui/RetroIntro"), { ssr: false });

export default function RetroIntroGate() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("retro_intro_seen");
    if (!seen) {
      sessionStorage.setItem("retro_intro_seen", "1");
      // Wait for LoadingScreen to finish (~2s loading + 0.8s exit animation)
      const timer = setTimeout(() => setShow(true), 2900);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;
  return <RetroIntro />;
}

