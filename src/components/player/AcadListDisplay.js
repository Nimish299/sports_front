import { useState } from 'react';

const AcadListDisplay = ({ academy, navigate }) => {
  const [errDisplay, seterrDisplay] = useState('');
  const [applied, setApplied] = useState(false);
  const apply = async (e) => {
    e.preventDefault();
    const name = academy.name;
    const item = { name };
    const response = await fetch(
      'https://sports-back.onrender.com/api/player/applytoacad',
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      console.log(json);
      setApplied(true);
    } else {
      console.log(json.error);
      seterrDisplay(json.error);
    }
  };

  const acceptadded = (e) => {
    e.preventDefault();
    seterrDisplay('');
    setApplied(false);
  };

  const gotoAcad = (e) => {
    e.preventDefault();
    return navigate(`/academy/${academy.name}`);
  };

  return (
    <div>
      <div>
        <h3>name :{academy.name} </h3>
        <p>sport : {academy.sport}</p>
      </div>
      <div>
        {!applied && (
          <div>
            <button
              onClick={(e) => {
                apply(e);
              }}
            >
              add
            </button>
            <button
              onClick={(e) => {
                gotoAcad(e);
              }}
            >
              see details
            </button>
            {errDisplay && <p>{errDisplay}</p>}
          </div>
        )}
        {applied && (
          <div>
            <label>applied</label>
            <button
              onClick={(e) => {
                acceptadded(e);
              }}
            >
              ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default AcadListDisplay;
