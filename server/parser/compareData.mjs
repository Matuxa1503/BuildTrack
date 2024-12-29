const compareData = (parsedData, dataDB) => {
  return parsedData.filter((buildItem) => !dataDB.some((textItem) => textItem.data.link === buildItem.data.link));
};

export default compareData;
