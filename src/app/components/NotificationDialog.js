'use client';

import React , { useEffect, useState, useContext, use } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton'; 
import InputLabel from '@mui/material/InputLabel';
import { DataContext } from '@/app/components/dataContext';

import {inviteToGroup} from '@/services/inviteToGroup';
import {updateInvitationStatus} from '@/services/updateInvitationStatus';



const NotificationDialog = ({open, onClose, pendingInvitations, setPendingInvitations}) => {
  const { Token } = useContext(DataContext);

  console.log('Token from Notification:' + Token);


      //accept invitation
      const handleAccept = async (invitation) => {
        try {
          await updateInvitationStatus(Token, invitation.invitation_id, 'accepted');
          console.log("Invitation status:" + invitation.status)

          await inviteToGroup(Token, invitation.inviter_name, invitation.invitee_name, invitation.group_name);
          
          setPendingInvitations(pendingInvitations.filter((inv) => inv.id !== invitation.id));
          
        
        } catch (error) {
          console.error('Error accepting invitation:', error);
        }
      };

      const handleDecline = async (invitation) => {
        try {
          await updateInvitationStatus(Token, invitation.invitation_id, 'declined');
          setPendingInvitations(pendingInvitations.filter((inv) => inv.id !== invitation.id));
          
        } catch (error) {
          console.error('Error declining invitation:', error);
        }
      };

      const handleCancel = () => {
        onClose();
        window.location.reload();
      }

  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>通知</DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <IconButton onClick={handleCancel}>
            <img src="/close.png" alt="close" style={{ width: '30px', height: '30px' }}/>
            </IconButton>
          </Box>

          {pendingInvitations.map(invitation => (
            <Box key={invitation.id} bgcolor="#E5F7FF" p={2} borderRadius={6} style={{ marginBottom: '10px' } }>
            <Grid  key={invitation.id} container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <InputLabel htmlFor={`notification-${invitation.id}`}>{invitation.inviter_name}邀請您加入"{invitation.group_name}"</InputLabel>
            </Grid>
            <Grid item xs={12} >
              <Button variant="contained" color="primary" onClick={() => handleAccept(invitation)}>確認</Button>
              <Button variant="contained" color="secondary" onClick={() => handleDecline(invitation)}>刪除</Button>
            </Grid>
            </Grid>
            
          </Box>
          ))}
        </DialogContent>
      </Dialog>
    );
  };

export default NotificationDialog;