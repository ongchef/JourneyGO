'use client';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NotificationButton from "./NotificationButton";
import { useClerk } from "@clerk/clerk-react";

const NavBar = ({ children }) => {
  const { signOut } = useClerk();
  const router = useRouter();
  

  const handleClick =  () => {
    window.location.href = '/';
  };

  const handleProfile = () => {
    // router.push('/profile');
  }

  const handleLogout = () => {
    signOut(() => router.push("/"))
  };

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <AppBar position="static" sx={{ backgroundColor: '#2EB3D0' }}>
            <Toolbar disableGutters>
                <img src="/Logo.png" alt="Logo" style={{ width: 50, height: 43, marginRight: 5, marginLeft: 20, cursor: 'pointer' }} onClick={handleClick}/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={handleClick}>
                  Journey<span style={{ color: '#0D5160' }}>Go</span>
                </Typography>

                <NotificationButton/>
                <Typography variant="body2" component="a" sx={{ marginLeft: 2, marginRight: 3, color: 'inherit', textDecoration: 'none', cursor: 'pointer' }} onClick={handleClick}>我的旅程</Typography>
                <Typography variant="body2" component="a" sx={{ marginRight: 3, color: 'inherit', textDecoration: 'none', cursor: 'pointer', border: '1.5px solid ', borderRadius: '4px', padding: '4px 8px' }} onClick={handleProfile}>個人資料</Typography>
                <Button variant="outlined" sx={{ marginRight: 3, color: 'inherit', textDecoration: 'none', cursor: 'pointer', border: '1.5px solid ', borderRadius: '4px', padding: '2px' }} onClick={handleLogout}>登出</Button>
            </Toolbar>
        </AppBar>
    </Box>
      
  );
}

export default NavBar;