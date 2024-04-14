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
      

      console.log('GetInvitationData:', data);
      return data; // Return invitation data


  
    //   if (response.ok) {
    //     const data = await response.json();
    //     return data; // Return invitation data
    //   } else {
    //     console.error('Failed to fetch invitations:', response.statusText);
    //     return null;
    //   }
    // } catch (error) {
    //   console.error('Error fetching invitations:', error);
    //   return null;
    // }
    } catch (error) {
      console.error('Error:', error);
      return undefined;
    }
  }