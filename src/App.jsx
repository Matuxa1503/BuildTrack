import axios from 'axios';
import s from './App.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);

  const getLastElementData = async () => {
    try {
      const response = await axios.get('https://dc57c1981a3b6b5e92aadec8e5e55385.serveo.net/last-element');
      setData(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLastElementData();

    const interval = setInterval(() => {
      getLastElementData();
    }, 30000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  let paragraphs;

  data
    ? (paragraphs = data.moreInfo.map((item, i) => {
        return (
          <p className={`${s.info} ${s[`info-${i}`]}`} key={i}>
            {item}
          </p>
        );
      }))
    : (paragraphs = null);

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        {data ? (
          <>
            <h1 className={s.title}>{data.title}</h1>
            <h2 className={s.subtitle}>{data.dateBuildText}</h2>
            {paragraphs}
            <a className={s.btn} href={data.link}>
              Клик для подробной информации
            </a>
          </>
        ) : (
          <h1 className={s.load}>Загрузка данных...</h1>
        )}
      </div>
    </div>
  );
};

export default App;
