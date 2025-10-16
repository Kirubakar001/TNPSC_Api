const db = require("../../db");

// Get All Units
const getAllUnits  = async () => {
  const [rows] = await db.query(
    "SELECT * FROM units ORDER BY created_at DESC"
  );
  return rows;
};


// Create Unit
const insertUnit = async (exam_parts_id, title, img, cby) => {
  const [result] = await db.query(
    "INSERT INTO units (exam_parts_id, title, img, cby) VALUES (?, ?, ?, ?)",
    [exam_parts_id, title, img, cby]
  );
  return result.insertId;
};


// Update Unit
const updateUnit = async (id, title, img, uby) => {
  const [result] = await db.query(
    "UPDATE units SET title = ?, img = ?, uby = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [title, img, uby, id]
  );
  return result.affectedRows;
};

// Delete Unit
const deleteUnit = async (id) => {
  const [result] = await db.query("DELETE FROM units WHERE id = ?", [id]);
  return result.affectedRows;
};

module.exports = {
  insertUnit,
  getAllUnits,
  updateUnit,
  deleteUnit,
};

 
