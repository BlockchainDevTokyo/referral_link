import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CRYPTOCURRENCY } from '../graphql/cryptocurrency';
import { Main } from '../templates/Main';
import { RemoteDataTable } from '../templates/RemoteDataTable';
import { apolloClient } from '../utils/apollo';

// This gets called on every request
export async function getServerSideProps(context: any) {
  const { page } = context.query;
  const { rowPerPage } = context.query;
  const sortColumn = context.query.sortColumn || 'id';
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
      name: t('name'),
      selector: (row: any) => row.name,
      sortable: true,
      sortValue: 'name',
    },
    {
      name: t('id'),
      selector: (row: any) => row.id,
      sortable: true,
      sortValue: 'id',
    },
  ];

  return (
    <Main meta="Cryptocurencies">
      <div>Cryptocurrencies page</div>

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
