import { Main } from '../templates/Main';
import { graphql } from '../utils/Graphql';
import { i18 } from '../utils/I18';
import { RemoteDataTable } from '../templates/RemoteDataTable';

const sql = `
query ($sortBy: ExchangeSortByInput) {
  exchanges(sortBy: $sortBy) {
    id
    name
    trade_volume_24h_btc_normalized
    centralized
    country
    image
    url
  }
}
`;

// This gets called on every request
export async function getServerSideProps({ query }) {
  const page = query.page;
  const rowPerPage = query.rowPerPage;
  const sortColumn = query.sortColumn || 'id';
  const sortDirection = query.sortDirection || 'ASC';
  if (!page) {
    return { props: { errors: 'INPUT_ERROR' } };
  }
  // Fetch data from external API
  const req = await graphql(sql, {
    sortBy: sortColumn.toUpperCase() + '_' + sortDirection.toUpperCase()
  });
  const res = await req.json();
  if (res.errors) {
    return { props: res };
  }
  const arr = res.data.exchanges;
  // Pass data to the page via props
  return {
    props: {
      total: arr.length,
      data: arr.slice(rowPerPage * (page - 1), rowPerPage * page)
    }
  };
}

const columns = [
  {
    name: i18('name', 'Name'),
    selector: row => row.name,
    sortable: true,
    sortValue: 'name'
  },
  {
    name: i18('counrty', 'Country'),
    selector: row => row.country,
    sortable: true,
    sortValue: 'country'
  },
  {
    name: i18('trade_volume_24h_btc_normalized', 'trade_volume_24h_btc_normalized'),
    selector: row => row.trade_volume_24h_btc_normalized,
    sortable: true,
    sortValue: 'trade_volume_24h_btc_normalized'
  }
];

const Exchanges = (res) => {
  return (
    <Main>
      <div>
        <h1 className='font-bold text-2xl'>
          {i18('ExchangeListTitle', 'Cryptocurrency Exchange List')}
        </h1>
        <p>
          {i18(
            'ExchangeListExplanation',
            `
        Check out this Cryptocurrency Exchange List with more cryptocurrency
        exchanges and brokers than any other list in the world, including
        information on fees, deposit methods, supported cryptocurrencies and
        much more.
        `
          )}
        </p>
      </div>

      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <RemoteDataTable
                columns={columns}
                rows={res}
              />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Exchanges;
