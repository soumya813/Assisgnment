import React from 'react';

export default function Header() {
  return (
    <header className="bg-white shadow p-4 mb-6">
      <div className="container mx-auto flex flex-col items-center justify-center md:flex-row md:justify-between gap-2">
        <h1 className="text-xl font-bold text-blue-700 text-center md:text-left w-full md:w-auto">Apollo247 Clone</h1>
        <nav className="flex gap-2">
          <a href="/" className="text-gray-700 hover:text-blue-700 mx-2">Home</a>
          <a href="/specialties/general-physician-internal-medicine" className="text-gray-700 hover:text-blue-700 mx-2">General Physician</a>
        </nav>
      </div>
    </header>
  );
}
