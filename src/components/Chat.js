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
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import socket from '../socket';

const Chat = () => {
    const [chat, setChat] = useState([])
    const [message, setMessage] = useState('')
    let params = useParams()
    let id = params.id

    useEffect(() => {
        socket.on("privateMessage", (payload) => {
            console.log(payload)
            setChat([...chat, payload]);
        });
    })

    const sendMessage = (e) => {
        e.preventDefault();
        
        if(socket.emit('privateMessage', {message, to: id})){
            console.log(message, id, socket.id)
            setChat([...chat, {message, to:id, from:socket.id}]);
            setMessage('')
        }
        
    } 

  return (
    <Box sx={{width:'97%', borderRadius:'12px', float:'left', height:'100vh', backgroundColor:'#fff', overflow:'auto'}}>
        <Box sx={{height:'700px', overflow:'auto'}}>
            <List sx={{width:'100%'}}>
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
                    }
                   
                })}
            </List>

        </Box>
        <Box sx={{position:'fixed', bottom:'0', zIndex:'999'}}>
            <input type="text" value={message} onChange={ (e) => setMessage(e.target.value)} placeholder="Type a message" style={{width:'485px',marginLeft:'10px', padding:'10px 0px 10px 20px', backgroundColor:'#efefef',  fontSize:'15px', borderRadius:'25px', height:'30px', border:'none', marginBottom:'20px'}}/>
            <button align="right" onClick={sendMessage} style={{width:'50px', zIndex:'10', cursor:'pointer', padding:'7px', float:'right', marginLeft:'5px', position:'relative', display:'block', fontSize:'12px', backgroundColor:'green', color:'white', alignContent:'right', borderRadius:'50px', height:'50px', border:'none'}}>         
                <SendIcon/>
            </button>
        </Box>
    </Box>
  )
}

export default Chat