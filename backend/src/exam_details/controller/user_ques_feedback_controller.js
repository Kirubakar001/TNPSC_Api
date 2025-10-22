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
        success: false,
          status:"success",
        message: "No bookmarks found",
      });
    }

    res.status(200).json({
      success: true,
      status:"success",
      data: allData,
      message: "Bookmarks fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching exam details:", error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};
module.exports = {
  questionFeedBack,
};
