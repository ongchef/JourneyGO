'use server';


export async function createTripGroup(Token, groupName, startDate, endDate, country_id, inviteeEmail){
    
    const url = 'https://backend-rd2rxwzuga-de.a.run.app/api/users/trip-groups';
    const bearer_token = `Bearer ${Token}`;
  
    // const requestBody = {
    //   userID: userID,
    //   groupName: groupName,
    //   startDate: startDate,
    //   endDate: endDate,
    //   country_id: country_id,
    // };

    const requestBody = {
      groupName: groupName,
      countries: country_id,
      inviteeEmail: inviteeEmail,
      startDate: startDate,
      endDate: endDate,
    };

    console.log('Request body:', requestBody);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${bearer_token}`,
        },
        body: JSON.stringify(requestBody),
      });
      
      console.log('createTripGroup Response:', response);
      if (!response.ok) {
        // const data = await response.json();
        // console.log('Group:', data);
        // return data; 
        console.error('Failed to create trip group:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error creating trip group:', error);
      return null;
    }
  };


