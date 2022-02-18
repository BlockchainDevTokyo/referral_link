import React from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

import { EXCHANGE_BY_EID } from '../../graphql/exchange';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { apolloClient } from '../../utils/apollo';
import { referLink } from '../../utils/NearAPI';

export const getServerSideProps = async (context: any) => {
  // const { page } = context.query;
  // const { rowPerPage } = context.query;
  // const sortColumn = context.query.sortColumn || 'id';
  // const sortDirection = context.query.sortDirection || 'ASC';
  //
  // if (!page) {
  //   return { props: { errors: 'INPUT_ERROR' } };
  // }
  const { data } = await apolloClient.query({
    query: EXCHANGE_BY_EID,
    variables: {
      eid: context.query.eid,
    },
  });
  // const arr = data.exchanges;
  // Pass data to the page via props
  return {
    props: {
      exchange: data.exchange,
      ...(await serverSideTranslations(context.locale, [
        'exchanges',
        'common',
      ])),
    },
  };
};

const Exchange = (props: any) => {
  // const router = useRouter();
  const { t } = useTranslation('exchanges');
  const { exchange } = props;

  const currentUser = useSelector((state: any) => {
    return state.account?.payload?.user;
  });

  const contract = useSelector((state: any) => {
    return state.account?.contract;
  });
  const columns = [
    {
      name: t('#'),
      selector: (_: any, idx: any) => idx + 1,
    },
    {
      name: t('Currency'),
      selector: (row: any) => row.base,
      sortable: true,
    },
    {
      name: t('Pair'),
      selector: (row: any) => `${row.base}/${row.target}`,
      sortable: true,
    },
    {
      name: t('Price'),
      selector: (row: any) => row.last,
      sortable: true,
    },
    {
      name: t('Volume'),
      selector: (row: any) => row.volume,
      sortable: true,
    },
  ];
  return (
    <Main meta={<Meta title={t('title')} description={t('description')} />}>
      <header className="flex flex-wrap pt-10 bg-blue-600">
        <div className="flex flex-wrap container mx-auto">
          <div className="flex flex-wrap container mx-auto">
            <div className="w-full md:w-1/5 flex justify-center">
              <img
                loading="lazy"
                className="rounded-full h-32 w-32 object-contain bg-white mr-4"
                src={exchange.image}
                alt="Binance Logo"
              ></img>
            </div>
            <div className="w-full md:w-2/3 flex flex-col sm:flex-row px-4">
              <div className="w-full">
                <div className="font-extrabold uppercase text-sm tracking-wide text-blue-100">
                  {t('ExchangeReview')}
                </div>
                <div className="flex flex-wrap justify-between w-full items-center">
                  <div className="flex items-center my-5">
                    <h1 className="text-6xl leading-none font-semibold text-white mb-4">
                      {exchange.name}
                    </h1>
                    <img
                      className="ml-5 h-5 w-auto"
                      src="https://www.cryptowisser.com/img/flags/mt.png"
                      alt=""
                    ></img>
                  </div>
                  <div className="">
                    <div className="text-white text-xs">Trade Volumn (24h)</div>
                    <div className="text-white text-3xl">
                      <span className="font-bold">
                        {exchange.trade_volume_24h_btc}
                      </span>{' '}
                      BTC
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-between w-full items-center pt-4">
                  <div className="text-white inline-block text-center">
                    Score: {exchange.trust_score}
                  </div>
                  <a
                    href={exchange.url}
                    className="px-3 py-2 flex flex-wrap items-center justify-center shadow-lg rounded uppercase font-bold text-sm no-underline bg-pink-300 text-pink-900 hover:bg-pink-400 transition btn-referral mt-2 md:mt-0"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                    onClick={async () => {
                      if (!currentUser) {
                        return;
                      }
                      // setDisabled(true);
                      await referLink(contract, currentUser, 'test.net', 1);
                      // const b = await getBalance(wallet);
                      // setBalance(b);
                      // setDisabled(false);
                    }}
                  >
                    Go to {exchange.name}
                    <div className="w-full text-xs text-center text-gray-700">
                      GET UP TO USD 100 WELCOME BONUS
                    </div>
                  </a>
                </div>
                <div className="mt-1 mb-8">
                  <h2 className="text-blue-100 font-bold text-sm uppercase">
                    Links
                  </h2>
                  <div className="text-white inline items-center">
                    <a
                      href={exchange.facebook_url}
                      className="underline text-white mr-4"
                    >
                      facebook
                    </a>
                    <a
                      href={exchange.reddit_url}
                      className="underline text-white"
                    >
                      reddit
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="w-full p-5">
        <p>{exchange.description}</p>
      </div>
      <div className="w-full font-bold">{t('Markets')}</div>
      <DataTable columns={columns} data={exchange.tickers} />
    </Main>
  );
};

export default Exchange;
