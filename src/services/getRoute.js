'use server';

export async function getRoute(Token, groupId, day) {
  day = Number(day) + 1;
  const url = `${process.env.BASE_URL}/api/transportation/${groupId}/${day}`;
  const bearer_token = `Bearer ${Token}`;

  try {
    console.log("getRoute params", groupId, day);
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
      const durations = data?.map((trans) => trans?.trans_time);
      const option = data?.[0]?.["trans_type"];
      return {durations: durations, status: res.status, option: option};
    } else {
      console.error(`getRoute error`, res.status, res.statusText);
      return {durations: undefined, status: res.status};
    }
  } catch (error) {
    console.error(error);
      return undefined;
  }
}

/*
[
  {
    dep_id: 81,
    arr_id: 156,
    trans_type: 'DRIVING',
    trans_time: '44 分鐘'
  },
  {
    dep_id: 156,
    arr_id: 151,
    trans_type: 'DRIVING',
    trans_time: '3 小時 39 分鐘'
  },
  {
    dep_id: 151,
    arr_id: 214,
    trans_type: 'DRIVING',
    trans_time: '8 分鐘'
  },
  {
    dep_id: 214,
    arr_id: 218,
    trans_type: 'DRIVING',
    trans_time: '8 分鐘'
  }
]
*/