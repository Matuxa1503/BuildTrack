import { useSearchParams } from 'react-router-dom';
import AppInfo from './components/AppInfo/AppInfo';
import AppTable from './components/AppTable/AppTable';
import Button from './components/Button/Button';
import LoadIcon from './components/LoadIcon/LoadIcon';
import { getElemFromDbAPI } from './api/api.mjs';
import useFetchItem from './hooks/useFetchItem';
import g from './styles/Global.module.css';

const App = () => {
  const [searchParams] = useSearchParams();
  const itemLink = decodeURIComponent(searchParams.get('link'));

  const elem = async () => await getElemFromDbAPI(itemLink);
  console.log('App', elem);

  const { item, isLoading, error } = useFetchItem(elem);

  return (
    <div className={g.wrapper}>
      <div className={g.container}>
        {isLoading ? (
          <>
            <h1 className={g.load}>Загрузка данных...</h1>
            <LoadIcon />
          </>
        ) : error ? (
          <>
            <h1 className={g.load}>Ошибка: {error}</h1>
          </>
        ) : item ? (
          <>
            <AppInfo data={item.data} />
            <AppTable table={item.table} />
            <Button content={'Подробная информация'} link={item.data.link} />
          </>
        ) : (
          <h1 className={g.load}>Данные не найдены</h1>
        )}
      </div>
    </div>
  );
};

export default App;
