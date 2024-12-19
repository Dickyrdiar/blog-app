'use client'

import React from "react";
// import Link from "next/link";


interface CardProps {
  title: string;
  body: string;
}

const Card: React.FC<CardProps> = ({ title, body }) => {

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      <p className="text-gray-700 mt-2">{body}</p>

      {/* <div className="flex justify-between mt-[30px]">
       
      </div> */}
    </div>
  );
};

export default Card;
