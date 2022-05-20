import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import avatar1 from '../assets/avatar/1.png'
import Badge from '@mui/material/Badge';
// import avatar3 from '../assets/avatar/3.png'
import avatar4 from '../assets/avatar/4.png'
import { useNavigate } from "react-router-dom";
import socket from '../socket';
import { useState, useEffect } from 'react';

export default function AlignItemsList() {

  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    socket.on("users", (payload) => {
      payload.forEach((user) => {
        user.self = user.id === socket.id;
      });

      setUsers(payload.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      }));

    });
  
    socket.on("user connected", (user) => {
      setUsers([user, ...users])
    });

    socket.on("userleaves", (payload) => {
      setUsers(users.filter((user) => user.id !== payload))
    });
  
  },[users])

  return (
    <List sx={{borderRadius:'10px', width: '100%',  bgcolor: 'background.paper' }}>
      {users.map((payload, index) => {
          return (
            <ListItem key={index} onClick={() => { navigate(`/${payload.id}`) }} alignItems="flex-start" sx={{'&:hover': {backgroundColor:'#dedede', cursor:'pointer'},}}>
              <ListItemAvatar>
                  <Badge color="secondary" badgeContent=" " overlap="circular" variant="dot"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <Avatar alt="Jamal" src={avatar4} />
                </Badge>
              </ListItemAvatar>
              <ListItemText 
                primary={
                  <React.Fragment>
                    <Typography
                      sx={{ color:'#222222', display: 'inline' }}
                      component="span"
                      variant="body6"
                    >
                      {payload.username}
                    </Typography>
                    <Typography
                      sx={{ float:'right', fontSize:'13px', color:'#222222', display: 'inline' }}
                      component="span"
                    >
                      4:00pm
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ color:'#555555', display: 'inline' }}
                      component="span"
                      variant="body2"
                    >
                      It's nice working with you
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
        )
        
      })}
    </List>
  )
}

