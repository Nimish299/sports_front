import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, } from 'recharts';
import { useEffect, useState } from "react";

import axios from "axios";

const PlayerAdminPieChart = () => {
    const dummyData1 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 },
        { name: 'Group F', value: 189 },
      ];
      
      const dummyData2 = [
        { name: 'Group A', value: 2400 },
        { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 },
        { name: 'Group D', value: 9800 },
        { name: 'Group E', value: 3908 },
        { name: 'Group F', value: 4800 },
      ];

      const [playerPostDetails, setPlayerPostDetails] = useState([]);
      const [coachPostDetails, setCoachPostDetails] = useState([]);
      const [errDisplay, seterrDisplay] = useState("");
      

      const getPlayerPostData = async () => {
        //e.preventDefault();
        
        try {
          const token = localStorage.getItem('auth-token');
          const headers = {
            'Authorization': token,
            
          };
          const response = await axios.get(
            `http://localhost:4000/api/admin/getplayerpostdetails`,{ headers }
          );
    
          if (response.status >= 200 && response.status <= 300) {
            
            const  playerPostData  = response.data;
            
    
            
    
            console.log('player post data : ', playerPostData);
            setPlayerPostDetails(playerPostData);
            
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

      const getCoachPostData = async () => {
        //e.preventDefault();
        
        try {
          const token = localStorage.getItem('auth-token');
          const headers = {
            'Authorization': token,
            
          };
          const response = await axios.get(
            `http://localhost:4000/api/admin/getcoachpostdetails`,{ headers }
          );
    
          if (response.status >= 200 && response.status <= 300) {
            
            const  coachPostData  = response.data;
            
    
            
    
            console.log('coach post data : ', coachPostData);
            setCoachPostDetails(coachPostData);
            
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
         getPlayerPostData();
         getCoachPostData();
      },[])
    

  return (
    <div className="container mt-n2 my-2">
        <div className="row">
        <div className="col-md-6">
          <div className='card'>
          

        <PieChart width={300} height={400}>
        <text x="150" y="40" textAnchor="middle" fill="black" fontSize="20px" fontWeight="bold">Player Posts</text>
            
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={playerPostDetails}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#82ca9d"
            label
          />
          <Pie dataKey="value" data={playerPostDetails} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
          <Tooltip />
        </PieChart>
        </div >
        </div>
        <div className="col-md-6">
        <div className='card' >
        <PieChart  width={300} height={400}>
        <text x="150" y="40" textAnchor="middle" fill="black" fontSize="20px" fontWeight="bold">Coach Posts</text>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={coachPostDetails}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Pie dataKey="value" data={coachPostDetails} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
          <Tooltip />
        </PieChart>
        </div>
        </div>
        </div>
     
      
      
    </div>
  )
}

export default PlayerAdminPieChart
