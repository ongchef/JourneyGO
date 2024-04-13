const updateInvitationStatus = async (invitationId, status) => {
  const url = `/api/users/invitations/${invitationId}/status`;

  const requestBody = {
    status: status,
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization':'',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Optionally return updated invitation data
    } else {
      console.error('Failed to update invitation status:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error updating invitation status:', error);
    return null;
  }
};