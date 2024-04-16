'use server';

export async function getSpots(Token, groupId, day) {
  day = day + 1;
  const url = `https://backend-rd2rxwzuga-de.a.run.app/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
      cache: 'no-cache',
    });
    const data = await res.json();

    const status = res.status;
    if (status === 404) {
      return undefined;
    }
    if (data){
      const formattedData = data?.map((spot) => {
        return {
          id: spot?.spot_id,
          title: spot?.spot_name,
          location: spot?.location,
          description: spot?.description,
          lng: spot?.lon,
          lat: spot?.lan,
        }
      });
      console.log("formattedData", formattedData);
      return formattedData;
    }
    else {
      console.log("data", data);
      return undefined;
    }
    
    return formattedData;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}

/*
[
    {
        "spot_id": 3,
        "spot_name": "大安森林公園",
        "description": "邊哭邊跨年",
        "location": "106台北市大安區新生南路二段1號",
        "lon": "121.53541",
        "lan": "25.03329",
        "date": 1,
        "sequence": 1
    },
    {
        "spot_id": 5,
        "spot_name": "壽山動物園",
        "description": "承服 於我 猴子",
        "location": "高雄市鼓山區萬壽路350號",
        "lon": "120.2756",
        "lan": "22.6353",
        "date": 1,
        "sequence": 2
    },
    {
        "spot_id": 7,
        "spot_name": "新竹市立動物園",
        "description": "臣服 於我",
        "location": "新竹市東區食品路66號",
        "lon": "120.58",
        "lan": "24.48",
        "date": 1,
        "sequence": 3
    }
]
*/