import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface ApiResponse {
  data: User[];
  page: number;
  total_pages: number;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch users data from API based on current page
  const fetchUsers = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://reqres.in/api/users?page=${page}`);
      const data: ApiResponse = await res.json();

      setUsers(data.data);
      setPage(data.page);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Handle URL query param change
  useEffect(() => {
    const pageParam = router.query.page ? parseInt(router.query.page as string, 10) : 1;
    setPage(pageParam);
    fetchUsers(pageParam);
  }, [router.query.page]);

  // Sync URL with page when pagination buttons are clicked
  const handlePagination = (newPage: number) => {
    router.push(`?page=${newPage}`, undefined, { shallow: true });
  };

  return (
    <div 
    className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1>Users List</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}

      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
              <p>{user.first_name} {user.last_name}</p>
              <p>{user.email}</p>
            </li>
          ))}
        </ul>
      )}

      <div>
        <button
          disabled={page === 1}
          onClick={() => handlePagination(page - 1)}
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => handlePagination(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
