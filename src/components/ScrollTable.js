import React, { useMemo } from "react";
import Table from "./Table";

const TableSection = React.memo(({ data }) => {
  const column =
    data.length > 0 &&
    Object.keys(data[0]).map((key) => {
      return {
        Header: data[0][key],
        accessor: key,
      };
    });
  const columns = useMemo(() => column, [column]);
  const queryData = useMemo(() => data.slice(1), [data]);
  
  return (
    <div className="col-start-2 col-end-3 row-start-3 row-end-4 text-white m-6">
          <Table columns={columns} data={queryData} />
    </div>
  );
});

export default TableSection;