import React, {
  useEffect, useContext, useState, createRef,
} from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import SearchContext from '../context/SearchContext';
import FilterContext from '../context/FilterContext';

import DealCard from './DealCard';
import { filterData } from '../utils/filterData';

const Cell = React.memo(({
  // @ts-ignore
  data, columnIndex, rowIndex, style,
}) => {
  const { filteredData, columnCount } : { filteredData: Deal[], columnCount: number } = data;
  const dealIndex = rowIndex * columnCount + columnIndex;
  if (dealIndex >= filteredData.length) return <></>;
  const key = filteredData[rowIndex * columnCount + columnIndex].dealId;

  return (
    <Box style={style} padding={columnCount === 1 ? 4 : 0} paddingRight={4} key={key}>
      <DealCard deal={filteredData[rowIndex * columnCount + columnIndex]} />
    </Box>

  );
});

const DealGrid = ({ deals } : { deals: Deal[] }) => {
  const { query } = useContext(SearchContext);
  const { validFilterActive } = useContext(FilterContext);

  const gridRef = createRef<Grid>();

  const columnCount = useBreakpointValue({
    base: 1, sm: 2, md: 3, lg: 4,
  }) ?? 1;

  const [filteredData, setFilteredDate] = useState([]);

  useEffect(() => {
    const filtered = filterData({ data: deals, query, filterNonValid: validFilterActive });
    setFilteredDate(filtered);
    gridRef.current?.scrollToItem({
      columnIndex: 0,
      rowIndex: 0,
    });
  }, [query, validFilterActive]);
  return (
    <Box height="100%">
      <AutoSizer>
        {({ height, width }) => {
          const columnWidth = Math.ceil(width / columnCount);
          const rowCount = Math.ceil(filteredData.length / columnCount);
          const rowHeight = 250;

          return (
            <Grid
              ref={gridRef}
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
              overscanRowCount={5}
              style={{ overflowX: 'hidden' }}
              itemData={{ filteredData, columnCount }}
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
