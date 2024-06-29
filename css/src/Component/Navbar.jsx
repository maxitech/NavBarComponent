'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { scrollIntoView } from '../lib/utils';
import 'navbar.css';

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

  const navBtn = ['Home', 'About', 'Termine', 'Kontakt']; // order & notation matters

  return (
    <nav
      className={`nav-el ${isSticky ? 'sticky' : 'sticky'} ${
        isVisible ? null : 'is-hidden'
      }`}
    >
      <button onClick={scrollToTop} className="nav_logo-btn">
        <p>hb23</p>
        <p>reloaded</p>
      </button>
      <div className="nav-menu-btn_container">
        <button onClick={toggleNavbar} className="nav-menu_btn">
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="nav-menu_svg rotate-ninety"
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
              strokeWidth={1.5}
              stroke="currentColor"
              className="nav-menu_svg rotate-zero"
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
        className={`nav-mobile_container ${
          isOpen ? 'nav-mobile_container-translateX_zero' : null
        }`}
      >
        <ul className="nav-mobile_ul">
          {navBtn.map((btn, key) => {
            if (btn === 'Home')
              return (
                <li key={key}>
                  <button onClick={scrollToTop} className="nav-mobile_btn">
                    {btn}
                  </button>
                </li>
              );

            if (btn !== 'Home')
              return (
                <li key={key}>
                  <button
                    onClick={() => {
                      scrollIntoView(btn.toLowerCase());
                      setIsOpen(false);
                    }}
                    className="nav-mobile_btn"
                  >
                    {btn}
                  </button>
                </li>
              );
          })}
        </ul>
      </div>

      {/* Nav */}
      <div className="nav-bar">
        {navBtn.map((btn, key) => {
          if (btn === 'Home')
            return (
              <button key={key} onClick={scrollToTop} className="nav-bar_btn">
                {btn}
              </button>
            );

          if (btn === 'Kontakt')
            return (
              <button
                key={key}
                onClick={() => scrollIntoView(btn.toLocaleLowerCase(), 0)}
                className="nav-bar_contact-btn"
              >
                {btn}
              </button>
            );

          return (
            <button
              key={key}
              onClick={() => scrollIntoView(btn.toLocaleLowerCase(), 0)}
              className="nav-bar_btn"
            >
              {btn}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
