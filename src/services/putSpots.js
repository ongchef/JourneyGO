'use server';

export async function putSpots(Token, groupId, day, newSpots) {
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;

  try {
    // const res = await fetch(url, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `${bearer_token}`,
    //   },
    //   body: JSON.stringify(newSpots),
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