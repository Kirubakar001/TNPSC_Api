const db = require("../../db");

const getAllUnit = async (partId) => {
  try {
    const [rows] = await db.query(
      "SELECT id,exam_parts_id,title, img FROM units where exam_parts_id = ?",
      [partId]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching unit details: " + error.message);
  }
};

module.exports = {
  getAllUnit,
};
