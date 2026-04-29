import { getPagesArray } from '../../utils/pages';
import { PaginationProps } from '../todo/model/types';

function Pagination({ totalPages, page, changePage }: PaginationProps) {
  const pages = getPagesArray(totalPages);

  return (
    <div>
      {pages.map(p => (
        <button key={p} disabled={p === page} onClick={() => changePage(p)}>
          {p}
        </button>
      ))}
    </div>
  );
}

export { Pagination };
