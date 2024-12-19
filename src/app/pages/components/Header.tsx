import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '@/app/store/themeSlice';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="header">
      {/* ...existing code... */}
      <button
        onClick={() => dispatch(toggleTheme())}
        className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded"
      >
        Toggle Theme
      </button>
      {/* ...existing code... */}
    </div>
  );
};

export default Header;
