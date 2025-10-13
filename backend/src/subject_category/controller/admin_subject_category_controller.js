const adminSubjectService = require("../service/admin_subject_category_service");


const insertSubject = async (req, res) => {
  try {
    const { exam_subjects_id, title, cby } = req.body;
    if (!exam_subjects_id || !title) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    let img = "";
    if (req.file) {
      img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const id = await adminSubjectService.insertSubjectcat(exam_subjects_id, title, img, cby);
    res.status(201).json({ success: true, message: "Subject added", id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const data = await adminSubjectService.getAllSubjectcat();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { id, title, uby, img_url } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID required" });
    }

    let img = img_url;
    if (req.file) {
      img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updated = await adminSubjectService.updateSubjectcat(id, title, img, uby);
    res.status(200).json({ success: true, message: "Updated successfully", updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "ID required" });

    const deleted = await adminSubjectService.deleteSubjectcat(id);
    res.status(200).json({ success: true, message: "Deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  insertSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
};