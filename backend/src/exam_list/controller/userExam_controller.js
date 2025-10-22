const userExamService = require("../service/userExam_service");

const getAllExamDetails = async (req, res) => {
  try {
    const userId = "11";

    if (!userId) {
      return res.status(400).json({
        status: "false",
        data: [],
        message: "User Id is Missing",
      });
    }
    const details = await userExamService.getAllExamDetails(userId);
    if (!details || details.length === 0) {
      return res.status(200).json({
        status: "success",
        data: [],
        message: "No exam details found",
      });
    }

    res.status(200).json({
      status: "success",
      data: details,
      message: "Exam details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching exam details:", error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};

module.exports = {
  getAllExamDetails,
};
