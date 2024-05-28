'use server';

export async function getTripGroupOverview(Token, group_id) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${group_id}/overview`;
    const bearer_token = `Bearer ${Token}`;

    try {
        const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${bearer_token}`,
        },
        });
        if (res.ok) {
            const data = await res.json();
            const status = res.status;
            console.log('getGroup Status:', group_id, status);
            
            // console.log('getGroup Data:', data);
            // change date format into yyyy/mm/dd
            data[0].start_date = data[0].start_date.split('T')[0];
            data[0].end_date = data[0].end_date.split('T')[0];
            return data[0];
        }
        else {
            console.error('getGroup Error:', res.status, res.statusText);
            return undefined;
        }
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
}