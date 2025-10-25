const userExamService = require("../service/user_question_service");

const getAllQuestions = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        status: "failure",

        message: "All feilds are required",
      });
    }
    const details = await userExamService.getAllQuestions(user_id);

    if (!details || details.length === 0) {
      return res.status(200).json({
        status: "success",
        data: [],
        message: "No question details found",
      });
    }

    res.status(200).json({
      status: "success",
      data: details,
      message: "Question details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching question details:", error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};

module.exports = {
  getAllQuestions,
};
