const userRouter = require("../app/route/user_router");
const adminExamRouter = require("../exam_list/route/adminExam_routes");
const userExamRouter = require("../exam_list/route/userExam_routes");
const express = require("express");
const adminRouter = require("../admin/route/admin_routes");
const adminPartRouter = require("../part/route/admin_part_routes");
const userPartRouter = require("../part/route/user_part_routes");
const adminUnit = require("../unit/route/admin_unit_routes");
const userUnit = require("../unit/route/user_unit_routes");
const admintitlerUnit = require("../title/route/admin_title_routes");
const usertitleUnit = require("../title/route/user_title_routes");
const userQuestion = require("../question/route/user_question_routes");
const adminQuestion = require("../question/route/admin_question_routes");
const userBookMark = require("../exam_details/route/user_exam_details_routes");
const router = express.Router();

const application = [
  //App side routes
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/examDetails",
    router: userExamRouter,
  },
  {
    path: "/part",
    router: userPartRouter,
  },
  {
    path: "/unit",
    router: userUnit,
  },
  {
    path: "/title",
    router: usertitleUnit,
  },
  {
    path: "/question",
    router: userQuestion,
  },
  {
    path: "/examPractice",
    router: userBookMark,
  },

  // Admin side routes
  {
    path: "/admin",
    router: adminRouter,
  },
  {
    path: "/adminExamDetails",
    router: adminExamRouter,
  },
  {
    path: "/adminPart",
    router: adminPartRouter,
  },
  {
    path: "/adminUnit",
    router: adminUnit,
  },
  {
    path: "/adminTitle",
    router: admintitlerUnit,
  },
  {
    path: "/adminQuestion",
    router: adminQuestion,
  },
];

application.forEach((paths) => {
  router.use(paths.path, paths.router);
});

module.exports = router;
