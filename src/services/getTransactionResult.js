
'use server';

export async function getTransactionResult(Token, group_id) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${group_id}/transactionResult`;
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
            console.log('getGroupTransaction Status:', group_id, status);
            
            return data;
        }else if (res.status === 404) {
            // no overview data by given groupId
            console.log('Group Transaction not found:', res.status);
            return null;
        }
        else {
            console.error('getGroupTransaction Error:', res.status, res.statusText);
            return undefined;
        }
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
}