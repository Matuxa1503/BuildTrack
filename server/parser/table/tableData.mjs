import getSingleTable from './singleTable.mjs';
import getHeaders from './extractHeaders.mjs';
import getTableRows from './tableRows.mjs';

const getTable = (dateBuild, $) => {
  const tableData = {
    header: '',
    subHeader: '',
    rows: '',
  };

  const table = getSingleTable(dateBuild);

  // header
  const headData = getHeaders(table, $, 0);
  tableData.header = headData;

  // subHeader
  const subHeadData = getHeaders(table, $, 1);
  tableData.subHeader = subHeadData;

  // rows
  const rowsData = getTableRows(table, $);
  tableData.rows = rowsData;

  return tableData;
};

export default getTable;
