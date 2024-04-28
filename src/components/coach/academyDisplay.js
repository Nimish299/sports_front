import { useState } from 'react';

const AcademyDisplay = ({ academy, setAcademys, academys }) => {
  const [quantity, setQuantity] = useState(0);

  const updateAcademy = async (e, istrue) => {
    e.preventDefault();

    if (istrue) {
      let temp = parseInt(academy.quantity, 10) + parseInt(quantity, 10);
      academy.quantity = temp;
    } else {
      academy.quantity = quantity;
    }

    const response = await fetch(`/api/academy/updatequantity`, {
      method: 'PATCH',
      body: JSON.stringify(academy),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
    } else {
      console.log(json.error);
    }
    const updatedAcademys = academys.map((acad) => {
      if (acad.name === academy.name) {
        acad.quantity = academy.quantity;
      }
      return acad;
    });
    setAcademys(updatedAcademys);
  };
  const deleteAcademy = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/academy/delete`, {
      method: 'DELETE',
      body: JSON.stringify(academy),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log(json);
      console.log('here');
    } else {
      console.log(json.error);
    }
    const updatedAcademys = academys.filter(
      (acad) => acad.emailID !== json.emailID
    );
    setAcademys(updatedAcademys);
  };

  return (
    <div>
      <div>
        <div>
          <h5>academy name: {academy.name}</h5>
        </div>
        <div>
          <p>number of openings : {academy.quantity}</p>
        </div>
        <div>
          <p>sport: {academy.sport}</p>
        </div>
        <button onClick={deleteAcademy}>delete</button>
        <div>
          <input
            type='number'
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              updateAcademy(e, true);
            }}
          >
            add this amount
          </button>
          <button
            onClick={(e) => {
              updateAcademy(e, false);
            }}
          >
            set this amount
          </button>
        </div>
      </div>
    </div>
  );
};
export default AcademyDisplay;
