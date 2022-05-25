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
import {  userConnected,  
          userLeaves, 
          activeSessionUsers, 
          selectAllUsers,
          fetchUsers, 
          postStatus
        } from "../features/usersSlice"
import { useDispatch, useSelector } from "react-redux"

export default function ChatList() {

  const allUsers = useSelector(selectAllUsers)
  const status = useSelector(postStatus)
  const [activeUsers, setActiveUsers] = useState([])
  const data = localStorage.getItem("user")
  const user = JSON.parse(data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const realUsers = activeUsers.filter(res => res.id !== user._id)
  const offlineManchis = allUsers.filter(o1 => !activeUsers.some(o2 => o1._id === o2.id))

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
    console.log(allUsers)
  }, [status, allUsers, dispatch])

  useEffect(() => {
    socket.on("users", (payload) => {
      payload.forEach((user) => {
        user.self = user.id === socket.id;
      });
      dispatch(activeSessionUsers(payload))

      setActiveUsers(payload.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      }));
    });
  
    socket.on("user connected", (user) => {
      setActiveUsers([user, ...activeUsers])
      dispatch(fetchUsers())
      dispatch(userConnected(user))
    });

    socket.on("userleaves", (payload) => {
      setActiveUsers(activeUsers.filter((user) => user.id !== payload))
      dispatch(userLeaves(payload))
    });
  
  })

  return (
    <List sx={{borderRadius:'10px', width: '100%', bgcolor: 'background.paper' }}>
      {realUsers.map((payload, index) => {
          return (
          <div key={index}> 
            <ListItem  onClick={() => { navigate(`/chat/${payload.id}`) }} alignItems="flex-start" sx={{'&:hover': {backgroundColor:'#dedede', cursor:'pointer'},}}>
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
                      It's nice working with you
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li"></Divider>
          </div>
        )
      })}

      {offlineManchis.map((payload, index) => {
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
                      It's nice working with you
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

