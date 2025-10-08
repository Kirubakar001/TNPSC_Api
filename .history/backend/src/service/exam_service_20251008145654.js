const db = require("../db");

 call

const getAllExam = async ( ) => { 
  const [updatedRows] = await db.query("SELECT * FROM exam_categories");
  return updatedRows;
};



module.exports = { getAllExam };
