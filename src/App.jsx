import axios from 'axios';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);

  const getLastElementData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/last-element');
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

  return (
    <div>
      {data ? (
        <>
          <h1>{data.title}</h1>
          <h2>{data.dateBuildText}</h2>
          <a href={data.link}>Клик для подробной информации</a>
        </>
      ) : (
        <h1>Данных нет</h1>
      )}
    </div>
  );
};

export default App;
