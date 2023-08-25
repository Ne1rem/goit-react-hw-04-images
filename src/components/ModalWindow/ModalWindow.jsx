import React, { useEffect } from 'react';
import styles from '../ModalWindow/ModalWindow.module.css';
import PropTypes from 'prop-types';

const body = document.querySelector('body');

export default function ModalWindow({ src, alt, onClose }) {
  useEffect(() => {
    const handleCloseModal = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    const backDropClick = event => {
      if (event.currentTarget === event.target) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleCloseModal);
    body.classList.add('no-scroll');

    return () => {
      window.removeEventListener('keydown', handleCloseModal);
      body.classList.remove('no-scroll');
    };
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={this.backDropClick}>
      <div className={styles.modalOpen}>
        <img className={styles.modalImg} src={src} alt={alt} />
      </div>
    </div>
  );
}

ModalWindow.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
