'use server';

export async function createTripGroup(Token, groupName, startDate, endDate, country_id, inviteeEmail, imageURL, fileName){
    
    const url = `${process.env.BASE_URL}/api/users/trip-groups`;
    const bearer_token = `Bearer ${Token}`;

    const image = await fetch(imageURL).then(response => response.blob()); //image是一個blob

    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    const formatedStartDate = formatDate(startDate);
    const formatedEndDate = formatDate(endDate);
    
    // console.log("groupName:", groupName);
    // console.log("startDate:", formatedStartDate);
    // console.log("endDate:", formatedEndDate);
    // console.log("country_id:", country_id);
    // console.log("inviteeEmail:", inviteeEmail);
    // console.log("imageURL:", imageURL);
    // console.log("fileName:", fileName);

    const formData = new FormData();
    formData.append("groupName", groupName);
    formData.append("countries", country_id);
    formData.append("inviteeEmail", inviteeEmail);
    formData.append("startDate", formatedStartDate);
    formData.append("endDate", formatedEndDate);
    
    console.log("formData:", formData);

    if(image){
      try{
        //console.log("image:", image);
        formData.append("image", image, fileName);
        //console.log("formData_withImage:", formData);
        const result = await sendFormData(formData);
        return result;
      }
      catch(error){
        console.error('Failed to read image:', error);
      }
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
    
        //console.log('createTripGroup Response:', response);
    
        if(response.ok){
          const data = await response.json();
          console.log('createTripGroup data:', data);
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
    }
}


