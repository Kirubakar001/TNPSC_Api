const adminSubjectService = require("../service/admin_title_service");

const adminUnitService = require("../../unit/service/admin_unit_service");

const getAllTitles = async (req, res) => {
  try {
    let { unit_id } = req.body || {};
    const unitId = parseInt(unit_id ?? 0, 10);

    let data = [];
    let unitData = [];

    if (unitId !== 0) {
      data = await adminSubjectService.getById(unitId);
    } else {
      [data, unitData] = await Promise.all([
        adminSubjectService.getAllTitles(),
        adminUnitService.getAllUnits(),
      ]);
    }

    if (!data || data.length === 0) {
      return res
        .status(204)
        .json({ status: 204, success: false, message: "No titles found" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: data,
      unitData: unitData,
      message: "Titles fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const insertTitle = async (req, res) => {
  try {
    const { unit_id, title, cby } = req.body;
    if (!unit_id || !title) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const data = await adminSubjectService.insertTitle(unit_id, title, cby);
    res
      .status(201)
      .json({ status: 200, success: true, message: "Title added", data: data });
  } catch (error) {
    console.log("error insert title ", error);

    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTitle = async (req, res) => {
  try {
    const { id, title, uby, unit_id } = req.body;
    console.log("update data ", req.body);
    if (!id) {
      return res.status(400).json({ success: false, message: "ID required" });
    }
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title required" });
    }

    const updated = await adminSubjectService.updateTitle(
      id,
      title,
      uby,
      unit_id
    );
    if (!updated) {
      return res
        .status(400)
        .json({ success: false, message: "Data Not Updatad" });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    console.log("error update title ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTitle = async (req, res) => {
  try {
    const { id, user_id } = req.body;
    if (!id)
      return res.status(400).json({ success: false, message: "ID required" });

    const deleted = await adminSubjectService.deleteTitle(id, user_id);
    res
      .status(200)
      .json({ status: 200, success: true, message: "Deleted successfully" });
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
