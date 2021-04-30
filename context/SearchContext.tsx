import React, { createContext, useState } from 'react';

const SearchContext = createContext(undefined);

const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{
      query, setQuery,
    }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
export { SearchProvider };
