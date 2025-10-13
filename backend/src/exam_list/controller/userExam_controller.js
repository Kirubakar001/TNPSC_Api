const userExamService = require("../service/userExam_service");

const getAllExamDetails = async (req, res) => {
  try {
    console.log("enter to exam");
    const details = await userExamService.getAllExamDetails();
    console.log(details);

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
