/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/index.tsx
'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import LoginCard from "@/components/Card";
import Header from "@/components/Header";
import Card from "@/components/CardPost";
import Pagination from "@/components/Pagination";
// import { useRouter } from "next/navigation";

export default function HomeLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1)
  // const router = useRouter()
  
  const handleLogin = (inputName: string, inputToken: string) => {
    if (!inputName || !inputToken) {
      setError("Name and Go Rest Token are required.");
      return;
    }
    setName(inputName);
    setToken(inputToken);
    setIsLoggedIn(true); // Successfully logged in
    setError(null);
  };

  // Fetch posts after login
  useEffect(() => {
    if (isLoggedIn && token) {
      axios
        .get("https://gorest.co.in/public/v2/posts", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setPosts(response.data); // Set the fetched posts to state
        })
        .catch((err) => {
          setError("Failed to fetch posts. Please check the token.");
          return err
        });
    }
  }, [isLoggedIn, token]);

  const totalPages = Math.ceil(posts.length / postsPerPage)
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const handleDelete = async (postId: number) => {
    // console.log("post id", postId)

    try {
      const response = await axios.delete(`https://gorest.co.in/public/v2/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("deleted post", postId)
      alert("post deleted successfuly")

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      // window.location.reload()
      return response
    } catch (error) {
      console.error('failde to deleted posts', error)
      alert("error deleted posts")
    }
  }

  // const handleDetail = async (postId: number) => {
  //   // console.log("delete post", postId)
  //   try {
  //     const response = await axios.get(`https://gorest.co.in/public/v2/posts/${postId}`);
  //     if (response.status !== 200) {
  //       throw new Error(`Error fetching post details: ${response.statusText}`);
  //     }
  //     // Redirect to post detail page
  //     router.push(`/posts/${postId}`);
  //   } catch (error: any) {
  //     console.error("Failed to fetch post details:", error);
  //   }
   
  // }


  return (
    <div className="h-screen flex flex-col">
      {!isLoggedIn ? (
        <div className="flex-grow flex items-center justify-center">
          <LoginCard onLogin={handleLogin} error={error} />
        </div>
      ) : (
        <>
          {/* Fixed Header */}
          <header className=" text-white p-4 shadow-sm w-full">
            <Header userName={name || undefined} />
          </header>
    
          {/* Scrollable Content */}
          <main className="flex-grow overflow-y-auto bg-white">
            <div className="w-full p-8 bg-white shadow-lg rounded-lg mt-[20px] mx-auto max-w-4xl">
              <div className="container mb-4 p-5">
                <h3 className="text-xl font-bold text-gray-900 mt-[30px]">All Blog Posts</h3>
                <ul>
                  {currentPosts.length > 0 ? (
                    currentPosts.map((post) => (
                      <li key={post.id} className="mb-4">
                        <Card
                          title={post.title}
                          body={post.body}
                          postId={post.id}
                          onDelete={() => handleDelete(post.id)}
                        />
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
