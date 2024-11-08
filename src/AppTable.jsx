import s from './App.module.css';

const AppTable = ({ table }) => {
  const header = table.header;
  const rowsArr = table.rows.map((item, i) => {
    return (
      <tr key={i}>
        <td>{item.floor}</td>
        <td>{item.unit}</td>
        {item.prices.map((price, i) => {
          return <td key={i}>{price}</td>;
        })}
      </tr>
    );
  });

  const thArr = table.subHeader.map((item, i) => {
    return (
      <th key={i} className={s.thUpper}>
        {item.text}
      </th>
    );
  });

  return (
    <>
      <h3 className={s.subtitle}>Таблица цен</h3>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th rowSpan="2">{header[0].text}</th>
            <th rowSpan="2">{header[1].text}</th>
            <th colSpan={table.subHeader.length} rowSpan="1">
              {header[2].text}
            </th>
          </tr>
          <tr>{thArr}</tr>
        </thead>
        <tbody>{rowsArr}</tbody>
      </table>
    </>
  );
};

export default AppTable;
