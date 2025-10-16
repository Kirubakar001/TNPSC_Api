const db = require("../../db");

const getAllTitle = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id,exam_parts_id,units_id,ques_count,title FROM title"
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching title details: " + error.message);
  }
};

module.exports = {
  getAllTitle,
};
