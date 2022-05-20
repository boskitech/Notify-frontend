import * as React from 'react';
import Box from '@mui/material/Box';

const Chat = () => {
  return (
    <Box sx={{width:'97%', borderRadius:'12px', float:'left', height:'100vh', backgroundColor:'#fff', overflow:'auto'}}>
        <Box >
            <h3 style={{margin:'170px',color:'#333333', width:'100%'}}>Click on a user to start a chat</h3>               
        </Box>
    </Box>
  )
}

export default Chat