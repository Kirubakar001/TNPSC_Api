const userBookMarkController = require("../controller/user_bookmark_controller");
const userFeedBakMasterController = require("../controller/user_ques_feedback_master_controller");
const userFeedBakController = require("../controller/user_ques_feedback_controller");
const examSaveController = require("../controller/exam_submission_controller.js");
const express = require("express");
const router = express.Router();

router.post("/feedBackMaster", userFeedBakMasterController.feedBackMasterAllDetails);
router.post("/quesFeedback", userFeedBakController.questionFeedBack);
router.post("/addBookMarkDetails", userBookMarkController.bookMarkAdd);
router.post("/removeBookMarkDetails", userBookMarkController.bookMarkRemove);
router.post("/saveExam", examSaveController.saveExam);

module.exports = router;
