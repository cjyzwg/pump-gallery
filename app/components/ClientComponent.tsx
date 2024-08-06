"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from 'react';

const ClientComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('ClientComponent mounted or updated');
  }, [count]);

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <p className="text-xl mb-2">Client-side Counter: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Increment
      </button>
    </div>
  );
};

export default ClientComponent;
