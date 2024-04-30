'use server';

export async function postSpots(Token, groupId, day, spot_data) {
  day = Number(day) + 1;
  const url = `${process.env.BASE_URL}/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;

  try {
    console.log("postSpots", groupId, day);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
      body: JSON.stringify(spot_data),
    });
    if(res.ok) {
      const data = await res.json();
      const status = res.status;
      console.log("postSpots", status, data);
      return status;  
    } 
    else {
      console.log("postSpots error", res.status, res.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}

/*
{
    "spot_id": 20,
    "spot_name": "新竹市綠水市民活動中心",
    "description": "臣服 於我",
    "location": "300新竹市東區博愛街106號",
    "lon": "120.97",
    "lat": "24.81",
    "date": 1,
    "sequence": 1,
    "g_id": 13
}
*/