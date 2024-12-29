import * as cheerio from 'cheerio';
import getInfoBuilding from './infoBuilding.mjs';
import getTable from './table/tableData.mjs';

export const htmlParser = (html) => {
  const $ = cheerio.load(html);

  const getDataBuild = () => {
    const dataArr = [];
    const count = $('div.content > table > tbody > tr > td > strong').length;

    // write object data in dataArr
    for (let i = 0; i <= count; i++) {
      const trItem = $('div.content > table > tbody > tr').eq(i);
      const dateBuild = trItem.find('td').eq(1).find("p:contains('Дата начала продаж')");

      if (Boolean(dateBuild.text())) {
        const data = getInfoBuilding(dateBuild, $);
        const table = getTable(dateBuild, $);
        dataArr.push({ data, table });
      }
    }
    return dataArr.reverse();
  };
  return getDataBuild();
};
