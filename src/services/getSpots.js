'use server';

export async function getSpots(Token, groupId, day) {
  const url = `/trip-groups/${groupId}/days/${day}/spots`;

  try {
    // const res = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `${Token}`,
    //   },
    // });
    // const data = await res.json();
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