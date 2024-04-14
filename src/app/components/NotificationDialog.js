import React , { useEffect, useState, useContext, use } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getInvitation } from '@/services/getInvitation';
import { DataContext } from '@/app/components/dataContext';
import {updateInvitation} from '@/services/updateInvitation';



// const SlideTransition = (props) => {
//   return <Slide {...props} direction="down" />;
// };


const NotificationDialog = ({ open, onClose, token}) => {
  const [notifications, setNotifications] = useState([]); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  // const [snackbarHeight, setSnackbarHeight] = useState(0);

  const handleCancel = () => {
    onClose();
  }

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
      if (Token) { 
        const invitations = await getInvitation(Token);
        if (invitations) {
          setNotifications(invitations);
          // setSnackbarOpen(true);
        }
      } else {
        console.error('Token not found in local storage.');
      }
      }catch (error) {  
        console.error('Error fetching invitations:', error);
    };
    }
    fetchInvitations();
    }, [token]);
    


      const handleAccept = async () => {
        try {
          await updateInvitation(token, invitationId, 'accepted');
          setShowGrid(false);
        } catch (error) {
          console.error('Error accepting invitation:', error);
        }
      };

      const handleDecline = async () => {
        try {
          await updateInvitation(token, invitationId, 'declined');
          setShowGrid(false);
        } catch (error) {
          console.error('Error declining invitation:', error);
        }
      };


  return (
    // <React.Fragment>
    //   <Snackbar
    //     id="notification-snackbar"
    //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    //     open={snackbarOpen}
    //     autoHideDuration={6000}
    //     onClose={handleCloseSnackbar}
    //     TransitionComponent={SlideTransition}
    //   >

    //     <MuiAlert elevation={6} variant="filled" severity="info" onClose={handleCloseSnackbar}>
    //       你有新的通知！
    //     </MuiAlert>
    //   </Snackbar>
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

          {/* <ul>
            {notifications && notifications.map(notification => (
              <li key={notification.id}>
                {notification.message}
              </li>
            ))}
          </ul> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>關閉</Button>
        </DialogActions>
      </Dialog>
      
 


  );
};

export default NotificationDialog;