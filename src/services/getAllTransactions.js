
'use server';

export async function getAllTransactions(Token, group_id) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${group_id}/transaction`;
    const bearer_token = `Bearer ${Token}`;
    // console.log('getAllTransactions url:', url);

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
            // console.log('getAllTransactions data:', data);
            console.log('getAllTransactions Status:', group_id, status);
            
            return data;
        }else if (res.status === 404) {
            // no bill data by given groupId
            console.log('Transactions not found:', res.status);
            return null;
        }
        else {
            console.error('getAllTransactions Error:', res.status, res.statusText);
            return undefined;
        }
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
}