import axios from 'axios';
import s from './App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import AppInfo from './AppInfo';
import AppTable from './AppTable';
import Button from './Button';

const App = () => {
  const [item, setItem] = useState(null);

  const getLastElementData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/last');
      setItem(response.data.message);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLastElementData();
  }, []);

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
