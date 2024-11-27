const headSubHeadData = (table, $, i) => {
  const arr = [];
  let tr;
  i === 0 ? (tr = table.find('tbody').find('tr').eq(0)) : (tr = table.find('tbody').find('tr').eq(1));

  tr.find('th').each((_, el) => {
    const th = $(el).text().replace(/\n/g, '');
    arr.push({ text: th });
  });

  return arr;
};

export default headSubHeadData;
