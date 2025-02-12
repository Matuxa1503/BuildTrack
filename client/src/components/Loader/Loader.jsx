import s from './Loader.module.css';

const Loader = () => {
  return (
    <>
      <h1 className={s.load}>Загрузка данных...</h1>
      <img className={s.icon} src="https://cdn-icons-png.flaticon.com/512/1623/1623966.png" alt="" />
    </>
  );
};

export default Loader;
