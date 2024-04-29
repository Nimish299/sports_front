import Barchart from '../../charts/Barchart'
import RadarChartGrid from '../../charts/RadarChartGrid'
import PlayerCard from '../../charts/PlayerCard'
import CoachCard from '../../charts/CoachCard'
import PlayerAdminPieChart from '../../charts/PlayerAdminPieChart'
import TotalUsers from '../../charts/TotalUsers'
import UsersComingIn from '../../charts/UsersComingIn'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'







const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('auth-token');
    delete axios.defaults.headers.common['Authorization'];


    navigate('/')

  }
  
 
   
  return (
    <div className="container mt-n2 my-2" style = {{ backgroundColor : "white"}}>
      
      <h1 className="text-center mb-4">Dashboard</h1>
    {/* First row */}
    <div className="row">
    <div className="col-md-5">
        <TotalUsers />
      </div>
      <div className="col-md-3">
        <PlayerCard />
      </div>
      <div className="col-md-3">
        <CoachCard />
      </div>
    </div>
    {/* Second row */}
    <div className="row mt-4">
      <div className="col-md-6 my-2">
        <Barchart />
      </div>
      <div className="col-md-6">
        <RadarChartGrid />
      </div>
    </div>
    {/* Third row */}
    <div className="row mt-4 mt-n2" style = {{marginTop : '-10px'}}>
     <div className="col-md-6">
        <PlayerAdminPieChart />
      </div> 
      <div className="col-md-6">        
        <UsersComingIn/>
      </div>
      
    </div>
    
    
  </div>
  
  )
}

export default AdminDashboard
