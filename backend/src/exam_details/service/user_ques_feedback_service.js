const db = require("../../db");

const addFeedback = async (userId, ques_id, type, feedback) => {
  try {
    const [rows] = await db.query(
      "INSERT INTO question_feedback (user_id, ques_id, type,feedback) VALUES (?, ?,?,?)",
      [userId, ques_id, type, feedback]
    );

    if (rows.affectedRows === 0) return null;

    return rows;
  } catch (error) {
    throw new Error("Error Feedback: " + error.message);
  }
};

module.exports = {
  addFeedback,
};
