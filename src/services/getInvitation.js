'use server';

export async function getInvitation(Token) {

    const url = 'http://localhost:3000/api/users/invitations';
    const bearer_token = `Bearer ${Token}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${bearer_token}`,
        },
      });
      const data = await response.json();
      // console.log('GetInvitationData:', data);
      return data; // Return invitation data

    } catch (error) {
      console.error('Error:', error);
      return undefined;
    }
  }