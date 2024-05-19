"use server";

export async function getProfile(Token){
    
    const url = `${process.env.BASE_URL}/api/users/userProfile`;
    const bearer_token = `Bearer ${Token}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${bearer_token}`,
        },
      });

      if(response.ok){
        const data = await response.json();
        console.log('getProfile data:', data);
        return data;
      }else if(response.status === 404){
        console.log('Profile not found:', response.status);
        return null;
      }
      else{
        console.error('Failed to get Profile:', response.statusText);
        return undefined;
      }
      }catch(error){
        console.error('getProfile Error:', error);
        return undefined;
      }

  };







