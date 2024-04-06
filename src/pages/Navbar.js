import React from 'react';

import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { FlagState } from '../context/FlagProvider';

const Navbar = () => {
  const { loginflag, setLoginflag } = FlagState();

  const logoutUser = async () => {
    console.log('logged out');
    await fetch('/api/player/logout', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    console.log('logged out');
    // return navigate('/');
  };
  const Checklogin = async () => {
    try {
      const response = await fetch('/api/player/check', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLoginflag(data.loggedIn);
      } else {
        // Handle error response
        console.log('NO');
        setLoginflag(false); // Set loginflag to false if there's an error
      }
    } catch (error) {
      console.error('Error checking login:', error);
      // Handle fetch error
      setLoginflag(false); // Set loginflag to false in case of fetch error
    }
  };

  useEffect(() => {
    Checklogin(); // Call the function
  }, [loginflag]);
  // Run whenever loginflag changes

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item mx-1 '>
              {!loginflag && (
                <a onClick={Checklogin} href='/'>
                  Home
                </a>
              )}

              {loginflag && (
                <a onClick={Checklogin} href='/player/home'>
                  Home
                </a>
              )}
            </li>
            <li className='nav-item mx-3'>
              <a href='/about'>About</a>
            </li>
          </ul>
          {loginflag && (
            <div className='d-flex'>
              <form className='d-flex' role='search'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button className='btn btn-outline-success' type='submit'>
                  Search
                </button>
              </form>
              <button className='btn btn-outline-success'>
                <a href='/player/player-profile'>Profile</a>
              </button>
              <button className='btn btn-outline-danger' onClick={logoutUser}>
                <a href='/'>Sign-out</a>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
