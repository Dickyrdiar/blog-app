import { GetServerSideProps } from 'next';
import axios from 'axios';

interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

interface PostDetailProps {
  post: Post | null;
  author: Author | null;
  error: string | null;
}

const PostDetail = ({ post, author, error }: PostDetailProps) => {
  if (error) {
    return <div>{error}</div>;
  }

  if (!post || !author) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.body}</p>
      <div className="author-info mt-8">
        <h2 className="text-xl font-semibold">Author Information</h2>
        <p>Name: {author.name}</p>
        <p>Email: {author.email}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const postResponse = await axios.get(`https://gorest.co.in/public/v2/posts/${id}`);
    const post = postResponse.data;
    const authorResponse = await axios.get(`https://gorest.co.in/public/v2/users/${post.user_id}`);
    const author = authorResponse.data;
    return { props: { post, author, error: null } };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      return { props: { post: null, author: null, error: "Post or author not found." } };
    }
    return { props: { post: null, author: null, error: "Failed to fetch post details." } };
  }
};

export default PostDetail;
