import React from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { FlagState } from '../context/FlagProvider';

const Navbar = () => {
  const { Loginflag, setLoginflag } = FlagState();
  // const navigate = useNavigate();

  const logoutUser = async () => {
    console.log('logged out');
    try {
      localStorage.removeItem('auth-token');

      delete axios.defaults.headers.common['Authorization'];
      // printAxiosHeaders();
      setLoginflag(0);
      // return navigate('/');
    } catch (error) {
      // Handle error
      console.error('Error logging out:', error);
    }
  };

  const Checklogin = async () => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      // setLoginflag(Loginflag);
    } else {
      setLoginflag(0);
      console.log(`out`);
    }
  };

  useEffect(() => {
    Checklogin(); // Call the function
  }, [loginflag]);
  // useEffect(() => {
  //   Checklogin(); // Call the function
  // });
  // Run whenever Loginflag changes

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
              {Loginflag === 0 && (
                <a onClick={Checklogin} href='/'>
                  Home
                </a>
              )}

              {Loginflag === 1 && (
                <a onClick={Checklogin} href='/player/home'>
                  Home
                </a>
              )}

              {Loginflag === 2 && (
                <a onClick={Checklogin} href='/coach/home'>
                  Home
                </a>
              )}
              {Loginflag === 3 && (
                <a onClick={Checklogin} href='/admin/dashboard'>
                  Home
                </a>
              )}
            </li>
            <li className='nav-item mx-3'>
              <a href='/about'>About</a>
            </li>
          </ul>
          {Loginflag != 0 && (
            <div className='d-flex'>
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
