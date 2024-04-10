'use server';

export async function getSpots() {
  const url = '';
  const Token = '';

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${Token}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}