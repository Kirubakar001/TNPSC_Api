const db = require("../../db");

// ✅ Fetch all subjects
const getSubjects = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM exam_subjects");
    return rows;
  } catch (error) {
    throw new Error("Error fetching subjects: " + error.message);
  }
};

// ✅ Insert new subject
const insertSubject = async (exam_id, title, img) => {
  try {
    const [result] = await db.query(
      "INSERT INTO exam_subjects (exam_id, title, img, created_at, updated_at, cby, uby) VALUES (?, ?, ?, NOW(), NOW(), ?, ?)",
      [exam_id, title, img, "admin", "admin"]
    );

    const [newData] = await db.query("SELECT * FROM exam_subjects WHERE id = ?", [result.insertId]);
    return newData[0];
  } catch (error) {
    throw new Error("Error inserting subject: " + error.message);
  }
};

// ✅ Update existing subject
const updateSubject = async (id, title, img) => {
  try {
    const [result] = await db.query(
      "UPDATE exam_subjects SET title = ?, img = ?, update_at = NOW(), uby = ? WHERE id = ?",
      [title, img, "admin", id]
    );
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error updating subject: " + error.message);
  }
};

// ✅ Delete subject
const deleteSubject = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM exam_subjects WHERE id = ?", [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error deleting subject: " + error.message);
  }
};

module.exports = {
  getSubjects,
  insertSubject,
  updateSubject,
  deleteSubject,
};
