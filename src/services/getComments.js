
'use server';

export async function getComments(Token, spot_id) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${spot_id}/comments`;
    const bearer_token = `Bearer ${Token}`;
    // console.log('url:', url);

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
            console.log('getComments Status:', spot_id, status);
            // if data is empty array means no comments, and still return empty array
            
            return data;
        }else if (res.status === 404) {
            // no comment data by given spotId
            // but this api uses 200 and empty array to represent no comments
            console.log('Spot comments result not found:', res.status);
            return null;
        }
        else {
            console.error('getComments Error:', res.status, res.statusText);
            return undefined;
        }
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
}