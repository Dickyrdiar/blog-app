'use client'

import React from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  body: string;
  postId: number;  // Pass postId to the Card component
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ title, body, postId, onDelete }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-700 mt-2">{body}</p>

      <div className="flex justify-between mt-[30px]">
        <Link href={`/posts/${postId}`}>
          <button
            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Detail
          </button>
        </Link>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default Card;
