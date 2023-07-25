import React from 'react';
import { Toaster } from 'react-hot-toast';

import { Layout } from '../components';
import '../styles/globals.css';
import "@near-wallet-selector/modal-ui/styles.css";
import { StateContext } from '../context/StateContext';
import { NearProvider } from '../context/NearContext';

function MyApp({ Component, pageProps }) {
  return (
    <NearProvider>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </NearProvider>
  )
}

export default MyApp
