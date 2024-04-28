import { useState, useEffect } from 'react';
import axios from 'axios';

const Applied = ({ ID, navigate }) => {
  //   console.log(`ID:`, ID);
  const [coachinfo, setcoachinfo] = useState('');
  const fetch_info = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };

      // Assuming coach_id is available from somewhere in your component
      //   const item = { coach_id };coachPost.
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/player/fetch_coach/${ID}`,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const json = response.data;
        setcoachinfo(json);
        console.log(`info:`, json);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching coach info:', error);
      throw new Error('Failed to fetch coach info. Please try again later.');
    }
  };
  useEffect(() => {
    fetch_info();
  }, []);
  return (
    <div>
      <div
        style={{
          backgroundColor: 'white',

          width: '45rem',
          borderRadius: '8px',

          fontFamily: 'Arial, sans-serif', // Change the font family
        }}
      >
        <div className='container text-center'>
          <div className='row align-items-start'>
            <div className='col' style={{ fontSize: '16px' }}>
              {coachinfo.emailID}
            </div>
            <div className='col' style={{ fontSize: '16px' }}>
              {coachinfo.name}
            </div>
            <div className='col' style={{ fontSize: '16px' }}>
              {coachinfo.location}
            </div>
            <div className='col' style={{ fontSize: '16px' }}>
              {coachinfo.mobileNumber}
            </div>
            <div className='col' style={{ fontSize: '16px' }}>
              {coachinfo.sport}
            </div>
            <div className='col' style={{ fontSize: '16px' }}>
              {coachinfo.coaching_experience_years}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applied;
