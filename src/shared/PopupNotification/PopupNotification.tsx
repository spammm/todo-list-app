import { ReactNode } from 'react';
import style from './PopupNotification.module.scss';

interface NotificationProps {
  title?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
  icon?: ReactNode;
}

const PopupNotification: React.FC<NotificationProps> = ({
  children,
  title,
  onClose,
  icon = '⚠',
}) => {
  return (
    <div className={style.notification} onClick={onClose}>
      <div className={style.wrapper}>
        <div className={style.ico}> {icon} </div>
        <div className={style.content}>
          <b>{title}</b>
          {children}
        </div>
        <div className={style.control}>❌</div>
      </div>
    </div>
  );
};

export default PopupNotification;
