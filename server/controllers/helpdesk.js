import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getMyTopics = (req, res) => {
  const userId = req.body[0];
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (userId == "undefined") {
      return res.status(401).json("Not logged in!");
    }

    const q = `SELECT helpdesk_topics.*, konta.username FROM helpdesk_topics, konta WHERE helpdesk_topics.owner=? AND konta.id=helpdesk_topics.admin AND helpdesk_topics.status < 3`;

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const createNewReport = (req, res) => {
  const userId = req.body.userId;
  const category = req.body.category;
  const title = req.body.title;
  const description = req.body.description;

  const q = `INSERT INTO helpdesk_topics SET category=?, title=?, status=1, owner=?, admin=29, description=?`;

  db.query(q, [category, title, userId, description], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Pomyślnie stworzono zgłoszenie.");
  });
};

export const getTopicData = (req, res) => {
  const user = req.body.user;
  const topicId = req.body.id;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (user.id === undefined) {
      return res.status(401).json("Not logged in!");
    }

    let q, input;

    if (user.admin > 0) {
      input = [topicId];
      q = `SELECT helpdesk_topics.*, owner.username AS owner_username, commentor.admin AS commentor_admin, commentor.supporter AS commentor_supporter, comments.id AS comment_id, comments.content, comments.created, commentor.username AS commentor_username FROM helpdesk_topics INNER JOIN konta AS owner ON owner.id = helpdesk_topics.owner LEFT JOIN helpdesk_comments AS comments ON comments.ticket_id = helpdesk_topics.id LEFT JOIN konta AS commentor ON commentor.id = comments.commentor WHERE helpdesk_topics.id = ?`;
    } else {
      input = [user.id, topicId];
      q = `SELECT helpdesk_topics.*, owner.username AS owner_username, comments.id AS comment_id, comments.content, comments.created, commentor.username AS commentor_username, commentor.admin AS commentor_admin, commentor.supporter, owner.admin AS owner_admin FROM helpdesk_topics INNER JOIN konta AS owner ON owner.id = helpdesk_topics.owner LEFT JOIN helpdesk_comments AS comments ON comments.ticket_id = helpdesk_topics.id LEFT JOIN konta AS commentor ON commentor.id = comments.commentor WHERE helpdesk_topics.owner = ? AND helpdesk_topics.id = ?`;
    }

    db.query(q, input, (err, data) => {
      if (err) return res.status(500).json(err);

      const topicData = data.reduce((acc, row) => {
        const {
          id,
          category,
          title,
          status,
          owner,
          admin,
          description,
          data,
          owner_username,
        } = row;
        acc.push({
          id,
          category,
          title,
          status,
          owner,
          admin,
          description,
          data,
          username: owner_username,
        });
        return acc;
      }, []);

      const commentsData = data.reduce((acc, row) => {
        const { comment_id, content, created, commentor_username, commentor_admin, commentor_supporter } = row;
        if (comment_id) {
          acc.push({
            id: comment_id,
            content: decodeURIComponent(content),
            created,
            username: commentor_username,
            admin: commentor_admin,
            supporter: commentor_supporter,
          });
        }
        return acc;
      }, []);

      return res.status(200).json({
        topicData: topicData[0],
        comments: commentsData,
      });
    });
  });
};


export const createNewComment = (req, res) => {
  const userId = req.body.userId;
  const ticketId = req.body.id;
  const content = encodeURIComponent(req.body.content);

  const q = `INSERT INTO helpdesk_comments SET ticket_id=?, content=?, commentor=?`;

  db.query(q, [ticketId, content, userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Pomyślnie dodano komentarz.");
  });
};

export const getAllReports = (req, res) => {
  const q = `SELECT helpdesk_topics.*, konta.username FROM helpdesk_topics, konta WHERE helpdesk_topics.owner=konta.id AND helpdesk_topics.status < 3`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const changeTopicStatus = (req, res) => {
  const topicId = req.body.topicId;
  const status = req.body.status;

  const q = `UPDATE helpdesk_topics SET status=? WHERE id=?`;

  db.query(q, [status, topicId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Pomyślnie zaktualizowano status zgłoszenia.");
  });
};

export const deleteTopic = (req, res) => {
  const topicId = req.body.topicId;

  const q = `UPDATE helpdesk_topics SET status=3 WHERE id=?`;

  db.query(q, [topicId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Pomyślnie usunięto zgłoszenie.");
  });
};