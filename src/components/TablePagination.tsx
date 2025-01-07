import React from "react";
import Button from "./Button";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const rowsPerPageOptions = [10, 20, 30, 40, 50];
  return (
    <div className="flex justify-center items-center mt-4 gap-4">
      <div className="flex justify-center items-center gap-4">
        <label htmlFor="select">Row per page</label>
        <select
          id="select"
          onChange={(e) => onRowsPerPageChange(+e.target.value)}
          value={rowsPerPage}
          className="bg-zinc-900 text-white px-4 py-2 rounded-md outline-none"
        >
          {rowsPerPageOptions.map((row) => (
            <option
              key={row}
              value={row}
            >
              {row}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="bg-zinc-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Previous
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="bg-zinc-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </Button>
    </div>
  );
};

export default TablePagination;
