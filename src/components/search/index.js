import React from 'react';
import Input from './parts/input';
import Suggestions from './parts/suggestions';
import style from './style.scss';

const Search = () => {
  return (
    <div className={style.wrap}>
      <Input />
      <Suggestions />
    </div>
  )
}

export default Search;
