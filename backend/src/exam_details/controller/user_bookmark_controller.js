const userBookMarkService = require("../service/userExam_service");

const bookMarkAdd = async (req, res) => {
  try {
    const { userId, ques_id } = req.body;
    if (!userId || !ques_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const allData = await userBookMarkService.bookMarkAdd(userId, ques_id);

    if (!allData || allData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookmarks found",
      });
    }

    res.status(200).json({
      success: true,
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

const bookMarkRemove = async (req, res) => {
  try {
    const { userId, ques_id } = req.body;
    if (!userId || !ques_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const allData = await userBookMarkService.bookMarkRemove(userId, ques_id);

    if (!allData || allData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookmarks found",
      });
    }

    res.status(200).json({
      success: true,
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
  bookMarkAdd,
  bookMarkRemove,
};
