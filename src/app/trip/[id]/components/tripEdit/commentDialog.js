import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent,DialogActions,Divider,Container, Button, TextField, Grid, Box, IconButton, InputLabel, Typography } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar } from 'antd';

const CommentDialog = ({ open, onClose, onSubmit}) => {
  const [comment, setComment] = useState('');
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  

  const handleClose = () => {
    //setNewMessage('');
    onClose();
  };

  const handleSubmit = () => {
    if (comment !== '') {
      setMessages([...messages, {name: 'Beannie', message: comment}]);
      setComment('');
    }
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>留言板</DialogTitle>
      <DialogContent dividers>
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <IconButton onClick={handleClose}>
            <img src="/close.png" alt="close" style={{ width: '30px', height: '30px' }}/>
            </IconButton>
          </Box>

          {/* Create a comment board to show the comments */}
          {/* <Container maxWidth="sm" className='space-y-4'>
            {messages.map((message, index) => (
              <div key={index} className="flex flex-row items-center space-x-4">
                <div>
                  <Avatar src="/avatar.png" alt="avatar" style={{ width: '50px', height: '50px' }}/>
                </div>
                <div>
                  <Typography variant="body1">{message.name}</Typography>
                  <Typography variant="body2">{message.message}</Typography>
                </div>
              </div>
            ))}
          </Container> */}
          <Container maxWidth="sm" className='space-y-2' style={{ height: '300px', overflowY: 'auto' }}>
            <div class="flex flex-row items-center space-x-4" >
              <div>
                <Avatar src="/avatar.png" alt="avatar" style={{ width: '50px', height: '50px' }}/>
              </div>
              <div>
                  {/* <Typography>Beanie</Typography> */}
                  <Typography>Hihihi!</Typography>
              </div>
            </div>

            <div class="flex flex-row items-center space-x-4" >
              <div>
                <Avatar src="/avatar.png" alt="avatar" style={{ width: '50px', height: '50px' }}/>
              </div>
              <div>
                  <Typography>這個要不要改第二天去</Typography>
              </div>
            </div>

            <div class="flex flex-row items-center space-x-4" >
              <div>
                <Avatar src="/avatar.png" alt="avatar" style={{ width: '50px', height: '50px' }}/>
              </div>
              <div>
                  <Typography>但這樣比較順吧</Typography>
              </div>
            </div>

            <div class="flex flex-row items-center space-x-4" >
              <div>
                <Avatar src="/avatar.png" alt="avatar" style={{ width: '50px', height: '50px' }}/>
              </div>
              <div>
                  <Typography>這感覺好無聊</Typography>
              </div>
            </div>

            <div class="flex flex-row items-center space-x-4" >
              <div>
                <Avatar src="/avatar.png" alt="avatar" style={{ width: '50px', height: '50px' }}/>
              </div>
              <div>
                  <Typography>不知道</Typography>
              </div>
            </div>

            <div class="flex flex-row items-center space-x-4" >
              <div>
                <Avatar src="/avatar.png" alt="avatar" style={{ width: '50px', height: '50px' }}/>
              </div>
              <div>
                  <Typography>所以要ㄇ</Typography>
              </div>
            </div>

          </Container>



          
          <Container maxWidth="sm" className='space-y-4' >
            <div class="flex flex-row items-center space-x-4" >
              <div>
                <Avatar src="/avatar.png" alt="avatar" style={{ width: '50px', height: '50px' }}/>
              </div>
              <div>
                  <TextField
                    id="name"
                    label="發表..."
                    fullWidth
                    value={name}
                    onChange={handleCommentChange}
                  />
              </div>
              <div>
                  <Button onClick={handleSubmit} variant="contained" color="primary">
                    送出
                  </Button>
              </div>
            </div>
    
      </Container>
      </DialogContent>
      
    </Dialog>
  );
};

export default CommentDialog;