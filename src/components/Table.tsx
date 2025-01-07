import { useEffect, useState } from "react";
import { User } from "../typescript/types";
import TablePagination from "./TablePagination";

const Table = () => {
  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.razzakfashion.com/?paginate=${rowsPerPage}&search=${search}&page=${page}`
      );
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.last_page);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [search, page, rowsPerPage]);

  return (
    <div className="p-4 bg-black text-white rounded-md">
      <input
        placeholder="Search"
        className="p-2 mb-4 border border-gray-700 rounded-md text-white bg-zinc-900 outline-none"
        value={search}
        onChange={(e) => handleSearch(e)}
      />
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td>{new Date(item.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TablePagination
        page={page}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Table;
