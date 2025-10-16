const userExamService = require("../service/user_part_service");

const getAllParts = async (req, res) => {
  try {
  
    const details = await userExamService.getAllParts ();
 

    if (!details || details.length === 0) {
      return res.status(200).json({
        status: "success",
        data: [],
        message: "No part details found",
      });
    }

    res.status(200).json({
      status: "success",
      data: details,
      message: "Part details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching part details:", error);
    res
      .status(500)
      .json({ status: "failure", message: "Internal Server Error" });
  }
};

module.exports = {
  getAllParts,
};
