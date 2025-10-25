const userExamService = require("../service/user_title_service");

const getAllTitle = async (req, res) => {
  try {
    let { unit_id } = req.body;

    if (!unit_id) {
      return res.status(200).json({
        message: "unit_id key Required",
      });
    }

    const details = await userExamService.getAllTitle(unit_id);

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
      message: "Title details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching title details:", error);
    res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = {
  getAllTitle,
};
