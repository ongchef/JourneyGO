'use client';

import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, InputLabel, TextField, Autocomplete, Paper, Box, Input } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { createTripGroup } from '@/services/createTripGroup';

const NewJourneyDialog = ({ open, onClose}) => {

  const { currentLang } = useContext(DataContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [country, setCountry] = useState("臺灣");
  const [inviteeEmail, setInviteeEmail] = useState([]);
  const [creationStatusOpen, setCreationStatusOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  
  const translate = (key) => {
    const translations = {
        notification: {
            zh: "通知",
            en: "Notifications",
        },
        invitesYou: {
            zh: "邀請您加入",
            en: "invites you to join",
        },
        accept: {
            zh: "確認",
            en: "Accept",
        },
        cancel: {
            zh: "取消",
            en: "Cancel",
        },
        added: {
          zh: "已新增行程",
          en: "New journey added"
        },
        rejected: {
          zh: "已拒絕邀請",
          en: "Invitation rejected"
        },
        addTripFailed: {
          zh: "新增行程失敗!",
          en: "Failed to add new trip!"
        },
        newJourney: {
          zh: '新增旅程',
          en: 'New Journey'
        },
        tripName: {
          zh: '行程名稱',
          en: 'Trip Name'
        },
        selectCountry: {
          zh: '選擇國家',
          en: 'Select Country'
        },
        addMember: {
          zh: '新增旅伴',
          en: 'Add Companion'
        },
        tripTime: {
          zh: '旅程時間',
          en: 'Duration'
        },
        addPicture: {
          zh: '新增圖片',
          en: 'Add Picture'
        },
        upload: {
          zh: "上傳",
          en: "Upload",
      },
        save: {
          zh: '儲存',
          en: 'Save'
        },
    };
    return translations[key][currentLang];
};

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  // const handleCountryChange = (event) => {
  //   setCountry(event.target.value);
  // };

  const handleInviteeEmailChange = (event, value) => {
    if (value !== undefined) {
      setInviteeEmail(value);
    }
    // console.log('inviteeEmail:', inviteeEmail);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("file:", file);
    setImage(file);

    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    onClose();
  };

  const handleSave = async () => {
    try {
      const Token = getToken();
      // console.log('emails:', inviteeEmail);
      console.log('image:', image);

      const fileName = image ? image.name : null;
      console.log('fileName:', fileName);

      console.log('groupName:', groupName);
      console.log('startDate:', startDate);
      console.log('endDate:', endDate);
      console.log('country:', country);
      console.log('inviteeEmail:', inviteeEmail);
      console.log('imageUrl:', imageUrl);

      const responseStatus = await createTripGroup(Token, groupName, startDate, endDate, country, inviteeEmail, imageUrl, fileName);
      console.log('Trip group created:', responseStatus);

      if (!responseStatus) {
        setStatusMessage(translate('addTripFailed'));
        setCreationStatusOpen(true);
        return;
      }
      setStatusMessage(translate('added'));
      setCreationStatusOpen(true);

      // onClose();
      // window.location.reload();
    } catch (error) {
      console.error('Error creating trip group:', error);
      setStatusMessage(translate('addTripFailed'));
      setCreationStatusOpen(true);
    }
  };

  const handleCreationStatusDialogClose = () => {
    setCreationStatusOpen(false)
    window.location.reload();
  }


  return (
  <div>
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{translate('newJourney')}</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} alignItems="center">
          <Grid item style={{ flex: 1 }}>
            <InputLabel htmlFor="trip-name">{translate('tripName')}</InputLabel>
          </Grid>
          <Grid item style={{ flex: 3 }}>
            <TextField label={translate('tripName')} fullWidth 
              onChange={handleGroupNameChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="center">
          <Grid item style={{ flex: 1 }}>
            <InputLabel htmlFor="add-companion">{translate('addMember')}</InputLabel>
          </Grid>
          <Grid item style={{ flex: 3 }}>
            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={inviteeEmail}
              renderInput={({ key, ...params }) => (
                <TextField key={key} {...params} label="Emails" fullWidth />
              )}
              onChange={handleInviteeEmailChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item style={{ flex: 1 }}>
            <InputLabel htmlFor="trip-time">{translate('tripTime')}</InputLabel>
          </Grid>
          <Grid item style={{ flex: 3 }}>
            <Paper variant="outlined" sx={{ borderRadius: '5px', padding: '15px' }}>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                customInput={
                  <TextField variant="standard" InputProps={{ disableUnderline: true }} style={{ width: '100%' }} />
                }
                withPortal
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item style={{ flex: 1 }}>
            <InputLabel htmlFor="add-companion">{translate('addPicture')}</InputLabel>
          </Grid>
          <Grid item style={{ flex: 3 }}>
            {/* <label htmlFor='image-upload' className='cursor-pointer' hidden="hidden">{translate('upload')}</label> */}
            <form encType="multipart/form-data" action="/somewhere/to/upload">
              <Input
                id="image-upload"
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />  
              </form>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{translate('cancel')}</Button>
        <Button onClick={handleSave} variant="contained" color="primary">{translate('save')}</Button>
      </DialogActions>
    </Dialog>

    <Dialog open={creationStatusOpen} onClose={handleCreationStatusDialogClose} fullWidth maxWidth="sm">
      <DialogContent>
        {statusMessage}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%'}}>
          <Button onClick={handleCreationStatusDialogClose}>
            {translate('save')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default NewJourneyDialog;