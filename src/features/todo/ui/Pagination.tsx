import { getPagesArray } from '../../../shared/constants/pages';
import { setPage } from '../model/tasksSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../model/index';
interface PaginationProps {
  totalPages: number;
  page: number;
}

function Pagination({ totalPages, page }: PaginationProps) {
  const dispatch = useDispatch<AppDispatch>();
  const pages = getPagesArray(totalPages);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };
  console.log(page, totalPages);
  return (
    <div>
      {pages.map(p => (
        <button
          key={p}
          disabled={p === page}
          onClick={() => handlePageChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

export { Pagination };
