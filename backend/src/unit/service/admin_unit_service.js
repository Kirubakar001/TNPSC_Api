const db = require("../../db");

// Get All Units
const getAllUnits = async () => {
  const [rows] = await db.query(`
  SELECT * FROM units where active  = 1;`);

  return rows;
};

const getPartsById = async (partId) => {
  const [rows] = await db.query(
    `
  SELECT * 
  FROM units 
  WHERE exam_parts_id = ? AND active = 1
  `,
    [partId]
  );

  return rows;
};

// Create Unit
const insertUnit = async (exam_parts_id, title, cby) => {
  const [result] = await db.query(
    "INSERT INTO units (exam_parts_id, title,   cby) VALUES (?, ?, ?)",
    [exam_parts_id, title, cby]
  );

  const [newUnit] = await db.query("SELECT * FROM units WHERE id = ?", [
    result.insertId,
  ]);

  return newUnit[0];
};

// Update Unit
const updateUnit = async (id, title, user_id, partId) => {
  const [result] = await db.query(
    "UPDATE units SET title = ?,   uby = ?,exam_parts_id =?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [title, user_id, partId, id]
  );
  if (result.affectedRows === 0) return null;
  const [rows] = await db.query(`SELECT * FROM units WHERE id = ?`, [id]);

  return rows[0];
};

// Delete Unit
const deleteUnit = async (id, user_id) => {
  /*  const [result] = await db.query(
    "DELETE FROM units WHERE id = ? AND exam_parts_id = ?",
    [id, exam_parts_id]
  ); */

  const [result] = await db.query(
    `UPDATE units
   SET active = 0,
       uby = ?,
       updated_at = CURRENT_TIMESTAMP
   WHERE id = ?`,
    [user_id, id]
  );

  if (result.affectedRows === 0) return null;
  return { message: "Unit deleted successfully" };
};

module.exports = {
  insertUnit,
  getAllUnits,
  updateUnit,
  deleteUnit,
  getPartsById,
};
