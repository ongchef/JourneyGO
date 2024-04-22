function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}
export default async function getUserInfo(req, res, next) {
  // ClerkExpressRequireAuth returns an error for unauthorized requests
  // Optionally ClerkExpressWithAuth returns an empty user with no error
  // ClerkExpressWithAuth(),
  console.log("---------------");
  //console.log("req", req)
  //console.log("req.rawHeaders", req.rawHeaders);
  //console.log("req.auth", req.auth);
  //console.log("req_Id", req.auth.userId);

  const getToken = req.auth.getToken;
  //get user jwt template
  const template = "user";

  const token = await getToken({ template });

  console.log("token", token);
  if (!token && !req.auth.userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (token != null) {
    const data = parseJwt(token);
    // console.log("data123", data);
    req.userID = data.userID;
    req.email = data.email;
    req.userName = data.userName;
  } else {
    // console.log("down");
    req.userID = req.auth.sessionClaims.userID;
    req.email = req.auth.sessionClaims.userEmail;
    req.userName = req.auth.sessionClaims.userName;
    // console.log("req.userId", req.userID);
    // console.log("req.email", req.email);
    // console.log("req.userName", req.userName);
  }
  console.log("req.userId", req.userID);
  console.log("req.email", req.email);
  console.log("req.userName", req.userName);

  next();
  //add user request
  //next();
}
