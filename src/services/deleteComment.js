"use server";

export async function deleteComment(Token, spotId, commentId) {
    const url = `${process.env.BASE_URL}/api/tripgroup/${spotId}/comment/${commentId}`;
    const bearer_token = `Bearer ${Token}`;

    try {
        console.log("deleteComment: spotId = ", spotId, ", commentId = ", commentId);
        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${bearer_token}`,
            },
        });
        if (res.ok) {
            const data = await res.json();
            const status = res.status;
            console.log("deleteComment", status);
            // console.log('deleteComment', data);
            return status;
        } else {
            console.log("deleteComment", res.status, res.statusText);
            return res.status;
        }
    } catch (error) {
        console.error("Error:", error);
        return undefined;
    }
}
