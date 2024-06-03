import style from './JustButton.module.scss';

interface JustButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode | string | undefined;
}

const JustButton: React.FC<JustButtonProps> = ({ children, ...props }) => {
  return (
    <button className={style.button} {...props}>
      {children}
    </button>
  );
};

export default JustButton;
