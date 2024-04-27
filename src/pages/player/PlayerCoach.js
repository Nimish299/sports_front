import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import AcadListDisplay from '../../components/payer/AcadListDisplay';
import axios from 'axios';
import CoachPostListDisplay from '../../components/player/CoachPostListDisplay';
const PlayerCoach = () => {
  const [coachPost, setcoachPost] = useState([]);

  const [flag, setflag] = useState(false);

  const run = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/player/allcoachposts`,
        { headers }
      );

      if (response.status === 200) {
        const coachPost = response.data;
        setcoachPost(coachPost);
        // console.log(coachPost);
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
  }, []);

  const navigate = useNavigate();
  const gotoPlayerHome = () => {
    return navigate('/player/home');
  };
  const redirecttoappliedposts = () => {
    return navigate('/player/applied');
  };

  return (
    <div>
      <div className='button-container'>
        <button className='primary' onClick={gotoPlayerHome}>
          Back
        </button>
        <button onClick={redirecttoappliedposts}>See All Apllied Posts</button>
      </div>
      {/* <div>
        <button onClick={redirecttoapplied}>Go to applied Coaches</button>
      </div> */}

      <div class='post-list'>
        {coachPost &&
          coachPost.map((post) => (
            <div class='post-item'>
              <CoachPostListDisplay
                key={post.name}
                coachPost={post}
                navigate={navigate}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlayerCoach;
