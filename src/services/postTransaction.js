"use server";

export async function postTransaction(Token, group_id, bill_name, amount, payer_id, participants, date, time) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${group_id}/transaction`;
    const bearer_token = `Bearer ${Token}`;
    // console.log('url:', url);

    // delete payer from participants
    if (participants.includes(payer_id)) {
        const index = participants.indexOf(payer_id);
        participants.splice(index, 1);
        console.log("[postTransaction]: complete delete payer from participants");
    }

    const requestBody = {
        bill_name: bill_name,
        date: date,
        time: time,
        payer_id: payer_id,
        participant: participants,
        amount: Number(amount),
    };

    try {
        console.log("postTransaction requestBody:", requestBody);
        // return "success"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${bearer_token}`,
            },
            body: JSON.stringify(requestBody),
        });
        if (res.ok) {
            const data = await res.json();
            const status = res.status;
            console.log("postTransaction Status:", group_id, status);
            console.log("postTransaction data:", data);

            return data;
        } else {
            console.error("postTransaction Error:", res.status, res.statusText);
            return undefined;
        }
    } catch (error) {
        console.error("Error:", error);
        return undefined;
    }
}