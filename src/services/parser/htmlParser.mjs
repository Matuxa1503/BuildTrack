import * as cheerio from 'cheerio';
import getTable from './table/getTable.mjs';
import getInfoData from './getInfo.mjs';

export const htmlParser = (html) => {
  const $ = cheerio.load(html);

  const getDataBuild = () => {
    const dataArr = [];
    const count = $('div.content > table > tbody > tr > td > strong').length;

    // write objects data in dataArr
    for (let i = 0; i <= count; i++) {
      const trItem = $('div.content > table > tbody > tr').eq(i);
      const dateBuild = trItem.find('td').eq(1).find("p:contains('Дата начала продаж')");

      if (Boolean(dateBuild.text())) {
        const data = getInfoData(dateBuild, $);
        const table = getTable(dateBuild, $);
        dataArr.push({ data, table });
      }
    }
    return dataArr;
  };
  return getDataBuild();
};
