import { db } from "../connect.js"; // named export dont forget the {}
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //Check if user exists
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    // if the name is already taken
    if (data.length > 0)
      return res.status(409).json({ error: "Username already exists" });
    //Create user
    //hash password
    const salt = bcrypt.genSaltSync(10); // the method of hashing just know it
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUES (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "User created" });
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    if (data.length === 0)
      return res.status(404).json({ error: "User not found" });

    // compare the password in database with the password in the request
    const checkPassowrd = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassowrd)
      return res.status(401).json({ error: "Wrong password" });

    const token = jwt.sign({ id: data[0].id }, "secretkey"); // will send back to the server and then you can show the id of the user

    // to not send the password to the client
    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, { httpOnly: true }) // to send the token to the client
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json({ message: "Logout" });
};
