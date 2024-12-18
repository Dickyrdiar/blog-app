/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PostDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("Post ID:", id);

  // Function to fetch post details
  const fetchPostDetails = async (postId: string | undefined) => {
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

  // Fetch post data when the `id` parameter changes
  useEffect(() => {
    if (id) {
      const postId = Array.isArray(id) ? id[0] : id; // Ensure id is a string
      fetchPostDetails(postId);
    }

    // Optional: Remove unwanted `_rsc` parameter from the URL
    if (searchParams.has('_rsc')) {
      const newUrl = window.location.href.split('?')[0];
      window.history.replaceState(null, '', newUrl);
    }
  }, [id, searchParams]);

  // Loading and Error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Post Details Rendering
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
