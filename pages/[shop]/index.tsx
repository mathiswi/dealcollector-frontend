import React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import shops from '../../shops';
import DealGrid from '../../components/DealGrid';

const Shop = ({ shopDeals } : { shopDeals: Deal[] }) => (
  <DealGrid deals={shopDeals} />
);

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const res = await fetch(`${process.env.API_URL}/${context.params.shop}`);
  const shopDeals: Array<Deal> = await res.json();

  return {
    props: {
      shopDeals,
      key: `/${context.params.shop}`,
    },
    revalidate: 3600, // full week
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
