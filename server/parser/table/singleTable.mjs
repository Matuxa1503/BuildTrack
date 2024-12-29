const getSingleTable = (dateBuild) => {
  const tables = dateBuild.closest('td').find('table');

  if (tables.length > 1) {
    return tables.eq(tables.length - 1);
  } else {
    return tables.first();
  }
};

export default getSingleTable;
