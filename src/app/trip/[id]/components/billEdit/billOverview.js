import { memo } from "react";
import BillPanel from "./billPanel";
import MyBill from "./mybill";
import BillList from "./billList";
// import { DataContext } from "@/app/components/dataContext";
import { getToken } from '@/utils/getToken';

import { getTransactionResult } from "@/services/getTransactionResult";

import { useState, useContext, useEffect } from "react";

const BillOverview = ({ group_id, reloadTabPanel }) => {
    const [userBalance, setUserBalance] = useState(0);
    const [transactionResult, setTransactionResult] = useState([]);

    // const { Token } = useContext(DataContext);
    const Token = getToken();

    useEffect(() => {
        fetchTransactions();
    }, []);

    async function fetchTransactions() {
        try {
            const data = await getTransactionResult(Token, group_id);
            console.log("group transaction result:", data);
            if (data && data.length !== 0) {
                setUserBalance(data.balance);
                setTransactionResult(data.transactions);
            } else {
                console.error("No group transaction result data found");
            }
        } catch (error) {
            console.error("Error fetching group transaction result:", error);
        }
    }

    return (
        <div style={{ display: "flex", paddingLeft: "40px", flexDirection: "column" }}>
            <div>
                <div>
                    <div>
                        <BillPanel group_id={group_id} reloadTabPanel={reloadTabPanel} />

                        <div>
                            {/* <div style={{paddingTop:'20px', position: 'fixed', top: '50px', bottom: '50px', width: '100%', overflowY: 'auto' }}> */}
                            <MyBill userBalance={userBalance} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ flex: "1", overflowY: "auto", paddingTop: "20px" }}>
                <div style={{ paddingBottom: "35px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <BillList group_id={group_id} transactionResult={transactionResult} reloadTabPanel={reloadTabPanel} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BillOverview;
