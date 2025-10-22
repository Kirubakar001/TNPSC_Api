const adminService = require("../service/admin_service");

const addAdmin = async (req, res) => {
  try {
    const { emp_id, name, password } = req.body;
    console.log("Request Body:", req.body);

    // 🧩 Validate required fields
    if (!emp_id || !name || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 🧠 Call the service (it handles duplicate check internally)
    const result = await adminService.addAdminUser(emp_id, name, password);

    // ✅ Return proper status and message
    if (!result.success) {
      return res.status(409).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(201).json({
      status: 200,

      message: result.message,
      success: true,
    });
  } catch (error) {
    console.error("Add admin error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
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
      status: 200,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Delete admin error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params; // e.g. /admin/update/:id
    const { emp_id, password, admin_role, uby } = req.body;

    // 1️⃣ Basic validation
    if (!id || !emp_id || !password || !admin_role || !uby) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2️⃣ Update admin record
    const result = await adminService.updateAdminUser(
      id,
      emp_id,
      password,
      admin_role,
      uby
    );

    // 3️⃣ Handle update result
    if (!result.success) {
      return res.status(404).json({
        error: result.message || "Admin not found or no changes made",
      });
    }

    // 4️⃣ Return success + updated data
    return res.status(200).json({
      status: 200,
      message: result.message,
      updatedAdmin: result.data,
    });
  } catch (error) {
    console.error("Update admin error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { emp_id, password } = req.body;

    if (!emp_id || !password) {
      return res.status(400).json({
        success: false,
        message: "emp_id and password are required",
        error: "emp_id and password are required",
      });
    }

    const allData = await adminService.checkadminUser(emp_id);

    if (!allData) {
      return res.status(400).json({
        status: 200,
        success: false,
        error: "User not found",
        message: "User not found",
      });
    }

    // Compare password directly (plain-text)
    if (password !== allData.password) {
      return res.status(401).json({
        //     status: 200,
        success: false,
        error: "Invalid password",
        message: "Invalid password",
      });
    }

    // ✅ Success
    return res.status(200).json({
      message: "Login successful",
      status: 200,
      data: {
        success: true,
        emp_id: allData.emp_id,
        name: allData.name,
        role: allData.admin_role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: "Internal Server Error",
      data: {},
    });
  }
};

module.exports = { loginAdmin, addAdmin, updateAdmin, deleteAdmin };
