import { useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { EXCHANGES } from '../graphql/exchange';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { RemoteDataTable } from '../templates/RemoteDataTable';

const columns = [
  {
    name: 'Name',
    selector: (row: any) => row.name,
    sortable: true,
    sortValue: 'name',
  },
  {
    name: 'Country',
    selector: (row: any) => row.country,
    sortable: true,
    sortValue: 'country',
  },
  {
    name: 'trade_volume_24h_btc_normalized',
    selector: (row: any) => row.trade_volume_24h_btc_normalized,
    sortable: true,
    sortValue: 'trade_volume_24h_btc_normalized',
  },
];

const Exchanges = () => {
  const { loading, error, data } = useQuery(EXCHANGES);
  const { t } = useTranslation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data.exchanges.length);
  // const { page } = query;
  // const { rowPerPage } = query;
  // const sortColumn = query.sortColumn || 'id';
  // const sortDirection = query.sortDirection || 'ASC';
  // if (!page) {
  //   return { props: { errors: 'INPUT_ERROR' } };
  // }

  return (
    <Main meta={<Meta title={t('title')} description={t('description')} />}>
      <div>
        <h1 className="font-bold text-2xl">
          {'Cryptocurrency Exchange List'}
          {/* {i18('ExchangeListTitle', 'Cryptocurrency Exchange List')} */}
        </h1>
        <p>
          {'Description'}
          {/* {i18(
            'ExchangeListExplanation',
            `
        Check out this Cryptocurrency Exchange List with more cryptocurrency
        exchanges and brokers than any other list in the world, including
        information on fees, deposit methods, supported cryptocurrencies and
        much more.
        `
          )} */}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <RemoteDataTable columns={columns} rows={data.exchanges} />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export const getStaticProps = async (data: any) => ({
  props: {
    ...(await serverSideTranslations(data.locale, ['exchanges', 'common'])),
  },
});

export default Exchanges;
