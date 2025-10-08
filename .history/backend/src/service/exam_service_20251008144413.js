const db = require("../db");

 

const getAllExam = async ( ) => {
  const otp = generateOtp();
  await db.query("UPDATE users SET otp = ? WHERE id = ?", [otp, user_id]);
  const [updatedRows] = await db.query("SELECT * FROM users WHERE id = ?", [
    user_id,
  ]);
  return updatedRows[0];
};



