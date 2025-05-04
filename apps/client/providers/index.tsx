"use client";
import React from "react";
import { SessionProviders } from "./session-provider";
import { ThemeProvider } from "./theme-provider";
import { WalletConnectProvider } from "./wallet-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider>
        <SessionProviders>
          <WalletConnectProvider>{children}</WalletConnectProvider>
        </SessionProviders>
      </ThemeProvider>
    </>
  );
};
