const db = require("../db");

const addAdminUser = async (emp_id, name, password) => {
  const [existing] = await db.query(
    `SELECT id, emp_id, name, admin_role FROM admin WHERE emp_id = ?`,
    [emp_id]
  );

  if (existing.length > 0) {
    // 2️⃣ emp_id already exists → return existing data
    return {
      success: false,
      message: "Employee already exists",
      data: existing[0],
    };
  }

  const [result] = await db.query(
    `INSERT INTO admin (emp_id, name, password, admin_role, cby, uby, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
    [emp_id, name, password, "admin", name, "kirubakar"]
  );

  // ✅ After insertion, fetch the inserted row details
  const [rows] = await db.query(
    `SELECT id, emp_id, name, admin_role, cby, created_at 
     FROM admin WHERE id = ?`,
    [result.insertId]
  );
  return {
    success: true,
    message: "Admin added successfully",
    data: rows[0],
  };
};

const updateAdminUser = async (id, emp_id, password, admin_role, uby) => {
  // 🧩 1️⃣ Run the update
  const [result] = await db.query(
    `UPDATE admin 
     SET emp_id = ?, password = ?, admin_role = ?, uby = ?, updated_at = NOW()
     WHERE id = ?`,
    [emp_id, password, admin_role, uby, id]
  );

  // ❌ If no rows affected → invalid id or no change
  if (result.affectedRows === 0) {
    return {
      success: false,
      message: "No record updated. Invalid ID or no change detected.",
      data: null,
    };
  }

  // 🧠 2️⃣ Fetch updated data
  const [rows] = await db.query(
    `SELECT id, emp_id, name, admin_role, cby, uby, updated_at 
     FROM admin WHERE id = ?`,
    [id]
  );

  return {
    success: true,
    message: "Admin updated successfully",
    data: rows[0],
  };
};


const deleteAdminUser = async (id) => {
  const [result] = await db.query(`DELETE FROM admin WHERE id = ?`, [id]);
  return result;
};

const checkadminUser = async (id) => {
  const [rows] = await db.query("SELECT * FROM admin WHERE emp_id = ?", [id]);
  return rows[0];
};

module.exports = {
  checkadminUser,
  addAdminUser,
  updateAdminUser,
  deleteAdminUser,
};
