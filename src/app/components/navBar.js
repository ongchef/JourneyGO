'use client';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useClerk } from "@clerk/clerk-react";
import { DataContext } from '@/app/components/dataContext';
import NotificationButton from "./NotificationButton";

import { AppBar, Toolbar, Typography, Box, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Translate as TranslateIcon, PersonRounded as PersonRoundedIcon } from '@mui/icons-material';


const NavBar = ({ children }) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const { currentLang, setCurrentLang } = useContext(DataContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
        <AppBar position="static" sx={{ backgroundColor: '#2EB3D0' }}>
            <Toolbar disableGutters>
                <img src="/Logo.png" alt="Logo" style={{ width: isMobile ? 30 : 50, height: isMobile ? 26 : 43, marginRight: 5, marginLeft: 20, cursor: 'pointer' }} onClick={handleClick}/>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer', fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' } }} onClick={handleClick}>
                  Journey<span style={{ color: '#0D5160' }}>Go</span>
                </Typography>
                <NotificationButton/>
                <IconButton aria-label='Profile' size='large' sx={{ color: 'inherit', cursor: 'pointer' }} onClick={handleProfile}><PersonRoundedIcon /></IconButton>
                <IconButton aria-label="Change Language" size="large" sx={{ marginRight: { xs: 1, sm: 2, md: 3 }, color: 'inherit', cursor: 'pointer', fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem' } }} onClick={switchLanguage}><TranslateIcon /></IconButton>
                <Button variant="outlined" sx={{ marginRight: { xs: 1, sm: 2, md: 3 }, color: 'inherit', textDecoration: 'none', cursor: 'pointer', border: { xs: '1px solid', sm: '1.5px solid', md: '1.5px solid' }, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }, minWidth: { xs: 'auto', sm: 'auto', md: 'auto' }, maxWidth: { xs: '70px', sm: '80px', md: '100px' }, textTransform: 'none', lineHeight: 'normal' }} onClick={handleLogout} >{translate('logout')}</Button>
            </Toolbar>
        </AppBar>
    </Box>
  );
}

export default NavBar;