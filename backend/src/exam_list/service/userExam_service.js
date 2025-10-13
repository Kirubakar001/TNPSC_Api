const db = require("../../db");

const getAllExamDetails = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id,title,sub_title,img FROM exam_categories"
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching exam details: " + error.message);
  }
};

module.exports = {
  getAllExamDetails,
};
