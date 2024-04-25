import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const PlayerPostDetailsPage = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [post, setPost] = useState(null); // State to store the fetched post
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [flag, setflag] = useState(false);
  const gotoPlayerCoach = () => {
    return navigate('/player/playerCoach');
  };
  const redirecttoplayerplayer = () => {
    return navigate('/player/playerplayer');
  };
  const getDetails = async () => {
    try {
      const response = await axios.get(
        `https://sports-back.onrender.com/api/playerpost/details/${_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status < 200 && response.status > 300) {
        throw new Error('Failed to fetch post details');
      }

      const data = response.data;
      setPost(data);
      statusfun(_id);
    } catch (error) {
      console.error('Error fetching post details:', error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { message };
    try {
      const response = await axios.post(
        `https://sports-back.onrender.com/api/playerpost/requestonpost/${_id}`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const json = response.data;

      if (response.status >= 200 && response.status < 300) {
        setStatus('pending');
        console.log(json.message);
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
  // Inside the statusfun function
  const statusfun = async (_id) => {
    try {
      const response = await axios.get(
        `https://sports-back.onrender.com/api/playerpost/Statusonpost/${_id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      setStatus(data.status);
      setflag(true); // Update status state
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message); // Set the error message received from the backend
    }
  };

  // Inside the useEffect hook
  useEffect(() => {
    statusfun(_id);
    getDetails();
  }, []);
  useEffect(() => {
    statusfun(_id);
    getDetails();
  }, [status]);

  // Function to handle toggling form visibility
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const name = post?.playersInfo?.[0]?.name || 'Name not available';
  const playerLocation =
    post?.playersInfo?.[0]?.playerLocation || 'Location not available';

  // Function to fetch status

  return (
    <div>
      {post ? (
        <>
          <div className='post-container'>
            {post ? (
              <div className='post-card'>
                <h2 className='post-title'>Title: {post.title}</h2>
                <h3 className='post-subtitle'>
                  Description: {post.description}
                </h3>
                {/* Display other details as needed */}
                <div className='post-body'>
                  <p className='post-text'>Name: {name}</p>
                  <p className='post-text'>Sports: {post.sport}</p>
                  <p className='post-text'>Skill: {post.skill}</p>
                  <p className='post-text'>
                    Number of Openings: {post.quantity}
                  </p>
                  <p className='post-text'>Court: {post.location}</p>
                  <p className='post-text'>City: {playerLocation}</p>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <button className='post-button' onClick={redirecttoplayerplayer}>
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

export default PlayerPostDetailsPage;
