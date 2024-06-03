import React from 'react';
import { Outlet } from 'react-router-dom';
import MainMenu from '../../widgets/MainMenu';
import styles from './wrapperPage.module.scss';

const WrapperPage: React.FC = () => {
  return (
    <div className={styles.notebook}>
      <div className={styles.notebook_inner}>
        <div className={styles.content}>
          <MainMenu />
          <Outlet />
        </div>
      </div>
      <div className={styles.stepler}></div>
    </div>
  );
};

export default WrapperPage;
