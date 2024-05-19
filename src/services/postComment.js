"use server";

export async function postComment(Token, spot_id, text, date, time) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${spot_id}/comment`;
    const bearer_token = `Bearer ${Token}`;
    // console.log('url:', url);


    const requestBody = {
        comment_text: text,
        date: date,
        time: time,
    };

    try {
        console.log("postComment requestBody:", requestBody);
        // return "success"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${bearer_token}`,
            },
            body: JSON.stringify(requestBody),
        });
        if (res.ok) {
            const data = await res.json();
            const status = res.status;
            console.log("postComment Status:", status);
            console.log("postComment data:", data);

            return data;
        } else {
            console.error("postComment Error:", res.status, res.statusText);
            return undefined;
        }
    } catch (error) {
        console.error("Error:", error);
        return undefined;
    }
}
