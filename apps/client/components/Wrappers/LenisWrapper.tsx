"use client"

import { useLenisScroll } from "../../utils/useLenisScroll";
import { ReactNode } from "react";

export const LenisWrapper = ({ children }: { children: ReactNode }) => {
  useLenisScroll();
  return <>{children}</>;
};