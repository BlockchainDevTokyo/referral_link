import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { EXCHANGES } from '../graphql/exchange';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { RemoteDataTable } from '../templates/RemoteDataTable';
import { apolloClient } from '../utils/apollo';

export const getServerSideProps = async (context: any) => {
  const { page } = context.query;
  const { rowPerPage } = context.query;
  const sortColumn = context.query.sortColumn || 'id';
  const sortDirection = context.query.sortDirection || 'ASC';

  if (!page) {
    return { props: { errors: 'INPUT_ERROR' } };
  }
  const { data } = await apolloClient.query({
    query: EXCHANGES,
    variables: {
      sortBy: `${sortColumn.toUpperCase()}_${sortDirection.toUpperCase()}`,
    },
  });
  const arr = data.exchanges;
  // Pass data to the page via props
  return {
    props: {
      total: arr.length,
      data: arr.slice(rowPerPage * (page - 1), rowPerPage * page),
      ...(await serverSideTranslations(context.locale || 'en', [
        'exchanges',
        'common',
      ])),
    },
  };
};

const Exchanges = (props: any) => {
  const { t } = useTranslation();
  const columns = [
    {
      name: t('Name'),
      selector: (row: any) => row.name,
      sortable: true,
      sortValue: 'name',
    },
    {
      name: t('Country'),
      selector: (row: any) => row.country,
      sortable: true,
      sortValue: 'country',
    },
    {
      name: t('trade_volume_24h_btc_normalized'),
      selector: (row: any) => row.trade_volume_24h_btc_normalized,
      sortable: true,
      sortValue: 'trade_volume_24h_btc_normalized',
    },
  ];

  return (
    <Main meta={<Meta title={t('title')} description={t('description')} />}>
      <div>
        <h1 className="font-bold text-2xl">{t('exchanges')}</h1>
        <p>{t('description')}</p>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <RemoteDataTable
                columns={columns}
                rows={props.data}
                total={props.total}
              />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Exchanges;
