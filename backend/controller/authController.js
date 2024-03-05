import { pool } from "../database/database.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async (req, res) => {
  const { username, phone, password } = req.body;

  if (!username || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Number Of Arguments" });
  }

  if (username.length < 5) {
    return res
      .status(400)
      .json({ success: false, message: "Username Too Short!" });
  }

  const regex = /^\+639\d{9}$/;
  if (!regex.test(phone)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Phone Format" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: "Password too short" });
  }

  let sql = "SELECT * from users WHERE username = ?";
  const [users] = await pool.execute(sql, [username]);

  if (users.length > 0) {
    return res
      .status(409)
      .json({ success: false, message: "Username already exists" });
  }

  const hashedPass = await bcrypt.hash(password, 10);
  sql = "INSERT INTO users (username, phone, password) values ( ?, ?, ?)";
  const result = await pool.execute(sql, [username, phone, hashedPass]);

  return res.json({ success: true, data: result });
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Arguments" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  const [rows] = await pool.execute(sql, [username]);

  if (!rows || rows.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "User doesnt exist" });
  }

  const user = rows[0];

  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) {
    return res
      .status(400)
      .json({ success: false, message: "Wrong username or password" });
  } else {
    const { password, ...dataExcludedPass } = user;
    req.session.user = { user_Id: user.user_Id, username: user.username };
    return res.json({ success: true, data: dataExcludedPass });
  }
});

export const checkSession = (req, res) => {
  // use this function to check if the user has a valid session yet is in the authentication page
  if (req.session?.user) {
    return res.json({ success: false, message: "Session Found" });
  } else {
    return res.json({ success: true, data: "No Valid Session" });
  }
};

export const checkValidSession = (req, res) => {
  // use this function to check if the user has a valid session yet is in the authentication page
  if (!req.session.user) {
    return res.json({ success: false, message: "No Valid Session" });
    // return res.redirect(`${process.env.CLIENT_BASE_URL}/auth`);
  } else {
    return res.json({ success: true, data: "Valid Session" });
  }
};
