const compareData = (parsedData, userData) => {
  return parsedData.filter((buildItem) => !userData.some((textItem) => textItem.data.link === buildItem.data.link));
};

export default compareData;
