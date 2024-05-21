"use client";

import React, { useState, useContext, useEffect } from "react";

import { DataContext } from "@/app/components/dataContext";
import { getToken } from "@/utils/getToken";
import { getShareCode } from "@/services/getShareCode";

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputLabel, Box } from "@mui/material";

const ShareDialog = ({ open, onClose }) => {
    const { currentLang, currGroupId } = useContext(DataContext);

    const [shareCode, setShareCode] = useState("");

    useEffect(() => {
        console.log("render ShareDialog");

        const fetchData = async () => {
            const token = getToken();
            console.log("currGroupId: ", currGroupId);
            const response = await getShareCode(token, currGroupId);
            if (response) {
                console.log("share_code: ", response.share_code);
                setShareCode(response.share_code);
            }
        };

        if (open) {
            fetchData();
        }
    }, [open]);


    const translate = (key) => {
        const translations = {
            shareJourney: {
                zh: "分享此行程",
                en: "Share this journey",
            },
            accept: {
                zh: "確認",
                en: "Accept",
            },
        };
        return translations[key][currentLang];
    };
    
    const handleCancel = () => {
        onClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} fullWidth>
                <DialogTitle>{translate('shareJourney')}</DialogTitle>
                <DialogContent>
                    你的分享碼是：{shareCode}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        {translate('accept')}
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default ShareDialog;
