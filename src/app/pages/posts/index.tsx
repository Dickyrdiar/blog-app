/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import LoginCard from "@/app/pages/components/Card";
import Header from "@/app/pages/components/Header";
import Card from "@/app/pages/components/CardPost";
import Pagination from "@/app/pages/components/Pagination";
import Link from "next/link";

export default function HomeLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const handleLogin = (inputName: string, inputToken: string) => {
    if (!inputName || !inputToken) {
      setError("Name and Go Rest Token are required.");
      return;
    }
    setName(inputName);
    setToken(inputToken);
    setIsLoggedIn(true);
    setError(null);
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      axios
        .get("https://gorest.co.in/public/v2/posts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((err :any) => {
          setError("Failed to fetch posts. Please check the token.", err);
        });
    }
  }, [isLoggedIn, token]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleDelete = async (postId: number) => {
    try {
      await axios.delete(`https://gorest.co.in/public/v2/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      alert("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Error deleting post");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {!isLoggedIn ? (
        <div className="flex-grow flex items-center justify-center">
          <LoginCard onLogin={handleLogin} error={error} />
        </div>
      ) : (
        <>
          <header className="text-white p-4 shadow-sm w-full">
            <Header userName={name || undefined} />
          </header>

          <main className="flex-grow overflow-y-auto bg-white">
            <div className="w-full p-8 bg-white shadow-lg rounded-lg mt-[20px] mx-auto max-w-4xl">
              <div className="container mb-4 p-5">
                <h3 className="text-xl font-bold text-gray-900 mt-[30px]">All Blog Posts</h3>
                <ul>
                  {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <li key={post.id} className="mb-4">
                        <Card title={post.title} body={post.body} />
                        <div className="flex justify-between mt-2">
                          <Link href={`/posts/${post.id}`} passHref>
                            <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none">
                              Detail
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none"
                          >
                            Delete Post
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>Loading posts...</p>
                  )}
                </ul>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}