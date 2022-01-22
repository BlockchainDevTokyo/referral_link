import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { graphql } from '../utils/Graphql';
import { i18 } from '../utils/I18';

const query = `
{
  exchanges {
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
  console.log(data);
  return { props: data };
}

interface TableDef {
  data: string | Function;
  text: string;
  thClass: string;
  tdClass: string;
}

interface ExchangeData {
  centralized: boolean;
  country: string;
  name: string;
  image: string;
}

function nomalize(def: Array<any>): Array<TableDef> {
  return def.map((e) => {
    let output = {};
    if (typeof e === 'string') {
      output = { data: e, text: e };
    } else if (Object.keys(e).length === 1) {
      const k = Object.keys(e)[0] ?? '';
      const v = e[k];
      output = { data: k, text: v };
      if (typeof v === 'function') {
        output = { data: v, text: k };
      }
    } else {
      const k: string = e.data;
      e.data = (row: { [index: string]: any }) => row[k] ?? '-';
    }
    console.log(output);
    return { ...{ data: '', text: '', thClass: '', tdClass: '' }, ...output };
  });
}

const tabDef = nomalize([
  {
    name: (row: any) => (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img
            className="h-10 w-10 rounded-full"
            src={row.image}
            alt={row.name}
          />
        </div>
        <div className="ml-4">
          <div className="text-gray-900">{row.name}</div>
        </div>
      </div>
    ),
    // name: 'name',
  },
  'country',
  {
    data: 'description',
    text: 'Description',
    thClass: 'text-gray-500',
    tdClass: 'text-gray-500',
  },
  { _: '#Markets' },
  { _: '#Coins' },
  { _: 'Fiat Supported' },
  {
    '': (row: any) => (
      <a href={row.url} className="text-indigo-600 hover:text-indigo-900">
        {i18('refer', 'Refer')}
      </a>
    ),
  },
]);

const Exchanges = (values: { data: { exchanges: [ExchangeData] } }) => {
  return (
    <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
      <div>
        <h1 className="font-bold text-2xl">
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

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {tabDef.map((colDef, idx) => (
                      <th
                        key={idx}
                        scope="col"
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider uppercase ${colDef.thClass}`}
                      >
                        {i18(colDef.text, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {values.data.exchanges.map(
                    (row: ExchangeData, rIdx: number) => (
                      <tr key={rIdx}>
                        {tabDef.map((colDef: TableDef, cIdx: number) => (
                          <td key={`${rIdx}-${cIdx}`}>
                            {typeof colDef.data !== 'function' &&
                              row[colDef.data as keyof ExchangeData]}
                            {typeof colDef.data === 'function' &&
                              colDef.data(row)}
                          </td>
                        ))}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Exchanges;
