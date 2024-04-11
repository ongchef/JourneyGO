import db from "./db_connection.js";

// Register a new user
export const addNewUser = ({ userID, userEmail, userName, status }) => {
  console.log("here", userID);
  const query = `
      INSERT INTO user_account (clerk_user_id, status, user_name, email)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  const values = [userID, status, userName, userEmail];
  console.log(values);
  return db.query(query, values);
};
