import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostListDisplay from '../../components/player/PostListDisplay';
import RecentactivityDisplay from '../../components/player/RecentactivityDisplay';
import axios from 'axios';
const PlayerCoach = () => {
  const [playerPosts, setPlayerPosts] = useState([]);
  const [Recent, setRecent] = useState([]);
  const [sport, setSport] = useState([]);
  const [flag, setflag] = useState(false);
  const [filterinUse, setFilterinUse] = useState(false);
  const [activity, setactivity] = useState(false);

  const run = async () => {
    const token = localStorage.getItem('auth-token');
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/playerpost/allplayerposts`,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const playerPosts = response.data;
        setPlayerPosts(playerPosts);
        setflag(true);
      } else {
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    run();
  }, [flag]);

  const navigate = useNavigate();
  const gotoPlayerHome = () => {
    return navigate('/player/home');
  };

  const filterPlayerPosts = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/playerpost/sport/${sport}`,
        {
          headers,
        }
      );
      const json = response.data;
      setPlayerPosts(json);
      setFilterinUse(true);
    } catch (error) {
      // Handle error
      console.error('Error filtering player posts:', error);
    }
  };
  const Recentactivity = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/playerpost/recent`,
        {
          headers,
        }
      );
      const json = response.data;
      console.log(`activity,`, json);
      setRecent(json);
    } catch (error) {
      // Handle error
      console.error('Error filtering player posts:', error);
    }
  };
  useEffect(() => {
    Recentactivity();
  }, [activity]);

  const removeFilter = () => {
    run();
    setFilterinUse(false);
  };
  const redirecttoapplied = () => {
    return navigate('/player/starred');
  };
  const redirecttomyposts = () => {
    return navigate('/player/myposts');
  };
  // const redirecttoactivity = () => {
  //   return navigate('/player/recent/activity');
  // };
  const rescentflag = () => {
    setactivity(true);
  };
  const rescentflagtrue = () => {
    setactivity(false);
  };
  return (
    <div class='container'>
      <div class='button-container'>
        <button onClick={gotoPlayerHome}>Back</button>
        <button onClick={redirecttoapplied}>Go to Starred Posts</button>
        <button onClick={redirecttomyposts}>See All Your Posts</button>
        {activity && <button onClick={rescentflagtrue}>All Post</button>}
        {!activity && <button onClick={rescentflag}>Recent Activity</button>}
        {/* <button onClick={rescentflag}>Recent Activity</button> */}
      </div>
      {activity && (
        <div>
          <h1>
            <div class='post-list'>
              {Recent &&
                Recent.map((REpost, index) => (
                  <div className='post-item' key={index}>
                    <RecentactivityDisplay
                      Recent={REpost}
                      navigate={navigate}
                    />
                  </div>
                ))}
            </div>
          </h1>
        </div>
      )}
      {!activity && (
        <div>
          <div className='player_player_container'>
            <h2 className='player_player_heading'>
              These Are the Available PlayerPosts
            </h2>
            <div className='player_player_filterOption player_player_filter-container'>
              {!filterinUse && (
                <div>
                  <button onClick={filterPlayerPosts}>
                    Filter Based on Sport
                  </button>
                  <input
                    type='text'
                    value={sport}
                    onChange={(e) => {
                      setSport(e.target.value);
                    }}
                  />
                </div>
              )}
              {filterinUse && (
                <div className='player_player_filtered-category'>
                  <h3>Filtered category is: {sport}</h3>
                  <button onClick={removeFilter}>Remove Filter</button>
                </div>
              )}
            </div>
          </div>

          <div class='post-list'>
            {playerPosts &&
              playerPosts.map((post) => (
                <div class='post-item'>
                  <PostListDisplay
                    key={post.name}
                    playerPost={post}
                    navigate={navigate}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerCoach;
