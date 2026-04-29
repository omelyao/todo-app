export const getPageCount = (totalCount: number, limit: number): number => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPages: number): number[] => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
};
