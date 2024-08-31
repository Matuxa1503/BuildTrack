import axios from 'axios';
import * as cheerio from 'cheerio';

const getHTML = async (dataUrl) => {
  const response = await axios.get(dataUrl);
  const $ = cheerio.load(response.data);

  const getDateBuild = () => {
    const dataArr = [];
    const countAnnounc = $('div.content > table > tbody > tr > td > strong').length;
    for (let i = 0; i <= countAnnounc; i++) {
      const trItem = $('div.content > table > tbody > tr').eq(i);
      const dateBuild = trItem.find('td').eq(1).find("p:contains('Дата начала продаж')");
      const dateBuildText = dateBuild.text();

      if (Boolean(dateBuildText)) {
        const title = dateBuild.siblings().find('h3 a');
        const link = title.attr('href');
        dataArr.push({ title: title.text(), dateBuildText, link });
      }
    }
    console.log(dataArr);
  };
  getDateBuild();
};

getHTML('http://www.ghb.by/ru/construction/price_apartments/');
