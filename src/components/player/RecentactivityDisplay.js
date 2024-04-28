import { useState, useEffect } from 'react';
import axios from 'axios';

import React from 'react';

const RecentactivityDisplay = ({ Recent, navigate }) => {
  const [post, setPost] = useState(null);
  const [flag, setflag] = useState(false);
  console.log(`.resenrt.`, Recent);

  const formatTimestamp = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const diff = currentTime - postTime;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days < 0) {
      // If more than a day, show date
      return postTime.toLocaleDateString();
    } else if ((hours) => 0) {
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
  const gotoPost = (e) => {
    e.preventDefault();
    //console.log(playerPost._id);
    return navigate(`/playerpost/${Recent.postId}`);
  };
  useEffect(() => {
    getDetails();
  }, []);
  useEffect(() => {
    getDetails();
  }, [flag]);
  const getDetails = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/playerpost/details/${Recent.postId}`,
        {
          headers,
        }
      );

      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch post details');
      }

      const data = response.data;
      setPost(data);
      setflag(true);
      console.log(`data:`, data);
    } catch (error) {
      console.error('Error fetching post details:', error.message);
    }
  };
  return (
    <div>
      {flag && (
        <div
          className='card mx-3 my-3'
          style={{ width: '45rem', fontSize: '1rem' }}
        >
          <div className='card-body'>
            {/* <h5 className='card-title mb-1'>{Recent.postId}</h5> */}
            {/* <p className='post-text'>Name: {name}</p> */}
            <h2 className='card-text mb-1'>Post Title: {post.title}</h2>
            <p className='card-text mb-1'>Sports: {post.sport}</p>
            <p className='card-text mb-1'>Skill: {post.skill}</p>
            <button
              className='btn btn-primary  mx-1'
              onClick={(e) => {
                gotoPost(e);
              }}
            >
              Post
            </button>
            <p className='card-text mb-1'>Message: {Recent.message}</p>
            {/* <p className='card-text mb-1'>Status: {Recent.status}</p> */}
            <button className={`post-button-status button-${Recent.status}`}>
              {Recent.status}
            </button>
            <p>
              {Recent.status}: {formatTimestamp(Recent.timestamp)}
            </p>
          </div>
        </div>
      )}
      {flag && (
        <div
          className='card mx-3 my-3'
          style={{ width: '45rem', fontSize: '1rem' }}
        ></div>
      )}
    </div>
  );
};

export default RecentactivityDisplay;
