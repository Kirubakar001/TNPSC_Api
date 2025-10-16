const adminExamService = require("../service/adminExam_service");

const getAllExamDetails = async (req, res) => {
  try {
    const details = await adminExamService.getExamDetails();

    console.log(details);

    if (!details || details.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
        message: "No exam details found",
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: details,
      message: "Exam details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching exam details:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const insertExamDetails = async (req, res) => {
  try {
    const { title, sub_title } = req.body;
    console.log(req.file);
    console.log(req.body);

    // ✅ Check for missing fields
    if (!title || !sub_title) {
      return res.status(400).json({
        success: false,
        message: "Title, Sub Title, and Image are required",
      });
    }

    // ✅ Construct image URL

    const BASE_URL = "https://9ml67kp8-8000.inc1.devtunnels.ms";

    const imgUrl = `${BASE_URL}/uploads/${req.file.filename}`;

    const newExam = await adminExamService.insertExamDetails(
      title,
      sub_title,
      imgUrl
    );

    return res.status(201).json({
      success: true,
      data: newExam,
      message: "Exam details inserted successfully",
    });
  } catch (error) {
    console.error("Error inserting exam details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateExamDetails = async (req, res) => {
  try {
    const { id, title, sub_title, img_url } = req.body;
    let imgPath;

    // Validate required fields
    if (!id || !title || !sub_title) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "ID, Title, and Sub Title are required",
      });
    }

    // ✅ If a new image is uploaded
    if (req.file) {
      const BASE_URL = "https://9ml67kp8-8000.inc1.devtunnels.ms";

      if (req.file) {
        imgPath = `${BASE_URL}/uploads/${req.file.filename}`;
      }

      if (img_url) {
        const oldPath = path.join(
          __dirname,
          "../../uploads",
          path.basename(img_url)
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    } else {
      // ✅ No new image → keep the existing one
      imgPath = img_url;
    }

    if (!imgPath) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Image path is required",
      });
    }
    // ✅ Update DB
    const updatedExam = await adminExamService.updateExamDetails(
      id,
      title,
      sub_title,
      imgPath
    );

    if (!updatedExam) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Exam updated successfully",
      data: updatedExam,
    });
  } catch (error) {
    console.error("Error updating exam:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};
const deleteExamDetails = async (req, res) => {
  try {
    const id = req.body?.id;
    console.log("req.body", req.body);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Exam ID is required",
      });
    }

    const result = await adminExamService.deleteExamDetails(id);

    return res.status(200).json({
      message: result.message,
      status: 200,
      success: true,
    });
  } catch (error) {
    console.error("Error deleting exam details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllExamDetails,
  insertExamDetails,
  updateExamDetails,
  deleteExamDetails,
};
