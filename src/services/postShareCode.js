"use server";

export async function postShareCode(Token, share_code, start_date, end_date) {
    const url = `${process.env.BASE_URL}/api/share`;
    const bearer_token = `Bearer ${Token}`;
    // console.log('url:', url);


    const requestBody = {
        share_code: share_code,
        start_date: start_date,
        end_date: end_date,
    };

    try {
        console.log("postShareCode requestBody:", requestBody);
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
            console.log("postShareCode Status:", status);
            console.log("postShareCode data:", data);

            // if success, return true
            return true;
        } else {
            console.error("postShareCode Error:", res.status, res.statusText);
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}
