'use server';

export async function getTripGroupOverview(Token, group_id) {
    const url = `https://backend-rd2rxwzuga-de.a.run.app/api/tripgroup/${group_id}/overview`;
    const bearer_token = `Bearer ${Token}`;

    try {
        const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${bearer_token}`,
        },
        });
        const data = await res.json();
        const status = res.status;

        // console.log('Status:', status);
        // console.log('Data:', data);
        
        // prevent empty data
        if (data === undefined) {
            console.error('No data found');
            return undefined;
        }

        return data;


    } catch (error) {
        console.error('Error:', error);
    return undefined;
    }
}