"use server";

export async function updateProfile(Token){
    
    const url = `${process.env.BASE_URL}/api/user/userProfile`;
    const bearer_token = `Bearer ${Token}`;
  

    const requestBody = {
      user_name: user_name,
      phone: phone,
      image: image,
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
      
      console.log('updateProfile Response:', response);

      if(response.ok){
        const data = await response.json();
        console.log('updateProfile data:', data);
        return data;
      }else if(response.status === 404){
        console.log('Profile not found:', response.status);
        return null;
      }else{
        console.error('Failed to update Profile:', response.statusText);
        return undefined;
      }}catch(error){
        console.error('updateProfile Error:', error);
        return undefined;
      }
  };







