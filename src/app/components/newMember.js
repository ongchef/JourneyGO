"use client";

import React, { useState, useContext } from "react";

// import {getInvitation} from '@/services/getInvitation';
import { inviteToGroup } from "@/services/inviteToGroup";
import { DataContext } from "@/app/components/dataContext";
import { getToken } from "@/utils/getToken";

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel, Box } from "@mui/material";

const newMemberDialog = ({ open, onClose }) => {
    const { allGroups, currentLang } = useContext(DataContext);

    const [inviteeEmail, setInviteeEmail] = useState("");
    const [groupId, setGroupId] = useState(allGroups.group_id);
    const [creationStatusOpen, setCreationStatusOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    const translate = (key) => {
        const translations = {
            enterNewMembersEmail: {
                zh: "輸入新成員電子郵件",
                en: "Enter new member email",
            },
            email: {
                zh: "電子郵件",
                en: "email",
            },
            cancel: {
                zh: "取消",
                en: "Cancel",
            },
            add: {
                zh: "加入",
                en: "Add",
            },
            accept: {
                zh: "確認",
                en: "Accept",
            },
            added: {
                zh: "已新增成員",
                en: "New member added",
            },
            addFailed: {
                zh: "新增成員失敗!",
                en: "Failed to add new member!"
            },
        };
        return translations[key][currentLang];
    };
    
    const handleChange = (event) => {
        setInviteeEmail(event.target.value);
    };

    const handleSave = async () => {
        try {
            const Token = getToken();
            const responseStatus = await inviteToGroup(Token, inviteeEmail, groupId);

            if (!responseStatus) {
                setStatusMessage("新增成員失敗!");
                setCreationStatusOpen(true);
                return;
            }
            setStatusMessage("已新增成員");
            setCreationStatusOpen(true);

            onClose();
        } catch (error) {
            console.error("Error fetching invitations:", error);
            setStatusMessage("新增成員失敗!");
            setCreationStatusOpen(true);
        }
    };

    const handleCreationStatusDialogClose = () => {
        setCreationStatusOpen(false);
        window.location.reload();
    };

    const handleCancel = () => {
        setInviteeEmail("");
        onClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>{translate('enterNewMembersEmail')}</DialogTitle>
                <DialogContent>
                    <InputLabel htmlFor="email"></InputLabel>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label={translate('email')}
                        type="email"
                        fullWidth
                        // value={email}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        {translate('cancel')}
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        {translate('add')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={creationStatusOpen} onClose={handleCreationStatusDialogClose} fullWidth maxWidth="sm">
                <DialogContent>
                    {statusMessage}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "100%" }}>
                        <Button onClick={handleCreationStatusDialogClose}>{translate('accept')}</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default newMemberDialog;
