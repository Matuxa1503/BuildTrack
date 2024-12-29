import s from './AppInfo.module.css';
import g from '../../styles/Global.module.css';

const AppInfo = ({ data }) => {
  let paragraphs;
  paragraphs = data.someInfoBuild.map((item, i) => {
    return (
      <p key={i} className={`${s.info} ${s[`info-${i}`]}`}>
        {item}
      </p>
    );
  });

  return (
    <>
      <h1 className={g.title}>{data.title}</h1>
      <h2 className={g.subtitle}>{data.dateBuild}</h2>
      {paragraphs}
    </>
  );
};

export default AppInfo;
