import React, { useEffect, useContext, useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';

import SearchContext from '../context/SearchContext';
import FilterContext from '../context/FilterContext';

import DealCard from './DealCard';
import Pagination from './Pagination';
import { filterData } from '../utils/filterData';

const DealGrid = ({ deals } : { deals: Deal[] }) => {
  const itemsPerPage = 12;

  const { query } = useContext(SearchContext);
  const { validFilterActive } = useContext(FilterContext);

  const [filteredData, setFilteredDate] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(deals.length / itemsPerPage));

  useEffect(() => {
    const filtered = filterData({ data: deals, query, filterNonValid: validFilterActive });
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setFilteredDate(filtered);
  }, [query]);

  return (
    <>
      <SimpleGrid
        columns={[1, 2, 3, 4]}
        spacing={4}
      >
        {filteredData
          .slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage)
          .map((deal) => (
            <DealCard deal={deal} key={deal.dealId} />
          ))}
      </SimpleGrid>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default DealGrid;
