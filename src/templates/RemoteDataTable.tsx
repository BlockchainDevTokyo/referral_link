import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import DataTable from 'react-data-table-component';


const RemoteDataTable = (props) => {
  console.log(props);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const currentRowPerPage = router.query.rowPerPage || 5;

  const startLoading = props.startLoading ?? (() => setLoading(true));
  const stopLoading = props.stopLoading ?? (() => setLoading(false));

  useEffect(() => {
    // Router event handler
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);
    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);

  const fetchData = pInfo => {
    const path = router.pathname;
    const query = Object.assign(router.query, pInfo);
    console.log('request ', query);
    router.replace({
      pathname: path,
      query: query
    });
  };

  const handleSort = (column, direction) => {
    fetchData({ sortDirection: direction, sortColumn: column.sortValue, page: 1 });
  };

  const handleRowsPerPageChange = (newRowPerPage, page) => {
    fetchData({ page: page, rowPerPage: newRowPerPage });
  };

  const handlePageChange = page => {
    fetchData({ page: page });
  };

  const [data, setData] = useState();
  useEffect(() => {
    if (!router.query.page) {
      fetchData({ page: 1, rowPerPage: currentRowPerPage });
    } else {
      setData(props.rows.data);
    }
  });

  return (
    <DataTable
      columns={props.columns}
      data={data}
      onSort={handleSort}
      sortServer
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={props.rows.total}
      paginationPerPage={currentRowPerPage}
      paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
      onChangeRowsPerPage={handleRowsPerPageChange}
      onChangePage={handlePageChange}
    />
  );
};
export { RemoteDataTable };
