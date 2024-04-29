import { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import axios from "axios";

const dummySportsData = [
  {
    subject: "Tennis",
    A: 120,
    B: 110,
  },
  {
    subject: "Badminton",
    A: 98,
    B: 130,
  },
  {
    subject: "Basketball",
    A: 86,
    B: 130,
  },
  {
    subject: "Cricket",
    A: 99,
    B: 100,
  },
  {
    subject: "Frisbee",
    A: 85,
    B: 90,
  },
  {
    subject: "Volleyball",
    A: 65,
    B: 85,
  },
];
// const coachData = [
//   {
//     "_id": "cricket",
//     "count": 2
//   },
//   {
//     "_id": "Tennis",
//     "count": 1
//   }
// ];

const RadarChartGrid = () => {
  const [errDisplay, seterrDisplay] = useState("");
  const [playerCoachData, setPlayerCoachData] = useState(dummySportsData);

  const getPlayerCoachData = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `http://localhost:4000/api/admin//getplayercoachcountsbySport`,
        { headers }
      );
     
      if (
        response.status >= 200 &&
        response.status <= 300 
       ) {
        const playerCoachNewData = response.data;
       
        console.log("coach player data data", playerCoachNewData);

        

        setPlayerCoachData(playerCoachNewData);

        //return count;
      } else {
        console.error("Error:", response.data.error);
        
        seterrDisplay(response.data.error);
        //return 0;
      }
    } catch (error) {
      console.error("Error:", error.message);
      seterrDisplay(error.message);
      // return 0;
    }
  };

 
  useEffect(() => {
    getPlayerCoachData();
  }, []);

  return (
    <div>
      <RadarChart
        outerRadius={90}
        width={730}
        height={250}
        data={playerCoachData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Radar
          name="Players"
          dataKey="A"
          stroke="#8884d8"
          fill="#82ca9d"
          fillOpacity={0.6}
        />
        <Radar
          name="Coaches"
          dataKey="B"
          stroke="#82ca9d"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </div>
  );
};

export default RadarChartGrid;
