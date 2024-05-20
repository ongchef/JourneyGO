"use client";

import { useState, useContext } from "react";
import { Typography, Tooltip, Avatar, AvatarGroup, Button } from "@mui/material";
import { DataContext } from "@/app/components/dataContext";

import DayPanel from "./dayPanel";
import NewMemberDialog from "/src/app/components/newMember";
import QuitGroupDialog from "/src/app/components/QuitGroupDialog";
// import { getNewMember } from '@/services/getNewMember';

export default function TripPlan({ groupInfo }) {
    const { currentLang } = useContext(DataContext);

    const [openDialog, setOpenDialog] = useState(false);
    const [openQuitDialog, setOpenQuitDialog] = useState(false);

    const translate = (key) => {
        const translations = {
            edit: {
                zh: "編輯",
                en: "Edit",
            },
            addMember: {
                zh: "新增成員",
                en: "Add Member",
            },
            quitGroup: {
                zh: "退出群組",
                en: "Quit Group",
            },
        };
        return translations[key][currentLang];
    };

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
                        <Button variant="text">{translate('edit')}</Button>
                    </div>
                    <div className="flex gap-5 items-center">
                        <AvatarGroup max={5} spacing={-10}>
                            {groupInfo?.user_names?.map((user, index) => {
                                return (
                                    <Tooltip title={user} key={index}>
                                        <Avatar key={index}>{user[0]}</Avatar>
                                    </Tooltip>
                                );
                            })}
                        </AvatarGroup>
                        <Button variant="contained" onClick={handleAddMemberClick}>
                            {translate('addMember')}
                        </Button>
                        <Button variant="outlined" onClick={handleQuitGroupClick}>
                            {translate('quitGroup')}
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
