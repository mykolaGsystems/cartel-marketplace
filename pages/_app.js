import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import "@near-wallet-selector/modal-ui/styles.css";
import { StateContext } from '../context/StateContext';
import { NearProvider } from '../context/NearContext';
import { CheckoutContext } from '../context/CheckoutContext';

import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <NearProvider>
      <StateContext>
        <CheckoutContext>
          <Layout>
            <Toaster />
            <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={10} showOnShallow={true} />
            <Component {...pageProps} />
          </Layout>
        </CheckoutContext>
      </StateContext>
    </NearProvider>
  )
}

export default MyApp
