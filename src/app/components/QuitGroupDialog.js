'use client';

import React, { useState, useContext } from 'react';

import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
// import { getInvitation } from '@/services/getInvitation';
import { quitGroup } from '@/services/quitGroup';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel } from '@mui/material';


const quitGroupDialog = ({ open, onClose}) => {

  // const { Token, allGroups } = useContext(DataContext);
  const { allGroups } = useContext(DataContext)

  const [groupId, setGroupId] = useState(allGroups.group_id);
  
 

  const handleSave = async() => {
    try {
      console.log("group_id: "+groupId);
      
      const Token = getToken();
      const valid = await quitGroup(Token, groupId);
      onClose();
      console.log(valid)
      if(valid){
        window.location.href = '/'
      }
      

    } catch (error) {
      console.error('Error fetching invitations:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>警告</DialogTitle>
      <DialogContent>
        確認要退出小組嗎？
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          取消
        </Button>
        <Button onClick={handleSave} color="primary">
          退出
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default quitGroupDialog;