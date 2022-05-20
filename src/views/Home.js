import Box from '@mui/system/Box'
import Appbar from '../components/Appbar'
import Card from '@mui/material/Card';
import Chatlist from '../components/Chatlist';
import { Outlet } from 'react-router';
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import socket from '../socket';
import {useEffect } from 'react'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Home = () => {

    const [open, setOpen] = React.useState(true); 
    const [username, setUsername] = React.useState(''); 

    useEffect(() => {
      socket.on("session", ({ sessionID, userID }) => {
        console.log('new session', sessionID)
        socket.auth = { sessionID };
        localStorage.setItem("sessionID", sessionID);
        socket.userID = userID;
      });

      const sessionID = localStorage.getItem("sessionID");

      if(sessionID){
        console.log('Session id detected')
        setOpen(false)
        socket.auth = { sessionID };
        socket.connect();
      }else{
        setOpen(true)
      }

      socket.on("connect_error", (err) => {
        if (err.message === "invalid username") {
          console.log('Username error') 
        }
      });
    },[]) 
    

    const loginUser = () => {
      socket.auth = { username };
      socket.connect();
      localStorage.setItem('sessionID', '')
      setOpen(false);
    }

  return (
    
    <div>
      <div>
          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle id="customized-dialog-title">
              Login
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <TextField id="outlined-basic" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
            </DialogContent>
            <DialogActions>
              <Button onClick={loginUser}>
                LOGIN
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
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