const userRouter = require("./user_router");
const examRouter = require("./exam_routes");
const express = require("express");
const router = express.Router();

const application = [
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/exam",
    router: examRouter,
  },
];

application.forEach((paths) => {
  router.use(paths.path, paths.router);
});

module.exports = router;
