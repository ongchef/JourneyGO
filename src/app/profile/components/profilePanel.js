'use client';
import React, { useState, useEffect, useContext} from 'react';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { Avatar, Input, Button,InputLabel, TextField,Box,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
//import { jwtDecode } from "jwt-decode";
import { getProfile } from '@/services/getProfile';
import { updateProfile } from '@/services/updateProfile';

const ProfilePanel = ({}) => {
  const { currentLang } = useContext(DataContext);
  const host =  "https://storage.googleapis.com/journeygo_photo/";
  //const token = getToken();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileData, setProfileData] = useState({});
  const [initialProfileData, setInitialProfileData] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageFile, setImageFile] = useState(null); //圖案的blob
  const [tempAvatarUrl, setTempAvatarUrl] = useState("");
  const [phoneError, setPhoneError] = useState(""); //追蹤電話輸入是否有效
  const [openDialog, setOpenDialog] = useState(false);


    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = getToken();
          const response = await getProfile(token);
          const profile = response.userProfile[0];

          const imageURL = host + profile.image;
          //console.log("profile:", profile);
          //console.log("imageURL:", imageURL);

          //console.log("profile:", profile);
          setInitialProfileData(profile);
          setProfileData(profile);
          setName(profile.user_name);
          setPhone(profile.phone);
          setTempAvatarUrl(imageURL);
          setAvatarUrl(imageURL);
        
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
            updateMessage: {
                zh: "您的資料更新成功",
                en: "Your profile has been successfully updated.",
            },
            close: {
                zh: "關閉",
                en: "Close",
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
      const value = e.target.value;
      setPhone(value);

      const phonePattern = /^[0-9]{10}$/; //0~9數字，共10位

        if (!phonePattern.test(value)) {
          setPhoneError("無效的電話號碼");
        } else {
          setPhoneError(""); // 清除错误信息
        }
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      console.log("file:", file);
      setImageFile(file);
      if(file) {
          const reader = new FileReader();
          reader.onload = () => {
            setTempAvatarUrl(reader.result);
          }
          reader.readAsDataURL(file);
      }
  }

    const handleUpdateButtonClick = async () => {
        try {
          if(name && phone && !phoneError) {
            const token = getToken();
            //console.log("token:", token);
            // console.log("name:", name);
            // console.log("phone:", phone);
            // console.log("imageFile:", imageFile);
            
            // console.log("TempavatarUrl:", tempAvatarUrl);
            

            const fileName = imageFile ? imageFile.name : null;

            const response = await updateProfile(token, name, phone, tempAvatarUrl, fileName);
            // console.log("updateResponse", response);

            const profile = response.returned[0];

            //const updatedImageURL = IMAGE_BASE_URL + profile.image;

            setProfileData(profile);
            setInitialProfileData(profile);
            setName(profile.user_name);
            setPhone(profile.phone);
            setAvatarUrl(profile.image);
            setOpenDialog(true);
          }
        } catch (error) {
          console.log("updateProfile Error:", error);
        }
    };
  
    const handleResetButtonClick = () => {
      setName(initialProfileData.user_name);
      setPhone(initialProfileData.phone);
      //const intitialImageURL = IMAGE_BASE_URL + initialProfileData.image;
      setTempAvatarUrl(avatarUrl);
      //setAvatarUrl(avatarUrl);
      //setImageFile(null);
      
    }

    const handleCloseDialog = () => {
      setOpenDialog(false);
    }

  return (
    <div>
    <div className='flex flex-col items-center'>
      <div className='mt-10'>
        <Avatar alt="User Avatar" src={tempAvatarUrl} sx={{ width: 200, height: 200 }}/>
      </div>
      <div className='mt-5'>
        {/* <InputLabel htmlFor="avatar-upload" className='mx-auto' >{translate('myPhoto')}</InputLabel> */}
        <label htmlFor="avatar-upload" className='cursor-pointer' hidden="hidden" >{translate('upload')}</label>
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
                helperText={phoneError}
              />
            </div>
            <div className='flex justify-center space-x-4'>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateButtonClick}
                sx={{textTransform: 'none'}}
                disabled ={!!phoneError}//如果phoneError有值，則disabled
              >
                {translate("update")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleResetButtonClick}
                sx={{textTransform: 'none'}}
              >
                {translate("reset")}
              </Button>
          </div>
          </div>

    </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {/* <DialogTitle>{translate('updateSuccess')}</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
          {translate('updateMessage')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}  color="primary">
            {translate('close')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ProfilePanel;


