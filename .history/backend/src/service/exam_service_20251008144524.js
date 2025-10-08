const db = require("../db");

 

const getAllExam = async ( ) => {
  const otp = generateOtp();
  

  
  const [updatedRows] = await db.query("SELECT * FROM users WHERE id = ?", [
    user_id,
  ]);
  return updatedRows[0];
};



module.exports = { getAllExam };
