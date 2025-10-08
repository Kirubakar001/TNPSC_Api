const userRouter = require("./user_router");
const userRouter = require("./w");
const express = require("express");
const router = express.Router();

const application = [
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/exam",
    router: userRouter,
  },
];

application.forEach((paths) => {
  router.use(paths.path, paths.router);
});

module.exports = router;
