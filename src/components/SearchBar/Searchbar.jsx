import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../SearchBar/Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    searchInput: '',
  };
  handlerSubmit = event => {
    event.preventDefault();
    if (this.state.searchInput.trim() === '') {
      return toast.error('Please enter request');
    }
    this.props.onSubmit(this.state.searchInput);
    this.setState({ searchInput: '' });
  };
  handlerChange = event => {
    this.setState({ searchInput: event.currentTarget.value.toLowerCase() });
  };
  render() {
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handlerSubmit} className={styles.searchForm}>
          <button type="submit" className={styles.searchButton}>
            <span className={styles.searchButtonLabel}>Search</span>
          </button>
          <input
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchInput}
            onChange={this.handlerChange}
          />
        </form>
      </header>
    );
  }
}
