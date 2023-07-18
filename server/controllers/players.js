import { db } from "../connect.js";

export const getPlayers = (req, res) => {
  const sqlQuery = `SELECT * FROM postacie`;

  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

export const updatePlayerValue = (req, res) => {
  const id = req.body.characterId;
  const columnName = req.body.columnId;
  const newValue = req.body.value;

  const sqlQuery = `UPDATE postacie SET ${columnName}=? WHERE id=?`;

  db.query(sqlQuery, [newValue, id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};
