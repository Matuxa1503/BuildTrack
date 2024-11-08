import oneTable from './onceTable.mjs';
import headSubHeadData from './headSubHeadData.mjs';
import rowsTable from './rowsTable.mjs';

const getTable = (dateBuild, $) => {
  const tableData = {
    header: '',
    subHeader: '',
    rows: '',
  };

  const table = oneTable(dateBuild);

  // header
  const headData = headSubHeadData(table, $, 0);
  tableData.header = headData;

  // subHeader
  const subHeadData = headSubHeadData(table, $, 1);
  tableData.subHeader = subHeadData;

  // rows
  const rowsData = rowsTable(table, $);
  tableData.rows = rowsData;

  return tableData;
};

export default getTable;
