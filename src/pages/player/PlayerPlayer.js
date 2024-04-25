import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostListDisplay from '../../components/player/PostListDisplay';
import axios from 'axios';
const PlayerCoach = () => {
  const [playerPosts, setPlayerPosts] = useState([]);
  const [sport, setSport] = useState([]);
  const [flag, setflag] = useState(false);
  const [filterinUse, setFilterinUse] = useState(false);

  // const run = async () => {
  //   try {
  //     const response = await axios.get('/api/playerpost/allplayerposts', {
  //       // method: 'GET',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     });

  //     // "proxy": "https://sports-back.onrender.com/"

  //     setflag(true);

  //     if (response.status === 200) {
  //       const json = response.data;
  //       setPlayerPosts(json);
  //     } else {
  //       console.log(response.data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  function printAxiosHeaders() {
    // Get default headers from Axios
    const headers = axios.defaults.headers.common;

    // Print each header
    Object.keys(headers).forEach((header) => {
      console.log(`${header}: ${headers[header]}`);
    });
  }

  const run = async () => {
    const token = localStorage.getItem('auth-token');
    try {
      const response = await axios.get(
        'https://sports-back.onrender.com/api/playerpost/allplayerposts',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const playerPosts = response.data;
        setPlayerPosts(playerPosts);
        setflag(true);
        printAxiosHeaders();
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
      const response = await axios.get(`/api/playerpost/sport/${sport}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = response.data;
      setPlayerPosts(json);
      setFilterinUse(true);
    } catch (error) {
      // Handle error
      console.error('Error filtering player posts:', error);
    }
  };
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

  return (
    <div class='container'>
      <div class='button-container'>
        <button onClick={gotoPlayerHome}>Back</button>
        <button onClick={redirecttoapplied}>Go to Starred Posts</button>
        <button onClick={redirecttomyposts}>See All Your Posts</button>
      </div>

      <div className='player_player_container'>
        <h2 className='player_player_heading'>
          These Are the Available PlayerPosts
        </h2>
        <div className='player_player_filterOption player_player_filter-container'>
          {!filterinUse && (
            <div>
              <button onClick={filterPlayerPosts}>Filter Based on Sport</button>
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
  );
};

export default PlayerCoach;
