import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { darkTheme, globalStyles } from "@/theme";
import { SolanaProvider } from "@/providers/solana";
import type { AppProps } from "next/app";
import type { NextPage } from "next";

type CustomPage = NextPage & {
  theme?: string;
};

type CustomAppProps = AppProps & {
  Component: CustomPage;
};

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <NextThemesProvider
      attribute="class"
      value={{
        light: "light-theme",
        dark: darkTheme.className,
      }}
    >
      <SolanaProvider>
        <Component {...pageProps} />
      </SolanaProvider>
      <Component {...pageProps} />
    </NextThemesProvider>
  );
}
