import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StudentDisplay from '../../components/coach/StudentDisplay';
import axios from 'axios';
const Coachstudent = () => {
  const [StudentsIDS, setStudentsIDS] = useState([]);
  const [sport, setSport] = useState([]);
  const [flag, setflag] = useState(false);
  // const [filterinUse, setFilterinUse] = useState(false);

  const run = async () => {
    const token = localStorage.getItem('auth-token');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/coach/applied/students`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const StudentsIDS = response.data;
        console.log(`ids:`, StudentsIDS);
        setStudentsIDS(StudentsIDS);
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
  const gotoCoachHome = () => {
    return navigate('/coach/home');
  };

  const redirecttomyposts = () => {
    return navigate('/coach/myposts');
  };

  return (
    <div class='container'>
      <div class='button-container'>
        <button onClick={gotoCoachHome}>Back</button>
        <button onClick={redirecttomyposts}>See All Your Posts</button>
      </div>

      <div className='player_player_container'>
        <h2 className='player_player_heading'>Students</h2>
      </div>

      <div class='post-list'>
        {StudentsIDS &&
          StudentsIDS.map((student) => (
            <div className='student-item' key={student._id}>
              <StudentDisplay student={student} navigate={navigate} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Coachstudent;
