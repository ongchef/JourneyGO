'use server';

export async function deleteSpots(Token, groupId, day, spotId) {
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots/${spotId}`;
  const bearer_token = `Bearer ${Token}`;

  try {
    // const res = await fetch(url, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `${bearer_token}`,
    //   },
    // });
    // const data = await res.json();
    // const status = res.status;
    // return data;

    return 200;
    
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