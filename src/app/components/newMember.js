import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel } from '@mui/material';
import {inviteToGroup} from '@/services/inviteToGroup';

const newMemberDialog = ({ open, onClose, token}) => {
  const [inviterEmail, setInviterEmail] = useState('');
  const [inviteeEmail, setInviteeEmail] = useState('');
  const [groupId, setGroupId] = useState('');

 
  const handleChange = (event) => {
    setEmail(event.target.value);
    
  };

  const handleSave = async() => {
    try {
      // console.log("Inviter Email: "+inviterEmail);
      // console.log("Invitee Email: "+inviteeEmail);
      // console.log("Group ID: "+groupId);
   
      const invitationData = await inviteToGroup(token, inviterEmail, inviteeEmail, groupId);
      // console.log('Invitation data:', invitationData);
      onClose();
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
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
          // value={email}
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