import React from 'react';
import { useSelector } from 'react-redux';
import style from './suggestions.scss';
import search from 'static/icons/search.svg';

const Suggestions = () => {
  const value = useSelector((state) => state.search.input);
  const suggestions = useSelector((state) => state.search.suggestions);

  return (
    value.length 
      ? <div className={style.wrap}>
          <div className={style.list}>
            <div className={style.helpTitle}><img src={search} /> {value} | Поиск</div>
            {suggestions.map((el, key) => (
              <div className={style.item} key={key}><img src={search} /> {el.name}</div>
            ))}
          </div>
        </div>
      : null
  )
}

export default Suggestions;
