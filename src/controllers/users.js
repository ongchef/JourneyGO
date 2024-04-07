// controllers/userController.js
import { addNewUser, verifyPassword } from "../models/userModel.js";
export const registerUser = async (req, res) => {
  try {
    // Ideally, you'd hash the password before passing it to the register method
    const newUser = await addNewUser(
      req.body.userName,
      req.body.email,
      req.body.password,
      req.body.phone,
      req.body.status
    );
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const isValid = await verifyPassword(req.body.userName, req.body.password);
    if (isValid) {
      // Generate a token or handle login success
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
