const db = require("../db");

// Generate 6-digit OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

const checkUserByPhone = async (phone_no) => {
  const [rows] = await db.query("SELECT * FROM users WHERE phone_no = ?", [
    phone_no,
  ]);
  return rows[0]; // return first user if exists, undefined otherwise
};

const updateUserOtp = async (user_id, from) => {
  // from 0:truecaller  normal, 1: normal
  let otp;
  if (from === 1) {
    otp = generateOtp();
  }
  await db.query("UPDATE users SET otp = ? WHERE id = ?", [otp, user_id]);
  const [updatedRows] = await db.query("SELECT * FROM users WHERE id = ?", [
    user_id,
  ]);
  return updatedRows[0];
};

const createUserWithOtp = async (phone_no, from) => {
  let otp;
  if (from === 1) {
    otp = generateOtp();
  }

  const [result] = await db.query(
    "INSERT INTO users (phone_no, otp) VALUES (?, ?)",
    [phone_no, otp]
  );
  const [newUserRows] = await db.query("SELECT * FROM users WHERE id = ?", [
    result.insertId,
  ]);
  return newUserRows[0];
};

const userUpdateData = async ({
  name,
  phone_no,
  gender,
  state,
  district,
  city,
}) => {
  // Update the user data based on phone_no
  await db.query(
    `UPDATE users 
     SET name = ?, gender = ?, state = ?, district = ?, city = ?,user_status = "existing", updated_at = NOW() 
     WHERE phone_no = ?`,
    [name, gender, state, district, city, phone_no]
  );

  // Fetch and return the updated user data
  const [rows] = await db.query("SELECT * FROM users WHERE phone_no = ?", [
    phone_no,
  ]);

  return rows[0]; // Return the updated user object
};

module.exports = {
  checkUserByPhone,
  updateUserOtp,
  createUserWithOtp,
  userUpdateData,
};
