import React from 'react';
import styles from '../ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  tags,
  src,
  largeimg,
  onClickImage,
}) {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        onClick={() => onClickImage(largeimg)}
        src={src}
        alt={tags}
        className={styles.galleryItem}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  largeimg: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
