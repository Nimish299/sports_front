import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const CoachPostDetailsPage = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [coachinfo, setcoachinfo] = useState('');
  const [post, setPost] = useState(null); // State to store the fetched post
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [flag, setflag] = useState(false);
  const [coachPost, setcoachPost] = useState([]);
  const [skill, setSkill] = useState('');
  const gotoPlayerCoach = () => {
    return navigate('/player/playerCoach');
  };
  const redirecttoplayercoach = () => {
    return navigate('/player/playerCoach');
  };
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const fetch_info = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };

      // Assuming coach_id is available from somewhere in your component
      //   const item = { coach_id };coachPost.
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/player/fetch_coach_info/${_id}`,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const json = response.data;
        setcoachinfo(json);
        // console.log(`info:`, coachinfo);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching coach info:', error);
      throw new Error('Failed to fetch coach info. Please try again later.');
    }
  };
  const run = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/player/coachpost/${_id}`,
        { headers }
      );

      if (response.status >= 200 && response.status < 300) {
        const coachPost = response.data;
        setcoachPost(coachPost);
        // console.log(`post :`, coachPost);
        setflag(true);
      } else {
        console.error('Error:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Inside the useEffect hook
  useEffect(() => {
    // statusfun(_id);
    // getDetails();
    run();
    fetch_info();
  }, []);
  useEffect(() => {
    // statusfun(_id);
    // getDetails();
  }, [status]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { message, skill };
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/playerpost/requestoncoachpost/${_id}`,
        user,
        {
          headers,
        }
      );

      const json = response.data;

      if (response.status >= 200 && response.status < 300) {
        setStatus('pending');
        // console.log(json.message);
        // Check if a new request was created or an existing one was updated
        if (json.updated) {
          console.log('Existing request updated');
        } else {
          console.log('New request created');
        }
      } else {
        console.log(json.error);
        setErrorMessage(json.error); // Set the error message received from the backend
      }
    } catch (error) {
      console.error('Error submitting request:', error.message);
    }
  };
  // Function to fetch status
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
      {coachPost ? (
        <>
          <div className='post-container'>
            <div className='post-card'>
              <h2 className='post-title'>Title: {coachPost.title}</h2>
              <h3 className='post-subtitle'>
                Description: {coachPost.description}
              </h3>
              {/* Display other details as needed */}
              <div className='post-body'>
                <p className='post-text'>Name: {coachinfo.name}</p>
                <p className='post-text'>Sports: {coachinfo.sport}</p>
                <p className='card-text mb-1'>
                  Charges:₹ {coachPost.price} per month
                </p>
                <p className='post-text'>Court: {coachPost.court}</p>
                <p className='post-text'>City: {coachinfo.location}</p>
                <p>Posted: {formatTimestamp(coachPost.createdAt)}</p>
              </div>
            </div>

            <button className='post-button' onClick={redirecttoplayercoach}>
              Back to posts
            </button>
            {!status && (
              <div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button
                    className='btn btn-primary'
                    onClick={toggleFormVisibility}
                  >
                    {showForm ? 'Request' : 'Request'}
                  </button>
                </div>

                {showForm && (
                  <div>
                    <h2 style={{ textAlign: 'center' }}>
                      Request a Player For playing
                    </h2>
                    <form
                      style={{ maxWidth: '500px', margin: '0 auto' }}
                      onSubmit={handleSubmit}
                    >
                      <div className='form-group'>
                        <label>Message</label>
                        <input
                          type='text'
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className='form-control'
                          placeholder='Enter your message'
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='skill'>Skill</label>
                        <select
                          id='skill'
                          value={skill}
                          onChange={(e) => setSkill(e.target.value)}
                          className='form-control'
                          required // Add the required attribute to ensure HTML5 form validation
                        >
                          <option value=''>Select Skill</option>
                          <option value='Beginner'>Beginner</option>
                          <option value='Intermediate'>Intermediate</option>
                          <option value='Advanced'>Advanced</option>
                        </select>
                      </div>
                      {errorMessage && (
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                      )}

                      <button type='submit' className='btn btn-primary'>
                        Submit
                      </button>
                    </form>
                  </div>
                )}

                {/* The rest of your code for displaying existing player posts and back button */}
              </div>
            )}

            {status && (
              <button className={`post-button-status button-${status}`}>
                {status}
              </button>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CoachPostDetailsPage;
