'use server';

export async function getRoute(Token, groupId, day, transOption) {
  day = Number(day) + 1;
  let url;
  if (transOption === "大眾運輸") {
    url = `${process.env.BASE_URL}/api/spots/route/${groupId}/${day}/TRANSIT`;
  } else {
    url = `${process.env.BASE_URL}/api/spots/route/${groupId}/${day}/DRIVING`;
  }
  const bearer_token = `Bearer ${Token}`;

  try {
    console.log("getRoute params", groupId, day, transOption);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application',
        'Authorization': `${bearer_token}`,
      },
      cache: 'no-cache',
    });
    if(res.ok) {
      console.log("getRoute status", res.status);
      const data = await res.json();
      const durations = data?.routes?.map(({ duration }) => duration);
      const convertDurations = durations.map((duration) => {
        return Math.floor(duration/60);
      });
      return convertDurations;
    } else {
      console.error(`getRoute error`, res.status, res.statusText);
      return undefined;
    }
  } catch (error) {
    console.error(`getRoute error`, res.status, res.statusText);
      return undefined;
  }
}