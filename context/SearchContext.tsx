/* eslint-disable no-console */
import React, { createContext, useState } from 'react';

const SearchContext = createContext(undefined);

const SearchProvider = ({ children }) => {
  const [filter, setFilter] = useState('');

  return (
    <SearchContext.Provider value={{
      filter, setFilter,
    }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
export { SearchProvider };
