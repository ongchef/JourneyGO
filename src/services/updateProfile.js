"use server";

export async function updateProfile(Token, user_name, phone, imageURL){
    console.log("updateProfile:")
    const url = `${process.env.BASE_URL}/api/users/userProfile`;
    const bearer_token = `Bearer ${Token}`;
  
    const image = await fetch(imageURL).then(response => response.blob());
    console.log("image:", image);
    const formData = new FormData();
    formData.append("userName", user_name);
    formData.append("userPhone", phone);
    if(image){
      try {
        console.log(image);
        formData.append("image", image, image.name);
        console.log("formData_withImg:", formData);
        const result = await sendFormData(formData);
        return result;
      }
      catch(error){
        console.error('Failed to read image:', error);
      }
    }
    else{
      console.log("formData_withoutImg:", formData);
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

function readFileAsync(file){
  console.log(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    }
    reader.readAsArrayBuffer(file);
  });
}};
