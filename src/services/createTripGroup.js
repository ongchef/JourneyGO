const createTripGroup = async (groupName, startDate, endDate, country_id, inviteeEmail) => {
    const url = 'api/users/trip-groups';
  
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
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer${Token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data; // Optionally return created trip group data
      } else {
        console.error('Failed to create trip group:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error creating trip group:', error);
      return null;
    }
  };


