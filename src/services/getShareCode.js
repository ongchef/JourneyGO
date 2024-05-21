'use server';

export async function getShareCode(Token, group_id) {
    const url = `${process.env.BASE_URL}/api/share/${group_id}`;
    const bearer_token = `Bearer ${Token}`;
    console.log('getShareCode:', url);

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
            console.log('getShareCode Status:', group_id, status);
            console.log('getShareCode Data:', data);

            return data;
        }
        else {
            console.error('getShareCode Error:', res.status, res.statusText);
            return undefined;
        }
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
}