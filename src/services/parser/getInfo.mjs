const getInfoData = (dateBuild, $) => {
  const title = dateBuild.siblings().find('h3 a');
  const link = title.attr('href');

  const paragraphs = dateBuild.prevAll('p').slice(0, 3);
  const someInfoBuild = paragraphs
    .map((index, element) => {
      return $(element).text().trim();
    })
    .get() // get() преобразует jQuery объект в обычный массив
    .reverse();

  return { title: title.text().trim(), dateBuild: dateBuild.text().trim(), link, someInfoBuild };
};

export default getInfoData;
