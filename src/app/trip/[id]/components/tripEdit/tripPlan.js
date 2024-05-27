"use client";

import { useState, useContext } from "react";
import { Typography, Tooltip, Avatar, AvatarGroup, Button, IconButton } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import { DataContext } from "@/app/components/dataContext";

import DayPanel from "./dayPanel";
import NewMemberDialog from "@/app/components/newMember";
import QuitGroupDialog from "@/app/components/QuitGroupDialog";
import ShareDialog from "@/app/components/ShareDialog"
import EditTripDialog from "@/app/components/EditTripDialog";
// import { getNewMember } from '@/services/getNewMember';

export default function TripPlan({ groupInfo }) {
    const { currentLang, avatarColors, imgHost } = useContext(DataContext);

    const [openDialog, setOpenDialog] = useState(false);
    const [openQuitDialog, setOpenQuitDialog] = useState(false);
    const [openShareDialog, setOpenShareDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const translate = (key) => {
        const translations = {
            edit: {
                zh: "編輯",
                en: "Edit",
            },
            shareJourney: {
                zh: "分享行程",
                en: "Share Journey",
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

    const handleEditClick = async () => {
        setOpenEditDialog(true);
    }
    const handleAddMemberClick = async (inviteeID) => {
        // const result = await getNewMember(inviteeID, groupId);
        setOpenDialog(true);
    };
    const handleQuitGroupClick = async () => {
        setOpenQuitDialog(true);
    };
    const handleShareClick = async (inviteeID) => {
        setOpenShareDialog(true);
    };

    const handleSaveNewMember = (email) => {
        // console.log("Saving new member with email :", email);
    };

    return (
        <div className="mx-4 lg:w-[50vw] lg:overflow-auto lg:h-[75vh]">
            <div className="flex flex-row justify-between p-2">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row lg:gap-3 gap-2 items-center">
                        <h2 className="lg:text-xl text-base">
                            {groupInfo?.start_date} ~ {groupInfo?.end_date}
                        </h2>
                        <Button variant="text" sx={{textTransform: 'none'}} onClick={handleEditClick}>
                            {translate('edit')}
                        </Button>
                        <IconButton color="primary" aria-label="share" onClick={handleShareClick}>
                            <ShareIcon />
                        </IconButton>
                    </div>
                    <div className="flex gap-5 items-center flex-wrap">
                        <AvatarGroup max={5} spacing={-10}>
                            {groupInfo?.user_names.map((name, index) => (
                                groupInfo?.images[index] !== null ? (
                                <Tooltip title={name} key={index}>
                                    <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }} src={imgHost + groupInfo.images[index]}>
                                    {name[0]}
                                    </Avatar>
                                </Tooltip>
                                ) : (
                                <Tooltip title={name} key={index}>
                                    <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }}>
                                    {name[0]}
                                    </Avatar>
                                </Tooltip>
                                )
                            ))}
                        </AvatarGroup>
                        <Button variant="outlined" onClick={handleAddMemberClick} sx={{textTransform: 'none'}}>
                            {translate('addMember')}
                        </Button>
                        <Button variant="contained" onClick={handleQuitGroupClick} sx={{textTransform: 'none'}}>
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
            <ShareDialog open={openShareDialog} onClose={() => setOpenShareDialog(false)} />
            <EditTripDialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} groupInfo={groupInfo}/>
        </div>
    );
}
