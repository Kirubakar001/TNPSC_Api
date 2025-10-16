const db = require("../../db");

// Get All Questions
const getAllQuestions = async () => {
  const [rows] = await db.query(
    "SELECT * FROM questions ORDER BY created_at DESC"
  );
  return rows;
};

module.exports = {
  getAllQuestions,
};
