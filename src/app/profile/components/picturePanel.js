'use client';
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '@/app/components/dataContext';
import {Avatar, InputLabel} from "@mui/material";
import { Input } from 'postcss';


const PicturePanel = ({avatarUrl}) => {
 
    const [reload, setReload] = useState(false);
    const [profile, setProfile] = useState({});



  return (
    <div className='flex flex-col items-center'>
      <div className='mt-10'>
        <Avatar alt="User Avatar" src={avatarUrl} sx={{ width: 100, height: 100 }} />
      </div>
      <div className='mt-5'>
        <InputLabel htmlFor="my-avatar">我的照片</InputLabel>
      </div>
    </div>
  );
}

export default PicturePanel;