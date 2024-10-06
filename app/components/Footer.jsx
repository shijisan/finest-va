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
    <footer className="w-full p-6 text-lime-700">
      <div className="flex flex-col justify-around md:flex-row">
        {/* Left Section */}
        <div className="flex flex-col items-center md:flex-col md:items-start">
          <button onClick={toggleLeft} className="py-2 text-center md:hidden">Facebooks</button>
          <div className={`${isOpenLeft ? 'flex' : 'hidden'} md:flex flex-col justify-evenly`}>
            <a href="https://www.facebook.com/profile.php?id=61559780979805" className="py-1">Finest VA FB Page</a>
            <a href="https://www.facebook.com/thevabar" className="py-1">The VA BAR FB Page</a>
            <a href="https://www.facebook.com/groups/478965840526919" className="py-1">The VA BAR FB Group</a>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center md:flex-col md:items-start">
          <button onClick={toggleMiddle} className="py-2 text-center md:hidden">Contacts</button>
          <div className={`${isOpenMiddle ? 'flex' : 'hidden'} md:flex flex-col justify-evenly`}>
            <a href="/contact" className="py-1">Contact Form</a>
            <a href="/contact" className="py-1">Schedule a Meeting</a>
            <a href="https://shijisan.github.io/Portfoli0/" className="py-1">Web Developer</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:flex-col md:items-start">
          <button onClick={toggleRight} className="py-2 text-center md:hidden">LinkedIns</button>
          <div className={`${isOpenRight ? 'flex' : 'hidden'} md:flex flex-col justify-evenly`}>
            <a href="https://www.linkedin.com/in/girly-feratero-b7ab45186/?originalSubdomain=ph" className="py-1">CEO LinkedIn</a>
            <a href="https://www.linkedin.com/company/the-va-bar/?originalSubdomain=ph" className="py-1">The VA LinkedIn</a>
            <a href="https://www.linkedin.com/company/finest-va/" className="py-1">Finest LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
