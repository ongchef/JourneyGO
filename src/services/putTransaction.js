
'use server';

export async function putTransaction(Token, group_id, dataToSend) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${group_id}/transaction`;
    const bearer_token = `Bearer ${Token}`;
    // console.log('url:', url);


    try {
        console.log('putTransaction requestBody:', dataToSend);
        return "success"
        // const res = await fetch(url, {
        // method: 'PUT',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `${bearer_token}`,
        // },
        // body: JSON.stringify(dataToSend),
        // });
        // if (res.ok) {
        //     const data = await res.json();
        //     const status = res.status;
        //     console.log('putTransaction Status:', group_id, status);
        //     console.log('putTransaction data:', data);

        //     return data;
        // }else {
        //     console.error('putTransaction Error:', res.status, res.statusText);
        //     return undefined;
        // }
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
}