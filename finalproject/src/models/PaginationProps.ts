// Defines a TypeScript type for the props related to pagination functionality.
export type PaginationProps = {
  // Represents the current active page in the pagination.
  currentPage: number;
  // Represents the total number of pages available.
  totalPages: number;
  // A function that allows updating the current page. It accepts a new page number as its parameter.
  setCurrentPage: (number: number) => void;
};
