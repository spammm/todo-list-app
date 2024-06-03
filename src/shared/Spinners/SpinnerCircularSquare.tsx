import style from './SpinnerCircularSquare.module.scss';

const SpinnerCircularSquare: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default SpinnerCircularSquare;
