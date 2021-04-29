/* eslint-disable no-console */
import React, { createContext, useState } from 'react';

const FilterContext = createContext(undefined);

const FilterProvider = ({ children }) => {
  const [validFilterActive, setValidFilterActive] = useState(false);

  return (
    <FilterContext.Provider value={{
      validFilterActive, setValidFilterActive,
    }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
export { FilterProvider };
