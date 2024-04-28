import React from 'react';

const MypostDisplaycoach = ({ coachPost, setcoachPosts, coachPosts }) => {
  console.log(`coachpost:`, coachPost);
  console.log(`coachposts:`, coachPosts);
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
  return (
    <div>
      <div
        className='card mx-2 my-2'
        style={{
          width: '45rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '20px', // Added margin-bottom
        }}
      >
        <div className='card-body'>
          <h5
            className='card-title'
            style={{
              marginBottom: '10px',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            {coachPost.title}
          </h5>
          <h6
            className='card-subtitle mb-2 text-muted'
            style={{ fontSize: '0.9rem' }}
          >
            Description: {coachPost.description}
          </h6>

          <p className='card-text' style={{ marginBottom: '5px' }}>
            Charges: {coachPost.price}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Slot: {coachPost.selectedSlot}
          </p>

          <p>Posted: {formatTimestamp(coachPost.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default MypostDisplaycoach;
