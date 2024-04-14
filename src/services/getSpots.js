'use server';

export async function getSpots(Token, groupId, day) {
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;

  try {
    // const res = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `${bearer_token}`,
    //   },
    // });
    // const data = await res.json();
    // const status = res.status;
    // return data;

    return(
      [
        {
          id: 1,
          title: 'title',
          address: 'address',
        },
        {
          id: 2,
          title: 'title2',
          address: 'address2',
        },
      ]
    );
    
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}