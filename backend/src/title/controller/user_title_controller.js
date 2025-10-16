const userExamService = require("../service/user_title_service");

const getAllTitle = async (req, res) => {
  try {
    
    const details = await userExamService.getAllTitle();

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
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};

module.exports = {
  getAllTitle,
};
