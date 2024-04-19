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
      if (data === undefined || data.length === 0 || data === null) {
        console.log('No invitation data found');
        return []; // return an empty array 
      }
      // console.log('GetInvitationData:', data);
      return data; // Return invitation data
    } catch (error) {
      console.error('Error:', error);
      return undefined;
    }
  }