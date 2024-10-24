import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import localFont from "next/font/local";
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import { ApiResponse, User } from '@/types';
import Loading from '@/components/Loading';
import { usersApi } from '@/api';
import Message from '@/components/Message';

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



const Home: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users data from API based on current page
  const fetchUsers = async (page: number) => {
    setError(null);

    try {
      const res = await fetch(`${usersApi.list}?page=${page}`);
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
    if (router.isReady) {
      const pageParam = router.query.page ? parseInt(router.query.page as string, 10) : 1;
      setPage(pageParam);
      fetchUsers(pageParam);      
    }
  }, [router.isReady,router.query.page]);

  // Sync URL with page when pagination buttons are clicked
  const handlePagination = (newPage: number) => {
    router.push(`?page=${newPage}`, undefined, { shallow: true });
  };

  // Open modal with user info
  const handleCardClick = (user: User) => {
    setSelectedUser(user);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} container font-[family-name:var(--font-geist-sans)]`}
    >
      <div className='page-title'>Users List</div>

      {loading && <Loading />}
      {error && <Message type='error' text={error}/>}
      {!error && !loading && users.length === 0 && <Message type='info' text='No users found.'/> }

      {users.length > 0 && (
        <div className='list-container'>
          {users.map((user) => (
            <Card key={user.id}
              avatar={user.avatar}
              first_name={user.first_name}
              last_name={user.last_name}
              email={user.email}
              onClick={() => handleCardClick(user)}
            />
          ))}
        </div>
      )}

      {users.length > 0 && (
        <div className='pagination-container'>
          <button
            disabled={page === 1}
            onClick={() => handlePagination(page - 1)}
            className='pagination-button'
          >
            Prev
          </button>

          <span> {page} / {totalPages}</span>

          <button
            disabled={page === totalPages}
            onClick={() => handlePagination(page + 1)}
            className='pagination-button'
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for user details */}
      {selectedUser && (
        <Modal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Home;
