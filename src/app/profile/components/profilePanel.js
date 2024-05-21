'use client';
import React, { useState, useEffect, useContext, use } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { Avatar, Input, Button,InputLabel, TextField,Box,} from "@mui/material";
//import { jwtDecode } from "jwt-decode";
import { getProfile } from '@/services/getProfile';
import { updateProfile } from '@/services/updateProfile';

const ProfilePanel = ({}) => {
  const { currentLang } = useContext(DataContext);
  //const token = getToken();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileData, setProfileData] = useState({});
  const [initialProfileData, setInitialProfileData] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");


    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = getToken();
          const response = await getProfile(token);
          const profile = response.userProfile[0];
          setInitialProfileData(profile);
          setProfileData(profile);
          setName(profile.user_name);
          setPhone(profile.phone);
          setAvatarUrl(profile.image);
        } catch (error) {
          console.error("getProfile Error:", error);
        }
      };
      fetchProfile();
    },[]);
  
    //console.log(profileData);

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
              en: "Phone Number",
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
    };

    const handleNameChange = (e) => {
      //setProfileData({...profileData, user_name: e.target.value});
      setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
      //setProfileData({...profileData, phone: e.target.value});
      setPhone(e.target.value);
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if(file) {
          const reader = new FileReader();
          
          reader.onload = () => {
            setAvatarUrl(reader.result);
            console.log(reader.result);
          }
          reader.readAsDataURL(file);
      }
  }

    const handleUpdateButtonClick = async () => {
     
        try {
          const token = getToken();
          console.log(token)
          
          console.log(name)
          console.log(phone)
          console.log(avatarUrl)
          const response = await updateProfile(token, name, phone, avatarUrl);
          console.log("updateResponse", response);

          const profile = response.returned[0];
          setProfileData(profile);
          setInitialProfileData(profile);
        } catch (error) {
          console.error("updateProfile Error:", error);
        }
    };
  
    const handleResetButtonClick = () => {
      setName(initialProfileData.user_name);
      setPhone(initialProfileData.phone);
    }

  return (
    <div>
    <div className='flex flex-col items-center'>
      <div className='mt-10'>
        <Avatar alt="User Avatar" src={avatarUrl} sx={{ width: 200, height: 200 }}/>
      </div>
      <div className='mt-5'>
        {/* <InputLabel htmlFor="avatar-upload" className='mx-auto' >{translate('myPhoto')}</InputLabel> */}
        <label htmlFor="avatar-upload" className='cursor-pointer' hidden="hidden">{translate('upload')}</label>
        <Input
          id="avatar-upload"
          type='file'
          
          accept='image/*'
          onChange={handleFileChange}
        />  
      </div>
    </div>
    <Box className="overflow-y-auto max-h-[calc(100vh-150px)]">
      <div className='p-10 space-y-4'>
          <div>
              <InputLabel>{translate("name")}</InputLabel>
              <TextField
                value={name}
                onChange={handleNameChange}
                variant="outlined"
                fullWidth
                style={{ marginTop: 6 }}
              />
            </div>
            <div>
              <InputLabel>{translate("phone")}</InputLabel>
              <TextField
                value={phone}
                onChange={handlePhoneChange}
                variant="outlined"
                fullWidth
                style={{ marginTop: 6 }}
              />
            </div>
            <div className='flex justify-center space-x-4'>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateButtonClick}
              >
                {translate("update")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleResetButtonClick}
              >
                {translate("reset")}
              </Button>
          </div>
          </div>

    </Box>
    </div>
  );
}
export default ProfilePanel;


