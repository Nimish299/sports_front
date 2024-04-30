import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
const StudentDisplay = ({ student, navigate }) => {
  // console.log(`student:`, student);
  const [playerinfo, setplayerinfo] = useState('');
  const fetch_info = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };

      // Assuming coach_id is available from somewhere in your component
      //   const item = { coach_id };coachPost.
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/coach/fetch_player_info/${student.player_id}`,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const json = response.data;
        setplayerinfo(json);
        // console.log(`info:`, playerinfo);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching coach info:', error);
      throw new Error('Failed to fetch coach info. Please try again later.');
    }
  };
  const formatTimestamp = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const diff = currentTime - postTime;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      // If more than a day, show date
      return postTime.toLocaleDateString();
    } else if (hours > 0) {
      // If more than an hour, show hours ago
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      // If more than a minute, show minutes ago
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      // Otherwise, show seconds ago
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  };
  useEffect(() => {
    fetch_info();
    // Getrequestonpost1();
  }, []);
  return (
    <div>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
          fontFamily: 'Arial, sans-serif', // Change the font family
        }}
      >
        <div className='container text-center'>
          <div className='row align-items-start'>
            <div className='col' style={{ fontSize: '16px' }}>
              {playerinfo.emailID}
            </div>
            <div className='col' style={{ fontSize: '16px' }}>
              {playerinfo.name}
            </div>
            <div className='col' style={{ fontSize: '16px' }}>
              {playerinfo.location}
            </div>
            <div className='col' style={{ fontSize: '16px' }}>
              {playerinfo.mobileNumber}
            </div>
            <div className='col' style={{ fontSize: '16px' }}>
              {formatTimestamp(student.timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDisplay;
