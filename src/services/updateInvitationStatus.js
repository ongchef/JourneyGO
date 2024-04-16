'use server';

export async function updateInvitationStatus(Token, invitationId, status) {

  const url = `https://backend-rd2rxwzuga-de.a.run.app/api/users/invitations/${invitationId}/status`;
  const bearer_token = `Bearer ${Token}`;

  const requestBody = {
    status: status,
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
      body: JSON.stringify(requestBody),

    });
      // console.log('Response:', response);
      // const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      console.log(`Invitation status: ${status} updated successfully`);  
      return response.status;
  } catch (error) {
    console.error('Error updating invitation status:', error);
    return null;
  }
}

