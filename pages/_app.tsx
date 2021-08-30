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
            <meta property="og:url" content="https://invitation-beta.vercel.app/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="경열❤️유경 결혼식에 초대합니다." />
            <meta property="og:description" content="2021년 10월 31일(일) 낮 12시 20분" />
            <meta property="og:image" content="https://invitation-beta.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fimg%2Fwedding_1.caee51bdfac7f41c1368e740d4d176c8.jpeg&w=3840&q=75" />
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
