//import axios from "axios";
const axios = require("axios");
// 假设你已经有一个调用 API 的函数，例如这里的 getUsersTripGroups
async function getData(url, bearerToken) {
  const config = {
    url: url,
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching trip groups:", error);
    throw error;
  }
}

describe("Get TripGroup of User", () => {
  test("Fetch trip groups", async () => {
    // 这里假设你已经有了一个有效的 bearer token
    const bearerToken =
      "eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18yZXJrc29jbDB6T2kzbmVmRFlSSkg4OXI5MzMiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDEiLCJleHAiOjIwMjgzNjQwNDgsImlhdCI6MTcxMzAwNDA0OCwiaXNzIjoiaHR0cHM6Ly9pbW1lbnNlLXNhaWxmaXNoLTQ2LmNsZXJrLmFjY291bnRzLmRldiIsImp0aSI6ImU4YzBmMWYwOTY2ZjJkNDllNGQ2IiwibmJmIjoxNzEzMDA0MDQzLCJzdWIiOiJ1c2VyXzJleFJKa2tDWDJlc0RXQXJ3QnMxb3NrY1RiZyIsInVzZXJFbWFpbCI6ImJlYW5AZ21haWwuY29tIiwidXNlcklEIjoidXNlcl8yZXhSSmtrQ1gyZXNEV0Fyd0JzMW9za2NUYmciLCJ1c2VyTmFtZSI6ImJlYW5pZSJ9.NuRNPlYr9tOYcZVpbamMlJeLLHB5ECYF7i-rE6TTuqKErsbxaIVS16pxijfZM-fBYZ1jw5jR3RWwnZMAwlWj5LmcfOK4Z80I5Oct0lQ5ZlVzyVDNLGmy6sCR54tBh-90o5WJv2Cb9GfkUSmmls5QFAsulzYomtupy0TwLGi9hi16OBC4vlKAOfey4mKShx-4ngwif3UGax6YTqld9tEvJnkaMBAqr-XnoRR8ig-zLwrqtjDcw2eSVwLLJ1YGIzERIDqSy0k7XzW6LdQ19AvIqdeRLT5zvXB_SIggv3GlouFjiyilzXSAdxciNq-OsFERSyW3L6nwlT-OjMngrTUOFQ";
    const url = "http://localhost:3000/api/users/trip-groups";
    // 调用 API 函数并检查返回的结果
    const tripGroups = await getData(url, bearerToken);

    // 检查返回的数据是否符合预期
    expect(tripGroups).toEqual([
      {
        group_id: 14,
        group_name: "首爾六日遊！——我要去看演唱會！",
        start_date: "2024-04-24T16:00:00.000Z",
        end_date: "2024-04-29T16:00:00.000Z",
        status: "incoming",
      },
      {
        group_id: 69,
        group_name: "香港澳門吃蛋塔",
        start_date: "2024-10-09T16:00:00.000Z",
        end_date: "2024-10-16T16:00:00.000Z",
        status: "Incoming",
      },
      {
        group_id: 15,
        group_name: "沖繩沖繩沖繩畢旅",
        start_date: "2024-06-13T16:00:00.000Z",
        end_date: "2024-06-17T16:00:00.000Z",
        status: "incoming",
      },
    ]);
  });
});
