const db = require("../../db");

const getAllTitle = async (unitId) => {
  try {
    const [rows] = await db.query(
      "SELECT id,unit_id,ques_count,title FROM title where unit_id = ?",
      [unitId]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching title details: " + error.message);
  }
};

module.exports = {
  getAllTitle,
};
