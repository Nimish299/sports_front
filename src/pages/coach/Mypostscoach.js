import { useNavigate } from 'react-router-dom';
import MypostDisplaycoach from '../../components/coach/MypostDisplaycoach';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Mypostscoach = () => {
  const navigate = useNavigate();
  const [coachPosts, setcoachPosts] = useState([]);
  const [title, setTitle] = useState('');
  //   const [skill, setSkill] = useState('');
  const [description, setDescription] = useState('');
  //   const [sport, setSport] = useState('');
  //   const [quantity, setQuantity] = useState(0);
  //   const [location, setLocation] = useState('');
  const [price, setprice] = useState('');
  const [court, setcourt] = useState('');
  //   const [playerInfo, setPlayerInfo] = useState('');
  const [errDisplay, setErrDisplay] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newPostFlag, setNewPostFlag] = useState(false);
  const fetchPlayerPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/coachpost/allselfpost`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const json = response.data;
        setcoachPosts(json);
        console.log(json);
      } else {
        console.log('Error fetching player posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching player posts:', error);
    }
  };

  useEffect(() => {
    fetchPlayerPosts();
  }, []);
  useEffect(() => {
    fetchPlayerPosts();
  }, [newPostFlag]);
  // let playerInfo = null;

  const addcoachPost = async (e) => {
    e.preventDefault();
    console.log('before the commit im here');
    try {
      console.log('after fetch info im here');
      // Create new post object with playerInfo
      const newPost = {
        title,
        description,
        court,
        price,
      };
      console.log('New Post:before the commit ', newPost);
      // Send POST request to create player post
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/coachpost/create`,
        newPost,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        const createdPost = response.data;
        setcoachPosts((prevPosts) => [...prevPosts, createdPost]);
        console.log('im here');
        setTitle('');
        setDescription('');
        setprice('');
        setErrDisplay('');
        setcourt('');
        const a = !newPostFlag;
        setNewPostFlag(a);
      } else {
        const errorData = response.data;
        setErrDisplay(errorData.error);
      }
    } catch (error) {
      console.error('Error creating player post:', error);
      setErrDisplay(
        error.message || 'Failed to create player post. Please try again later.'
      );
    }
  };

  const goTocoachstudent = () => {
    navigate('/coach/playerCoach');
  };
  const toggleFormVisibility = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  return (
    <div>
      <div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className='btn btn-primary' onClick={toggleFormVisibility}>
            {showForm ? 'Hide' : 'Add Post'}
          </button>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className='btn btn-primary' onClick={goTocoachstudent}>
              Back
            </button>
          </div>
        </div>

        {showForm && ( // Render the form only if showForm is true
          <div
            className='card mx-2 my-2'
            style={{
              width: '18rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '20px', // Added margin-bottom
            }}
          >
            <div className='card-body'>
              <h2 style={{ textAlign: 'center' }}>Add Player Post</h2>
              <form
                style={{ maxWidth: '500px', margin: '0 auto' }}
                onSubmit={addcoachPost}
              >
                <div className='form-group'>
                  <label>Title</label>
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='form-control'
                    placeholder='Enter Title'
                  />
                </div>

                <div className='form-group'>
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='form-control'
                    rows='3'
                    placeholder='Enter Description'
                  ></textarea>
                </div>
                <div className='form-group'>
                  <label>Price</label>
                  <input
                    type='text'
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    className='form-control'
                    placeholder='Enter Price'
                  />
                </div>
                

                <div className='form-group'>
                  <label>Court:</label>
                  <input
                    type='text'
                    value={court}
                    onChange={(e) => setcourt(e.target.value)}
                    className='form-control'
                    placeholder='Enter Court'
                  />
                </div>
                <button type='submit' className='btn btn-primary'>
                  Add
                </button>
              </form>

              {errDisplay && <p>{errDisplay}</p>}
            </div>
          </div>
        )}

        <h2 className='player_player_heading ' style={{ textAlign: 'center' }}>
          Posts
        </h2>

        {/* <div className='my_post-grid-container'>
          <div className='my_post-grid-container'>
            {coachPosts &&
              coachPosts.map((post, index) => (
                <div
                  key={post._id}
                  className='my_post-grid-item'
                  style={{ marginLeft: index % 4 !== 0 ? '2px' : '0' }}
                >
                  <MypostDisplaycoach
                    coachPosts={coachPosts}
                    setcoachPosts={setcoachPosts}
                    coachPost={post}
                  />
                </div>
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Mypostscoach;
