import { ReactNode } from 'react';

import Script from 'next/script';

import { AppConfig } from '../utils/AppConfig';
import Nav from './nav';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700 px-1">
    {props.meta}

    <div className="max-w-screen-xl mx-auto">
      <div id="market" className="text-center"></div>
      <Script
        id="stripe-js"
        src="https://js.stripe.com/v3/"
        onLoad={() => {
          const baseUrl = 'https://widgets.cryptocompare.com/';
          const market = document.getElementById('market');
          (() => {
            let appName = encodeURIComponent(window.location.hostname);
            if (appName === '') {
              appName = 'local';
            }

            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            const theUrl = `${baseUrl}serve/v3/coin/header?fsyms=BTC,ETH,CELO&tsyms=USD`;
            s.src = `${
              theUrl + (theUrl.indexOf('?') >= 0 ? '&' : '?')
            }app=${appName}`;
            market?.appendChild(s);
          })();
        }}
      />
      <div className="border-b border-gray-300">
        {/* <div className="pt-16 pb-8">
          <div className="font-bold text-3xl text-gray-900">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div> */}
        <div>{Nav()}</div>
      </div>
      <div className="py-5 text-xl content">{props.children}</div>

      <div className="border-t border-gray-300 text-center py-8 text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        by <a href="https://coinmarketfi.com">BlockchainDevTokyo</a>
      </div>
    </div>
  </div>
);

export { Main };
