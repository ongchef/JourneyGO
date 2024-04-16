'use server';

export async function postSpots(Token, groupId, day, spot_data) {
  day = day + 1;
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
      body: JSON.stringify(spot_data),
    });
    const data = await res.json();
    if (data) {
      console.log("postSpots", data);
    }
    const status = res.status;
    return status;    
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
    "lan": "24.81",
    "date": 1,
    "sequence": 1,
    "g_id": 13
}
*/