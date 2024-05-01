'use server';

export async function getSpots(Token, groupId, day) {
  day = Number(day) + 1;
  const url = `${process.env.BASE_URL}/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;
  try {
    console.log("getSpots params", groupId, day);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
      cache: 'no-cache',
    });
    if(res.ok) {
      console.log("getSpots status", res.status);
      const data = await res.json();
      const formattedData = data?.map((spot) => {
        return {
          id: spot?.spot_id,
          title: spot?.spot_name,
          location: spot?.location,
          description: spot?.description,
          lng: spot?.lon,
          lat: spot?.lat,
        }
      });
      // console.log("getSpots", formattedData);
      return formattedData;
    } else {
      console.error(`getSpots error`, res.status, res.statusText);
      return undefined;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
}