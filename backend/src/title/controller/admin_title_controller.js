const adminSubjectService = require("../service/admin_title_service");

const insertTitle = async (req, res) => {
  try {
    const { exam_parts_id, units_id, title, cby } = req.body;
    if (!exam_parts_id || !units_id || !title) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    let img = "";
    if (req.file) {
      img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const id = await adminSubjectService.insertTitle(
      exam_parts_id,
      units_id,
      title,
      img,
      cby
    );
    res.status(201).json({ success: true, message: "Title added", data: id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTitles = async (req, res) => {
  try {
    const data = await adminSubjectService.getAllTitle();
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTitle = async (req, res) => {
  try {
    const { id, title, uby, img_url } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID required" });
    }

    let img = img_url;
    if (req.file) {
      img = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const updated = await adminSubjectService.updateTitle(id, title, img, uby);
    res
      .status(200)
      .json({ success: true, message: "Updated successfully", updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTitle = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.status(400).json({ success: false, message: "ID required" });

    const deleted = await adminSubjectService.deleteTitle(id);
    res
      .status(200)
      .json({ success: true, message: "Deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  insertTitle,
  getAllTitles,
  updateTitle,
  deleteTitle,
};
