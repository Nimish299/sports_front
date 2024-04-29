import { Link, NavLink } from 'react-router-dom';

import backgroundImage from './backgroundImage.jpg';

const Home = () => {
  return (
    <div
      className='newcode'
      // style={{
      //   backgroundImage: `url(${backgroundImage})`,
      //   backgroundSize: "cover", // Ensure the background image covers the entire container
      //   backgroundPosition: "center", // Center the background image
      //   minHeight: "100vh",
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
    >
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
          <NavLink
            to='/admin/login'
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
            Admin
          </NavLink>
          <NavLink
            to='/player'
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
            Player
          </NavLink>

          <NavLink
            to='/coach'
            style={{
              display: 'inline-block',
              padding: '15px 40px',
              fontSize: '1.2rem',
              backgroundColor: '#28a745',
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
            coach
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
