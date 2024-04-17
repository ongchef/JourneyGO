// not using this api

'use server';

export async function putSpots(Token, groupId, day, updateCards_sequnce) {
  day = Number(day) + 1;
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots`;
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
    if(res) {
      const data = await res.json();
      const status = res.status;
      console.log("putSpots", status);
      return status;
    } else {
      console.log("putSpots", res);
      return undefined;
    }
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