const AppliedListDisplay = ({ academy, academys, setAcademys }) => {
  const deleteAcademy = async (e) => {
    e.preventDefault();
    console.log(academy);
    const response = await fetch(
      `https://sports-back.onrender.com/api/player/leaveacad`,
      {
        method: 'DELETE',
        body: JSON.stringify(academy),
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    console.log(response);
    const json = await response.json();
    console.log(json);
    const updatedApplied = academys.filter((acad) => acad !== academy);
    setAcademys(updatedApplied);
  };

  return (
    <div>
      <h4>name : {academy.name}</h4>
      <button
        onClick={(e) => {
          deleteAcademy(e);
        }}
      >
        leave this academy{' '}
      </button>
    </div>
  );
};

export default AppliedListDisplay;
