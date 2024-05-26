'use client';

import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, InputLabel, TextField, Autocomplete, Paper, Box, Input } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import { putTripGroupDetail } from '@/services/putTripGroupDetail';

const EditTripDialog = ({ open, onClose, groupInfo }) => {

  const { currentLang, currGroupId } = useContext(DataContext);

  const [startDate, setStartDate] = useState(new Date(groupInfo?.start_date));
  const [endDate, setEndDate] = useState(new Date(groupInfo?.end_date));
  const [groupName, setGroupName] = useState(groupInfo?.group_name);
  const [editStatusOpen, setEditStatusOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isGroupNameValid, setIsGroupNameValid] = useState(true);
  const [isEditSuccessful, setIsEditSuccessful] = useState(false);
  
  const translate = (key) => {
    const translations = {
        OK: {
          zh: "確定",
          en: "OK",
        },
        edited: {
          zh: "已編輯旅程",
          en: "Journey edited successfully!"
        },
        editFailed: {
          zh: "編輯旅程失敗！",
          en: "Failed to add new journey!"
        },
        editJourney: {
          zh: '編輯旅程',
          en: 'Edit Journey'
        },
        journeyName: {
          zh: '旅程名稱',
          en: 'Journey Name'
        },
        journeyTime: {
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
        all_fields_are_required: {
          zh: "所有欄位都為必填！",
          en: "All fields are required",
        }

    };
    return translations[key][currentLang];
};

  useEffect(() => {
    setStartDate(new Date(groupInfo?.start_date));
    setEndDate(new Date(groupInfo?.end_date));
    setGroupName(groupInfo?.group_name);
  }, [groupInfo]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleGroupNameChange = (event) => {
    const value = event.target.value;
    setGroupName(value);
    setIsGroupNameValid(!!value); 
  };

  const handleSave = async () => {
    if (!groupName || !startDate || !endDate) {
      setStatusMessage(translate('all_fields_are_required'));
      setEditStatusOpen(true);
      return;
    }
    
    try {
      const Token = getToken();
      const responseStatus = await putTripGroupDetail(Token, currGroupId, groupName, startDate, endDate);
      // console.log('Trip group edited:', responseStatus);
      
      if (!responseStatus) {
        setStatusMessage(translate('editFailed'));
        setEditStatusOpen(true);
        return;
      }
      setStatusMessage(translate('edited'));
      setEditStatusOpen(true);
      setIsEditSuccessful(true);
    } catch (error) {
      // console.error('Error editing trip group:', error);
      setStatusMessage(translate('editFailed'));
      setEditStatusOpen(true);
    }
  };

  const handleCancel = () => {
    setGroupName(groupInfo?.group_name);
    setStartDate(new Date(groupInfo?.start_date));
    setEndDate(new Date(groupInfo?.end_date));
    onClose();
  };

  const handleEditStatusDialogClose = () => {
    setEditStatusOpen(false);
    if (isEditSuccessful) {
      window.location.reload();
    }
  }


  return (
  <div>
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{translate('editJourney')}</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} alignItems="center">
          <Grid item style={{ flex: 1 }}>
            <InputLabel htmlFor="trip-name">{translate('journeyName')}</InputLabel>
          </Grid>
          <Grid item style={{ flex: 3 }}>
            <TextField fullWidth 
              onChange={handleGroupNameChange}
              defaultValue={groupName}
              error={!isGroupNameValid}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item style={{ flex: 1 }}>
            <InputLabel htmlFor="journey-time">{translate('journeyTime')}</InputLabel>
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

    <Dialog open={editStatusOpen} onClose={handleEditStatusDialogClose} fullWidth maxWidth="sm">
      <DialogContent>
        {statusMessage}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%'}}>
          <Button onClick={handleEditStatusDialogClose}>
            {translate('OK')}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  </div>
  );
};

export default EditTripDialog;