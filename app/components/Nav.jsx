"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 z-30 flex justify-between w-full h-20 px-3 md:px-20 bg-teal-50">
        <div className="flex items-center logo">
          <div className="mr-3 logoImg">
            <img className='h-16' src="/images/logo.webp" alt="logo" />
          </div>
          <span className="text-teal-500 logoText">
            <div className='text-2xl font-semibold gruppo text-lime-300'>Finest VA</div>
            <div>Marketing Agency</div>
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className='items-center hidden space-x-4 text-teal-500 lg:flex'>
          <li><a href='/'>Home</a></li>
          <li><a href='/about'>About</a></li>
          <li><a href='/offers'>Offers</a></li>
          <li><a href='/testimonials'>Testimonials</a></li>
          <li><a href='/rules'>Rules</a></li>
          <li><a href='/profiles'>VAs' Profile</a></li>
          <li><a className='primary-btn' href="#">Let's Connect</a></li>
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
            <li><a href='/'>Home</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/offers'>Offers</a></li>
            <li><a href='/testimonials'>Testimonials</a></li>
            <li><a href='/rules'>Rules</a></li>
            <li><a href='/profiles'>VAs' Profile</a></li>
            <li><a className='primary-btn' href="#">Let's Connect</a></li>
          </ul>
        </div>
      )}
    </>
  );
}
