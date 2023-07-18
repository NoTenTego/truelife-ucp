import { db } from "../connect.js";

export const getLogs = (req, res) => {
  const sourceType = req.body.keyWordType;
  const keyWord = req.body.keyWord;
  const logType = req.body.logType;
  const fromDate = req.body.formattedFromDate;
  const toDate = req.body.formattedToDate;
  const rowLimit = req.body.rowLimit;

  const sqlQuery =
    "SELECT * FROM mta_logi WHERE action = ? AND " +
    sourceType +
    " LIKE CONCAT('%', ?, '%') AND time BETWEEN ? AND ? ORDER BY id DESC LIMIT ?";

  db.query(
    sqlQuery,
    [logType, keyWord, fromDate, toDate, rowLimit],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
};
