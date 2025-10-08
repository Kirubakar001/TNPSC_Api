const userRouter = require("../route/userRouter");
const express = require("express");
const router = express.Router();

const application = [
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/users",
    router: userRouter,
  },
];

application.forEach((paths) => {
  router.use(paths.path, paths.router);
});

module.exports = router;
