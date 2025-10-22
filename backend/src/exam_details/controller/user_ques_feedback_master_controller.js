const userfeedBackMaster = require("../service/user_ques_feedback_master_service");


const feedBackMasterAllDetails = async (req, res) => {
  try {
  

    const allData = await userfeedBackMaster.getAllFeedbackMaster( );

    if (!allData || allData.length === 0) {
      return res.status(404).json({
        status: "failure",
        message: "No Data found",
      });
    }

    res.status(200).json({
         status:"success",
      data: allData,
      message: "Feedback fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching exam details:", error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};

module.exports = {
  feedBackMasterAllDetails,
};  