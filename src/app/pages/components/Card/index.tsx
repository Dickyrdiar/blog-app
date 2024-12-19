// components/Card.tsx
'use client'

import React, { useState } from "react";

interface LoginCardProps {
  onLogin: (name: string, token: string) => void;
  error: string | null;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLogin, error }) => {
  const [name, setName] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name, token);
  };

  return (
    <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="token" className="block text-sm font-medium text-gray-700">
            Go Rest Token
          </label>
          <input
            id="token"
            type="text"
            className="mt-1 block w-full px-4 text-gray-700 py-2 border border-gray-300 rounded-md"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginCard;
