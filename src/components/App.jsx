import React, { useState, useEffect } from 'react';
import PixaBay from '../API/PixaBay';
import Searchbar from './SearchBar/Searchbar';
import ModalWindow from './ModalWindow/ModalWindow';
import ImageGallery from './ImageGallery/ImageGallery';
import LoaderSpinner from './Loader/Loader';
import Button from './Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeimg, setLargeImg] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      if (!searchInput) {
        setImages([]);
        return;
      }

      setIsLoading(true);
      try {
        const { hits } = await PixaBay.fetchImages(searchInput, page);
        if (hits.length === 0) {
          setError(`Could not find images for "${searchInput}"`);
        } else {
          setError(null);
          setImages(prevImages => [...prevImages, ...hits]);
        }
      } catch (error) {
        setError('An error occurred while fetching images');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchInput, page]);

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSearch = newSearchInput => {
    setSearchInput(newSearchInput);
    setPage(1);
    setError(null);
  };

  const modalWindowOpen = largeimg => {
    setLargeImg(largeimg);
  };

  const modalWindowClose = () => {
    setLargeImg('');
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={onSearch} />
      {isLoading && <LoaderSpinner />}
      {images.length > 0 && !error && (
        <ImageGallery onClickImage={modalWindowOpen} images={images} />
      )}
      {images.length >= 12 * page && <Button loadImages={onLoadMore} />}
      {largeimg && (
        <ModalWindow onClose={modalWindowClose} src={largeimg} />
      )}
      {error && <p className={styles.error}>{error}</p>}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
