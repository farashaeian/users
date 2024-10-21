import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useState } from "react";

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
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users");
      const data = await response.json();
      setUsers(data.data); // Assuming the users are in the 'data' field
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1>User List</h1>
      <ul>
        {users.length > 0 ? users.map(user => (
          <li key={user.id}>{user.first_name} {user.last_name}</li>
        )) : <p>no data</p>}
      </ul>
    </div>
  );
}
