const userExamService = require("../service/user_unit_service");

const getAllUnit = async (req, res) => {
  try {
    let { part_id } = req.body;
    if (!part_id) {
      return res
        .status(400)
        .json({ status: "failure", message: "part_id key Required" });
    }

    const details = await userExamService.getAllUnit(part_id);

    if (!details || details.length === 0) {
      return res.status(200).json({
        status: "success",
        data: [],
        message: "No unit details found",
      });
    }

    res.status(200).json({
      status: "success",
      data: details,
      message: "Unit details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching unit details:", error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUnit,
};
