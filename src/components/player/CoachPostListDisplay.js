import { useState, useEffect } from 'react';
import axios from 'axios';

const CoachPostListDisplay = ({ coachPost, navigate }) => {
  // console.log(coachPost);
  const [errDisplay, seterrDisplay] = useState('');
  const [coachinfo, setcoachinfo] = useState('');
  const [applied, setApplied] = useState(false);
  //   const coach_id = coachPost._id;
  //   console.log(coach_id);
  const fetch_info = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };

      // Assuming coach_id is available from somewhere in your component
      //   const item = { coach_id };coachPost.
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/player/fetch_coach_info/${coachPost._id}`,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const json = response.data;
        setcoachinfo(json);
        // console.log(coachinfo);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching coach info:', error);
      throw new Error('Failed to fetch coach info. Please try again later.');
    }
  };

  const gotoPost = (e) => {
    e.preventDefault();
    //console.log(playerPost._id);
    return navigate(`/coachpost/${coachPost._id}`);
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
    fetch_info(); // Corrected invocation of fetch_info
  }, []); // Empty dependency array to ensure the effect runs only once
  return (
    <div className='card mx-3 my-3' style={{ width: '18rem' }}>
      <div className='card-body'>
        <h5
          className='card-title mb-3'
          style={{ fontSize: '1.25rem', fontWeight: 'bold' }}
        >
          {coachPost.title}
        </h5>
        {/* <h6
          className='card-subtitle mb-2 text-muted'
          style={{ fontSize: '0.9rem' }}
        >
          Description: {coachinfo.description}
        </h6> */}
        <p className='card-text mb-1'>Name: {coachinfo.name}</p>
        <p className='card-text mb-1'>Sports: {coachinfo.sport}</p>
        <p className='card-text mb-1'>Court: {coachPost.court}</p>
        <p className='card-text mb-1'>City: {coachinfo.location}</p>
        <p className='card-text mb-1'>Charges:₹ {coachPost.price} per month</p>
        <p className='card-text mb-1'>
          Experience: {coachinfo.coaching_experience_years}
        </p>
        <p>Posted: {formatTimestamp(coachPost.createdAt)}</p>

        <div className='flex-end'></div>

        {/* <div className='btn-group'>
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
        </div> */}
        <button
          className='btn btn-primary btn-sm mx-2'
          onClick={(e) => {
            gotoPost(e);
          }}
        >
          See details
        </button>
      </div>
    </div>
  );
};
export default CoachPostListDisplay;
