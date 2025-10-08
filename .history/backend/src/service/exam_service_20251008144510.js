const db = require("../db");

 

const getAllExam = async ( ) => {
  const otp = generateOtp();
  await db.query("SELECT * FROM exam_categories");

  
  return updatedRows[0];
};



module.exports = { getAllExam };
