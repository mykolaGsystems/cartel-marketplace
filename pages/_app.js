import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import "@near-wallet-selector/modal-ui/styles.css";
import { StateContext } from '../context/StateContext';
import { NearProvider } from '../context/NearContext';
import { CheckoutContext } from '../context/CheckoutContext';

function MyApp({ Component, pageProps }) {
  return (
    <NearProvider>
      <StateContext>
        <CheckoutContext>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </CheckoutContext>
      </StateContext>
    </NearProvider>
  )
}

export default MyApp
