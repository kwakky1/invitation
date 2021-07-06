import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Head from "next/head";
import {CssBaseline, ThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {createMuiTheme} from "@material-ui/core/styles";
import {RecoilRoot, useRecoilValue} from "recoil";
import {themeModeState} from "../src/atoms/Atom";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
      <>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
          <RecoilRoot>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
          </RecoilRoot>
      </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
export default MyApp
