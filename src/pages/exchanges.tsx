import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { graphql } from '../utils/Graphql';
import {i18} from '../utils/I18';

const query = `
{
  exchanges(limit:10){
    name,
    id,
    country,
    image,
    url,
  },
}
`;

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await graphql(query);
  const data = await res.json();
  // Pass data to the page via props
  return { props: data };
}

function nomalize(def: Array<any>) {
  return def.map((e) => {
    if (typeof e === 'string') {
      e = { data: e, text: e };
    }
    if (Object.keys(e).length === 1) {
      const k = Object.keys(e)[0] ?? '';
      const v = e[k];
      e = { data: k, text: v };
      if (typeof v === 'function') {
        e = { data: v, text: k };
      }
    }
    if (typeof e.data !== 'function') {
      const k: string = e.data;
      e.data = (row: { [index: string]: any }) => row[k] ?? '-';
    }
    return { ...{ data: '', text: '', thClass: '', tdClass: '' }, ...e };
  });
}

const tabDef = nomalize([
  {
    name: (row) => (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img className="h-10 w-10 rounded-full" src={row.image} alt={row.name} />
        </div>
        <div className="ml-4">
          <div className="text-gray-900">{row.name}</div>
        </div>
      </div>
    )
  },
  'country',
  {
    data: 'description',
    text: 'Description',
    thClass: 'text-gray-500',
    tdClass: 'text-gray-500'
  },
  { _: '#Markets' },
  { _: '#Coins' },
  { _: 'Fiat Supported' },
  {
    ' ': (row) => (
      <a href={row.url} className='text-indigo-600 hover:text-indigo-900'>{i18('refer','Refer')}</a>
    )
  }
]);

// @ts-ignore
const Exchanges = ({ data }) => (
  <Main meta={<Meta title='Lorem ipsum' description='Lorem ipsum' />}>
    <div>
      <h1 className='font-bold text-2xl'>{i18('ExchangeListTitle','Cryptocurrency Exchange List')}</h1>
      <p>
        {i18('ExchangeListExplanation', `
        Check out this Cryptocurrency Exchange List with more cryptocurrency
        exchanges and brokers than any other list in the world, including
        information on fees, deposit methods, supported cryptocurrencies and
        much more.
        `)}
      </p>
    </div>

    <div className='flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
              <tr>
                {tabDef.map((col, idx) => (
                  <th
                    key={idx}
                    scope='col'
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ${col.thClass}`}
                  >
                    {i18(col.text)}
                  </th>
                ))}
              </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
              {data.exchanges.map((row: object, rIdx: number) => (
                <tr key={rIdx}>
                  {tabDef.map((col, cIdx) => (
                    <td
                      key={`${rIdx}-${cIdx}`}
                      className={`px-6 py-4 whitespace-nowrap ${col.tdClass}`}
                    >
                      {col.data(row, rIdx)}
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Main>
);

export default Exchanges;
