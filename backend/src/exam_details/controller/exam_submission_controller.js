const examSubmissionService = require("../service/exam_submission_service.js");

const saveExam = async (req, res) => {
  try {
    const {
      user_id,
      exam_type,
      competition_id,
      start_time,
      end_time,
      total_questions,
      total_correct,
      total_wrong,
      total_unseen,
      total_time_seconds,
      answers,
    } = req.body;

    // ✅ Validation
    if (!user_id || !exam_type) {
      return res.status(400).json({
        success: false,
        message: "user_id and exam_type are required",
      });
    }

    // ✅ Save data
    const result = await examSubmissionService.saveExamSubmission(
      user_id,
      exam_type,
      competition_id,
      start_time,
      end_time,
      total_questions,
      total_correct,
      total_wrong,
      total_unseen,
      total_time_seconds,
      answers
    );

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to insert exam data",
        error: result.error,
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam inserted successfully",
      exam_session_id: result.exam_session_id,
    });
  } catch (error) {
    console.error("💥 Error in saveExam:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  saveExam,
};
