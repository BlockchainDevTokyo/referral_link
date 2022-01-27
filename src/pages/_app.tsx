import { ApolloProvider } from '@apollo/client';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';

import '../styles/global.css';
import { apolloClient } from '../utils/apollo';

const CoinMarketFi = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={apolloClient}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default appWithTranslation(CoinMarketFi);
