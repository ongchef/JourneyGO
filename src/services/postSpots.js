'use server';

export async function postSpots(Token, groupId, day, data) {
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;

  try {
    // const res = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `${bearer_token}`,
    //   },
    //   body: JSON.stringify(data),
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