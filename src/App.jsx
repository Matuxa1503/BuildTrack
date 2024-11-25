import axios from 'axios';
import s from './App.module.css';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import AppInfo from './AppInfo';
import AppTable from './AppTable';
import Button from './Button';
import { useSearchParams } from 'react-router-dom';

const App = () => {
  const [item, setItem] = useState(null);
  const [searchParams] = useSearchParams();

  const itemLink = decodeURIComponent(searchParams.get('link'));
  const userId = decodeURIComponent(searchParams.get('user'));

  const getElemFromDb = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost:5000/itemUser', { userId, itemLink }); // for security use POST instead GET
      setItem(response.data.message);
    } catch (err) {
      console.log(err);
    }
  }, [userId, itemLink]);

  useEffect(() => {
    getElemFromDb();
  }, [getElemFromDb]);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {item ? (
          <>
            <AppInfo data={item.data} />
            <AppTable table={item.table} />
            <Button content={'Клик для подробной информации'} link={item.data.link} />
          </>
        ) : (
          <>
            <h1 className={s.load}>Загрузка данных...</h1>
            <img className={s.icon} src="https://cdn-icons-png.flaticon.com/512/1623/1623966.png" alt="" />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
