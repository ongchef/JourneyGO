"use server";

export async function postWriteOffBill(Token, group_id, date, time, debtor_id, creditor_id, amount) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${group_id}/transaction/writeoff`;
    const bearer_token = `Bearer ${Token}`;
    // console.log('url:', url);

    const requestBody = {
        date: date,
        time: time,
        creditor_id: Number(creditor_id),
        debtor_id: Number(debtor_id),
        amount: Number(amount),
    };

    try {
        console.log("postWriteOffBill requestBody:", requestBody);
        // return "success"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${bearer_token}`,
            },
            body: JSON.stringify(requestBody),
        });
        if (res.ok) {
            const data = await res.json();
            const status = res.status;
            console.log("postWriteOffBill Status:", group_id, status);
            console.log("postWriteOffBill data:", data);

            return data;
        } else {
            console.error("postWriteOffBill Error:", res.status, res.statusText);
            return undefined;
        }
    } catch (error) {
        console.error("Error:", error);
        return undefined;
    }
}

// "date": "2024-06-17",
// "time": "14:00",
// "creditor_id": 36,
// "debtor_id": 37,
// "amount": 1090
