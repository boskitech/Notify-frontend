import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/Button'
import Button from '@mui/material/Button';
import socket from '../socket';
import { useNavigate } from "react-router-dom";

export default function Appbar() {

  const navigate = useNavigate()
  const data = localStorage.getItem("user")
  const token = localStorage.getItem('token')
  const user = JSON.parse(data)

  const logout = () => {
    localStorage.removeItem('sessionID')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    socket.disconnect(true)
    navigate('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor:'#efefef'}} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2, fontSize:'13px'}}
          >
            <ChatIcon/>Notify
          </IconButton>
          </Typography>
          {
            token &&
            <div>
              <Button sx={{color:'#555555'}}>
              Welcome {user.username}
              </Button>
              <Button sx={{color:'red'}} onClick={logout}>
                Logout
              </Button> 
            </div> 
          
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}