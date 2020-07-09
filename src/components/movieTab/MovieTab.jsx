import React from 'react';

export const MovieTab = ({ tab, sort_by, updateSortBy }) => {
  const titleString = tab.split('.').filter((el) => el !== 'desc' && el !=='asc').join(' ');
  const title = titleString.charAt(0).toUpperCase() + titleString.slice(1);

  const getClassName = value => {
    return `nav-link movie-link ${sort_by === value ? 'active' : ''}`;
  }

  return (
    <li className="nav-item">
      <div className={getClassName(tab)} onClick={() => updateSortBy(tab)}>{title}</div>
    </li>
  );
};
