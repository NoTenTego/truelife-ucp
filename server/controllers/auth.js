import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import md5 from 'md5';

export const login = (req, res) => {
  const q = "SELECT * FROM konta WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json("Wystąpił błąd serwera.");
    }
    if (data.length === 0) {
      return res.status(404).json("Nie znaleziono użytkownika.");
    }
    
    const encryptionRule = data[0].salt;
    const encryptedPassword= md5(md5(req.body.password).toLowerCase() + encryptionRule).toLowerCase();

    if (encryptedPassword !== data[0].password) {
      return res.status(401)
        .clearCookie("accessToken", {
          secure: true,
          sameSite: "none"
        })
        .clearCookie("csrfToken", {
          secure: true,
          sameSite: "none",
        })
        .json("Nieprawidłowe dane uwierzytelniające.");
    }

    const token = jwt.sign({ id: data[0].id }, "secretkey");
    const csrfToken = jwt.sign({ id: data[0].id }, "csrfSecret");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        secure: true,
        sameSite: "none",
      })
      .cookie("csrfToken", csrfToken, {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  })
  .clearCookie("csrfToken", {
    secure: true,
    sameSite: "none",
  })

  .status(200)
  .json("User has been logged out.");
};