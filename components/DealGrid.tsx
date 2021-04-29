import React, { useEffect, useContext, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { FixedSizeGrid as Grid, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import SearchContext from '../context/SearchContext';

import DealCard from './DealCard';
import { filterData } from '../utils/filterData';

const DealGrid = ({ deals } : { deals: Deal[] }) => {
  const columnCount = 4;
  const { filter } = useContext(SearchContext);

  const [filteredData, setFilteredDate] = useState([]);

  useEffect(() => {
    const filtered = filterData(deals, filter);
    setFilteredDate(filtered);
  }, [filter]);
  // @ts-ignore
  const Cell = React.memo(({ columnIndex, rowIndex, style }) => {
    const dealIndex = rowIndex * columnCount + columnIndex;
    if (dealIndex >= filteredData.length) return <></>;
    return (
      <Box style={style} paddingRight={4}>
        <DealCard deal={filteredData[rowIndex * columnCount + columnIndex]} />
      </Box>

    );
  }, areEqual);

  return (
    <Box height="100%">
      <AutoSizer>
        {({ height, width }) => {
          const columnWidth = Math.ceil(width / columnCount);
          const rowCount = Math.ceil(filteredData.length / columnCount);
          const rowHeight = 250;
          return (
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
              overscanRowCount={5}
              style={{ overflowX: 'hidden' }}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    </Box>
  );
};

export default DealGrid;
