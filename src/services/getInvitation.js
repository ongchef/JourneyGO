const getInvitation = async (Token) => {
    const url = 'localhost:3000/api/users/invitations';
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${Token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data; // Return invitation data
      } else {
        console.error('Failed to fetch invitations:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error fetching invitations:', error);
      return null;
    }
  };