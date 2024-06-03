import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalWindow.module.scss';

interface ModalWindowProps {
  children: React.ReactNode;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root');

const ModalWindow: React.FC<ModalWindowProps> = ({ children, onClose }) => {
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modal_close} onClick={onClose}>
          &#10006;
        </button>
        <div className={styles.modal_content}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalWindow;
