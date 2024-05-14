'use client';
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { Button,InputLabel, TextField,Box,} from "@mui/material";


const ProfilePanel = ({}) => {

  const { currentLang } = useContext(DataContext);

  // const [loading, setLoading] = useState(false);
    const token = getToken();
    const [reload, setReload] = useState(false);
    const [profile, setProfile] = useState({}); 
    const [profileData, setProfileData] = useState({});

    const defaultName = "John Doe";
    const defaultEmail = "john@example.com";
    const defaultPhone = "1234567890";

    const translate = (key) => {
        const translations = {
            name: {
              zh: "名稱",
              en: "Name",
            },
            email: {
              zh: "電子郵件",
              en: "Email",
            },
            phone: {
              zh: "手機號碼",
              en: "Phone",
            },
            password: {
              zh: "密碼",
              en: "Password",
            },
            update: {
              zh: "更新",
              en: "Update",
            },
            reset: {
              zh: "清除",
              en: "Reset",
            },
        };
        return translations[key][currentLang];
    }

    
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
              <InputLabel htmlFor="my-name">{translate("name")}</InputLabel>
              <TextField label="" defaultValue={defaultName} fullWidth onChange={handleNameChange} style={{ marginTop: 6 }} />
          </div>
          <div>
              <InputLabel htmlFor="my-email">{translate("email")}</InputLabel>
              <TextField label="" defaultValue={defaultEmail} fullWidth onChange={handleEmailChange} style={{ marginTop: 6 }} />
          </div>
          <div>
              <InputLabel htmlFor="my-phone">{translate("phone")}</InputLabel>
              <TextField label="" defaultValue={defaultPhone} fullWidth onChange={handlePhoneChange} style={{ marginTop: 6 }} />
          </div>
          {/* <div>
              <InputLabel htmlFor="my-password">{translate("password")}</InputLabel>
              <TextField label="" fullWidth onChange={handlePasswordChange} style={{ marginTop: 6 }} />
          </div> */}
          <div className='flex justify-center space-x-4'>
              <Button variant="contained" onClick={handleUpdateButtonClick}>{translate("update")}</Button>
              <Button variant="contained" onClick={handleResetButtonClick}>{translate("reset")}</Button>
          </div>
        </div>
      </Box>

  );
}

export default ProfilePanel;