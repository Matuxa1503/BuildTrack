const elemsFromData = (parsedData, readData) => {
  return parsedData.filter((buildItem) => !JSON.parse(readData).some((textItem) => textItem.data.link === buildItem.data.link));
};

export default elemsFromData;
