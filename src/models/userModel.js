import db from "./connection_db.js";

// Register a new user
export const addNewUser = ({ userName, email, password, phone, status }) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO users (UserName, Email, Password, Phone, Status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [userName, email, password, phone, status];

    db.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows[0]);
      }
    });
  });
};

// Find a user by their username
export const findByUserName = (userName) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE UserName = $1;`;
    const values = [userName];

    db.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows[0]); // Returns undefined if no user is found
      }
    });
  });
};

// Verify a user's password (Note: Use hashed passwords in production)
export const verifyPassword = (userName, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await findByUserName(userName);
      if (!user) {
        resolve(false);
      } else {
        // In a real application, you would compare the hashed password
        resolve(user.Password === password);
      }
    } catch (error) {
      reject(error);
    }
  });
};
