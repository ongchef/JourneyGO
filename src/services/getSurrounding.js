'use server';

export async function getSurrounding(Token, query, spotId) {
  const url = `http://localhost:3000/api/spots/search/surroundings/${query}/${spotId}`;

  try {
    // const res = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `${Token}`,
    //   },
    // });
    // const data = await res.json();
    // const status = res.status;
    // return data;

    return(
      [
        {  
          title: "title4",
          description: "description4",
          imgUrl: "imgUrl",
          lat: "lat",
          lng: "lng",
          rating: 5,  
        },
        {  
          title: "title5",
          description: "description5",
          imgUrl: "imgUrl2",
          lat: "lat2",
          lng: "lng2",
          rating: 4,  
        },
      ]
    );
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}