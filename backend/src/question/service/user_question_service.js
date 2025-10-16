const db = require("../../db");

const getAllQuestions = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id,exam_parts_id,unit_id,title_id,ques,option_1,option_2,option_3,option_4,answer,position FROM questions"
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching question details: " + error.message);
  }
};

module.exports = {
  getAllQuestions,
};
