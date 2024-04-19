'use server';

export async function deleteSpots(Token, groupId, day, spotId) {
  day = Number(day) + 1;
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots/${spotId}`;
  const bearer_token = `Bearer ${Token}`;

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
    });
    if (res.ok){
      const data = await res.json();
      const status = res.status;
      console.log('deleteSpots', status);
      // console.log('deleteSpots', data);
      return status;
    } else {
      console.log('deleteSpots', res.status);
      return res.status;
    }
        
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}