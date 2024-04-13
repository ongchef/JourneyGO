function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}
export default async function getUserInfo(req, res, next) {
  // ClerkExpressRequireAuth returns an error for unauthorized requests
  // Optionally ClerkExpressWithAuth returns an empty user with no error
  // ClerkExpressWithAuth(),

  const getToken = req.auth.getToken;
  //get user jwt template
  const template = "user";

  const token = await getToken({ template });
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  const data = parseJwt(token);
  console.log(data);
  req.userID = data.userID;
  req.email = data.email;
  req.userName = data.userName;
  next();
  //add user request
  //next();
}
