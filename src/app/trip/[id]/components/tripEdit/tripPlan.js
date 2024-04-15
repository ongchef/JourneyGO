'use client';

import { useContext, useState, useEffect } from "react";
import { DataContext } from "@/app/components/dataContext";
import Typography from '@mui/material/Typography';
import FaceIcon from '@mui/icons-material/Face';
import Button from '@mui/material/Button';
import DayPanel from './dayPanel';

import NewMemberDialog from '/src/app/components/newMember';
// import { getNewMember } from '@/services/getNewMember';

export default function TripPlan(props) {
  const {allGroups, currGroupId} = useContext(DataContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [groupinfo, setGroupinfo] = useState({}); 

  useEffect(() => {
    setGroupinfo(allGroups);
  }, [allGroups, currGroupId]);

  const handleAddMemberClick = async(inviteeID) => {
    // const result = await getNewMember(inviteeID, groupId);
    setOpenDialog(true);
  };

  const handleSaveNewMember = (email) => {
    console.log("Saving new member with email :", email);
  }


  return (
    <div className='px-5 w-[100%] overflow-auto h-[70vh]'>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-3">
          <Typography variant='h6'>{groupinfo?.start_date} ~ {groupinfo?.end_date}</Typography>
          <div className="flex gap-5 items-center">
            {groupinfo?.user_names?.map((use, index) => {
              return (<FaceIcon className="scale-150" key={index}/>);
            })}
            <Button variant="contained" className="w-28" onClick={handleAddMemberClick}>新增成員</Button>
            <Button variant="outlined">退出</Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button variant="contained" className="w-28">編輯行程</Button>
        </div>
      </div>
      <div className="my-5">
        <DayPanel />
      </div>
      <NewMemberDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={handleSaveNewMember} />
    </div>
  );
}