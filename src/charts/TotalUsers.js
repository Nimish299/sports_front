import { Stack, CardBody, Heading, Text, CardFooter, Button, Card, Image} from "@chakra-ui/react"

import { useEffect, useState } from "react";
import axios from "axios"
const TotalUsers = () => {


  const [count, setCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [errDisplay, seterrDisplay] = useState('');
  


  const getData = async () => {
    //e.preventDefault();
    
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        'Authorization': token,
        
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/admin/gettotaluserscount`,{ headers }
      );

      if (response.status >= 200 && response.status <= 300) {
        
        const  count  = response.data;
        

        

        // console.log('coaches count now : ', count);
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

  
  const getActiveUsersCount = async () => {

    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        'Authorization': token,
        
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/admin/getactiveuserscount`,{ headers }
      );

      if (response.status >= 200 && response.status <= 300) {
        
        const  countActive  = response.data;
        

        

        // console.log('toal active users : ', countActive);
        setActiveUsersCount(countActive);
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

 
  useEffect(() => {
    getData();
    getActiveUsersCount();
   

    
  }, [count,activeUsersCount]);



  return (
<div className="card my-3" style = {{width: "400px",
    height : '150px'}}>
  <div className="card-body">
    <h5 className="card-title">Users</h5>
    
    <p className="card-text">Total users  : {count} <br />
    Active users  : {activeUsersCount}
    
    </p>
    
    <a href="#" class="card-link" style={{color:'blue'}}>View Details</a>
    
  </div>
</div>
  )
}

export default TotalUsers
