"use client";

import { useEffect, useState } from "react";
import NavigationSheet from "@/components/sheets/navigation-sheet";

const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <NavigationSheet />
    </>
  );
};

export default SheetProvider;
