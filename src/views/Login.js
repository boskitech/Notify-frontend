import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
;
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import loginImg from '../assets/pngs/login_img.png'
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import IconButton from '@mui/material/Button'
import socket from '../socket';
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from 'react';

const Login = () => {
  const navigate = useNavigate()

  const [login, setLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [regPass, setRegPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  useEffect(() => {
    
    socket.on("session", ({ sessionID, id }) => {
      console.log('new session', sessionID)
      socket.auth = { sessionID };
      localStorage.setItem("sessionID", sessionID);
      socket.id = id;
    });

    const sessionID = localStorage.getItem("sessionID");

    if(sessionID){
      console.log('Session id detected')
      socket.auth = { sessionID };
      socket.connect();
      navigate('/chat')
    }else{
      console.log('Session id not detected')
    }

    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        console.log('Username error') 
      }
    });
  }) 

  const addUser = async () => {
    const meta = {
      username: username,
      email: email,
      password: regPass
    }

    const res = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(meta)
    }) 

    const data = await res.json()

    if(data.message === 'success'){
      setLogin(true)
    }
  }


  const loginUser = async () => {
    const meta = {
      email: email,
      password: password
    }

    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(meta)
    })  

    const data = await res.json()


    if(data.message === 'success'){
     localStorage.setItem('token', data.token)
      const username = data.user.username
      const id = data.user._id
      socket.auth = { id, username };
      socket.connect();
      navigate('/chat')
    }
  }


  return (

    <Box sx={{width: '70%', perspective: '1px;', overflow:'auto', height:'70vh', margin:'80px auto', backgroundColor:'#ffffff', borderRadius:'10px'}}>
      <Box sx={{width:'50%', height:'70vh', backgroundColor:'white', float:'left', overflow:'hidden'}}>
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2, fontSize:'13px', margin:'2%'}}
          >
            <ChatIcon/>Notify
          </IconButton>
        <Box sx={{width:'100%', marginLeft:'14%', marginTop:'0%'}}>
          <img width="70%" sx={{width:'400px', margin:'90px', height:'600px'}} src={loginImg} alt="Notify login"/>
        </Box>
        <p style={{textAlign:'center', color:'#666666', marginTop:'5%'}}>©2022 - Notify</p>
      </Box>
      <Box sx={{width:'50%', height:'70vh', backgroundColor:'white', float:'right'}}>
        {login ?
          <Box sx={{marginTop:'20%', marginRight:'12%', textAlign:'center'}}>
           <h2 style={{color:'#444444'}}>USER LOGIN</h2>
           <i style={{position:'absolute', padding:'13px 13px 13px 25px', color:'#555555'}}><EmailIcon></EmailIcon></i>
           <input type="text" value={email} onChange={ (e) => setEmail(e.target.value)} placeholder="Email" style={{width:'60%', textAlign:'center', padding:'10px 0px 10px 20px', backgroundColor:'#dfdfdf',  fontSize:'13px', borderRadius:'25px', height:'30px', border:'none', marginBottom:'20px'}}/><br/>
           <i style={{position:'absolute', padding:'13px 13px 13px 25px', color:'#555555'}}><LockIcon></LockIcon></i>
           <input type="text" value={password} onChange={ (e) => setPassword(e.target.value)} placeholder="Password" style={{width:'60%', textAlign:'center',padding:'10px 0px 10px 20px', backgroundColor:'#dfdfdf',  fontSize:'13px', borderRadius:'25px', height:'30px', border:'none', marginBottom:'20px'}}/><br/>
           <button onClick={loginUser} style={{width:'62%', cursor:'pointer', padding:'7px', fontSize:'20px', fontStyle:'bold', backgroundColor:'green', color:'white', borderRadius:'25px', height:'50px', border:'none'}}>    
             <b>LOGIN</b>
           </button><br/>
           <Button sx={{color:'#777777', marginTop:'20px'}} onClick={() => setLogin(false)}>Create your Account <ArrowRightAltIcon></ArrowRightAltIcon> </Button>     
         </Box> 
        : 
        <Box sx={{marginTop:'15%', marginRight:'12%', textAlign:'center'}}>
          <h2 style={{color:'#444444'}}>CREATE ACCOUNT</h2>
          <i style={{position:'absolute', padding:'13px 13px 13px 25px', color:'#555555'}}><EmailIcon></EmailIcon></i>
          <input type="text" value={email} onChange={ (e) => setEmail(e.target.value)} placeholder="Email" style={{width:'60%', textAlign:'center', padding:'10px 0px 10px 20px', backgroundColor:'#dfdfdf',  fontSize:'13px', borderRadius:'25px', height:'30px', border:'none', marginBottom:'20px'}}/><br/>
          <i style={{position:'absolute', padding:'13px 13px 13px 25px', color:'#555555'}}><PersonIcon></PersonIcon></i>
          <input type="text" value={username} onChange={ (e) => setUsername(e.target.value)} placeholder="Username" style={{width:'60%', textAlign:'center', padding:'10px 0px 10px 20px', backgroundColor:'#dfdfdf',  fontSize:'13px', borderRadius:'25px', height:'30px', border:'none', marginBottom:'20px'}}/><br/>
          <i style={{position:'absolute', padding:'13px 13px 13px 25px', color:'#555555'}}><LockIcon></LockIcon></i>
          <input type="text" value={regPass} onChange={ (e) => setRegPass(e.target.value)} placeholder="Password" style={{width:'60%', textAlign:'center',padding:'10px 0px 10px 20px', backgroundColor:'#dfdfdf',  fontSize:'13px', borderRadius:'25px', height:'30px', border:'none', marginBottom:'20px'}}/><br/>
          <i style={{position:'absolute', padding:'13px 13px 13px 25px', color:'#555555'}}><LockIcon></LockIcon></i>
          <input type="text" value={confirmPass}onChange={ (e) => setConfirmPass(e.target.value)} placeholder="Confirm Password" style={{width:'60%', textAlign:'center',padding:'10px 0px 10px 20px', backgroundColor:'#dfdfdf',  fontSize:'13px', borderRadius:'25px', height:'30px', border:'none', marginBottom:'20px'}}/><br/>
          <button onClick={addUser} style={{width:'62%', cursor:'pointer', padding:'7px', fontSize:'20px', fontStyle:'bold', backgroundColor:'green', color:'white', borderRadius:'25px', height:'50px', border:'none'}}>    
            <b>CREATE</b>
          </button><br/>
          <Button sx={{color:'#777777', marginTop:'20px'}} onClick={() => setLogin(true)}>LOGIN <ArrowRightAltIcon></ArrowRightAltIcon> </Button>     
        </Box>
        }
       
      </Box>
    </Box>

  )
}

export default Login