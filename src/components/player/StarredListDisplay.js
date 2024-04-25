import React from 'react';
import axios from 'axios';
const StarredListDisplay = ({ playerPost, playerPosts, setPlayerPosts }) => {
  const deletePlayerPost = async () => {
    try {
      // Send a DELETE request to remove the player post from starred
      const response = await axios.delete(`/api/player/removefromstarred`, {
        data: playerPost, // Assuming postId is required to identify the post
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to remove player post from starred');
      }

      // Update the local state to remove the deleted player post
      const updatedPlayerPosts = playerPosts.filter(
        (post) => post._id !== playerPost._id
      );
      setPlayerPosts(updatedPlayerPosts);
    } catch (error) {
      console.error('Error removing player post from starred:', error.message);
    }
  };

  const name = playerPost.playersInfo?.[0]?.name || 'Name not available';
  const playerLocation =
    playerPost.playersInfo?.[0]?.playerLocation || 'Location not available';

  return (
    <div
      className='card mx-2 my-2'
      style={{
        width: '18rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
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
          {playerPost.title}
        </h5>
        <h6
          className='card-subtitle mb-2 text-muted'
          style={{ fontSize: '0.9rem' }}
        >
          Description: {playerPost.description}
        </h6>
        <p className='card-text' style={{ marginBottom: '5px' }}>
          Name: {name}
        </p>
        <p className='card-text' style={{ marginBottom: '5px' }}>
          Sports: {playerPost.sport}
        </p>
        <p className='card-text' style={{ marginBottom: '5px' }}>
          Skill: {playerPost.skill}
        </p>
        <p className='card-text' style={{ marginBottom: '5px' }}>
          Number of Openings: {playerPost.quantity}
        </p>
        <p className='card-text' style={{ marginBottom: '5px' }}>
          Court: {playerPost.location}
        </p>
        <p className='card-text' style={{ marginBottom: '5px' }}>
          City: {playerLocation}
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={deletePlayerPost}>Unstar this PlayerPost</button>
        </div>
      </div>
    </div>
  );
};

export default StarredListDisplay;
