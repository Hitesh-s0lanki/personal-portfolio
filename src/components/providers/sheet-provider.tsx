"use client";

import { useSyncExternalStore } from "react";
import NavigationSheet from "@/components/sheets/navigation-sheet";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const SheetProvider = () => {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!isMounted) return null;

  return (
    <>
      <NavigationSheet />
    </>
  );
};

export default SheetProvider;
