import React , { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { getInvitation } from '../../services/getInvitation';


const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};


const NotificationDialog = ({ open, onClose}) => {
  const [notifications, setNotifications] = useState([]); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarHeight, setSnackbarHeight] = useState(0);

  useEffect(() => {
    const fetchInvitations = async () => {
      const Token = localStorage.getItem('Token'); 
      if (Token) { 
        const invitations = await getInvitation(Token);
        if (invitations) {
          setNotifications(invitations);
          setSnackbarOpen(true);
        }
      } else {
        console.error('Token not found in local storage.');
      }
    };

    fetchInvitations();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSnackbarEnter = () => {
    const snackbarElement = document.getElementById('notification-snackbar');
    if (snackbarElement) {
      const { height } = snackbarElement.getBoundingClientRect();
      //console.log('Snackbar height:', height);
      setSnackbarHeight(height);
    }
  };


  return (
    <React.Fragment>
      <Snackbar
        id="notification-snackbar"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
      >

        <MuiAlert elevation={6} variant="filled" severity="info" onClose={handleCloseSnackbar}>
          你有新的通知！
        </MuiAlert>
      </Snackbar>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" style={{ top: `calc(100vh - ${snackbarHeight}px - 20px)` }}>
        <DialogTitle>通知</DialogTitle>
        <DialogContent>
          <ul>
            {notifications && notifications.map(notification => (
              <li key={notification.id}>
                {notification.message}
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>關閉</Button>
        </DialogActions>
      </Dialog>
      
    </React.Fragment>


  );
};

export default NotificationDialog;