const db = require("../db");

 cla

const getAllExam = async ( ) => { 
  const [updatedRows] = await db.query("SELECT * FROM exam_categories");
  return updatedRows;
};



module.exports = { getAllExam };
