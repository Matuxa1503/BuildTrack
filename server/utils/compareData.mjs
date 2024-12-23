const compareData = (parsedData, dataBD) => {
  return parsedData.filter((buildItem) => !dataBD.some((textItem) => textItem.data.link === buildItem.data.link));
};

export default compareData;
