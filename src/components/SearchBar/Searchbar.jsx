import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../SearchBar/Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (searchInput.trim() === '') {
      return toast.error('Please enter a search term');
    }
    onSubmit(searchInput);
    setSearchInput('');
  };

  const handleChange = event => {
    setSearchInput(event.currentTarget.value.toLowerCase());
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchButton}>
          <span className={styles.searchButtonLabel}>Search</span>
        </button>
        <input
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchInput}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
