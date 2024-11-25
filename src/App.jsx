import s from './styles/App.module.css';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import AppInfo from './AppInfo';
import AppTable from './AppTable';
import Button from './Button';
import { useSearchParams } from 'react-router-dom';
import { getElemFromDbAPI } from './api/api.mjs';

const App = () => {
  const [item, setItem] = useState(null);
  const [searchParams] = useSearchParams();

  const itemLink = decodeURIComponent(searchParams.get('link'));
  const userId = decodeURIComponent(searchParams.get('user'));

  const fetchData = useCallback(async () => {
    try {
      const response = await getElemFromDbAPI(userId, itemLink);
      setItem(response.data.message);
    } catch (err) {
      console.log(err);
    }
  }, [userId, itemLink]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
