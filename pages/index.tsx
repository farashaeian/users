import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import localFont from "next/font/local";
import Card from './components/Card/Card';

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

export interface User {
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
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 md:py-20 gap-8 sm:p-4 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className='text-4xl font-bold text-fuchsia-900'>Users List</div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}

      {users.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-center justify-items-center '>
          {users.map((user) => (
            <Card key={user.id}
            avatar={user.avatar}
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email} 
             />
          ))}
        </div>
      )}

      <div className='flex flex-row gap-2 md:gap-4'>
        <button
          disabled={page === 1}
          onClick={() => handlePagination(page - 1)}
          className='min-w-9 p-1 rounded  border-2  border-solid border-fuchsia-900	hover:border-fuchsia-600 focus:bg-gray-100'
        >
          Prev
        </button>

        <span> {page} / {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => handlePagination(page + 1)}
          className='min-w-9 p-1 rounded  border-2  border-solid border-fuchsia-900	hover:border-fuchsia-600 focus:bg-gray-100'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
