'use server';

export async function getTripGroups(Token) {
    const url = `${process.env.BASE_URL}/api/users/trip-groups`;
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
        console.log("getTripGroups: ")
        // console.log(data)
        const status = res.status;
        console.log('Status:', status);


        // console.log('Status:', status);
        // console.log('Data:', data);
        
        
        if (!res.ok) {
            console.error('Failed to fetch trip groups:', res.statusText);
            return null;
        }
        return data;


    } catch (error) {
    console.error('Error:', error);
    return undefined;
    }
}