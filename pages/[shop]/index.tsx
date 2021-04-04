import React, { useEffect, useContext, useState } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { SimpleGrid } from '@chakra-ui/react';

import SearchContext from '../../context/SearchContext';

import shops from '../../shops';
import DealCard from '../../components/DealCard';
import Pagination from '../../components/Pagination';

const Shop = ({ shopDeals } : { shopDeals: Array<Deal> }) => {
  const itemsPerPage = 18;
  const { filter } = useContext(SearchContext);

  const [filteredData, setFilteredDate] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(shopDeals.length / itemsPerPage));

  useEffect(() => {
    const filtered = shopDeals.filter((deal) => deal.name.toLowerCase().includes(filter)
    || deal.description?.toLowerCase().includes(filter));
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
          .slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
          .map((deal) => (
            <DealCard deal={deal} />
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

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const res = await fetch(`${process.env.API_URL}/${context.params.shop}`);
  const shopDeals: Array<Deal> = await res.json();

  return {
    props: {
      shopDeals,
      key: `/${context.params.shop}`,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = shops.map((shop) => ({ params: { shop } }));
  return {
    paths,
    fallback: false,
  };
};

export default Shop;
