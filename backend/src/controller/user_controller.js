const userService = require("../service/user_service");

const sendOtp = async (req, res) => {
  try {
    const { phone_no } = req.body;
    if (!phone_no) {
      return res.status(400).json({ error: "phone_no is required" });
    }

      const existingUser = await userService.checkUserByPhone(phone_no);

    if (existingUser) {
      // User exists → update OTP
      const updatedUser = await userService.updateUserOtp(existingUser.id);
      return res
        .status(200)
        .json({ message: "OTP updated", data: updatedUser, customerNumber: "9600760166" });
    } else {
      // New user → insert with OTP
      const newUser = await userService.createUserWithOtp(phone_no);
      return res
        .status(201)
        .json({ message: "User created with OTP", data: newUser, customerNumber: "9600760166" });
    }
  } catch (err) {
    console.error("Error in sendOtp:", err);
    res.status(500).json({ error: "Database operation failed", message: "User Error", customerNumber: "9600760166" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, phone_no, gender, state, district, city } = req.body;

    if (!phone_no) {
      return res.status(400).json({ error: "Phone Number is required" });
    }

    const existingUsers = await userService.checkUserByPhone(phone_no);

    if (existingUsers) {
      // return res.status(200).json({ message: "User already exists" });
      const userUpdate = await userService.userUpdateData({
        name,
        phone_no,
        gender,
        state,
        district,
        city,
      });
      console.log(userUpdate);
      if (userUpdate) {
        return res
          .status(200)
          .json({ message: "User updated successfully", data: userUpdate });
      }
    } else {
      return res.status(409).json({ message: "User Not Found" });
    }

    // const userId = await userService.addUser({ name, phone_no, gender, state, district, city });
    // res.status(201).json({ message: "User added successfully", id: userId });
  } catch (err) {
    console.error("Error in createUser:", err);
    res.status(500).json({ error: "Database operation failed" ,message: "User Error",  });
  }
};

module.exports = { sendOtp, updateUser };
