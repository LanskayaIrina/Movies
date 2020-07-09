import React from 'react';

import { MovieTab } from './MovieTab';

export const MovieTabs = ({sort_by, updateSortBy}) => {
  const tabs = [
    { id: 1, title: 'popularity.desc' },
    { id: 2, title: 'vote_average.desc' },
    { id: 3, title: 'revenue.desc' },
  ];
  return (
    <ul className="tabs nav nav-pills mb-3">
      {tabs.map(tab =>
        <MovieTab key={tab.id} tab={tab.title} sort_by={sort_by} updateSortBy={updateSortBy} />
      )}
    </ul>
  );
};
