/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostDetail = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Remove `_rsc` from URL if present
        if (typeof window !== 'undefined' && window.location.search.includes('_rsc')) {
          const newUrl = window.location.href.split('?')[0];
          window.history.replaceState(null, '', newUrl);
        }

        // Fetch post details using `params.postId`
        const response = await fetch(`https://gorest.co.in/public/v2/posts/${params.postId}`);
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

    if (params.postId) {
      fetchPostDetails();
    }
  }, [params.postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">{post?.title}</h2>
        <p className="text-gray-700">{post?.body}</p>
        <button
          onClick={() => history.back()}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PostDetail;
