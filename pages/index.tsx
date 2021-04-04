import React, { useContext, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { SimpleGrid } from '@chakra-ui/react';

import SearchContext from '../context/SearchContext';

import DealCard from '../components/DealCard';
import Pagination from '../components/Pagination';
import { filterData } from '../utils/filterData';

const itemsPerPage = 18;

export default function Home({ deals }) {
  const { filter } = useContext(SearchContext);

  const [filteredData, setFilteredDate] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(deals.length / itemsPerPage));

  useEffect(() => {
    const filtered = filterData(deals, filter);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setFilteredDate(filtered);
  }, [filter]);

  return (
    <>
      <SimpleGrid
        columns={6}
        spacing={4}
      >
        {filteredData
          .slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage)
          .map((deal) => (
            <DealCard key={deal.dealId} deal={deal} />
          ))}
      </SimpleGrid>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.API_URL}/`);
  const deals = await res.json();
  return {
    props: {
      deals,
    },
    revalidate: 304800, // halbe Woche, ganze Woche ist 604800
  };
};
