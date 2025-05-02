"use client";
import React from "react";
import { SessionProviders } from "./session-provider";
import { ThemeProvider } from "./theme-provider";


export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
        <ThemeProvider>
      <SessionProviders>
          {children}
      </SessionProviders>
        </ThemeProvider>
    </>
  );
};