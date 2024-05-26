'use client';

import React, { useState, useContext } from 'react';

import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
// import { getInvitation } from '@/services/getInvitation';
import { quitGroup } from '@/services/quitGroup';

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel } from '@mui/material';


const quitGroupDialog = ({ open, onClose}) => {

  // const { Token, allGroups } = useContext(DataContext);
  const { allGroups, currentLang } = useContext(DataContext)

  const [groupId, setGroupId] = useState(allGroups.group_id);
  
  const translate = (key) => {
    const translations = {
      warning: {
        zh: '警告',
        en: 'Warning'
      },
      WantToQuit: {
        zh: '確認要退出小組嗎？',
        en: 'Are you sure you want to quit the group?'
      },
      cancel: {
        zh: "取消",
        en: "Cancel",
      },
      quit: {
        zh: "退出",
        en: "Quit",
      }
    };
    return translations[key][currentLang];
  };

  const handleSave = async() => {
    try {
      // console.log("group_id: "+groupId);
      
      const Token = getToken();
      const valid = await quitGroup(Token, groupId);
      onClose();
      // console.log(valid)
      if(valid){
        window.location.href = '/'
      }
      

    } catch (error) {
      // console.error('Error fetching invitations:', error);
    }
  };

  const handleCancel = () => {
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{translate('warning')}</DialogTitle>
      <DialogContent>
        {translate('WantToQuit')}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary" sx={{textTransform: 'none'}}>
          {translate('cancel')}
        </Button>
        <Button onClick={handleSave} color="primary" sx={{textTransform: 'none'}}>
          {translate('quit')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default quitGroupDialog;