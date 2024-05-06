'use server';

export async function quitGroup(Token, groupId) {

    const url = `${process.env.BASE_URL}/api/tripgroup/${groupId}/member`; 
    const bearer_token = `Bearer ${Token}`;
    console.log(url)

    // console.log('inviteToGroup Token:', Token);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${bearer_token}`,
        },
      });

        // const data = await response.json();
        // return data;
        console.log(response)
        if (!response.ok) {
          console.error('Failed to quit group:', response.statusText);
          return false;
        }
        console.log(`quit successfully`);
        return true
      }catch (error) {
        console.error('Error:', error);
        return false;
      }
  }
  