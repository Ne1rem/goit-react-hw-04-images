import React from 'react';
import PropTypes from 'prop-types';
import styles from '../Button/Button.module.css';

export default function Button({ loadImages }) {
  return (
    <button type="button" className={styles.button} onClick={loadImages}>
      Load more...
    </button>
  );
}

Button.propTypes = {
  loadImages: PropTypes.func.isRequired,
};
