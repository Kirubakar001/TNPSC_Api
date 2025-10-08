const examService = require("../service/exam_service");

const getAllExam = async (req, res) => {
  try {
    const allData = await examService.getAllExam();

    res.status(200).json({
      msg: "all Details fetched successfully",
      status: "success",
      data: allData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports