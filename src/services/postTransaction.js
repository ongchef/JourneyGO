
'use server';

export async function postTransaction(Token, group_id, bill_name, amount, payer_id, participants, date, time) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${group_id}/transaction`;
    const bearer_token = `Bearer ${Token}`;
    // console.log('url:', url);

    const requestBody = {
        bill_name: bill_name,
        date: date,
        time: time,
        payer_id: 36, //joey
        participant: [36, 37], //joey, beanie
        amount: Number(amount),
    };

    try {
        console.log('postTransaction requestBody:', requestBody);
        return "success"
        // const res = await fetch(url, {
        // method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `${bearer_token}`,
        // },
        // body: JSON.stringify(requestBody),
        // });
        // if (res.ok) {
        //     const data = await res.json();
        //     const status = res.status;
        //     console.log('postTransaction Status:', group_id, status);
        //     console.log('postTransaction data:', data);

        //     return data;
        // }else {
        //     console.error('postTransaction Error:', res.status, res.statusText);
        //     return undefined;
        // }
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
}