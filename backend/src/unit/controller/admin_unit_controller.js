const adminSubjectService = require("../service/admin_unit_service");

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

const getAllUnits = async (req, res) => {
  try {
    const data = await adminSubjectService.getAllUnit();
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUnit = async (req, res) => {
  try {
    const { id, title, uby, img_url } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID required" });
    }

    let img = img_url;
    if (req.file) {
      img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updated = await adminSubjectService.updateUnit(id, title, img, uby);
    res
      .status(200)
      .json({ success: true, message: "Updated successfully", updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUnit = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.status(400).json({ success: false, message: "ID required" });

    const deleted = await adminSubjectService.deleteUnit(id);
    res
      .status(200)
      .json({ success: true, message: "Deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  insertUnit,
  getAllUnits,
  updateUnit,
  deleteUnit,
};
