// import AcademyDisplay from '../../components/coach/academyDisplay';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { FlagState } from '../../context/FlagProvider';
import axios from 'axios';
const CoachHome = () => {
  const navigate = useNavigate();
  const logoutCoach = async () => {
    console.log('logged out');
    try {
      await axios.get(`${process.env.REACT_APP_URL}api/coach/logout`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('logged out');
      localStorage.removeItem('auth-token');

      delete axios.defaults.headers.common['Authorization'];
      // printAxiosHeaders();
      return navigate('/');
    } catch (error) {
      // Handle error
      console.error('Error logging out:', error);
    }
  };
  const redirectprofile = () => {
    return navigate('/coach/Coach-profile');
  };

  const { loginflag, setLoginflag } = FlagState();

  const gotoPlayerCoach = () => {
    return navigate('/coach/playerCoach');
  };

  return (
    <div>
      <div className='newcode'>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              maxHeight: '1000px',
              maxWidth: '900px',
              backgroundColor: '#fff',
              padding: '40px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h1
              style={{
                fontSize: '2.5rem',
                marginBottom: '30px',
                color: '#333',
              }}
            >
              Welcome to Sports Connect
            </h1>
            <p
              style={{
                fontSize: '1.2rem',
                marginBottom: '30px',
                color: '#666',
              }}
            >
              Ready to take your game to the next level?
            </p>

            <div
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                fontSize: '1.2rem',
                backgroundColor: '#007bff',
                color: '#fff',
                textDecoration: 'none',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                margin: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              <button onClick={gotoPlayerCoach}>Students</button>
            </div>
            {/* <div
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                fontSize: '1.2rem',
                backgroundColor: '#007bff',
                color: '#fff',
                textDecoration: 'none',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                margin: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              <button onClick={gotoPlayerCoach}>Find coaches</button>
            </div> */}
            <div
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                fontSize: '1.2rem',
                backgroundColor: '#007bff',
                color: '#fff',
                textDecoration: 'none',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                margin: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              <button onClick={redirectprofile}>Profile</button>
            </div>

            <div
              style={{
                display: 'inline-block',
                padding: '15px 40px',
                fontSize: '1.2rem',
                backgroundColor: 'red',
                color: '#fff',
                textDecoration: 'none',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                margin: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              <button onClick={logoutCoach}>sign out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoachHome;

/*

 <div className='container' style={{ background: 'grey' }}>
      <div>
        <button onClick={logoutCoach}>sign out</button>
      </div>
      <div>
        <h2>add Academy</h2>
        <form onSubmit={addacad}>
          <div>
            <label>name </label>
            <input
              type='text'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label>quantity </label>
            <input
              type='number'
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
          <div>
            <label>category </label>
            <input
              type='text'
              value={sport}
              onChange={(e) => {
                setSport(e.target.value);
              }}
            />
          </div>
          <button> add</button>
        </form>
        <div>{errDisplay && <p>{errDisplay}</p>}</div>
      </div>
      <div>
        <h1>u have added all these academy openings</h1>
      </div>
      <div>
        {academys &&
          academys.map((acad) => (
            <AcademyDisplay
              key={acad.name}
              academys={academys}
              setAcademys={setAcademys}
              academy={acad}
            />
          ))}
      </div>
    </div>
*/

/*
  const navigate = useNavigate();
  const [academys, setAcademys] = useState([]);

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [sport, setSport] = useState('');
  const [errDisplay, seterrDisplay] = useState('');

  useEffect(() => {
    const run = async () => {
      const response = await fetch('/api/academy/allcoach', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setAcademys(json);
      } else {
        console.log(json.error);
      }
    };
    run();
  }, []);


  const addacad = async (e) => {
    e.preventDefault();
    const academy = { name, quantity, sport };
    const response = await fetch(`/api/academy/create`, {
      method: 'POST',
      body: JSON.stringify(academy),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setName('');
      setQuantity(0);
      setSport('');
      seterrDisplay('');
      setAcademys((prev) => [...prev, academy]);
    } else {
      console.log(json.error);
      seterrDisplay(json.error);
    }
  };
  */
