'use server';

export async function putSpots(Token, groupId, day, newSpots) {
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots`;

  try {
    // const res = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `${Token}`,
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