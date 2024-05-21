"use server";
import FormData from "form-data";

export async function updateProfile(Token, user_name, phone){
    
    const url = `${process.env.BASE_URL}/api/user/userProfile`;
    const bearer_token = `Bearer ${Token}`;
  
    console.log(Token + "//" + user_name + "//" + phone);

    // const requestBody = {
    //   userName: user_name,
    //   userPhone: phone,
    //   image: "",
    // };

    const formData = new FormData();
    formData.append("userName", user_name);
    formData.append("userPhone", phone);
    formData.append("image", "");

    // console.log("formData", formData);
    // console.log(Token);
    // console.log(url);
    
    //console.log('Request body:', requestBody);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          //'Content-Type': "multipart/form-data",
          'Authorization': `${bearer_token}`,
          ...formData.getHeaders()
        },
        // body: JSON.stringify(requestBody),
        body: formData,
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







