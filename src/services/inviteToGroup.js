'use server';

export async function inviteToGroup(Token, inviterEmail, inviteeEmail, groupId) {

    const url = 'http://localhost:3000/api/tripgroup/invitations'; 
    const bearer_token = `Bearer ${Token}`;

    const requestBody = {
      inviteeEmail: inviteeEmail,
      groupID: groupId,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${bearer_token}`,
        },
        body: JSON.stringify( requestBody ),
      });
        const data = await response.json();
      return data;
      }catch (error) {
        console.error('Error:', error);
        return null;
      }
  }
  