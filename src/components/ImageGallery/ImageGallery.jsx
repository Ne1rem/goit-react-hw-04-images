import React from 'react';
import styles from '../ImageGallery/ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, onClickImage }) {
  return (
    <ul className={styles.imageGallery}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            tags={tags}
            src={webformatURL}
            largeimg={largeImageURL}
            onClickImage={onClickImage}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onClickImage: PropTypes.func.isRequired,
};
