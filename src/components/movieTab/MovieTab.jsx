import React from 'react';
const classNames = require('classnames');

export const MovieTab = ({ tab, sort_by, updateSortBy }) => {
  const titleString = tab.split('.').filter((el) => el !== 'desc' && el !=='asc').join(' ');
  const title = titleString.charAt(0).toUpperCase() + titleString.slice(1);
  const activeClass = (sort_by === tab) ? true : false
  const btnTab = classNames({
   'nav-link': true,
   'movie-link': true,
   'active': activeClass
  })

  return (
    <li className="nav-item">
      <div className={btnTab} onClick={() => updateSortBy(tab)}>{title}</div>
    </li>
  );
};
