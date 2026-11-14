import { useState } from 'react';
import users from './data';

const PAGE_SIZES = [5, 10, 20];

const COLUMNS = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'Occupation', key: 'occupation' },
] as const;

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));

  const start = (page - 1) * pageSize;
  const visibleUsers = users.slice(start, start + pageSize);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(1); // با عوض شدن اندازه‌ی صفحه، از اول شروع کن
  };

  return (
    <div>
      <h1>Data Table</h1>

      <table>
        <thead>
          <tr>
            {COLUMNS.map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleUsers.map(({ id, name, age, occupation } : any) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <label htmlFor="page-size">Rows per page:</label>
        <select id="page-size" value={pageSize} onChange={handlePageSizeChange}>
          {PAGE_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}