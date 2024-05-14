import { useEffect, useContext } from "react";
import { Paper, Button, Box, useTheme, Typography } from "@mui/material";
import { DataContext } from "@/app/components/dataContext";

function MyBill({userBalance}) {
    const { currentLang } = useContext(DataContext);

    const translate = (key) => {
        const translations = {
            myBalance: {
                zh: "我的餘額",
                en: "My Balance",
            },
        }
        return translations[key][currentLang];
    }

    useEffect(() => {
        console.log('[render] userBalance updated:', userBalance);
    }, [userBalance]);

    return (
        <div className="flex flex-col h-full items-center">
            <Box>
                <div>
                    <Paper
                        elevation={3}
                        sx={{ p: 8, borderRadius: 2, textAlign: "center", width: "500px", bgcolor: "#2EB3D0" }}>
                        <Typography variant="body1" sx={{ fontSize: "25px", fontWeight: "bold" }}>
                            {translate("myBalance")}
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: "25px", fontWeight: "bold" }}>
                            $ {userBalance === null ? '0' : userBalance}
                        </Typography>
                    </Paper>
                </div>
            </Box>
        </div>
    );
}
export default MyBill;
