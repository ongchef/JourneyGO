const getNewMember = async (inviteeID, groupID) => {

    const requestBody = {
      // inviterID: ,
      inviteeID: inviteeID,
      groupID: groupID,
    };


    try {
      const response = await fetch('/api/saveNewMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestBody }),
      });
      
      if (response.ok) { //Invitation sent successfully
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('保存新成員時出現錯誤：', error);
      return false;
    }
  };
  