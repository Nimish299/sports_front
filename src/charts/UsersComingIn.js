import { useEffect, useState } from "react";
import axios from "axios"







const UsersComingIn = () => {
  const [topUsers, setTopUsers] = useState('')
  const [errDisplay, seterrDisplay] = useState('');
  

  const getData = async () => {
   // e.preventDefault();
    
    
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        'Authorization': token,
        
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/admin/gettoptenusers`,{ headers }
      );

      if (response.status >= 200 && response.status <= 300) {
        
        const topTenData  = response.data;

        console.log('top ten data: ', topTenData);
        setTopUsers(topTenData);

        

        

        
        
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
    
  }, []);


  // useEffect(() => {
    
    
  //     getData();
    

    
  // }, []);



  return (
    <div className="card my-2" style={{ maxHeight: '500px' }}>
  <h3 className="text-center mb-4 my-3" style={{ color: 'black', fontSize: '24px' }}>Users Coming In</h3>
  <ul className="list-group">
  {topUsers && topUsers.map(user => (
          <li style={{backgroundColor : '#F0F8FF'}} key={user._id} className="list-group-item d-flex">
            <div style={{ width: '50%' }}>
              <strong>{user.name}</strong>
            </div>
            <div style={{ width: '50%' }}>
              <span></span> {user.emailID}
            </div>
          </li>
        ))} </ul>
</div>

  )
}

export default UsersComingIn
