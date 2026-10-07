"use client";

import { useEffect, useState } from "react";

export default function PreLoader({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering complex UI until mounted
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        {/* Placeholder while mounting */}
      </div>
    );
  }

  return <>{children}</>;
}
