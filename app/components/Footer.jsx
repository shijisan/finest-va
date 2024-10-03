"use client";

import { useState } from 'react';

export default function Footer() {
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [isOpenMiddle, setIsOpenMiddle] = useState(false);
  const [isOpenRight, setIsOpenRight] = useState(false);

  const toggleLeft = () => setIsOpenLeft(!isOpenLeft);
  const toggleMiddle = () => setIsOpenMiddle(!isOpenMiddle);
  const toggleRight = () => setIsOpenRight(!isOpenRight);

  return (
    <footer className="w-full p-6">
      <div className="flex flex-col justify-around md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col items-center md:flex-col md:items-start">
          <button onClick={toggleLeft} className="py-2 text-center md:hidden">Left Links</button>
          <div className={`${isOpenLeft ? 'flex' : 'hidden'} md:flex flex-col justify-evenly`}>
            <a href="#" className="py-1">Link 1</a>
            <a href="#" className="py-1">Link 2</a>
            <a href="#" className="py-1">Link 3</a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center md:flex-col md:items-start">
          <button onClick={toggleMiddle} className="py-2 text-center md:hidden">Middle Links</button>
          <div className={`${isOpenMiddle ? 'flex' : 'hidden'} md:flex flex-col justify-evenly`}>
            <a href="#" className="py-1">Link 1</a>
            <a href="#" className="py-1">Link 2</a>
            <a href="#" className="py-1">Link 3</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:flex-col md:items-start">
          <button onClick={toggleRight} className="py-2 text-center md:hidden">Right Links</button>
          <div className={`${isOpenRight ? 'flex' : 'hidden'} md:flex flex-col justify-evenly`}>
            <a href="#" className="py-1">Link 1</a>
            <a href="#" className="py-1">Link 2</a>
            <a href="#" className="py-1">Link 3</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
