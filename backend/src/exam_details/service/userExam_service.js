const db = require("../../db");

const bookMarkAdd = async (userId, ques_id) => {
  try {
    const [rows] = await db.query(
      "INSERT INTO bookmark (user_id, ques_id, created_date) VALUES (?, ?, NOW())",
      [userId, ques_id]
    );

    return rows;
  } catch (error) {
    throw new Error("Error adding bookmark: " + error.message);
  }
};

const bookMarkRemove = async (userId, ques_id) => {
  try {
    confirm = await db.query(
      "SELECT * FROM bookmark WHERE user_id = ? AND ques_id = ?",
      [userId, ques_id]
    );
    const [result] = await db.query(
      "DELETE FROM bookmark WHERE user_id = ? AND ques_id = ?",
      [userId, ques_id]
    );
    console.log("Delete bookmark result:", result);
    return result;
  } catch (error) {
    throw new Error("Error removing bookmark: " + error.message);
  }
};

module.exports = {
  bookMarkAdd,
  bookMarkRemove,
};
