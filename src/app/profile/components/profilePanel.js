'use client';
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { Button,InputLabel, TextField,Box,} from "@mui/material";


const ProfilePanel = ({}) => {

  // const [loading, setLoading] = useState(false);
    const token = getToken();
    const [reload, setReload] = useState(false);
    const [profile, setProfile] = useState({}); 
    const [profileData, setProfileData] = useState({});

    const defaultName = "John Doe";
    const defaultEmail = "john@example.com";
    const defaultPhone = "1234567890";

    
    const handleNameChange = (e) => {
      setProfileData({...profileData, name: e.target.value});
    }

    const handleEmailChange = (e) => {
      setProfileData({...profileData, email: e.target.value});
    }

    const handlePhoneChange = (e) => {
      setProfileData({...profileData, phone: e.target.value});
    }

    const handlePasswordChange = (e) => {
      setProfileData({...profileData, password: e.target.value});
    }

    const handleUpdateButtonClick = () => {
      console.log(profileData);
    }

    const handleResetButtonClick = () => {
      setProfileData(profile);
    }


  return (
      <Box className="overflow-y-auto max-h-[calc(100vh-150px)]"> 
        <div className="p-10 space-y-4">
          <div>
              <InputLabel htmlFor="my-name">名稱</InputLabel>
              <TextField label="" defaultValue={defaultName} fullWidth onChange={handleNameChange} style={{ marginTop: 6 }} />
          </div>
          <div>
              <InputLabel htmlFor="my-email">Email</InputLabel>
              <TextField label="" defaultValue={defaultEmail} fullWidth onChange={handleEmailChange} style={{ marginTop: 6 }} />
          </div>
          <div>
              <InputLabel htmlFor="my-phone">手機號碼</InputLabel>
              <TextField label="" defaultValue={defaultPhone} fullWidth onChange={handlePhoneChange} style={{ marginTop: 6 }} />
          </div>
          {/* <div>
              <InputLabel htmlFor="my-password">密碼</InputLabel>
              <TextField label="" fullWidth onChange={handlePasswordChange} style={{ marginTop: 6 }} />
          </div> */}
          <div className='flex justify-center space-x-4'>
              <Button variant="contained" onClick={handleUpdateButtonClick}>更新</Button>
              <Button variant="contained" onClick={handleResetButtonClick}>清除</Button>
          </div>
        </div>
      </Box>

  );
}

export default ProfilePanel;