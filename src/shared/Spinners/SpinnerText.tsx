import style from './SpinnerText.module.scss';

interface SpinnerTextProps {
  text: string;
}

const SpinnerText: React.FC<SpinnerTextProps> = ({ text = 'Loading...' }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.loader} data-text={text}></div>
    </div>
  );
};

export default SpinnerText;
