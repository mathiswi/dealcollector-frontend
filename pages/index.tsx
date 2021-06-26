import React from 'react';
import { GetStaticProps } from 'next';

import DealGrid from '../components/DealGrid';

const Home = ({ deals }) => (
  <DealGrid deals={deals} />
);

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.API_URL}/`);
  const deals = await res.json();
  return {
    props: {
      deals,
    },
    revalidate: 3600, // full week
  };
};

export default Home;
