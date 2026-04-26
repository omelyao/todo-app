import React from 'react';
import { getPagesArray } from '../../utils/pages';
import { PaginationProps } from '../todo/model/types';

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  page,
  changePage,
}) => {
  const pagesArray = getPagesArray(totalPages);

  return (
    <div>
      {pagesArray.map(p => (
        <span
          key={p}
          onClick={() => changePage(p)}
          style={{
            margin: '0 5px',
            cursor: 'pointer',
            fontWeight: p === page ? 'bold' : 'normal',
          }}
        >
          {p}
        </span>
      ))}
    </div>
  );
};
