const userRouter = require("./user_router");
const express = require("express");
const router = express.Router();

const application = [
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/ex",
    router: userRouter,
  },
];

application.forEach((paths) => {
  router.use(paths.path, paths.router);
});

module.exports = router;
