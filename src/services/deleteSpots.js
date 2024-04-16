'use server';

export async function deleteSpots(Token, groupId, day, spotId) {
  day = day + 1;
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
    const data = await res.json();
    const status = res.status;
    console.log('Status:', status);
    console.log('Data:', data);
    return status;    
  } catch (error) {
    console.error('Error:', error);
    console.error('Response:', await res.text());
    return undefined;
  }
}