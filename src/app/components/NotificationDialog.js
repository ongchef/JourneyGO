'use client';

import React , { useEffect, useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Grid, Box, IconButton, InputLabel } from '@mui/material';

// import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { inviteToGroup } from '@/services/inviteToGroup';
import { updateInvitationStatus } from '@/services/updateInvitationStatus';



const NotificationDialog = ({open, onClose, pendingInvitations, setPendingInvitations, setReload}) => {
  // const { Token } = useContext(DataContext);
  const Token = getToken();

  const [invitationStatusOpen, setInvitationStatusOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [acceptInvitation, setAcceptInvitation] = useState(false);



      //accept invitation
      const handleAccept = async (invitation) => {
        try {
          console.log("invitation " + invitation)
          await updateInvitationStatus(Token, invitation.invitation_id, 'accepted');
          // console.log("Invitation status:" + invitation.status)

          // await inviteToGroup(Token, invitation.inviter_name, invitation.invitee_name, invitation.group_name);
          
          setPendingInvitations(pendingInvitations?.filter((inv) => inv.id !== invitation.id));
          setStatusMessage('已接受邀請');
          setInvitationStatusOpen(true);
          setAcceptInvitation(true);
        
        } catch (error) {
          console.error('Error accepting invitation:', error);
          setStatusMessage('接受邀請失敗!');
          setInvitationStatusOpen(true);
        }
      };

      const handleDecline = async (invitation) => {
        try {
          await updateInvitationStatus(Token, invitation.invitation_id, 'rejected');
          setPendingInvitations(pendingInvitations?.filter((inv) => inv.id !== invitation.id));

          setStatusMessage('已拒絕邀請');
          setInvitationStatusOpen(true);
          
        } catch (error) {
          console.error('Error declining invitation:', error);
          setStatusMessage('拒絕邀請失敗!');
          setInvitationStatusOpen(true);
        }
      };

      const handleCancel = () => {
        onClose();
        setReload(reload => !reload);
        console.log('reload navbar');
      }

      const handleInvitationStatusDialogClose = () => {
        setInvitationStatusOpen(false)
        if (acceptInvitation) {
          // back to home page
          window.location.href = '/';
        }else {
          handleCancel();
        }
      }

  return (
    <div>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>通知</DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <IconButton onClick={handleCancel}>
            <img src="/close.png" alt="close" style={{ width: '30px', height: '30px' }}/>
            </IconButton>
          </Box>

          {pendingInvitations?.map(invitation => (
            <Box key={invitation.id} bgcolor="#E5F7FF" p={2} borderRadius={6} style={{ marginBottom: '10px' } }>
            <Grid container spacing={4} alignItems="center">
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

      <Dialog open={invitationStatusOpen} onClose={handleInvitationStatusDialogClose} fullWidth maxWidth="sm">
          <DialogContent>
            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
              <IconButton onClick={handleInvitationStatusDialogClose}>
              <img src="/close.png" alt="close" style={{ width: '30px', height: '30px' }}/>
              </IconButton>
            </Box>
            {statusMessage}
          </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationDialog;