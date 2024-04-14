'use server';

export async function postSpots(Token, groupId, day, spot_data) {
  day = day + 1;
  Token = `eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18yZXJrc29jbDB6T2kzbmVmRFlSSkg4OXI5MzMiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDEiLCJleHAiOjIwMjgzNjM2ODEsImlhdCI6MTcxMzAwMzY4MSwiaXNzIjoiaHR0cHM6Ly9pbW1lbnNlLXNhaWxmaXNoLTQ2LmNsZXJrLmFjY291bnRzLmRldiIsImp0aSI6IjgzYmEwNGM0MWQwMjUzYzZjMThkIiwibmJmIjoxNzEzMDAzNjc2LCJzdWIiOiJ1c2VyXzJleFFzVFF0a2J3SEZmRFJweUp3cEtJb1JITyIsInVzZXJFbWFpbCI6Inplcm93b3JrQGhvdG1haWwuY29tIiwidXNlcklEIjoidXNlcl8yZXhRc1RRdGtid0hGZkRScHlKd3BLSW9SSE8iLCJ1c2VyTmFtZSI6Indvcmt5In0.IjvDDC7wEiqget3qauB_sYmmppoykgFYfQ4huCtOOx7OlASyoZAn9-IZK5q9JDNC-W8oNo99jUH8KjFD5uqJPjmYy28pROgPbI0RHmQpoAKnHrYcG7gtNJjXKRL7vJVQzlfGWmAejvSTpPR35HAoXsuy4_WtVCuxFCAlo9BKMe9HNyCzIbisZB-7OPCN6NSV8f0nTfTg2bs-xQ7e2gcUFez0A_PwzIxeQFNrLVzZyyFsE3W2GzLDx2Y8X7OhGujhvcWJbQQlEh4Nd2Dgek88bx0v12LoByKAOM_fPfCggFvxvZzM1Bx6zwSdGddF-lJ6BYc7xdb32P8thLEoqQUGtw`;
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
    console.log("postSpots", data);
    const status = res.status;
    return status;    
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}

/*
{
    "spotName": "新竹市立動物園",
    "description": "臣服 於我",
    "location": "新竹市鼓山區萬壽路350號",
    "lan":  120.58,
    "lon": 24.48
}
*/