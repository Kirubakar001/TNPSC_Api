const adminSubjectService = require("../service/admin_unit_service");
const adminExamService = require("../../part/service/admin_part_service");

const getAllUnits = async (req, res) => {
  try {
    let { part_id } = req.body || {};
    const partId = parseInt(part_id ?? 0, 10);

    let data = [];
    let partData = [];

    if (partId !== 0) {
      data = await adminSubjectService.getPartsById(partId);
    } else {
      [data, partData] = await Promise.all([
        adminSubjectService.getAllUnits(),
        adminExamService.getParts(),
      ]);
    }

    if (!data || data.length === 0) {
      return res
        .status(204)
        .json({ status: 204, success: false, message: "No units found" });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: data,
      partData: partData,
      message: "Units fetched successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 204, success: false, message: error.message });
  }
};

const insertUnit = async (req, res) => {
  try {
    console.log("insert unit called ", req.body);
    let { part_id, title, user_id } = req.body;
    if (!part_id || !title) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const id = await adminSubjectService.insertUnit(part_id, title, user_id);
    res
      .status(201)
      .json({ success: true, status: 200, message: "Unit added", data: id });
  } catch (error) {
    console.log("error unit add ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUnit = async (req, res) => {
  try {
    console.log("update unit called");
    const { id, title, user_id, part_id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: "ID required" });
    }

    const updated = await adminSubjectService.updateUnit(
      id,
      title,
      user_id,
      part_id
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: "Updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUnit = async (req, res) => {
  try {
    const { id, user_id } = req.body;
    if (!id)
      return res.status(400).json({ success: false, message: "ID required" });

    const deleted = await adminSubjectService.deleteUnit(id, user_id);
    res.status(200).json({
      success: true,
      status: 200,
      message: "Deleted successfully",
      deleted,
    });
  } catch (error) {
    console.log("errror on delete ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  insertUnit,
  getAllUnits,
  updateUnit,
  deleteUnit,
};
