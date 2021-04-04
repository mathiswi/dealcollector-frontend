import React, {
  SetStateAction, Dispatch, useEffect, useState,
} from 'react';
import {
  Flex, HStack, Button, IconButton,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon, ChevronRightIcon,
} from '@chakra-ui/icons';

const createRange = (from: number, to: number, step: number = 1): Array<Number | string> => {
  let i = from;
  const arr = [];

  while (i <= to) {
    arr.push(i);
    i += step;
  }

  return arr;
};

const Pagination = (
  { currentPage, setCurrentPage, totalPages } :
  { currentPage: number, setCurrentPage: Dispatch<SetStateAction<number>>, totalPages: number },
) => {
  const pageNeighbours = 2;

  const [pages, setPages] = useState([]);

  useEffect(() => {
    const buildPageNumbers = () => {
      const totalPageNumber = pageNeighbours * 2 + 3;

      if (totalPages > totalPageNumber) {
        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
        let pagesShown = createRange(startPage, endPage);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPages - endPage) > 1;
        const spillOffset = totalPageNumber - (pagesShown.length + 1);

        switch (true) {
          // handle: (1) < {5 6} [7] {8 9} (10)
          case (hasLeftSpill && !hasRightSpill): {
            const extraPages = createRange(startPage - spillOffset, startPage - 1);
            pagesShown = ['leftDots', ...extraPages, ...pagesShown];
            break;
          }

          // handle: (1) {2 3} [4] {5 6} > (10)
          case (!hasLeftSpill && hasRightSpill): {
            const extraPages = createRange(endPage + 1, endPage + spillOffset);
            pagesShown = [...pagesShown, ...extraPages, 'rightDots'];
            break;
          }

          // handle: (1) < {4 5} [6] {7 8} > (10)
          case (hasLeftSpill && hasRightSpill):
          default: {
            pagesShown = ['leftDots', ...pagesShown, 'dots'];
            break;
          }
        }
        return [1, ...pagesShown, totalPages];
      }
      return createRange(1, totalPages);
    };
    setPages(buildPageNumbers());
  }, [totalPages, currentPage]);

  const goToPreviousPage = () => {
    const newPage = Math.max(1, currentPage + -1);
    setCurrentPage(newPage);
  };

  const goToNextPage = () => {
    const newPage = Math.min(totalPages, currentPage + 1);
    setCurrentPage(newPage);
  };

  return (
    <Flex justifyContent="center" marginTop={4}>
      <HStack spacing={1}>
        <IconButton aria-label="previous page" onClick={goToPreviousPage}>
          <ChevronLeftIcon />
        </IconButton>
        {pages.map((page) => (
          <React.Fragment key={`${page} fragment`}>
            {(page === 'leftDots' || page === 'rightDots') ? (
              <span key={`${page + 1} dots`}>…</span>
            ) : (
              <Button
                variant="ghost"
                fontSize="0.8rem"
                h="25px"
                w="6px"
                onClick={() => setCurrentPage(page)}
                color={currentPage === page && 'blue.300'}
                key={`pageNumber-${page + +1}`}
              >
                {page}
              </Button>
            )}
          </React.Fragment>
        ))}
        <IconButton aria-label="next page" onClick={goToNextPage}>
          <ChevronRightIcon />
        </IconButton>
      </HStack>
    </Flex>
  );
};

export default Pagination;
