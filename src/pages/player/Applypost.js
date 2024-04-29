import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Applied from '../../components/player/Applied';
const Applypost = () => {
  const [applyPost, setapplyPost] = useState([]);
  // console.log(`hhy before`);
  const navigate = useNavigate();
  const run = async () => {
    // console.log(`hhy`);
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/player/coach_applied`,
        { headers }
      );

      if (response.status >= 200 && response.status < 300) {
        const json = response.data;
        setapplyPost(json);
        // console.log(`json:`, json);
        // console.log(coachPost);
        // setflag(true);
      } else {
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    run();
  }, []);
  const redirecttoplayercoach = () => {
    return navigate('/player/playerCoach');
  };
  return (
    <div>
      <div
        className='container '
        style={{
          backgroundColor: 'white',
          // width: '45rem',
          borderRadius: '8px',

          fontFamily: 'Arial, sans-serif', // Change the font family
        }}
      >
        <div
          className='row align-items-start'
          style={{ fontSize: '16px', fontWeight: 'bold' }}
        >
          <div className='col' style={{ fontSize: '16px' }}>
            EmailID
          </div>
          <div className='col' style={{ fontSize: '16px' }}>
            Name
          </div>
          <div className='col' style={{ fontSize: '16px' }}>
            Location
          </div>
          <div className='col' style={{ fontSize: '16px' }}>
            Mobile Number
          </div>
          <div className='col' style={{ fontSize: '16px' }}>
            Sport
          </div>
          <div className='col' style={{ fontSize: '16px' }}>
            Experience
          </div>
        </div>
      </div>
      {applyPost &&
        applyPost.map((ID, index) => (
          <div className='post-item' key={index}>
            <Applied ID={ID} navigate={navigate} />
          </div>
        ))}
      <div className='button-container'>
        <button className='primary' onClick={redirecttoplayercoach}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Applypost;
