import React from 'react';
import styles from '../Loader/Loader.module.css';
import { BallTriangle } from 'react-loader-spinner';

export default function LoaderSpinner() {
  return (
    <div className={styles.loader}>
      <BallTriangle type="BallTriangle" color="#3f51b5" height={200} width={200} />
    </div>
  );
}
