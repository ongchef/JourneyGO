'use server';

export async function getSearch(Token, query) {
  const url = `http://localhost:3000/api/spots/search/${query}`;
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
          title: "title",
          description: "description",
          imgUrl: "imgUrl",
          lat: "lat",
          lng: "lng",
          rating: 5,  
        },
        {  
          title: "title2",
          description: "description2",
          imgUrl: "imgUrl2",
          lat: "lat2",
          lng: "lng2",
          rating: 4,  
        },
        {
          title: "title3",
          description: "description3",
          imgUrl: "imgUrl3",
          lat: "lat3",
          lng: "lng3",
          rating: 3,
        }
      ]
    );
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}