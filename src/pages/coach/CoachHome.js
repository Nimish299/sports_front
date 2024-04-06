import { useNavigate } from 'react-router-dom';
import AcademyDisplay from '../../components/coach/academyDisplay';
import { useEffect, useState } from 'react';

const CoachHome = () => {
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

  const logoutCoach = async (e) => {
    e.preventDefault();
    console.log('logged out');
    await fetch('/api/coach/logout', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    console.log('logged out');
    return navigate('/coach');
  };

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

  return (
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
  );
};
export default CoachHome;
