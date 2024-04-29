import { useState, useEffect } from 'react';
import axios from 'axios';

const PostListDisplay = ({ playerPost, navigate }) => {
  console.log(playerPost);
  const [errDisplay, seterrDisplay] = useState('');
  const [applied, setApplied] = useState(false);

  const apply_start = async (e) => {
    e.preventDefault();
    const _id = playerPost._id;

    const item = { _id };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/player/addtostarred`,
        item,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const json = response.data;
      if (response.status >= 200 && response.status < 300) {
        console.log(json);
        setApplied(true);
      } else {
        console.log(json.error);
        seterrDisplay(json.error);
      }
    } catch (error) {
      console.error('Error applying:', error.message);
    }
  };
  const acceptadded = (e) => {
    e.preventDefault();
    seterrDisplay('');
    setApplied(false);

    // alert('Added to starred List');
  };
  // console.log(playerPost._id);
  const gotoPost = (e) => {
    e.preventDefault();
    //console.log(playerPost._id);
    return navigate(`/playerpost/${playerPost._id}`);
  };
  const name = playerPost.playersInfo?.[0]?.name || 'Name not available';
  const playerLocation =
    playerPost.playersInfo?.[0]?.playerLocation || 'Location not available';
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
    const run = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        const headers = {
          Authorization: token,
        };
        const response = await axios.get(
          `${process.env.REACT_APP_URL}api/player/tellifstarred/${playerPost._id}`,
          {
            headers,
          }
        );

        const data = response.data;
        setApplied(data.status);
        //console.log('hi');
        // console.log(applied);
        //setflag(true); // Update status state
      } catch (error) {
        console.error('Error:', error.message);
        //setErrorMessage(error.message); // Set the error message received from the backend
      }
    };
    run();
  });

  return (
    <div className='card mx-3 my-3' style={{ width: '18rem' }}>
      <div className='card-body'>
        <h5
          className='card-title mb-3'
          style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
        >
          {playerPost.title}
        </h5>
        {/* <h6
          className='card-subtitle mb-2 text-muted'
          style={{ fontSize: '0.9rem' }}
        >
          Description: {playerPost.description}
        </h6> */}
        <p className='card-text mb-1'>Name: {name}</p>
        <p className='card-text mb-1'>Sports: {playerPost.sport}</p>
        {/* <p className='card-text mb-1'>Skill: {playerPost.skill}</p> */}
        <p className='card-text mb-1'>
          Number of Openings: {playerPost.quantity}
        </p>
        <p className='card-text mb-1'>Court: {playerPost.location}</p>
        <p className='card-text mb-1'>City: {playerLocation}</p>
        <p>Posted: {formatTimestamp(playerPost.createdAt)}</p>

        <div className='flex-end'></div>

        <div className='btn-group'>
          {applied ? (
            <div>
              <label>Added to starred</label>

              <button
                className='btn btn-primary btn-sm mx-2'
                onClick={(e) => {
                  gotoPost(e);
                }}
              >
                See details
              </button>
            </div>
          ) : (
            ''
          )}
          {!applied && (
            <div>
              <button
                className='btn btn-primary btn-sm mx-2'
                onClick={(e) => {
                  apply_start(e);
                }}
              >
                Add to Star
              </button>
              <button
                className='btn btn-primary btn-sm mx-2'
                onClick={(e) => {
                  gotoPost(e);
                }}
              >
                See details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PostListDisplay;
