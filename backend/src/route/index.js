const userRouter = require("./user_router");
const examRouter = require("./exam_routes");
const express = require("express");
const adminRouter = require("./admin_routes");
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


//admin path
  {
    path: "/admin",
    router: adminRouter,
  }

];

application.forEach((paths) => {
  router.use(paths.path, paths.router);
});

module.exports = router;
