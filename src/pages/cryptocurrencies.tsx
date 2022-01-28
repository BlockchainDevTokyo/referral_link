import React, { useState, useEffect } from 'react';
import { Main } from '../templates/Main';
import { graphql } from '../utils/Graphql';
import { i18 } from '../utils/I18';
import { RemoteDataTable } from '../templates/RemoteDataTable';

const sql = `
query ($sortBy: CryptocurrencySortByInput) {
  cryptocurrencies(sortBy: $sortBy) {
    id
    name
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
  const arr = res.data.cryptocurrencies;
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
    name: i18('id', 'id'),
    selector: row => row.id,
    sortable: true,
    sortValue: 'id'
  }
];

const Cryptocurrencies = (res) => {
  console.log('ma no', res);
  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };
  const stopLoading = () => {
    setLoading(false);
  };

  return (
    <Main>
      <div>
        Cryptocurrencies page
      </div>

      <div className='flex flex-col'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='relative shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <div className='bg-gray-50 w-full h-full z-40 absolute' hidden={!loading}>
                <img className='w-40 h-20 mx-auto my-10' src='https://cutewallpaper.org/21/loading-animated-gif-transparent-background/Animated-Loading-Gif-Transparent-Background.gif'/>
              </div>
              <RemoteDataTable
                columns={columns}
                rows={res}
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
