'use client';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import NotificationButton from "./NotificationButton";
import TranslateIcon from '@mui/icons-material/Translate';
import { useClerk } from "@clerk/clerk-react";
import { DataContext } from '@/app/components/dataContext';


const NavBar = ({ children }) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { currentLang, setCurrentLang } = useContext(DataContext);

  const translate = (key) => {
    const translations = {
      'myJourney': {
        'zh': '我的旅程',
        'en': 'My Journey'
      },
      'myProfile': {
        'zh': '個人檔案',
        'en': 'My Profile'
      },
      'logout': {
        'zh': '登出',
        'en': 'Log out'
      },
    };
    return translations[key][currentLang];
  };

  const handleClick = () => {
    router.push('/');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  const handleLogout = () => {
    signOut(() => router.push("/"))
  };

  const switchLanguage = () => {
    setCurrentLang(currentLang === 'en' ? 'zh' : 'en');
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
                <Typography component="a" sx={{ marginLeft: 3, marginRight: 3, color: 'inherit', textDecoration: 'none', cursor: 'pointer' }} onClick={handleClick}>{translate('myJourney')}</Typography>
                <Typography component="a" sx={{ marginRight: 3, color: 'inherit', textDecoration: 'none', cursor: 'pointer' }} onClick={handleProfile}>{translate('myProfile')}</Typography>
                <Button variant="outlined" sx={{ marginRight: 2, color: 'inherit', textDecoration: 'none', cursor: 'pointer', border: '1.5px solid '}} className="px-1 py-1" onClick={handleLogout}>{translate('logout')}</Button>
                <IconButton aria-label="Change Language" size="large"sx={{ marginRight: 2, color: 'inherit', cursor: 'pointer'}} onClick={switchLanguage}><TranslateIcon /></IconButton>
            </Toolbar>
        </AppBar>
    </Box>
  );
}

export default NavBar;