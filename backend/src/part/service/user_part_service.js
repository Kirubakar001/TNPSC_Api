const db = require("../../db");

const getAllParts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id,exam_id,title, img FROM exam_parts"
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching part details: " + error.message);
  }
};

module.exports = {
  getAllParts,
};
