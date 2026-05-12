import { getPagesArray } from '../constants/pages';
import { setPage } from '../../features/todo/model/todoSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/index';
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
