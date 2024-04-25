import React from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { FlagState } from '../context/FlagProvider';

const Navbar = () => {
  const { loginflag, setLoginflag } = FlagState();

  function printAxiosHeaders() {
    // Get default headers from Axios
    const headers = axios.defaults.headers.common;

    // Print each header
    Object.keys(headers).forEach((header) => {
      console.log(`${header}: ${headers[header]}`);
    });
  }
  const logoutUser = async () => {
    console.log('logged out');
    try {
      await axios.get('/api/player/logout', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('logged out');
      localStorage.removeItem('auth-token');

      delete axios.defaults.headers.common['Authorization'];
      printAxiosHeaders();
      // return navigate('/');
    } catch (error) {
      // Handle error
      console.error('Error logging out:', error);
    }
  };
  const Checklogin = async () => {
    // try {
    // //   const response = await axios.get('/api/player/check', {
    // //     headers: {
    // //       'Content-Type': 'application/json',
    // //     },
    // //   });

    // //   if (response.status === 200) {
    // //     const data = response.data;
    // //     console.log(data);
    // //     setLoginflag(data.loggedIn);
    // //   } else {
    // //     console.log('NO');
    // //     setLoginflag(false);
    // //   }
    // // } catch (error) {
    // //   console.error('Error checking login:', error);
    // //   setLoginflag(false);
    // // }
    // };

    const token = localStorage.getItem('auth-token');
    if (token) {
      setLoginflag(true);
    } else {
      setLoginflag(false);
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
