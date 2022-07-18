import React, { useEffect, useContext, useState } from 'react';
import { SimpleGrid, useBreakpointValue, Skeleton } from '@chakra-ui/react';

import SearchContext from '../context/SearchContext';
import FilterContext from '../context/FilterContext';

import DealCard from './DealCard';
import Pagination from './Pagination';
import { filterData } from '../utils/filterData';

const DealGrid = ({ deals }: { deals: Deal[] }) => {
  const itemsPerPage = useBreakpointValue({
    base: 9, sm: 10, md: 9, lg: 12,
  }) ?? 12;

  const { query } = useContext(SearchContext);
  const { validFilterActive } = useContext(FilterContext);

  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState<Deal[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(deals.length / itemsPerPage));

  useEffect(() => {
    const filtered = filterData({ data: deals, query, filterNonValid: validFilterActive });
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setFilteredData(filtered);
  }, [query, validFilterActive]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <SimpleGrid
        columns={[1, 2, 3, 4]}
        spacing={4}
      >
        {loading ? (
          [...Array(itemsPerPage)].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton height={242} key={index} />
          ))
        ) : filteredData.length < 1 ? (
          <h2>
            Keine Angebote gefunden
          </h2>
        ) : (
          filteredData
            .slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage)
            .map((deal) => (
              <DealCard deal={deal} key={deal.dealId} />
            ))
        )}
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
