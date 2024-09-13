import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://www.ghb.by/ru/construction/price_apartments/');
    const dataBuild = parseHtml(response.data);
    // const dataBuild = [
    //   {
    //     title: '«Микрорайон многоквартирной жилой застройки в районе улиц Калиновского – Весенней в г. Гродно. Жилой дом № 14»',
    //     dateBuildText: 'Дата начала продаж 13.09.2024г. ',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/6957/',
    //   },
    //   {
    //     title: ' «Застройка территории в районе улиц Соломовой, Хвойной и Фолюш в г. Гродно. Жилой дом № 12»',
    //     dateBuildText: 'Дата начала продаж 03.09.2024г. ',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/6840/',
    //   },
    //   {
    //     title: '«Застройка территории в районе улиц Соломовой, Хвойной и Фолюш в г. Гродно. Жилой дом № 13»',
    //     dateBuildText: 'Дата начала продаж 08.07.2024г.',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/6484/',
    //   },
    //   {
    //     title: '«Жилой дом № 17 в квартале «Грандичи-4» в г. Гродно»',
    //     dateBuildText: 'Дата начала продаж 28.06.2024г.',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/6460/',
    //   },
    //   {
    //     title: '«Застройка территории в районе улиц Соломовой, Хвойной и Фолюш в г. Гродно. Жилой дом № 14»',
    //     dateBuildText: 'Дата начала продаж 04.06.2024г. ',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/6396/',
    //   },
    //   {
    //     title:
    //       '«Застройка территории в районе улиц Соломовой, Хвойной и Фолюш в г. Гродно. Жилой дом № 6 со встроенной детской амбулаторией на 70 посещений в смену» ',
    //     dateBuildText: 'Дата начала продаж 28.05.2024г. ',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/6356/',
    //   },
    //   {
    //     title: '«Жилой дом № 16 в квартале «Грандичи-4» в г. Гродно»',
    //     dateBuildText: 'Дата начала продаж 10.05.2024г.',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/6200/',
    //   },
    //   {
    //     title: '«Застройка территории в районе улиц Соломовой, Хвойной и Фолюш в г. Гродно. Жилой дом № 5»',
    //     dateBuildText: 'Дата начала продаж 03.05.2024г.',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/6172/',
    //   },
    //   {
    //     title: '«Застройка территории в районе улиц Соломовой, Хвойной и Фолюш в г. Гродно. Жилой дом № 9 со встроенными нежилыми помещениями»',
    //     dateBuildText: 'Дата начала продаж 09.01.2024г.',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/5775/',
    //   },
    //   {
    //     title: '«Застройка территории в районе улиц Соломовой, Хвойной и Фолюш в г. Гродно. Жилой дом № 10»',
    //     dateBuildText: 'Дата начала продаж 09.01.2024г.',
    //     link: 'http://www.ghb.by/ru/construction/nedvizhimost-dogovor/5796/',
    //   },
    //   {
    //     title: '«Застройка в г. Минск. Жилой дом № 1»',
    //     dateBuildText: 'Дата начала продаж 01.01.2003г.',
    //     link: 'http://localhost:3000/',
    //   },
    // ];
    let dataFileTxt = '';

    // Если данные пришли с сервера, проверяем пустой у нас data.txt. Если пустой закидываем данные из dataBuild,
    // в противном случае забираем данные с data.txt и сравниваем с данными сервера. Достаем новые элементы если они есть в getNewElementsBuild
    if (dataBuild) {
      dataFileTxt = JSON.parse(await getDataFile(path.join(__dirname, 'src', 'data.txt')));

      if (dataFileTxt === '') {
        writeDataFile(dataBuild);
      } else {
        const newElementsBuild = dataBuild.filter((buildItem) => !dataFileTxt.some((textItem) => textItem.link === buildItem.link));
        writeDataFile(dataBuild);
        res.json({ message: newElementsBuild });
      }
    }
  } catch (err) {
    res.status(400).send('Not Found');
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
        dataArr.push({ title: title.text(), dateBuildText, link });
      }
    }
    return dataArr;
  };

  return getDataBuild();
};

app.listen(5000, () => console.log('Сервер работает'));
