'use server';

export async function updateInvitationStatus(Token, invitationId, status) {

  const url = `http://localhost:3000/api/users/invitations/${invitationId}/status`;
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
  } catch (error) {
    console.error('Error updating invitation status:', error);
    return null;
  }
}