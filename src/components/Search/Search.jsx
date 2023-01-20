import React, { useCallback, useContext, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { AppContext } from '../../App';
import css from './Search.module.css';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice';

function Search() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { searchValue, setSearchValue } = useContext(AppContext);
  const [value, setValue] = useState('');

  function handleInput(evt) {
    setValue(evt.target.value);
    handleSearch(value);
    dispatch(setCategoryId(0));
  }

  function handleClearInput() {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }

  const handleSearch = useCallback(
    debounce(str => setSearchValue(str), 300),
    []
  );

  return (
    <div className={css.search}>
      <svg className={css.iconsearch} xmlns="http://www.w3.org/2000/svg" fill="#7b7b7b">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
      {searchValue !== '' && (
        <button onClick={handleClearInput} className={css.clear} type="button">
          <svg className={css.iconclose} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <g>
              <path d="M22.3,81.9C6.1,65.8,6,39,22.5,22.5C39.1,5.9,65.6,5.9,81.9,22.3L500,440.3L918.1,22.3c16.1-16.1,43-16.3,59.5,0.2c16.6,16.6,16.6,43.1,0.2,59.5L559.7,500l418.1,418.1c16.1,16.1,16.3,43-0.2,59.5c-16.6,16.6-43.1,16.6-59.5,0.2L500,559.7L81.9,977.7c-16.1,16.1-43,16.3-59.5-0.2c-16.6-16.6-16.6-43.1-0.2-59.5L440.3,500L22.3,81.9z" />
            </g>
          </svg>
        </button>
      )}
      <input
        ref={inputRef}
        value={value}
        onChange={handleInput}
        className={css.input}
        placeholder="Пошук піци..."
      />
    </div>
  );
}
export default Search;
