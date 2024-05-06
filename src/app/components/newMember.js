'use client';

import React, { useState, useContext } from 'react';

// import {getInvitation} from '@/services/getInvitation';
import { inviteToGroup } from '@/services/inviteToGroup';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel } from '@mui/material';

const newMemberDialog = ({ open, onClose}) => {

  // const { Token, allGroups } = useContext(DataContext);
  const { allGroups } = useContext(DataContext);
  const Token = getToken();

  const [inviteeEmail, setInviteeEmail] = useState('');
  
  const [groupId, setGroupId] = useState(allGroups.group_id);
  
  
 
  const handleChange = (event) => {
    setInviteeEmail(event.target.value);
  };

  const handleSave = async() => {
    try {
      // console.log("Invitee Email: "+inviteeEmail);
      // console.log("Group ID: "+groupId);
      
      //setGroupId(allGroups.group_id);
      console.log("group_id: "+groupId);
   
      await inviteToGroup(Token, inviteeEmail, groupId);
      // console.log('Invitation data:', invitationData);
      onClose();
    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  };

  const handleCancel = () => {
    setInviteeEmail(''); 
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