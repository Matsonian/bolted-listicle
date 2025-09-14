import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-red-500 p-4">
      <div className="text-white text-xl">
        TEST NAVIGATION - If you see this, the component is loading
      </div>
      <Link to="/" className="text-white underline ml-4">Home</Link>
      <Link to="/search" className="text-white underline ml-4">Search</Link>
    </nav>
  );
}
