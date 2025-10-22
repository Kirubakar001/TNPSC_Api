const db = require("../../db");

// Get All Titles
const getAllTitles = async () => {
  const [rows] = await db.query("SELECT * FROM title where active = 1");
  return rows;
};

const getById = async (unitId) => {
  const [rows] = await db.query(
    "SELECT * FROM title where unit_id = ? AND active = 1",
    [unitId]
  );
  return rows;
};

// Create Title
const insertTitle = async (unitId, title, cby) => {
  const [result] = await db.query(
    "INSERT INTO title ( unit_id, title,  cby) VALUES ( ?, ?, ?)",
    [unitId, title, cby]
  );

  const [rows] = await db.query("SELECT * FROM title WHERE id = ?", [
    result.insertId,
  ]);

  return rows[0];
};

// Update Title
const updateTitle = async (id, title, uby, unit_id) => {
  const [result] = await db.query(
    "UPDATE title SET title = ?,  uby = ?, updated_at = CURRENT_TIMESTAMP, unit_id =? WHERE id = ?",
    [title, uby, unit_id, id]
  );

  if (result.affectedRows === 0) return null;

  const [rows] = await db.query("SELECT * FROM title WHERE id = ?", [id]);
  return rows[0];
};

// Delete Title
const deleteTitle = async (id,uby) => {
  //const [result] = await db.query("DELETE FROM title WHERE id = ?", [id]);

  const [result] = await db.query(
    "UPDATE title SET active = 0,   uby = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [uby, id]
  );

  if (result.affectedRows === 0) return null;
  return result.affectedRows;
};

module.exports = {
  insertTitle,
  getAllTitles,
  updateTitle,
  deleteTitle,
  getById,
};
