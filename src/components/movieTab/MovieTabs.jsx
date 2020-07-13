import React from 'react';
import { string, func } from 'prop-types';

import { MovieTab } from './MovieTab';

const tabs = [
  { id: 1, title: 'popularity.desc' },
  { id: 2, title: 'vote_average.desc' },
  { id: 3, title: 'revenue.desc' },
];

export const MovieTabs = ({ sortBy, updateSortBy }) => {

  return (
    <ul className="tabs nav nav-pills">
      {tabs.map(tab =>
        <MovieTab key={tab.id} tab={tab.title} sortBy={sortBy} onClickByTab={updateSortBy} />
      )}
    </ul>
  );
};

MovieTabs.propTypes = {
  sortBy: string.isRequired,
  updateSortBy: func.isRequired,
};
