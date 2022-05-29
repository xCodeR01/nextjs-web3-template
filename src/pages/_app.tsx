import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { darkTheme, globalStyles } from "@/theme";
import { Provider as ReduxProvider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import store from "@/lib/redux";
import { connectors } from "@/lib/web3-react";
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
      <ReduxProvider store={store}>
        <Web3ReactProvider connectors={connectors}>
          <Component {...pageProps} />
        </Web3ReactProvider>
      </ReduxProvider>
    </NextThemesProvider>
  );
}
