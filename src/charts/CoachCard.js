import { Stack, CardBody, Heading, Text, CardFooter, Button, Card, Image} from "@chakra-ui/react"

import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

const CoachCard = () => {

  const [activeUsers, setActiveUsers] = useState(0);
  const [count, setCount] = useState(0);
  const [errDisplay, seterrDisplay] = useState('');
  


  const getData = async () => {
    //e.preventDefault();
    
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        'Authorization': token,
        
      };
      const response = await axios.get(
        `http://localhost:4000/api/admin/getcoachescount`,{ headers }
      );

      if (response.status >= 200 && response.status <= 300) {
        
        const  count  = response.data;
        

        

        console.log('coaches count now : ', count);
        setCount(count);
        //return count;
      } else {
        console.error('Error:', response.data.error);
        seterrDisplay(response.data.error);
        //return 0;
      }
    } catch (error) {
      console.error('Error:', error.message);
      seterrDisplay(error.message);
     // return 0;
    }
  };

  const getActiveCoachesCount = async () => {

    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        'Authorization': token,
        
      };
      const response = await axios.get(
        `http://localhost:4000/api/admin/getactivecoachescount`,{ headers }
      );

      if (response.status >= 200 && response.status <= 300) {
        
        const  activeCountCoach  = response.data;
        

        

        console.log('active coaches count : ', activeCountCoach);
        setActiveUsers(activeCountCoach);
        //return count;
      } else {
        console.error('Error:', response.data.error);
        seterrDisplay(response.data.error);
        //return 0;
      }
    } catch (error) {
      console.error('Error:', error.message);
      seterrDisplay(error.message);
     // return 0;
    }
  }
  

  // useEffect(() => {
  //   getData();
    

  // },[count]);
  useEffect(() => {
    getData();
    getActiveCoachesCount();
    

    
  }, []);
  return (
<div className="card my-3" style = {{width: "300px",
    height : '150px'}}>
  <div className="card-body">
    <h5 className="card-title">Coaches</h5>
    
    <p className="card-text">Total users  : {count} <br />
    Active users : {activeUsers}
    </p>
    
    <Link to="/admin/dashboard/coachuserscomingin" class="card-link" style={{color:'blue'}}>View Details</Link>
    
  </div>
</div>
  )
}

export default CoachCard
