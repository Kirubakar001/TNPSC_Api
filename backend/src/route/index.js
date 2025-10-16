const userRouter = require("../app/route/user_router");
const adminExamRouter = require("../exam_list/route/adminExam_routes");
const userExamRouter = require("../exam_list/route/userExam_routes");
const express = require("express");
const adminRouter = require("../admin/route/admin_routes");
const adminSubjectRouter = require("../subject_name/route/admin_subject_routes");
const userSubjectRouter = require("../subject_name/route/user_subject_routes");
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
    path: "/subjectDetails",
    router: userSubjectRouter,
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
    path: "/adminSubject",
    router: adminSubjectRouter,
  },
];

application.forEach((paths) => {
  router.use(paths.path, paths.router);
});

module.exports = router;
