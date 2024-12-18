/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("id", id);

  useEffect(() => {
    if (id) {
      const postId = Array.isArray(id) ? id[0] : id;
      fetchPostDetails(postId);
    }
  }, [id]);

  const fetchPostDetails = async (postId: string) => {
    try {
      const response = await fetch(`https://gorest.co.in/public/v2/posts/${postId}`);
      if (!response.ok) {
        throw new Error(`Error fetching post details: ${response.statusText}`);
      }
      const data = await response.json();
      setPost(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{post?.title}</h2>
        <p className="text-gray-700">{post?.body}</p>
        <button
          onClick={() => router.back()}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
