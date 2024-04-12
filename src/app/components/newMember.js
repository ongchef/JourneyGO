import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel } from '@mui/material';

const newMemberDialog = ({ open, onClose, onSave }) => {
  const [email, setEmail] = useState('');

 
  const handleChange = (event) => {
    setEmail(event.target.value);
    
  };


  const handleSave = () => {
    onSave(email);
    onClose();
  };

  const handleCancel = () => {
    setEmail(''); 
    onClose();
  };



  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>輸入新成員電子郵件</DialogTitle>
      <DialogContent>
        <InputLabel htmlFor="email"></InputLabel>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="電子郵件"
          type="email"
          fullWidth
          value={email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          取消
        </Button>
        <Button onClick={handleSave} color="primary">
          加入
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default newMemberDialog;