const db = require("../../db");

const getAllFeedbackMaster = async (userId, ques_id) => {
  try {
    const [rows] = await db.query("SELECT * FROM question_feedback_master ORDER BY `position` ASC");

    return rows;
  } catch (error) {
    throw new Error("Error adding bookmark: " + error.message);
  }
};

module.exports = {
  getAllFeedbackMaster,
};
