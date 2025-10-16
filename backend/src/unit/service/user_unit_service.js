const db = require("../../db");

const getAllUnit = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id,exam_parts_id,title, img FROM units"
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching unit details: " + error.message);
  }
};

module.exports = {
  getAllUnit,
};
