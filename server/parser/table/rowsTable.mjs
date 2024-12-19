const rowsTable = (table, $) => {
  const arr = [];

  table
    .find('tbody')
    .find('tr')
    .slice(2)
    .each((i, el) => {
      const floor = $(el).find('td').eq(0).text().trim();
      const unit = $(el).find('td').eq(1).text().trim();
      const prices = [];
      $(el)
        .find('td')
        .slice(2)
        .each((index, priceEl) => {
          const price = $(priceEl).text().trim();
          prices.push(price);
        });
      arr.push({ floor, unit, prices });
    });

  return arr;
};

export default rowsTable;
