import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'swiper/swiper.scss';
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/thumbs/thumbs.min.css"
import Head from "next/head";
import {CssBaseline} from "@material-ui/core";
import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {RecoilRoot} from "recoil";

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
          <title>경열❤️유경 결혼합니다</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
            <link rel="shortcut icon" href="../public/icon.ico" />
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
