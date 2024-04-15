'use server';

export async function putSpots(Token, groupId, day, updateCards_sequnce) {
  Token = `eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18yZXJrc29jbDB6T2kzbmVmRFlSSkg4OXI5MzMiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDEiLCJleHAiOjIwMjgzNjM3OTMsImlhdCI6MTcxMzAwMzc5MywiaXNzIjoiaHR0cHM6Ly9pbW1lbnNlLXNhaWxmaXNoLTQ2LmNsZXJrLmFjY291bnRzLmRldiIsImp0aSI6IjFjOGJhYjc2YmM4YTQ4Yjk2NGMxIiwibmJmIjoxNzEzMDAzNzg4LCJzdWIiOiJ1c2VyXzJleFJBRWk0QWhxTk15MEU1eHYzS2pnZkpEbiIsInVzZXJFbWFpbCI6InBpY2t5QG91dGxvb2suY29tIiwidXNlcklEIjoidXNlcl8yZXhSQUVpNEFocU5NeTBFNXh2M0tqZ2ZKRG4iLCJ1c2VyTmFtZSI6InBpY2t5In0.UJb_43M65NvndfY1KFApvvV3qsahTOTLkQ74pk2FSCatqMSTgK1IihU6og92RkWrhLX9V4crtGYTItN4r8Oy-gRQSaXJpyZr-YatyTcPnKJ5GidOvmQKm-739GaoTLxdMOmk-qywAHLNCx0UILJA7Bhd3HIvVQAK4lvKY1gdembToDXNBIAicng5tzbGWEDYOEmQb5lKWkmU9K_byXoeCbZFggNOXWs77VcOuI0-rDV4pPEeJHNHmaOdaD05RSyDv8prTHgJxmhyo0Xs6QfPYjLPxtHXh_OoOxyQGF8vztJnxpd5cODUj57nzSGukBiaCQzlQDioSCoqD3jYRyP9KQ`;
  day = day + 1;
  const url = `http://localhost:3000/api/tripgroup/${groupId}/days/${day}/spots`;
  const bearer_token = `Bearer ${Token}`;

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
      body: JSON.stringify(updateCards_sequnce),
    });
    const data = await res.json();
    const status = res.status;
    return status;
    
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}

/*
{
    "spotId": 5,
    "sequence": 4
}
*/