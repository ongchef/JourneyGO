'use server';

export async function inviteToGroup(Token, inviteeEmail, groupId) {

    const url = `${process.env.BASE_URL}/api/tripgroup/invitations`; 
    const bearer_token = `Bearer ${Token}`;

    const requestBody = {
      inviteeEmail: [inviteeEmail],
      groupId: groupId,
    };

    console.log('inviteToGroup Request body:', requestBody);
    // console.log('inviteToGroup Token:', Token);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${bearer_token}`,
        },
        body: JSON.stringify( requestBody ),
      });

        // const data = await response.json();
        // return data;
        if (!response.ok) {
          console.error('Failed to invite to group:', response.statusText);
          return false;
        }else {
          console.log('Invite to group response:');
          console.log(response)
          return true;
        }
        console.log(`Invitation sent to ${inviteeEmail} successfully`);
      }catch (error) {
        console.error('Error:', error);
        return false;
      }
  }
  