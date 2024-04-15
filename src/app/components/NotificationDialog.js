'use client';

import React , { useEffect, useState, useContext, use } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'; 
import InputLabel from '@mui/material/InputLabel';

import { DataContext } from '@/app/components/dataContext';
import {inviteToGroup} from '@/services/inviteToGroup';
import {updateInvitationStatus} from '@/services/updateInvitationStatus';


const NotificationDialog = ({open, onClose, token, invitations }) => {
  const [notifications, setNotifications] = useState([]); 
  const [showGrid, setShowGrid] = useState(true); //是否顯示包含通知的Grid

 
      //accept invitation
      const handleAccept = async (invitationId, inviterEmail, inviteeEmail, groupId) => { 
        try {
          await updateInvitationStatus(token, invitationId, 'accepted');
          await inviteToGroup(token, inviterEmail, inviteeEmail, groupId);
          setShowGrid(false);
        } catch (error) {
          console.error('Error accepting invitation:', error);
        }
      };
      //decline invitation
      const handleDecline = async (invitationId) => {
        try {
          await updateInvitationStatus(token, invitationId, 'declined');
          setShowGrid(false);
        } catch (error) {
          console.error('Error declining invitation:', error);
        }
      };

      const handleCancel = () => {
        onClose();
      }

      useEffect(() => {
        if(invitations && invitations.length > 0) {
          setShowGrid(true);
        }else {
          setShowGrid(false);
        }
      }, [invitations]);


  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
        <DialogTitle>通知</DialogTitle>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <IconButton onClick={handleCancel}>
              <img src="/close.png" alt="close" style={{ width: '20px', height: '20px' }}/>
          </IconButton>
        </Box>
        <DialogContent>
          {showGrid && invitations?.map(({ id, inviterEmail, inviteeEmail, groupId }) => (
            <Grid key={id} container spacing={4} alignItems="center" justifyContent="flex-end">
            <Grid item xs={12}>
              <InputLabel htmlFor="notification">{inviterEmail}邀請你加入{groupId}</InputLabel>
            </Grid>
            <Grid item xs={12} >
              <Button variant="contained" color="primary" onClick={() => handleAccept(id, inviterEmail, inviteeEmail, groupId)}>接受</Button>
              <Button variant="contained" color="secondary" onClick={() => handleDecline(id)}>拒絕</Button>
            </Grid>
            </Grid>
          ))}
        </DialogContent>
      </Dialog>
    );
  };

export default NotificationDialog;