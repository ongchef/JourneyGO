'use client';
import React, { useState, useEffect, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import { DataContext } from '@/app/components/dataContext';
import { getInvitation } from '@/services/getInvitation';
import NotificationDialog from './NotificationDialog';

//
const NotificationButton = ({ onClick }) => {
  const [invitationCount, setInvitationCount] = useState(0); // 邀请数量
  const [dialogOpen, setDialogOpen] = useState(false); // open dialog or not
  const { token } = useContext(DataContext);

  // open dialog when button is clicked
  //關掉Dialog放在NotificationDialog.js處理
  const handleButtonClick = () => { 
    setDialogOpen(true);
  }

    // fetch invitations when token is available
  useEffect(() => {
    if (token) {
      const fetchInvitations = async () => {
        try {
          const invitations = await getInvitation(token);
          if (invitations) {
            setInvitationCount(invitations.length); // 邀请数量
          }
        } catch (error) {
          console.error('Error fetching invitations:', error);
        }
      };
      fetchInvitations();
    }
  })
  //, [Token]);

  
  return (
    <>
      <IconButton color="inherit" aria-label="notification" onClick={handleButtonClick}>
        <img src="notification.png" alt="notification" style={{ color: 'white', width: 35, height: 35, marginRight: 10 }} />
      </IconButton>
      <NotificationDialog open={dialogOpen}  onClose={() => setDialogOpen(false)}/>
    </>
  );
}

export default NotificationButton;