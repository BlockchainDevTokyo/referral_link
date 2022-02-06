import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CRYPTOCURRENCY } from '../graphql/cryptocurrency';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { RemoteDataTable } from '../templates/RemoteDataTable';
import { apolloClient } from '../utils/apollo';

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
        'exchanges',
        'common',
      ])),
    },
  };
}

const Cryptocurrencies = (props: any) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };
  const stopLoading = () => {
    setLoading(false);
  };

  const columns = [
    {
      name: t('#'),
      selector: (row: any) => row.market_cap_rank,
      sortable: true,
      sortValue: 'market_cap_rank',
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
          <div className="ml-4">
            <div className="text-gray-900">{row.name}</div>
            <div className="text-gray">{row.symbol}</div>
          </div>
        </div>
      ),
      name: t('name'),
    },
    {
      name: t('price'),
      selector: (row: any) => row.market_data.current_price.usd,
      sortable: false,
      sortValue: 'price',
    },
    {
      name: t('id'),
      selector: (row: any) => row.id,
      sortable: true,
      sortValue: 'id',
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
