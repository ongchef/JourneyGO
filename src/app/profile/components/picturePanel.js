'use client';
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '@/app/components/dataContext';
import {Avatar, InputLabel, Input} from "@mui/material";
//import { Input } from 'postcss';


const PicturePanel = ({avatarUrl}) => {
    const { currentLang } = useContext(DataContext);

    const [reload, setReload] = useState(false);
    const [profile, setProfile] = useState({});
    const [newAvatarUrl, setNewAvatarUrl] = useState(null); 

    const translate = (key) => {
        const translations = {
            myPhoto: {
                zh: "我的照片",
                en: "My Photo",
            },
            upload: {
                zh: "上傳",
                en: "Upload",
            },
        };
        return translations[key][currentLang];
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            
            reader.onload = () => {
              setNewAvatarUrl(reader.result);
              console.log(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }


  return (
    <div className='flex flex-col items-center'>
      <div className='mt-10'>
        <Avatar alt="User Avatar" src={newAvatarUrl||avatarUrl} sx={{ width: 200, height: 200 }}/>
      </div>
      <div className='mt-5'>
        <InputLabel htmlFor="avatar-upload" className='mx-auto' >{translate('myPhoto')}</InputLabel>
        <label htmlFor="avatar-upload" className='cursor-pointer'>{translate('upload')}</label>
        <Input
          id="avatar-upload"
          type='file'
          
          accept='image/*'
          onChange={handleFileChange}
        />  
      </div>
    </div>
  );
}

export default PicturePanel;
