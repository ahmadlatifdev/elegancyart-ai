'use client';

import React, { useState } from 'react';

export default function ProductSearchWizard() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    // placeholder – safe no-op for now
    setProducts([]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Product Search</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products…"
          className="border rounded px-3 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="border rounded px-4 py-2 bg-black text-white"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product, idx) => (
          <div key={idx} className="border rounded p-3">
            <img
              src={product.image || '/placeholder.png'}
              alt={product.name || 'Product'}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="font-bold">{product.name || 'Unnamed Product'}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
