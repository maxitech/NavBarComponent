'use client';

import { useState, useEffect, useCallback } from 'react';
import { scrollIntoView } from '../lib/utils';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  function scrollToTop() {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
    setIsOpen(false);
  }

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50) {
      setIsOpen(false);
      setIsSticky(true);
    } else setIsSticky(false);

    if (window.scrollY > lastScrollY && window.scrollY > window.innerHeight / 2)
      setIsVisible(false);
    else setIsVisible(true);

    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className={`fixed top-0 w-full flex justify-between items-center py-4 px-7 text-gray-300 border--[0.5px] border-gray-300 md:px-10 z-20 transition-all duration-300 ${
        isSticky ? 'bg-neutral-950' : 'bg-neutral-950'
      } ${
        isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
    >
      <button onClick={scrollToTop} className="flex font-semibold">
        <p className="uppercase text-3xl tracking-tighter sm:text-4xl">hb23</p>
        <p className="text-xs tracking-tight sm:text-sm">reloaded</p>
      </button>
      <div className="relative z-10 md:hidden">
        <button
          onClick={toggleNavbar}
          className="flex items-center justify-center"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-9 sm:size-10 transition-transform duration-300 ease-in-out transform rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-9 sm:size-10 transition-transform duration-300 ease-in-out transform rotate-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* NavMenu mobile */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-0 flex pt-28 justify-center bg-neutral-950 bg-opacity-80 backdrop-blur-sm  transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : ' translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-8 text-xl">
          <li>
            <button
              onClick={scrollToTop}
              className="w-28 text-center flex items-center justify-center gap-2 border-b-2 border-gray-300 pb-4 active:text-gray-500 active:border-gray-500"
            >
              Home
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                scrollIntoView('about');
                setIsOpen(false);
              }}
              className="w-28 text-center flex items-center justify-center gap-2 border-b-2 border-gray-300 pb-4 active:text-gray-500 active:border-gray-500"
            >
              About
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                scrollIntoView('appointment');
                setIsOpen(false);
              }}
              className="w-28 text-center flex items-center justify-center gap-2 border-b-2 border-gray-300 pb-4 active:text-gray-500 active:border-gray-500"
            >
              Termine
            </button>
          </li>

          <li>
            <button
              onClick={() => {
                scrollIntoView('contact');
                setIsOpen(false);
              }}
              className="w-28 text-center flex items-center justify-center gap-2 border-b-2 border-gray-300 pb-4 active:text-gray-500 active:border-gray-500"
            >
              Kontakt
            </button>
          </li>
        </ul>
      </div>

      {/* Nav */}
      <div className="hidden md:flex gap-12 2xl:gap-14 text-base font-semibold tracking-tight">
        <button
          onClick={scrollToTop}
          className="w-20 uppercase 2xl:hover:text-neutral-950 2xl:hover:bg-gray-300 2xl:hover:font-bold rounded-sm transition-all duration-300"
        >
          Home
        </button>

        <button
          onClick={() => scrollIntoView('about', 0)}
          className="w-20 uppercase 2xl:hover:text-neutral-950 2xl:hover:bg-gray-300 2xl:hover:font-bold rounded-sm transition-all duration-300"
        >
          About
        </button>

        <button
          onClick={() => scrollIntoView('contact', 0)}
          className="w-32 py-[0.375rem] uppercase bg-gray-300 text-neutral-950 rounded-sm font-bold 2xl:hover:bg-white transition-all duration-300"
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
