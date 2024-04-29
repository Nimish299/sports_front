import { Stack, CardBody, Heading, Text, CardFooter, Button, Card, Image} from "@chakra-ui/react"

import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";



const PlayerCard = () => {

  const [count, setCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [errDisplay, seterrDisplay] = useState('');

  const getActiveUsersCount = async () => {

    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        'Authorization': token,
        
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/admin/getactiveplayerscount`,{ headers }
      );

      if (response.status >= 200 && response.status <= 300) {
        
        const  activeCountPlayer  = response.data;
        

        

        console.log('active players count : ', activeCountPlayer);
        setActiveUsers(activeCountPlayer);
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

  


  const getData = async () => {
    //e.preventDefault();
    
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        'Authorization': token,
        
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/admin/getplayerscount`,{ headers }
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

  useEffect(() => {
    getData();
    getActiveUsersCount();
    

    
  }, []);

  
  return (
    <div class="card my-3" style = {{width: "300px",
    height : '150px'}}>
  <div class="card-body">
    <h5 class="card-title">Players</h5>
    
    <p class="card-text">Total users  : {count} <br />
    Active users : {activeUsers} 
    </p>
    
    <Link to="/admin/dashboard/playeruserscomingin" class="card-link" style={{color:'blue'}}>View Details</Link>
    
  </div>
</div>
  )
}

export default PlayerCard
