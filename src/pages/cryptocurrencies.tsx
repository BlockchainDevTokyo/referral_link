import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { CRYPTOCURRENCY } from '../graphql/cryptocurrency';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { RemoteDataTable } from '../templates/RemoteDataTable';
import { apolloClient } from '../utils/apollo';
import { referLink } from '../utils/NearAPI';

// This gets called on every request
export async function getServerSideProps(context: any) {
  const { page } = context.query;
  const { rowPerPage } = context.query;
  const sortColumn = context.query.sortColumn || 'market_cap_rank';
  const sortDirection = context.query.sortDirection || 'ASC';
  if (!page) {
    return { props: { errors: 'INPUT_ERROR' } };
  }
  const { data } = await apolloClient.query({
    query: CRYPTOCURRENCY,
    variables: {
      sortBy: `${sortColumn.toUpperCase()}_${sortDirection.toUpperCase()}`,
    },
  });
  const arr = data.cryptocurrencies;
  // Pass data to the page via props
  return {
    props: {
      total: arr.length,
      data: arr.slice(rowPerPage * (page - 1), rowPerPage * page),
      ...(await serverSideTranslations(context.locale, [
        'cryptocurrencies',
        'common',
      ])),
    },
  };
}

const Cryptocurrencies = (props: any) => {
  const router = useRouter();
  const { t } = useTranslation('cryptocurrencies');

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };
  const stopLoading = () => {
    setLoading(false);
  };

  const currentUser = useSelector((state: any) => {
    return state.account?.payload?.user;
  });

  const contract = useSelector((state: any) => {
    return state.account?.contract;
  });

  const columns = [
    {
      name: t('#'),
      selector: (row: any) => row.market_cap_rank,
      sortable: true,
      sortValue: 'market_cap_rank',
      width: '52px',
    },
    {
      selector: (row: any) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-5 w-5">
            <img
              className="h-5 w-5 rounded-full"
              src={row.image.thumb}
              alt={row.name}
            />
          </div>
          <div
            className="ml-4 hover:underline hover:cursor-pointer"
            onClick={() => {
              router.push({
                pathname: '/cryptocurrencies/[cid]',
                query: { cid: row.id },
              });
            }}
          >
            <div className="text-gray-900">{row.name}</div>
            <div className="text-gray">{row.symbol}</div>
          </div>
          <div className="ml-4 text-blue-600 font-bold">
            {currentUser && (
              <button
                className="flex items-center justify-center px-2 py-1 border border-transparent text-base font-small rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                // className="nowrap text-liblue"
                onClick={async () => {
                  setDisabled(true);
                  await referLink(contract, currentUser, 'test.net', 1);
                  // const b = await getBalance(wallet);
                  // setBalance(b);

                  setDisabled(false);
                }}
                disabled={disabled}
              >
                Buy
              </button>
            )}
          </div>
        </div>
      ),
      name: t('name'),
      width: '200px',
    },
    {
      name: t('price'),
      selector: (row: any) => row.market_data.current_price.usd,
      sortable: false,
      sortValue: 'price',
    },
    {
      name: t('24h %'),
      selector: (row: any) => row.market_data.price_change_percentage_24h,
      sortable: true,
      sortValue: 'price_change_percentage_24h',
    },
    {
      name: t('7d %'),
      selector: (row: any) => row.market_data.price_change_percentage_7d,
      sortable: true,
      sortValue: 'price_change_percentage_7d',
    },
    {
      name: t('Market Cap'),
      selector: (row: any) => row.market_data.market_cap.usd,
      sortable: true,
      sortValue: 'market_cap',
    },
    {
      name: t('Volume(24H)'),
      selector: (row: any) => row.market_data.total_volume.usd,
      sortable: true,
      sortValue: 'total_volume',
    },
    {
      name: t('Circulating Supply'),
      selector: (row: any) => row.market_data.circulating_supply,
      sortable: true,
      sortValue: 'circulating_supply',
    },
  ];

  return (
    <Main meta={<Meta title={t('title')} description={t('description')} />}>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="relative shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div
                className="bg-gray-50 w-full h-full z-40 absolute"
                hidden={!loading}
              >
                <img
                  alt="loading"
                  className="w-40 h-20 mx-auto my-10"
                  src="https://cutewallpaper.org/21/loading-animated-gif-transparent-background/Animated-Loading-Gif-Transparent-Background.gif"
                />
              </div>
              <RemoteDataTable
                columns={columns}
                rows={props.data}
                total={props.total}
                startLoading={startLoading}
                stopLoading={stopLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Cryptocurrencies;
