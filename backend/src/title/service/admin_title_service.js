const db = require("../../db");

// Get All Titles
const getAllTitles = async () => {
  const [rows] = await db.query("SELECT * FROM title ORDER BY created_at DESC");
  return rows;
};

// Create Title
const insertTitle = async (exam_parts_id,units_id, title, img, cby) => {
  const [result] = await db.query(
    "INSERT INTO title (exam_parts_id, units_id, title, img, cby) VALUES (?, ?, ?, ?, ?)",
    [exam_parts_id, units_id, title, img, cby]
  );
  return result;
};

// Update Title
const updateTitle = async (id, title, img, uby) => {
  const [result] = await db.query(
    "UPDATE title SET title = ?, img = ?, uby = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [title, img, uby, id]
  );
  return result.affectedRows;
};

// Delete Title
const deleteTitle = async (id) => {
  const [result] = await db.query("DELETE FROM title WHERE id = ?", [id]);
  return result.affectedRows;
};

module.exports = {
  insertTitle,
  getAllTitles,
  updateTitle,
  deleteTitle,
};
