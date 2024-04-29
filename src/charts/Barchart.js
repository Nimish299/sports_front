import { useEffect, useState } from 'react';
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';


const Barchart = () => {
  const dummyData = [
    {
      "name": "January",
      "Players": 400,
      "Coaches": 2400
      
    },
    {
      "name": "February",
      "Players": 3000,
      "Coaches": 240
      
    },
    {
      "name": "March",
      "Players": 2000,
      "Coaches": 2500
      
    },
    {
      "name": "April",
      "Players": 2780,
      "Coaches": 1400
      
    },
    {
      "name": "May",
      "Players": 1890,
      "Coaches": 2410
      
    },
    {
      "name": "June",
      "Players": 2390,
      "Coaches": 240
      
    },
    {
      "name": "July",
      "Players": 2900,
      "Coaches": 2700
      
    },
    {
        "name": "August",
        "Players": 1000,
        "Coaches": 400
        
      },
      {
        "name": "September",
        "Players": 3000,
        "Coaches": 700
        
      },
      {
        "name": "October",
        "Players": 1490,
        "Coaches": 800
        
      },
      {
        "name": "November",
        "Players": 2490,
        "Coaches": 1000
        
      },
      {
        "name": "December",
        "Players": 349,
        "Coaches": 200
        
      }
  ]

  const [barData, setBarData] = useState(dummyData);
  const [errDisplay, seterrDisplay] = useState('');
  

    

      const getData = async () => {
        //e.preventDefault();
        
        try {
          const token = localStorage.getItem('auth-token');
          const headers = {
            'Authorization': token,
            
          };
          const response1 = await axios.get(
            `${process.env.REACT_APP_URL}api/admin/getcoachesjoinedpermonth`,{ headers }
          );
          const response2 = await axios.get(
            `${process.env.REACT_APP_URL}api/admin/getplayersjoinedpermonth`,{ headers }
          );
    
          if (response1.status >= 200 && response1.status <= 300 && response2.status >= 200 && response2.status <= 300) {
            
            const  newDataCoaches  = response1.data;
            const newDataPlayers = response2.data;
            mergeData(newDataPlayers, newDataCoaches); 
            
            
            
    
            
            console.log('bar chart player data : ', newDataPlayers)
            console.log('bar chart coach data : ', newDataCoaches)
            // console.log('bar chart coach data : ', finalData);
            // return newData;
            
          } else {
            console.error('Error:', response1.data.error);
            console.error('Error:', response2.data.error);
            seterrDisplay(response1.data.error);
           
          }
        } catch (error) {
          console.error('Error:', error.message);
          seterrDisplay(error.message);
        
        }
      };

     


      const mergeData = (playersData, coachesData) => {
        const mergedData = {};
      
        // Iterate over players data
        playersData.forEach(({ name, Players }) => {
          if (!mergedData[name]) {
            mergedData[name] = { name, Players, Coaches: 0 }; // Initialize coaches count to 0
          } else {
            mergedData[name].Players = Players; // Update players count
          }
        });
      
        // Iterate over coaches data
        coachesData.forEach(({ name, Coaches }) => {
          if (!mergedData[name]) {
            mergedData[name] = { name, Players: 0, Coaches }; // Initialize players count to 0
          } else {
            mergedData[name].Coaches = Coaches; // Update coaches count
          }
        });
      
        // Convert mergedData object to array
        const mergedArray = Object.values(mergedData);
      
        // Sort mergedArray by month name
        mergedArray.sort((a, b) => {
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          return months.indexOf(a.name) - months.indexOf(b.name);
        });
        console.log('merged array : ', mergedArray)
        setBarData(mergedArray);
      };

      useEffect(() => {
        getData();
        
      
    
        
      }, []);





      
  return (
    <div style={{fontSize: '12px', // Adjust the font size as needed
    width: 'fit-content'}}>
        <BarChart width={730} height={250} data={barData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="Coaches" fill="#8884d8" />
  <Bar dataKey="Players" fill="#82ca9d" />
</BarChart>

      
    </div>
  )
}

export default Barchart
