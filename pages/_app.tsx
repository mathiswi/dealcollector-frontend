import React from 'react';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';

import { Fonts } from '../styles/Fonts';
import theme from '../styles/theme';
import Layout from '../components/Layout';
import { SearchProvider } from '../context/SearchContext';
import { FilterProvider } from '../context/FilterContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Dealcollector</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ChakraProvider theme={theme} resetCSS>
        <Fonts />
        <SearchProvider>
          <FilterProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FilterProvider>
        </SearchProvider>
      </ChakraProvider>
    </>
  );
}
