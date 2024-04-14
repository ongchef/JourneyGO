'use client';

import { Inter } from "next/font/google";
import "./globals.css";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';  //for MUI
import { ClerkProvider } from '@clerk/nextjs';  //for clerk
import { DataProvider } from "./components/dataContext";  //for context
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
// import NavBar from './components/navBar'; 
import NotificationDialog from "./components/NotificationDialog";



const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "JourneyGo",
//   description: "Start your journey with JourneyGo",
// };

export default function RootLayout({ children }) {
  const [showNotification, setShowNotification] = React.useState(false);
  const [notifications, setNotifications] = React.useState([]);


  const handleNotificationClick = () => {
    const newNotification = fetch('/api/users/invitations');
    setShowNotification(true);
  }

  const handleCloseNotification = () => {
    setShowNotification(false);
  }

  
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <head>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAP_API_KEY}&libraries=maps,marker`}></script>
        </head>
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <DataProvider>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                <AppBar position="static" sx= {{ backgroundColor: '#2EB3D0'}}>
                
                  <Toolbar disableGutters>
                    
                      <img src="/Logo.png" alt="Logo" style={{ width: 50, height: 43, marginRight: 5, marginLeft:20 }} />
                    
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Journey<span style={{ color: '#0D5160' }}>Go</span>
                      </Typography>

                      <IconButton color="inherit"  aria-label="notification" onClick={handleNotificationClick}>
                        <img src ="notification.png" alt="notification" style={{ color:'white', width: 35, height: 35, marginRight: 10}}/>
                        
                      </IconButton>
                      
                      <Typography variant="body2" component="a" sx={{ marginLeft:2, marginRight: 3, color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>我的旅程</Typography>
                      <Typography variant="body2" component="a" sx={{  marginRight: 3, color: 'inherit', textDecoration: 'none', cursor: 'pointer' , border:'1.5px solid ' , borderRadius:'4px' ,  padding:'4px 8px'}}>個人資料</Typography>
                  </Toolbar>
              </AppBar>
              </Box>
              {children}
              {showNotification && <NotificationDialog open={true} onClose={handleCloseNotification} />}
            </DataProvider>
          </AppRouterCacheProvider>  
        </body>
      </html>
    </ClerkProvider>
  );
}