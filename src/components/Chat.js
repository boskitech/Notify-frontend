import * as React from 'react';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import avatar4 from '../assets/avatar/4.png'
import moment from 'moment'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import socket from '../socket';
import { useSelector } from "react-redux"
import { selectAllUsers, selectOnlineUsers, postStatus} from "../features/usersSlice"

const Chat = () => {
    const allUsers = useSelector(selectAllUsers)
    const status = useSelector(postStatus)
    const onlineUsers = useSelector(selectOnlineUsers)
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')
    let params = useParams()
    let id = params.id

    const user = allUsers.find(user => user._id === id)
    const activeStatus = onlineUsers.filter(res => res.id === id)
    
    useEffect(() => {
      
        socket.on("privateMessage", (payload) => {
            setChat([...chat, payload]);
        });
    },[chat, activeStatus, status])

    const sendMessage = (e) => {
        e.preventDefault();
        if(message){
            socket.emit('privateMessage', {message, to: id})
            setChat([...chat, {message, time: moment().format('h:mm a'), to:id, from:socket.id}]);
            setMessage('')
        }
    } 

    if(id){
        return (
            <Box sx={{width:'97%', borderRadius:'12px', float:'left', height:'100vh', backgroundColor:'#fff', overflow:'auto'}}>
                <Box sx={{height:'700px', overflow:'auto'}}>
                    <ListItem  alignItems="flex-start" sx={{backgroundColor:'#dfdfdd', cursor:'pointer'}}>
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
                                  {user ? user.username : ""}
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
                                {activeStatus.length > 0 ? "Online" : "Offline"}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                    </ListItem>
        
                    {<List sx={{width:'100%'}}>
                        {chat.map((payload, index) => {
                            if(payload.from === id && payload.to === socket.id){
                                return (
                                    <ListItem  key={index} alignItems="center" sx={{ width: '100%', maxWidth: 360, marginBottom:'-20px'}}>
                                    <ListItemAvatar>
                                    <Avatar alt="Jamal" src={avatar4} />
                                    </ListItemAvatar>
                                    <ListItemText sx={{backgroundColor:'#efefef', padding:'10px', borderRadius:'0px 10px 10px 10px' }}
                                    primary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ color:'#333333', display: 'inline' }}
                                            component="span"
                                            variant="body6"
                                        >
                                            {payload.message}
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ color:'#555555', display: 'inline', float:'right' }}
                                            component="span"
                                            variant="body2"
                                        >
                                            {payload.time}
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    />
                                    </ListItem>
                                )
                            }else if(payload.to === id && payload.from === socket.id){
                                return(
                                    <ListItem key={index} alignItems="center" sx={{width:"100%", maxWidth:360, float:'right',  marginBottom:'-20px' }}>
                                    <ListItemText sx={{backgroundColor:'#601c66', color:'white', width:'auto', padding:'10px', borderRadius:'10px 0px 10px 10px' }}
                                    primary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ color:'white', display: 'inline' }}
                                            component="span"
                                            variant="body6"
                                        >
                                            {payload.message}
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ color:'white', display: 'inline', float:'left' }}
                                            component="span"
                                            variant="body2"
                                        >
                                            {payload.time}
                                        </Typography>
                                        </React.Fragment>
                                    }
                                    />
                                </ListItem>
                                )
                            }else{
                                return (
                                    <div></div>
                                )
                            }
                        })}
                    </List>}
        
                </Box>
                <Box sx={{position:'fixed', bottom:'0', zIndex:'999'}}>
                    <input type="text" value={message} onChange={ (e) => setMessage(e.target.value)} placeholder="Type a message" style={{width:'485px',marginLeft:'10px', padding:'10px 0px 10px 20px', backgroundColor:'#efefef',  fontSize:'15px', borderRadius:'25px', height:'30px', border:'none', marginBottom:'20px'}}/>
                    <Box align="right" onClick={sendMessage} sx={{'&:hover': {backgroundColor:'#00a571', cursor:'pointer'}, width:'25px', zIndex:'10', cursor:'pointer', padding:'13px', float:'right', marginLeft:'5px', position:'relative', display:'block', fontSize:'12px', backgroundColor:'green', color:'white', alignContent:'right', borderRadius:'25px', height:'25px', border:'none'}}>         
                        <SendIcon/>
                    </Box>
                </Box>
            </Box>
        )
    }else{
        return (
            <Box sx={{width:'97%', borderRadius:'12px', float:'left', height:'100vh', backgroundColor:'#fff', overflow:'auto'}}>
                <Box >
                    <h3 style={{margin:'170px',color:'#333333', width:'100%'}}>Click on a user to start a chat</h3>               
                </Box>
            </Box>
        )
    }
}

export default Chat