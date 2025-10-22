const db = require("../../db");

const getExamDetails = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM exam");
    return rows;
  } catch (error) {
    throw new Error("Error fetching exam details: " + error.message);
  }
};

const insertExamDetails = async (title, sub_title, img) => {
  try {
    const [result] = await db.query(
      "INSERT INTO exam (title, sub_title, img, created_at, updated_at, cby, uby) VALUES (?, ?, ?, NOW(), NOW(), ?, ?)",
      [title, sub_title, img, "admin", "admin"] // You can set actual user if needed
    );

    // Get inserted record details using insertId
    const [newExam] = await db.query("SELECT * FROM exam WHERE id = ?", [
      result.insertId,
    ]);

    return newExam;
  } catch (error) {
    throw new Error("Error inserting exam details: " + error.message);
  }
};

const updateExamDetails = async (id, title, sub_title, img) => {
  const [result] = await db.query(
    `UPDATE exam 
     SET title = ?, sub_title = ?, img = ?, updated_at = NOW(), uby = 'admin' 
     WHERE id = ?`,
    [title, sub_title, img, id]
  );

  if (result.affectedRows === 0) return null;

  // return updated row
  const [rows] = await db.query(`SELECT * FROM exam WHERE id = ?`, [id]);
  return rows[0];
};

const deleteExamDetails = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM exam WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new Error("Exam not found");
    }

    return { message: "Exam deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting exam details: " + error.message);
  }
};

module.exports = {
  getExamDetails,
  insertExamDetails,
  updateExamDetails,
  deleteExamDetails,
};
