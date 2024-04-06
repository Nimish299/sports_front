import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppliedListDisplay from "../../components/player/AppliedListDisplay";

const AppliedAcademys=()=>{

  const navigate=useNavigate();
  const [academys,setAcademys]=useState([]);

  const gotoplayercoach=()=>{
    navigate('/player/playercoach');
  }


  useEffect(()=>{
    const getAcademys=async()=>{

      const response=await fetch('/api/player/applied',{
        method:'GET',
        headers:{
          'Content-type':'application/json'
        } 
      })
      const json=await response.json();
      const player=json.player;

      console.log(json);
      console.log("ok"); 
      setAcademys(player.applied);
      console.log(academys);
    }
 
    getAcademys()

  },[])

  return(
    <div>
      <button onClick={gotoplayercoach}>go back to available coaching academy list</button>
      <h2>your applied academies</h2>
      {academys && 
      <div>
      <div>
        {academys.map((academy)=>(<AppliedListDisplay key={academy.name} academy={academy} academys={academys} setAcademys={setAcademys} /> ))}
      </div>  
      </div>}
      {!academys && <h4>empty  </h4>}
    </div>
  )

}

export default AppliedAcademys;