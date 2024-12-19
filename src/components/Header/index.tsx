'use client'

// components/Header.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const router = useRouter();

  const navigateToCreatePost = () => {
    router.push('/posts/create-post');
  };

  return (
    <header className="flex justify-between items-center bg-gray-100 py-4 px-6 shadow-md z-50 w-full">
      <h1 className="text-xl font-bold text-gray-800">
        Selamat Datang, {userName}!
      </h1>
      <button
        onClick={navigateToCreatePost}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Buat Posting
      </button>
    </header>
  );
};

export default Header;
