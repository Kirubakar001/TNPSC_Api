const db = require("../../db");

// Get All Subjects
const getAllSubjectcat = async () => {
  const [rows] = await db.query(
    "SELECT * FROM subject_category ORDER BY created_at DESC"
  );
  return rows;
};


// Create Subject
const insertSubjectcat = async (exam_subjects_id, title, img, cby) => {
  const [result] = await db.query(
    "INSERT INTO subject_category (exam_subjects_id, title, img, cby) VALUES (?, ?, ?, ?)",
    [exam_subjects_id, title, img, cby]
  );
  return result.insertId;
};


// Update Subject
const updateSubjectcat = async (id, title, img, uby) => {
  const [result] = await db.query(
    "UPDATE subject_category SET title = ?, img = ?, uby = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [title, img, uby, id]
  );
  return result.affectedRows;
};

// Delete Subject
const deleteSubjectcat = async (id) => {
  const [result] = await db.query("DELETE FROM subject_category WHERE id = ?", [id]);
  return result.affectedRows;
};

module.exports = {
  insertSubjectcat,
  getAllSubjectcat,
  updateSubjectcat,
  deleteSubjectcat,
};

 
