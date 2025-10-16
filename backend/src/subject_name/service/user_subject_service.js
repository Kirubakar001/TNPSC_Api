const db = require("../../db");

const getAllSubjectDetails = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id,exam_id,title, img FROM exam_subjects"
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching subject details: " + error.message);
  }
};

module.exports = {
  getAllSubjectDetails,
};
