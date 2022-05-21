import Box from '@mui/system/Box'
import Appbar from '../components/Appbar'
import Card from '@mui/material/Card';
import Chatlist from '../components/Chatlist';
import { Outlet } from 'react-router';
import socket from '../socket';
import { useEffect} from 'react';


const Home = () => {


useEffect(() => {
    
  socket.on("session", ({ sessionID }) => {
    console.log('new session', socket.id)
    socket.auth = { sessionID };
    localStorage.setItem("sessionID", sessionID);
  });

  const sessionID = localStorage.getItem("sessionID");

  if(sessionID){
    console.log('Session id detected')
    socket.auth = { sessionID };
    socket.connect();
  }else{
    console.log('Session id not detected')
  }

  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      console.log('Username error') 
    }
  });
}) 

  return (
    <div>
      <Box elevation="3" sx={{margin:'auto', width:'1000px', height:'100vh', overflow:'hidden', backgroundColor:'#efefef'}}>
        <Appbar/>
        <Box sx={{ width:'100%', backgroundColor:'#ebe3e3'}}>
        <Card sx={{borderRadius: '0', height:'100vh', backgroundColor:'#efefef'}}>
          <Box sx={{width:'350px', float:'left', height:'100vh', padding:'20px'}}>
              <input type="text" placeholder="Search" style={{width:'330px', padding:'10px 0px 10px 20px', fontSize:'15px', borderRadius:'25px', height:'30px', border:'none', marginBottom:'20px'}}/>
                  <Chatlist/>
          </Box>
          <Box sx={{width:'600px', float:'right', height:'100vh', paddingTop:'20px'}}>
              <button align="right" style={{width:'90px', right:'20px', padding:'7px', float:'right', marginLeft:'10px', position:'relative', display:'block', fontSize:'12px', backgroundColor:'#fff', color:'#555', alignContent:'right', borderRadius:'25px', height:'30px', border:'none', marginTop:'15px', marginBottom:'25px', cursor:'pointer'}}>More</button>
              <button align="right" style={{width:'120px', right:'20px', padding:'7px', float:'right', position:'relative', display:'block', fontSize:'12px', backgroundColor:'#fff', color:'#555', alignContent:'right', borderRadius:'25px', height:'30px', border:'none', marginTop:'15px', marginBottom:'25px', cursor:'pointer'}}>Clear Chat</button>
              <Outlet/>
          </Box>
        </Card>
      </Box>
    </Box>
    </div>
  )
}

export default Home