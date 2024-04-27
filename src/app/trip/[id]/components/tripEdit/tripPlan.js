'use client';

import { useState } from "react";
import Typography from '@mui/material/Typography';
import FaceIcon from '@mui/icons-material/Face';
import Button from '@mui/material/Button';
import DayPanel from './dayPanel';
import SelectTransport from "./selectTransport";
import NewMemberDialog from '/src/app/components/newMember';
// import { getNewMember } from '@/services/getNewMember';

export default function TripPlan({groupInfo}) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddMemberClick = async(inviteeID) => {
    // const result = await getNewMember(inviteeID, groupId);
    setOpenDialog(true);
  };
  const handleSaveNewMember = (email) => {
    console.log("Saving new member with email :", email);
  }

  return (
    <div className='mx-2 lg:w-[50vw] overflow-auto h-[70vh]'>
      <div className="flex flex-row justify-between p-2">
        <div className="flex flex-col gap-3">
          <Typography variant='h6'>{groupInfo?.start_date} ~ {groupInfo?.end_date}</Typography>
          <div className="flex gap-5 items-center">
            {groupInfo?.user_names?.map((user, index) => {
              return (<FaceIcon className="scale-150" key={index}/>);
            })}
            <Button variant="contained" className="w-28" onClick={handleAddMemberClick}>新增成員</Button>
            <Button variant="outlined">退出</Button>
          </div>
          <SelectTransport />
        </div>
        <div className="flex flex-col gap-3">
          {/* <Button variant="contained" className="w-28">編輯行程</Button> */}
        </div>
      </div>
      <div className="my-5">
        <DayPanel days={groupInfo?.days} />
      </div>
      <NewMemberDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={handleSaveNewMember} />
    </div>
  );
}