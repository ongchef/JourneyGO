'use server';

export async function getSpots(Token, groupId, day) {
  day = day + 1;
  Token = `eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18yZXJrc29jbDB6T2kzbmVmRFlSSkg4OXI5MzMiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDEiLCJleHAiOjIwMjgzNjM2ODEsImlhdCI6MTcxMzAwMzY4MSwiaXNzIjoiaHR0cHM6Ly9pbW1lbnNlLXNhaWxmaXNoLTQ2LmNsZXJrLmFjY291bnRzLmRldiIsImp0aSI6IjgzYmEwNGM0MWQwMjUzYzZjMThkIiwibmJmIjoxNzEzMDAzNjc2LCJzdWIiOiJ1c2VyXzJleFFzVFF0a2J3SEZmRFJweUp3cEtJb1JITyIsInVzZXJFbWFpbCI6Inplcm93b3JrQGhvdG1haWwuY29tIiwidXNlcklEIjoidXNlcl8yZXhRc1RRdGtid0hGZkRScHlKd3BLSW9SSE8iLCJ1c2VyTmFtZSI6Indvcmt5In0.IjvDDC7wEiqget3qauB_sYmmppoykgFYfQ4huCtOOx7OlASyoZAn9-IZK5q9JDNC-W8oNo99jUH8KjFD5uqJPjmYy28pROgPbI0RHmQpoAKnHrYcG7gtNJjXKRL7vJVQzlfGWmAejvSTpPR35HAoXsuy4_WtVCuxFCAlo9BKMe9HNyCzIbisZB-7OPCN6NSV8f0nTfTg2bs-xQ7e2gcUFez0A_PwzIxeQFNrLVzZyyFsE3W2GzLDx2Y8X7OhGujhvcWJbQQlEh4Nd2Dgek88bx0v12LoByKAOM_fPfCggFvxvZzM1Bx6zwSdGddF-lJ6BYc7xdb32P8thLEoqQUGtw`;
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
    });
    const data = await res.json();
    const status = res.status;
    if (status === 404) {
      return undefined;
    }
    const formattedData = data.map((spot) => {
        return {
          id: spot.spot_id,
          title: spot.spot_name,
          location: spot.location,
          description: spot.description,
          lng: spot.lon,
          lat: spot.lan,
        };
      }
    );
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