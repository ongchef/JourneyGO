'use client';

import React, { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, InputLabel, TextField, Paper, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { postShareCode } from '@/services/postShareCode';

const CopyJourneyDialog = ({ open, onClose}) => {

  const { currentLang } = useContext(DataContext);

  const [shareCode, setShareCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [creationStatusOpen, setCreationStatusOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
  const translate = (key) => {
    const translations = {
        importJourney: {
          zh: '匯入旅程',
          en: 'Import Journey'
        },
        added: {
          zh: "已匯入行程",
          en: "New journey imported"
        },
        addTripFailed: {
          zh: "匯入行程失敗!",
          en: "Failed to import new journey!"
        },
        addMember: {
          zh: '新增旅伴',
          en: 'Add Companion'
        },
        shareCode: {
          zh: '分享碼',
          en: 'Share Code'
        },
        groupName: {
          zh: '行程名稱',
          en: 'Trip Name'
        },
        tripTime: {
          zh: '旅程時間',
          en: 'Duration'
        },
        save: {
          zh: '儲存',
          en: 'Save'
        },
        cancel: {
          zh: "取消",
          en: "Cancel",
      },
    };
    return translations[key][currentLang];
};

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    // console.log('startDate:', start);
    // console.log('endDate:', end);
  };

  const handleShareCodeChange = (event) => {
    setShareCode(event.target.value);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };


  const handleCancel = () => {
    setShareCode('');
    setGroupName('');
    setStartDate(null);
    setEndDate(null);
    onClose();
  };

  const handleSave = async () => {
    try {
      const Token = getToken();
      const responseStatus = await postShareCode(Token, shareCode, groupName, startDate, endDate);
      // console.log('Trip group created:', responseStatus);

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
      console.error('Error importing journey:', error);
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
      <DialogTitle>{translate('importJourney')}</DialogTitle>

      <DialogContent>
        <Grid container alignItems="center">
          <Grid item  style={{ flex: 1 }}>
            <InputLabel htmlFor="share-code">{translate('shareCode')}</InputLabel>
          </Grid>
          <Grid item  style={{ flex: 3 }}>
            <TextField fullWidth onChange={handleShareCodeChange}/>
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item  style={{ flex: 1 }}>
            <InputLabel htmlFor="group-name">{translate('groupName')}</InputLabel>
          </Grid>
          <Grid item  style={{ flex: 3 }}>
            <TextField fullWidth onChange={handleGroupNameChange}/>
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item  style={{ flex: 1 }}>
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

export default CopyJourneyDialog;