import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import avatar4 from '../assets/avatar/4.png'
import { useNavigate } from "react-router-dom";
import socket from '../socket';
import { useState, useEffect } from 'react';
import { useGetUsersQuery } from '../features/apiSlice'

export default function ChatList() {

  const [activeUsers, setActiveUsers] = useState([])
  const [users, setUsers] = useState([])
  const data = localStorage.getItem("user")
  const user = JSON.parse(data)
  const navigate = useNavigate()
  const {data: getusers, isSuccess} = useGetUsersQuery()

  const online = activeUsers.filter(res => res.id !== user._id)
  const offlineUsers = users.filter(o1 => !activeUsers.some(o2 => o1._id === o2.id))
  const onlineUsers = users.filter(o1 => online.some(o2 => o1._id === o2.id))

  useEffect(() => {
    if(isSuccess){
      setUsers(getusers)
    }
  }, [isSuccess, getusers])

  useEffect(() => {
    socket.on("users", (payload) => {
      payload.forEach((user) => {
        user.self = user.id === socket.id;
      });

      setActiveUsers(payload.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      }));
    });
  
    socket.on("user connected", (user) => {
      setActiveUsers([user, ...activeUsers])
    });

    socket.on("userleaves", (payload) => {
      setActiveUsers(activeUsers.filter((user) => user.id !== payload))
    });
  
  })

  return (
    <List sx={{borderRadius:'10px', width: '100%',  bgcolor: 'background.paper' }}>
      {onlineUsers.map((payload, index) => {
          return (
          <div key={index}> 
            <ListItem  onClick={() => { navigate(`/chat/${payload._id}`) }} alignItems="flex-start" sx={{'&:hover': {backgroundColor:'#dedede', cursor:'pointer'},}}>
              <ListItemAvatar>
                  <Badge sx={{
                      "& .MuiBadge-badge": {
                        color: "lightgreen",
                        backgroundColor: "green"
                      }
                    }} badgeContent=" " overlap="circular" variant="dot"
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
                      {payload.email}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li"></Divider>
          </div>
        )
      })}

      {offlineUsers.map((payload, index) => {
          return (
          <div key={index}> 
            <ListItem  onClick={() => { navigate(`/chat/${payload._id}`) }} alignItems="flex-start" sx={{'&:hover': {backgroundColor:'#dedede', cursor:'pointer'},}}>
              <ListItemAvatar>
                    <Avatar alt="Jamal" src={avatar4} />
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
                      {payload.email}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li"></Divider>
          </div>
        )
      })}
    </List>
  )
}

