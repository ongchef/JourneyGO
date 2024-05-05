
'use server';

export async function getSingleTransaction(Token, group_id, transaction_id) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${group_id}/transaction/${transaction_id}`;
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
            // console.log('getSingleTransaction data:', data);
            console.log('getSingleTransaction Status:', group_id, status);
            
            return data;
        }else if (res.status === 404) {
            // no transaction data by given groupId and transactionId
            console.log(`Transaction id ${transaction_id} not found:`, res.status);
            return null;
        }
        else {
            console.error('getSingleTransaction Error:', res.status, res.statusText);
            return undefined;
        }
    } catch (error) {
        console.error('Error:', error);
        return undefined;
    }
}