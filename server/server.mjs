import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://www.ghb.by/ru/construction/price_apartments/');
    const dataBuild = parseHtml(response.data);

    // данные текстового файла data.txt
    let dataFileTxt = '';

    // Если данные пришли с сервера, проверяем пустой ли у нас data.txt. Если пустой закидываем данные из dataBuild,
    // в противном случае забираем данные с data.txt и сравниваем с данными сервера. Достаем новые элементы если они есть в getNewElementsBuild
    if (dataBuild) {
      const dataFile = await getDataFile(path.join(__dirname, 'src', 'data.txt'));
      dataFileTxt = dataFile ? JSON.parse(dataFile) : '';

      if (dataFileTxt === '') {
        writeDataFile(dataBuild);
      } else {
        const newElementsBuild = dataBuild.filter((buildItem) => !dataFileTxt.some((textItem) => textItem.link === buildItem.link));
        writeDataFile(dataBuild);
        res.json({ message: newElementsBuild });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send('Not Found');
  }
});

app.get('/last-element', async (req, res) => {
  try {
    let lastElementData;
    const getData = await getDataFile(path.join(__dirname, 'src', 'data.txt'));

    lastElementData = getData ? JSON.parse(getData)[0] : '';
    res.json({ message: lastElementData });
  } catch (err) {
    console.log(err);
  }
});

const writeDataFile = async (data) => {
  try {
    await fs.writeFile(path.join(__dirname, 'src', 'data.txt'), JSON.stringify(data), 'utf-8');
  } catch (err) {
    return console.log(err);
  }
};

const getDataFile = async (path) => {
  try {
    const dataFile = await fs.readFile(path, 'utf-8');
    return dataFile;
  } catch (err) {
    console.log(err);
    return '';
  }
};

const parseHtml = (data) => {
  const $ = cheerio.load(data);

  const getDataBuild = () => {
    const dataArr = [];
    const countAnnounc = $('div.content > table > tbody > tr > td > strong').length;
    for (let i = 0; i <= countAnnounc; i++) {
      const trItem = $('div.content > table > tbody > tr').eq(i);
      const dateBuild = trItem.find('td').eq(1).find("p:contains('Дата начала продаж')");
      const dateBuildText = dateBuild.text();

      if (Boolean(dateBuildText)) {
        const title = dateBuild.siblings().find('h3 a');
        const link = title.attr('href');
        const threePrevious = dateBuild.prevAll('p').slice(0, 3);
        const someInfoBuild = threePrevious
          .map((index, element) => {
            return $(element).text().trim();
          })
          .get() // get() преобразует jQuery объект в обычный массив
          .reverse();
        dataArr.push({ title: title.text(), dateBuildText, link, moreInfo: someInfoBuild });
      }
    }
    return dataArr;
  };
  return getDataBuild();
};

app.listen(5000, () => console.log('Сервер работает'));
