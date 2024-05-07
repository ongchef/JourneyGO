"use client";

import { useState } from "react";
// import FaceIcon from "@mui/icons-material/Face";
import { Typography, Tooltip, Avatar, AvatarGroup, Button } from "@mui/material";

import DayPanel from "./dayPanel";
import NewMemberDialog from "/src/app/components/newMember";
import QuitGroupDialog from "/src/app/components/QuitGroupDialog";
// import { getNewMember } from '@/services/getNewMember';

export default function TripPlan({ groupInfo }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [openQuitDialog, setOpenQuitDialog] = useState(false);

    const handleAddMemberClick = async (inviteeID) => {
        // const result = await getNewMember(inviteeID, groupId);
        setOpenDialog(true);
    };

    const handleQuitGroupClick = async () => {
        setOpenQuitDialog(true);
    };

    const handleSaveNewMember = (email) => {
        console.log("Saving new member with email :", email);
    };

    return (
        <div className="mx-4 lg:w-[50vw] lg:overflow-auto lg:h-[70vh]">
            <div className="flex flex-row justify-between p-2">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row lg:gap-5 gap-2 items-center">
                        <h2 className="lg:text-xl text-base">
                            {groupInfo?.start_date} ~ {groupInfo?.end_date}
                        </h2>
                        <Button variant="contained">編輯</Button>
                    </div>
                    <div className="flex gap-5 items-center">
                        <AvatarGroup max={5} spacing={-10}>
                            {groupInfo?.user_names?.map((user, index) => {
                                return (
                                    <Tooltip title={user}>
                                        <Avatar key={index}>{user[0].toUpperCase()}</Avatar>
                                    </Tooltip>
                                );
                            })}
                        </AvatarGroup>
                        <Button variant="contained" className="w-24" onClick={handleAddMemberClick}>
                            新增成員
                        </Button>
                        <Button variant="outlined" onClick={handleQuitGroupClick}>
                            退出群組
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <DayPanel days={groupInfo?.days} />
            </div>
            <NewMemberDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={handleSaveNewMember} />
            <QuitGroupDialog open={openQuitDialog} onClose={() => setOpenQuitDialog(false)} />
        </div>
    );
}
