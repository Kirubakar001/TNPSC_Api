const adminSubjectService = require("../service/admin_part_service");

// 📤 Get all parts
const getAllParts = async (req, res) => {
  try {
    const data = await adminSubjectService.getParts();
    console.log(data);
    if (!data || data.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No exam details found",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching parts:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 📥 Insert new part
const insertPart = async (req, res) => {
  try {
    const { exam_id, title } = req.body;
    console.log("request", req.body);

    if (!exam_id || !title || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Exam ID, Title, and Image are required",
      });
    }

    const BASE_URL = "https://9ml67kp8-8000.inc1.devtunnels.ms";

    const imgUrl = `${BASE_URL}/uploads/${req.file.filename}`;

    const data = await adminSubjectService.insertPart("1", title, imgUrl);
    res.status(201).json({
      status: 200,
      success: true,
      data,
      message: "Part added successfully",
    });
  } catch (error) {
    console.error("Error inserting part:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✏️ Update part
const updatePart = async (req, res) => {
  try {
    const { id, title, img } = req.body;
    console.log("update req body", req.body);

    let imgUrl = img;
    if (req.file) {
      const BASE_URL = "https://9ml67kp8-8000.inc1.devtunnels.ms";

      imgUrl = `${BASE_URL}/uploads/${req.file.filename}`;
    }

    const updatedPart = await adminSubjectService.updatePart(id, title, imgUrl);
    if (!updatedPart)
      return res
        .status(404)
        .json({ success: false, message: "Part not found" });

    res.status(200).json({
      status: 200,
      success: true,
      data: updatedPart,
      message: "Part updated successfully",
    });
  } catch (error) {
    console.error("Error updating part:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// 🗑️ Delete part
const deletePart = async (req, res) => {
  try {
    const { id } = req.body;
    const success = await adminSubjectService.deletePart(id);
    if (!success)
      return res
        .status(404)
        .json({ success: false, message: "Part not found" });

    res.status(200).json({
      status: 200,
      success: true,
      message: "Part deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting part:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllParts,
  insertPart,
  updatePart,
  deletePart,
};
