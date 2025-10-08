const db = require("../db");

 class ExamService { 

  async getAllExam() { 
    const [updatedRows] = await db.query("SELECT * FROM exam_categories");
    return updatedRows;
  }

}

const getAllExam = async ( ) => { 
  const [updatedRows] = await db.query("SELECT * FROM exam_categories");
  return updatedRows;
};



module.exports = { getAllExam };
