const getNewMember = async (inviteeID, groupID) => {

    const requestBody = {
      // inviterID: ,
      inviteeID: inviteeID,
      groupID: groupID,
    };

    const url = '/api/saveNewMember'; //要調

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestBody }),
      });
      

      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Error:', error);
        return undefined;
      }
  };
  