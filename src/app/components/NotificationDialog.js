import React , { useEffect, useState, useContext, use } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { DataContext } from '@/app/components/dataContext';

import {inviteToGroup} from '@/services/inviteToGroup';
import {updateInvitationStatus} from '@/services/updateInvitationStatus';


// const SlideTransition = (props) => {
//   return <Slide {...props} direction="down" />;
// };


const NotificationDialog = ({ open, onClose, token}) => {
  const [notifications, setNotifications] = useState([]); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  // useEffect(() => {
  //   const fetchInvitations = async () => {
  //     try {
  //     if (Token) { 
  //       const invitations = await getInvitation(Token);
  //       if (invitations) {
  //         setNotifications(invitations);
  //         // setSnackbarOpen(true);
  //       }
  //     } else {
  //       console.error('Token not found in local storage.');
  //     }
  //     }catch (error) {  
  //       console.error('Error fetching invitations:', error);
  //   };
  //   }
  //   fetchInvitations();
  //   }, [token]);
    

      //accept invitation
      const handleAccept = async () => { 
        try {
          await updateInvitationStatus(token, invitationId, 'accepted');
          await inviteToGroup(token, inviterEmail, inviteeEmail, groupId);
          setShowGrid(false);
        } catch (error) {
          console.error('Error accepting invitation:', error);
        }
      };
      //decline invitation
      const handleDecline = async () => {
        try {
          await updateInvitationStatus(token, invitationId, 'declined');
          setShowGrid(false);
        } catch (error) {
          console.error('Error declining invitation:', error);
        }
      };



  return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
        <DialogTitle>通知</DialogTitle>
          <div style= {{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCancel}>
              <img src="/close.png" alt="close" />
            </Button>
          </div>
        <DialogContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <InputLabel htmlFor="notification">jackey邀請你加入“臺灣四日遊”</InputLabel>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleAccept}>接受</Button>
              <Button variant="contained" color="secondary" onClick={handleDecline}>拒絕</Button>
            </Grid>
          </Grid>

        
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>關閉</Button>
        </DialogActions>
      </Dialog>
      
 


  );
};

export default NotificationDialog;