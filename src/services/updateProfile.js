"use server";

export async function updateProfile(Token, user_name, phone, imageURL, fileName){
    console.log("updateProfile:")
    const url = `${process.env.BASE_URL}/api/users/userProfile`;
    const bearer_token = `Bearer ${Token}`;
  
    const image = await fetch(imageURL).then(response => response.blob()); //image是一個blob
    console.log("image:", image);
    const formData = new FormData();
    formData.append("userName", user_name);
    formData.append("userPhone", phone);

    if(image){
      try{
        console.log("image", image);
        formData.append("image", image, fileName);
        console.log("formData_withImage:", formData);
        const result = await sendFormData(formData);
        return result;
      }
      catch(error){
        console.error('Failed to read image:', error);
      }
    }
    else{
      console.log("No image selected.", formData);
      await sendFormData(formData);
      return result;
    }

    async function sendFormData(formData){
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `${bearer_token}`,
          },
          body: formData,
        });
    
        //console.log('updateProfile Response:', response);
    
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
        }}
      catch(error){
          console.error('updateProfile Error:', error);
          return undefined;
      }
    };
  }