import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AcadListDisplay from '../../components/player/AcadListDisplay';

const PlayerCoach = () => {
  const [academys, setAcademys] = useState([]);
  const [sport, setSport] = useState([]);

  const [filterinUse, setFilterinUse] = useState(false);

  const run = async () => {
    const response = await fetch(
      'https://sports-back.onrender.com/api/academy/allacademys',
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      setAcademys(json);
    } else {
      console.log(json.error);
    }
  };

  useEffect(() => {
    run();
  }, []);

  const navigate = useNavigate();
  const gotoPlayerHome = () => {
    return navigate('/player/home');
  };

  const filterAcademys = async () => {
    const response = await fetch(
      `https://sports-back.onrender.com/api/academy/sport/${sport}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    const json = await response.json();
    setAcademys(json);
    setFilterinUse(true);
  };

  const removeFilter = () => {
    run();
    setFilterinUse(false);
  };
  const redirecttoapplied = () => {
    return navigate('/player/applied');
  };

  return (
    <div>
      <div>
        <button onClick={gotoPlayerHome}>back</button>
      </div>
      <div>
        <button onClick={redirecttoapplied}>go to applied academys</button>
      </div>

      <div>
        {!filterinUse && (
          <div>
            <button onClick={filterAcademys}>filter based on sport</button>
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
          <div>
            <h3>filtered category is : {sport}</h3>
            <button onClick={removeFilter}>remove filter</button>
          </div>
        )}
      </div>
      <h2>these are the available academys</h2>

      <div>
        {academys &&
          academys.map((acad) => (
            <AcadListDisplay
              key={acad.name}
              academy={acad}
              navigate={navigate}
            />
          ))}
      </div>
    </div>
  );
};

export default PlayerCoach;
