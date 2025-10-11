const adminService = require("../service/admin_service");


const addAdmin = async (req, res) => {
  try {
    const { emp_id, password, admin_role, cby } = req.body;

    // Validate required fields
    if (!emp_id || !password || !admin_role || !cby) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert into database
    const result = await adminService.addAdminUser(emp_id, password, admin_role, cby);

  // ✅ Check if any row was inserted
    if (result.affectedRows === 0) {
      return res.status(400).json({ error: "Failed to add admin" });
    }

    return res.status(201).json({
      message: "Admin added successfully",
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Add admin error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params; // example: /admin/delete/:id

    if (!id) {
      return res.status(400).json({ error: "Admin ID is required" });
    }

    const result = await adminService.deleteAdminUser(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    return res.status(200).json({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Delete admin error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params; // example: /admin/update/:id
    const { emp_id, password, admin_role, uby } = req.body;

    if (!id || !emp_id || !password || !admin_role || !uby) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await adminService.updateAdminUser(id, emp_id, password, admin_role, uby);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Admin not found or no changes made" });
    }

    return res.status(200).json({
      message: "Admin updated successfully",
    });
  } catch (error) {
    console.error("Update admin error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};





const loginAdmin = async (req, res) => {
  try {
    const { emp_id, password } = req.body;

    if (!emp_id || !password) {
      return res
        .status(400)
        .json({ error: "emp_id and password are required" });
    }

    const allData = await adminService.checkadminUser(emp_id);

    if (!allData) {
      return res.status(404).json({ error: "User not found", message: "User not found", data: {} });
    }

    // Compare password directly (plain-text)
    if (password !== allData.password) {
      return res.status(401).json({ msg: "Invalid password", message: "Invalid password", data: {} });
    }

    // ✅ Success
    return res.status(200).json({
      message: "Login successful",
      data: {
        emp_id: allData.emp_id,
        name: allData.name,
        role: allData.admin_role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error", message: "Internal Server Error", data: {} });
  }
};

module.exports = { loginAdmin, addAdmin, updateAdmin, deleteAdmin };
