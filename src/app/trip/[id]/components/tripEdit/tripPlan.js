'use client';

import { useState } from "react";
import Typography from '@mui/material/Typography';
import FaceIcon from '@mui/icons-material/Face';
import Button from '@mui/material/Button';
import DayPanel from './dayPanel';
import NewMemberDialog from '/src/app/components/newMember';
import QuitGroupDialog from "/src/app/components/QuitGroupDialog";
// import { getNewMember } from '@/services/getNewMember';

export default function TripPlan({groupInfo}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openQuitDialog, setOpenQuitDialog] = useState(false)

  const handleAddMemberClick = async(inviteeID) => {
    // const result = await getNewMember(inviteeID, groupId);
    setOpenDialog(true);
  };

  const handleQuitGroupClick = async() => {
    setOpenQuitDialog(true);
  };

  const handleSaveNewMember = (email) => {
    console.log("Saving new member with email :", email);
  }

  return (
    <div className='mx-4 lg:w-[50vw] lg:overflow-auto lg:h-[70vh]'>
      <div className="flex flex-row justify-between p-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row lg:gap-5 gap-2 items-center">
            <Button variant="contained">編輯</Button>
            <h2 className="lg:text-xl text-base">{groupInfo?.start_date} ~ {groupInfo?.end_date}</h2>
          </div>
          <div className="flex gap-5 items-center">
            {groupInfo?.user_names?.map((user, index) => {
              return (<FaceIcon className="scale-150 p-0" key={index}/>);
            })}
            <Button variant="contained" className="w-24" onClick={handleAddMemberClick}>新增成員</Button>
            <Button variant="outlined" onClick={handleQuitGroupClick}>退出</Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <DayPanel days={groupInfo?.days} />
      </div>
      <NewMemberDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={handleSaveNewMember} />
      <QuitGroupDialog open={openQuitDialog} onClose={() => setOpenQuitDialog(false)}/>
    </div>
  );
}