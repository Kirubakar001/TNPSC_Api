const adminSubjectService = require("../service/admin_subject_service");

// 📤 Get all subjects
const getAllSubjects = async (req, res) => {
  try {
    const data = await adminSubjectService.getSubjects();
    if (!data || data.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No exam details found",
      });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 📥 Insert new subject
const insertSubject = async (req, res) => {
  try {
    const { exam_id, title } = req.body;
    if (!title || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Exam ID, Title, and Image are required",
      });
    }

    const BASE_URL = "https://9ml67kp8-8000.inc1.devtunnels.ms";

    const imgUrl = `${BASE_URL}/uploads/${req.file.filename}`;

    const data = await adminSubjectService.insertSubject("1", title, imgUrl);
    res
      .status(201)
      .json({ success: true, data, message: "Subject added successfully" });
  } catch (error) {
    console.error("Error inserting subject:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✏️ Update subject
const updateSubject = async (req, res) => {
  try {
    const { id, title, img } = req.body;

    let imgUrl = img;
    if (req.file) {
      imgUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    const success = await adminSubjectService.updateSubject(id, title, imgUrl);
    if (!success)
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });

    res
      .status(200)
      .json({ success: true, message: "Subject updated successfully" });
  } catch (error) {
    console.error("Error updating subject:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🗑️ Delete subject
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.body;
    const success = await adminSubjectService.deleteSubject(id);
    if (!success)
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });

    res
      .status(200)
      .json({ success: true, message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllSubjects,
  insertSubject,
  updateSubject,
  deleteSubject,
};
