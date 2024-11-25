import s from './styles/App.module.css';

const Button = ({ content, link }) => {
  return (
    <a className={s.btn} href={link}>
      {content}
    </a>
  );
};

export default Button;
