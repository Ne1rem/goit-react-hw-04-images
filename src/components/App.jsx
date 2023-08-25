import { Component } from 'react';
import PixaBay from '../API/PixaBay';
import Searchbar from './SearchBar/Searchbar';
import ModalWindow from './ModalWindow/ModalWindow';
import ImageGallery from './ImageGallery/ImageGallery';
import LoaderSpinner from './Loader/Loader';
import Button from './Button/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';

class App extends Component {
  state = {
    searchInput: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    largeimg: '',
  };

  componentDidUpdate(_, prevState) {
    const previousInput = prevState.searchInput;
    const nextInput = this.state.searchInput;
    const previousPage = prevState.page;
    const nextPage = this.state.page;

    if (previousInput !== nextInput || previousPage !== nextPage) {
      
      // Очищаем список изображений при новом поисковом запросе
      if (previousInput !== nextInput) {
        this.setState({ images: [] });
      }

      this.setState({ isLoading: true });
      PixaBay.fetchImages(nextInput, nextPage)
        .then(({ hits }) => {
          if (hits.length === 0) {
            return this.setState({
              status: 'rejected',
              error: `could not find image by request ${nextInput}`,
            });
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: 'resolved',
          }));
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  onSearch = searchInput => {
    this.setState({ searchInput, page: 1, error: null });
  };

  scroll = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 1000);
  };

  modalWindowOpen = largeimg => {
    this.setState(() => ({
      largeimg: largeimg,
    }));
  };

  modalWindowClose = () => {
    this.setState({
      largeimg: '',
    });
  };

  render() {
    const { images, error, largeimg, isLoading, page } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onSearch} />
        {isLoading && <LoaderSpinner />}
        {images.length > 0 && !error && (
          <ImageGallery onClickImage={this.modalWindowOpen} images={images} />
        )}
        {images.length >= 12 * page && <Button loadImages={this.onLoadMore} />}
        {largeimg && (
          <ModalWindow onClose={this.modalWindowClose} src={largeimg} />
        )}
        {error && <p className={styles.error}>{error}</p>}
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

export default App;
