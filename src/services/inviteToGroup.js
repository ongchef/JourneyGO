
const inviteToGroup = async(inviteeEmails, groupID, inviterID)=>{

    const url = '/api/tripgroup/invitations'; //要調

    const requestBody = {
      inviteeEmail: inviteeEmails,
      groupID: groupID,
    };

  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization':'',
        },
        body: JSON.stringify({ requestBody }),
      });
      
      if(response.ok){
      const data = await response.json();
      return data;
    }else{
      return null;
    }
  }catch (error) {
        console.error('Error:', error);
        return null;
      }
  };
  