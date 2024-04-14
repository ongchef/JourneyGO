'use server';

export async function getTripGroups(Token) {
    const url = `http://localhost:3000/api/users/trip-groups`;
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

        console.log('Status:', status);
        console.log('Data:', data);
        

        return data;


    } catch (error) {
    console.error('Error:', error);
    return undefined;
    }
}