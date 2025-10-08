const db = require("../db");

 class 

const getAllExam = async ( ) => { 
  const [updatedRows] = await db.query("SELECT * FROM exam_categories");
  return updatedRows;
};



module.exports = { getAllExam };
