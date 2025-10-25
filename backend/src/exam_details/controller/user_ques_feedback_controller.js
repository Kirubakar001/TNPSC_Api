const userBookMarkService = require("../service/user_ques_feedback_service");

const questionFeedBack = async (req, res) => {
  try {
    const { user_id, ques_id, type, feedback } = req.body;
    if (!user_id || !ques_id || !type || !feedback) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const allData = await userBookMarkService.addFeedback(
      user_id,
      ques_id,
      type,
      feedback
    );

    if (!allData || allData.length === 0) {
      return res.status(404).json({
        status: "failure",
        message: "No bookmarks found",
      });
    }

    res.status(200).json({
      status: "success",
      message: " Added successfully",
    });
  } catch (error) {
    console.error("Error add ques Feedback details:", error);
    res.status(500).json({
      status: "failure",
      message: "Internal Server Error",
      error: error,
    });
  }
};
module.exports = {
  questionFeedBack,
};
