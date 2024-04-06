import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarredListDisplay from '../../components/player/StarredListDisplay';

const StarredPosts = () => {
  const navigate = useNavigate();
  const [starredPostIds, setStarredPostIds] = useState([]);

  const gotoplayerplayer = () => {
    navigate('/player/playerplayer');
  };

  useEffect(() => {
    const getStarredPosts = async () => {
      try {
        // Fetch starred post IDs from the server
        const response = await fetch('/api/player/starred', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });
        const starredPostIds = await response.json();
        // console.log(starredPostIds);
        // Fetch post data based on the retrieved post IDs
        const postDataResponse = await fetch('/api/playerpost/getpostsbyids', {
          method: 'POST', // Change method to POST
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ postIds: starredPostIds }),
          // Send postIds array in the body
        });
        const starredPostsData = await postDataResponse.json();

        // Update state with fetched post data
        setStarredPostIds(starredPostsData);
        console.log('starredPostIds');
        console.log(starredPostIds); // Use the correct variable name
      } catch (error) {
        console.error('Error fetching starred posts:', error);
      }
    };

    getStarredPosts();
  }, []);

  return (
    <div>
      <div className='star-star-container'>
        <button onClick={gotoplayerplayer}>GO back</button>
        <h2>Your Starred Posts</h2>
        {starredPostIds.length > 0 ? (
          <div>
            {starredPostIds.map((post) => (
              <StarredListDisplay
                key={post._id}
                playerPost={post}
                playerPosts={starredPostIds}
                setPlayerPosts={setStarredPostIds}
              />
            ))}
          </div>
        ) : (
          <h4>No starred posts found.</h4>
        )}
      </div>
    </div>
  );
};

export default StarredPosts;
