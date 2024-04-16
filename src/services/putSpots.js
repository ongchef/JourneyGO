// not using this api

'use server';

export async function putSpots(Token, groupId, day, updateCards_sequnce) {
  day = day + 1;
  const url = `https://backend-rd2rxwzuga-de.a.run.app/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
      body: JSON.stringify(updateCards_sequnce),
    });
    const data = await res.json();
    const status = res.status;
    return status;
    
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}

/*
{
    "spotId": 5,
    "sequence": 4
}
*/