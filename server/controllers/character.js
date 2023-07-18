import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getCharacters = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (userId == "undefined") {
      return res.status(401).json("Not logged in!");
    }

    const q = `SELECT * FROM postacie WHERE account=?`;

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const getVehicles = (req, res) => {
  const characterId = req.query.characterId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT pojazdy.id, pojazdy.plate, pojazdy.odometer, pojazdy_shop.vehbrand, pojazdy_shop.vehmodel FROM pojazdy INNER JOIN pojazdy_shop ON pojazdy.vehicle_shop_id = pojazdy_shop.id WHERE owner=?`;

    db.query(q, [characterId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};