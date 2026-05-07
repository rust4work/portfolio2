"use client";

import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import CustomCursor from "./CustomCursor";

export default function ClientProviders() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CustomCursor />
      <Navigation />
    </>
  );
}
