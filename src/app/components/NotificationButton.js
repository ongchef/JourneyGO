'use client';
import { useState, useEffect, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
// import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { getInvitation } from '@/services/getInvitation';
import NotificationDialog from './NotificationDialog';

//
const NotificationButton = ({}) => {

  // const { Token } = useContext(DataContext);
  const Token = getToken();


  const [invitations, setInvitations] = useState([]); // 邀请
  const [dialogOpen, setDialogOpen] = useState(false); // open dialog or not
  // const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false); 

  // open dialog when button is clicked
  // 關掉Dialog放在NotificationDialog.js處理
  const handleButtonClick = () => { 
    setDialogOpen(true);
  }

  useEffect(() => {
    const fetchInvitations = async () => {
      if (Token) {
        // setLoading(true);
        try {
          const fetchedInvitations = await getInvitation(Token);
          setInvitations(fetchedInvitations);
        } catch (error) {
          console.error('Error fetching invitations:', error);
        } finally {
          // setLoading(false);
        }
      }
    };
    fetchInvitations();
  }, [Token, reload]);

  const pendingInvitations = invitations?.filter(invitation => invitation.status === 'pending');
  const pendingInvitationCount = invitations?.filter(invitation => invitation.status === 'pending').length;
  // console.log('pendingInvitations:', pendingInvitations);

  return (
    <>
      <IconButton color="inherit" aria-label="notification" onClick={handleButtonClick}>
        <div style={{ position: 'relative' }}>
        <img src="/notification.png" alt="notification" style={{ color: 'white', width: 35, height: 35, marginRight: 10 }} />
        {pendingInvitationCount > 0 && <span style={{ 
          position: 'absolute',
          bottom: -5, 
          right: -5, 
          color: 'red',
          fontSize: 17,
          backgroundColor: 'white',
          borderRadius: '50%', 
          padding: '3px 6px', 
          width: '25px',
          height: '25px', 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1, 
        }}>{pendingInvitationCount}</span>}
        </div>
      </IconButton>
      <NotificationDialog open={dialogOpen}  onClose={() => setDialogOpen(false)} invitations={invitations} pendingInvitations={pendingInvitations} setPendingInvitations={setInvitations} setReload={setReload} />
    </>
  );
}

export default NotificationButton;