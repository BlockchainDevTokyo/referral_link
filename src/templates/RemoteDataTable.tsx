import React, { useState, useEffect } from 'react';

import Router, { useRouter } from 'next/router';
import DataTable from 'react-data-table-component';

// interface RemoteDataTableData {
//   column: TableColumn<any>;
//   startLoading: boolean;
//   stopLoading: boolean;
// }

const RemoteDataTable = (props: any) => {
  // console.log(props);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const currentRowPerPage: any = router.query.rowPerPage || 5;

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
  });

  const fetchData = (pInfo: any) => {
    const path = router.pathname;
    const query = Object.assign(router.query, pInfo);
    router.replace({
      pathname: path,
      query,
    });
  };

  const handleSort = (column: any, direction: any) => {
    fetchData({
      sortDirection: direction,
      sortColumn: column.sortValue,
      page: 1,
    });
  };

  const handleRowsPerPageChange = (newRowPerPage: any, page: any) => {
    fetchData({ page, rowPerPage: newRowPerPage });
  };

  const handlePageChange = (page: any) => {
    fetchData({ page });
  };

  const [data, setData] = useState<any>();
  useEffect(() => {
    if (!router.query.page) {
      fetchData({ page: 1, rowPerPage: currentRowPerPage });
    } else {
      setData(props.rows);
    }
  }, []);

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
