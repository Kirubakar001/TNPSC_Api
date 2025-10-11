const db = require("../db");



const addAdminUser = async (emp_id, password, admin_role, cby) => {
  const [result] = await db.query(
    `INSERT INTO admin (emp_id, password, admin_role, cby, uby) VALUES (?, ?, ?, ?, ?)`,
    [emp_id, password, admin_role, cby, cby]
  );
  return result;
};

const updateAdminUser = async (id, emp_id, password, admin_role, uby) => {
  const [result] = await db.query(
    `UPDATE admin 
     SET emp_id = ?, password = ?, admin_role = ?, uby = ? 
     WHERE id = ?`,
    [emp_id, password, admin_role, uby, id]
  );
  return result;
};

const deleteAdminUser = async (id) => {
  const [result] = await db.query(`DELETE FROM admin WHERE id = ?`, [id]);
  return result;
};



const checkadminUser = async (id) => {
  const [rows] = await db.query("SELECT * FROM admin WHERE emp_id = ?", [
    id,
  ]);
  return rows[0];  
};



module.exports = { checkadminUser, addAdminUser, updateAdminUser, deleteAdminUser };
