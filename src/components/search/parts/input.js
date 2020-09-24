import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchInput } from '../actions';
import style from './input.scss';
import searchIcon from 'static/icons/search.svg';
import closeIcon from 'static/icons/close.svg';
const Input = () => {
  const value = useSelector((state) => state.search.input);
  
  const dispatch = useDispatch();
  const change = (e) => {
    dispatch(updateSearchInput(e.target.value));
  }
  const submit = (e) => {
    e.preventDefault();
    console.log('submit');
  }
  const clearValue = () => {
    dispatch(updateSearchInput(''));
  }

  return (
    <form className={style.searchWrap} onSubmit={submit}>
      <img className={style.searchIcon} src={searchIcon} />
      <input
          className={style.searchInput}
          value={value}
          placeholder={'Поиск по магазину'}
          type="text"
          onChange={change}
      />
      {value.length ? <img onClick={clearValue} className={style.closeIcon} src={closeIcon} /> : null}
    </form>
  )
}

export default Input;
