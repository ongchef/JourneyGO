
'use server';

export async function putTripGroupDetail(Token, group_id, group_name, start_date, end_date) {
    const url = `${process.env.BASE_URL}/api/tripgroup/details`;
    const bearer_token = `Bearer ${Token}`;
    console.log('putTripGroupDetail url:', url);

    const requestBody = {
        groupId: group_id,
        groupName: group_name,
        start_date: start_date,
        end_date: end_date,
    };

    try {
        console.log('putTripGroupDetail requestBody:', requestBody);
        
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${bearer_token}`,
            },
            body: JSON.stringify(requestBody),
        });
        if (res.ok) {
            const response = await res.json();
            const status = res.status;
            console.log('putTripGroupDetail group_id: ', group_id, ', status: ',status);

            return true;
        }else {
            console.error('putTripGroupDetail Error:', res.status, res.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}