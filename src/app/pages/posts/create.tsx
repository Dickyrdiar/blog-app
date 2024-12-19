import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title || !body) {
      setError('Title and body are required.');
      return;
    }

    try {
      const response = await axios.post('https://gorest.co.in/public/v2/posts', {
        title,
        body,
        user_id: 1, // Assuming a static user_id for simplicity
      });
      setSuccess('Post created successfully.');
      setTitle('');
      setBody('');
      setTimeout(() => {
        router.push(`/posts/${response.data.id}`);
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Failed to create post.');
      } else {
        setError('Failed to create post.');
      }
    }
  };

  return (
    <div className="create-post">
      <h1 className="text-2xl font-bold">Create Post</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
