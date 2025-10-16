const adminSubjectService = require("../service/admin_question_service");

const insertUnit = async (req, res) => {
  try {
    const { exam_parts_id, title, cby } = req.body;
    if (!exam_parts_id || !title) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    let img = "";
    if (req.file) {
      img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const id = await adminSubjectService.insertUnit(
      exam_parts_id,
      title,
      img,
      cby
    );
    res.status(201).json({ success: true, message: "Unit added", id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const data = await adminSubjectService.getAllQuestions();
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllQuestions,
};
