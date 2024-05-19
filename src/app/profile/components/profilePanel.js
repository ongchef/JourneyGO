'use client';
import React, { useState, useEffect, useContext, use } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { Button,InputLabel, TextField,Box,} from "@mui/material";
//import { jwtDecode } from "jwt-decode";

import { getProfile } from '@/services/getProfile';
import { updateProfile } from '@/services/updateProfile';

const ProfilePanel = ({}) => {

  const { currentLang } = useContext(DataContext);
  const token = getToken();
  const [reload, setReload] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileData, setProfileData] = useState([]);


    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await getProfile(token);
          setProfileData(response.userProfile);
        } catch (error) {
          console.error("getProfile Error:", error);
        }
      };
      fetchProfile();
    }, [reload]);

    console.log(profileData);
  

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
        };
        return translations[key][currentLang];
    };

    const handleNameChange = (e) => {
      setProfileData({...profileData, user_name: e.target.value});

    };

    const handlePhoneChange = (e) => {
      setProfileData({...profileData, phone: e.target.value});
    };

    const handleUpdateButtonClick = async () => {
        // try {
        //   const response = await updateProfile(token);
        //   console.log("updateResponse", response);
        //   console.log(response.returned[0]);
        //   setProfileData(response.returned[0]);
        //   setReload(!reload); //Trigger reload to fetch updated data
        // } catch (error) {
        //   console.error("updateProfile Error:", error);
        // }
      };
  
    const handleResetButtonClick = () => {
      setReload(!reload); //Reset to original profile data
    }

  return (
    <Box className="overflow-y-auto max-h-[calc(100vh-150px)]">
      <div className='p-10 space-y-4'>
        {profileData.map((profile) => (
          <div key={profile.user_id}>
            <div>
              <InputLabel>{translate("name")}</InputLabel>
              <TextField
                value={profile.user_name}
                onChange={handleNameChange}
                variant="outlined"
                fullWidth
                style={{ marginTop: 6 }}
              />
            </div>
            <div>
              <InputLabel>{translate("phone")}</InputLabel>
              <TextField
                value={profile.phone}
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
                onClick={() => handleUpdateButtonClick()}
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
        ))
          }
      </div>
    </Box>
  );
}
export default ProfilePanel;


