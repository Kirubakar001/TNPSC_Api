const db = require("../../db");

// ✅ Fetch all parts
const getParts = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM exam_parts");
    return rows;
  } catch (error) {
    throw new Error("Error fetching subjects: " + error.message);
  }
};

// ✅ Insert new part
const insertPart = async (exam_id, title, img) => {
  try {
    const [result] = await db.query(
      "INSERT INTO exam_parts (exam_id, title, img, created_at, updated_at, cby, uby) VALUES (?, ?, ?, NOW(), NOW(), ?, ?)",
      [exam_id, title, img, "admin", "admin"]
    );

    const [newData] = await db.query("SELECT * FROM exam_parts WHERE id = ?", [
      result.insertId,
    ]);
    return newData ;
  } catch (error) {
    throw new Error("Error inserting part: " + error.message);
  }
};

// ✅ Update existing part
const updatePart = async (id, title, img) => {
  console.log("service update", id);

  try {
    const [result] = await db.query(
      "UPDATE exam_parts SET title = ?, img = ?, updated_at = NOW(), uby = ? WHERE id = ?",
      [title, img, "admin", id]
    );
    
    // return updated row
    const [rows] = await db.query(`SELECT * FROM exam WHERE id = ?`, [id]);
    console.log("result update", rows);
    return rows;

    // return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error updating part: " + error.message);
  }
};

// ✅ Delete part
const deletePart = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM exam_parts WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error deleting part: " + error.message);
  }
};

module.exports = {
  getParts,
  insertPart,
  updatePart,
  deletePart,
};
