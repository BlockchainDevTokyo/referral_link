import { ApolloProvider } from '@apollo/client';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '../redux/store/index';
import '../styles/global.css';
import GoogleAnalytics from '../templates/ga';
import { apolloClient } from '../utils/apollo';

const CoinMarketFi = ({ Component, pageProps }: AppProps) => (
  <Provider store={store()}>
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
      <GoogleAnalytics />
    </ApolloProvider>
  </Provider>
);

export default appWithTranslation(CoinMarketFi);
