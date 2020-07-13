import React from 'react';

import { func, string } from 'prop-types';

const classNames = require('classnames');

const formatTitle = title => {
  const sortTitle = title
    .split('.')
    .filter((el) => el !== 'desc' && el !== 'asc')
    .join(' ');

  return sortTitle.charAt(0).toUpperCase() + sortTitle.slice(1);
}

export const MovieTab = ({ tab, sortBy, onClickByTab }) => {
  const title = formatTitle(tab);
  const btnTab = classNames('nav-link', 'movie-link', 'btn-font', {
    'active': sortBy === tab,
  })

  return (
    <li className="nav-item">
      <div className={btnTab} onClick={() => onClickByTab(tab)}>{title}</div>
    </li>
  );
};

MovieTab.propTypes = {
  tab: string.isRequired,
  sortBy: string.isRequired,
  onClickByTab: func.isRequired,
};
