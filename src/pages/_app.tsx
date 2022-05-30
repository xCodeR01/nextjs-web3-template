import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { darkTheme, globalStyles } from "@/theme";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
// import type { NextPage } from "next";

// type CustomPage = NextPage & {
//   theme?: string;
// };

// type CustomAppProps = AppProps & {
//   Component: CustomPage;
// };

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
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
    </NextThemesProvider>
  );
}
