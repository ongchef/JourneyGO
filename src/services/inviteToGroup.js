
const inviteToGroup = async(inviteeEmail, groupId)=>{

    const url = 'http://localhost:3000/api/tripgroup/invitations'; 

    const requestBody = {
      inviteeEmail: inviteeEmail,
      groupID: groupId,
    };

  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${Token}`,
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
  