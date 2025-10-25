const adminSubjectService = require("../service/admin_question_service");
const adminTitleService = require("../../title/service/admin_title_service");

const getAllQuestions = async (req, res) => {
  try {
    const data = await adminSubjectService.getAllQuestions();

    if (!data || data.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No exam details found",
      });
    }

    const titleDetails = await adminTitleService.getAllTitles();

    res
      .status(200)
      .json({
        status: 200,
        success: true,
        data: data,
        titleData: titleDetails,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const insertQuestion = async (req, res) => {
  try {
    const {
      exam_parts_id,
      unit_id,
      title_id,
      ques,
      option_1,
      option_2,
      option_3,
      option_4,
      answer,
      position,
      show_type,
      cby,
    } = req.body;

    if (!ques || !option_1 || !option_2 || !option_3 || !option_4 || !answer) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Missing required fields",
      });
    }

    const data = await adminSubjectService.insertQuestion(
      exam_parts_id,
      unit_id,
      title_id,
      ques,
      option_1,
      option_2,
      option_3,
      option_4,
      answer,
      position,
      show_type,
      cby
    );

    if (!data) {
      res.status(400).json({
        status: 400,
        success: false,
        message: "Insert issuse",
        id,
      });
    }

    res.status(201).json({
      status: 200,
      success: true,
      message: "Question added successfully",
      id,
    });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟨 Update question
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.body; // from URL
    const {
      exam_parts_id,
      unit_id,
      title_id,
      ques,
      option_1,
      option_2,
      option_3,
      option_4,
      answer,
      position,
      show_type,
      uby,
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Question ID is required",
      });
    }

    const data = await adminSubjectService.updateQuestion(
      id,
      exam_parts_id,
      unit_id,
      title_id,
      ques,
      option_1,
      option_2,
      option_3,
      option_4,
      answer,
      position,
      show_type,
      uby
    );

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data,
    });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟥 Delete question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Question ID is required" });
    }

    const result = await adminSubjectService.deleteQuestion(id);

    res.status(200).json({
      success: true,
      message: result.message || "Question deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllQuestions,
  insertQuestion,
  updateQuestion,
  deleteQuestion,
};
