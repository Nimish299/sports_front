import React from 'react'

import { useEffect, useState } from "react";

import axios from "axios";


const CoachUsersComingIn = () => {

  const [coachesList, setCoachesList] = useState([])
  const [errDisplay, seterrDisplay] = useState("");
  const[permanentList, setPermanentList] = useState([]);

  const [searchPlayersList, setSearchPlayersList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getData = async () => {
      // e.preventDefault();
       
       

       try {
         const token = localStorage.getItem('auth-token');
         const headers = {
           'Authorization': token,

           
         };
         const response = await axios.get(
           `http://localhost:4000/api/admin/getallcoacheslistplease`,{ headers }
         );
   
         if (response.status >= 200 && response.status <= 300) {
           
           const newList  = response.data;
   
           console.log('all data coaches ka list ', newList);
           setCoachesList(newList);
           setPermanentList(newList);
   
           
   
           
   
           
           
           
         } else {
           console.error('Error:', response.data.error);
           seterrDisplay(response.data.error);
           
         }
       } catch (error) {
         console.error('Error:', error.message);
         seterrDisplay(error.message);
        
       }
     };


     const blockCoach = async (id) => {
      console.log("i am blocking coach with id: ", id);
      const coachID = id;
      try {
        const token = localStorage.getItem("auth-token");
        const headers = {
          Authorization: token,
        };
        const response = await axios.put(
          `http://localhost:4000/api/admin/blockcoach`,
          {coachID},
          { headers },
          
          
        );
  
        if (response.status >= 200 && response.status <= 300) {
          const updatedCoachesList = coachesList.map((coach) => {
            if (coach.id === coachID) {
              return { ...coach, isBlocked: true };
            }
            return coach;
          });
          setCoachesList(updatedCoachesList);
          setPermanentList(updatedCoachesList);
  
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

    const unblockCoach = async (id) => {
      console.log("i am blocking coach with id: ", id);
      const coachID = id;
      try {
        const token = localStorage.getItem("auth-token");
        const headers = {
          Authorization: token,
        };
        const response = await axios.put(
          `http://localhost:4000/api/admin/unblockcoach`,
          {coachID},
          { headers },
          
          
        );
  
        if (response.status >= 200 && response.status <= 300) {
          const updatedCoachesList = coachesList.map((coach) => {
            if (coach.id === coachID) {
              return { ...coach, isBlocked: false };
            }
            return coach;
          });
          setCoachesList(updatedCoachesList);
          setPermanentList(updatedCoachesList);
  
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

    const search = (input) => {
      const searchTerm = input.toLowerCase();
      return permanentList.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm);
        const emailMatch = item.email.toLowerCase().includes(searchTerm);
        return nameMatch || emailMatch;
      });
    }
  
    const handleSearch = () => {
      
      const searchList = search(searchText);
      setCoachesList(searchList);
  
      
  
  
  
    }

    

     useEffect(() => {
      getData();
    }, []);
  return (
    <div className="container-fluid my-4">
    <style>
      {`
      .player-info {
        display: flex;
        align-items: center;
      }
      
      .player-email {
        margin-left: auto; /* Push email section to the right */
      }
  
      .badge-container {
        display: flex;
        flex-direction: column; /* Display badge and paragraph in a column layout */
      }
  
      .badge {
        align-self: flex-start; /* Align badge to the start of the column */
      }
      `}
    </style>
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
      <div className="d-flex justify-content-end mb-3">
    <div className="input-group">
    <input onChange={(e) => setSearchText(e.target.value)} type="text" className="form-control" placeholder="Search..." />
      <button onClick={() => handleSearch()} className="btn btn-primary">Search</button>
    </div>
  </div>
  </div>
    <div className="accordion accordion-flush justify-content-start" id="accordionFlushExample">
      {coachesList.map((coach, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${index + 1}`} aria-expanded="false" aria-controls={`flush-collapse${index + 1}`}>
              <div className="player-info">
                <div className="paragraph-container">
                  <p className="player-name mx-2">{coach.name}<br/>{coach.email}</p>
                </div>
                <div className="badge-container">
                  {coach.isBlocked ? (
                    <span className="badge bg-danger">Blocked</span>
                  ) : (
                    <span className="badge bg-success">Active</span>
                  )}
                </div>
              </div>
            </button>
          </h2>
          <div id={`flush-collapse${index + 1}`} className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">
              <button type="button" onClick={() => blockCoach(coach.id)} className="btn btn-danger mx-2" disabled={coach.isBlocked}>Block</button>
              <button type="button" onClick={() => unblockCoach(coach.id)} className="btn btn-success" disabled={!coach.isBlocked}>Unblock</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>


  )
}

export default CoachUsersComingIn
