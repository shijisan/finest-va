"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Make sure to import useRouter correctly

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    localStorage.removeItem('token'); // Remove token from local storage
    router.push('/admin/login'); // Redirect to login page
  };

  return (
    <>
      <nav className="fixed top-0 z-30 flex justify-between w-full h-20 px-3 md:px-20 bg-teal-50">
        <div className="flex items-center logo">
          <div className="mr-3 logoImg">
            <img className='h-16' src="/images/logo.webp" alt="logo" />
          </div>
          <span className="text-teal-500 logoText">
            <div className='text-2xl font-semibold gruppo text-lime-300'>Admin Panel</div>
            <div>Control Dashboard</div>
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className='items-center justify-center hidden space-x-4 text-teal-500 lg:flex'>
          <li><a href='/admin/dashboard/admins'>Admins</a></li>
          <li><a href='/admin/dashboard/testimonials'>Testimonials</a></li>
          <li><a href='/admin/dashboard/va-profiles'>VA Profiles</a></li>
          <li>                
            <button
              onClick={handleLogout}
              className="px-4 py-2 font-semibold text-white bg-red-500 rounded-lg focus:outline-none"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <div className="flex items-center lg:hidden">
          <button id="menu-btn" className="flex flex-col space-y-1.5 focus:outline-none" onClick={toggleMenu}>
            <div className="w-7 h-0.5 bg-teal-500"></div>
            <div className="w-7 h-0.5 bg-teal-500"></div>
            <div className="w-7 h-0.5 bg-teal-500"></div>
          </button>
        </div>
      </nav>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 z-20 p-4 mt-20 bg-teal-50 lg:hidden">
          <ul className="flex flex-col space-y-2 text-teal-500">
            <li><a href='/admin/dashboard/admins'>Admins</a></li>
            <li><a href='/admin/dashboard/testimonials'>testimonials</a></li>
            <li><a href='/admin/dashboard/va-profiles'>VA Profiles</a></li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 font-semibold text-white bg-red-500 rounded-lg focus:outline-none"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
