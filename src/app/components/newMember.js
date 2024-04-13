import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel } from '@mui/material';
import { createTripGroup } from '../../services/createTripGroup';

const newMemberDialog = ({ open, onClose}) => {
  const [email, setEmail] = useState('');

 
  const handleChange = (event) => {
    setEmail(event.target.value);
    
  };

  const handleSave = async() => {
    const tripGroupData = await createTripGroup(groupName, startDate, endDate, country_id, inviteeEmail);
    if (tripGroupData) {
      console.log('New trip group created:', tripGroupData);
      return tripGroupData;
    }

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