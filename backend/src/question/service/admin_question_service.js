const db = require("../../db");

const getAllQuestions = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM questions");
    return rows;
  } catch (error) {
    throw new Error("Error fetching question details: " + error.message);
  }
};

const getByQuesid = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM questions where id = ?", [id]);
    return rows;
  } catch (error) {
    throw new Error("Error fetching question details: " + error.message);
  }
};

const getByTitleId = async (tID) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM questions where title_id = ?",
      [tID]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching question details: " + error.message);
  }
};

const getByUnitId = async (uID) => {
  try {
    const [rows] = await db.query("SELECT * FROM questions where unit_id = ?", [
      uID,
    ]);
    return rows;
  } catch (error) {
    throw new Error("Error fetching question details: " + error.message);
  }
};

const getByPartId = async (eID) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM questions where exam_parts_id = ?",
      [eID]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching question details: " + error.message);
  }
};

const insertQuestion = async (
  exam_parts_id,
  unit_id,
  title_id,
  ques,
  option_1,
  option_2,
  option_3,
  option_4,
  answer,
  position,
  show_type,
  cby
) => {
  try {
    const [result] = await db.query(
      `INSERT INTO questions 
        (exam_parts_id, unit_id, title_id, ques, option_1, option_2, option_3, option_4, answer, position, show_type, cby)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        exam_parts_id,
        unit_id,
        title_id,
        ques,
        option_1,
        option_2,
        option_3,
        option_4,
        answer,
        position || 0,
        show_type,
        cby,
      ]
    );

    var data = await getByQuesid(result.insertId);

    return data[0];
  } catch (error) {
    throw new Error("Error inserting question: " + error.message);
  }
};


// 🟨 Update Question
const updateQuestion = async (
  id,
  exam_parts_id,
  unit_id,
  title_id,
  ques,
  option_1,
  option_2,
  option_3,
  option_4,
  answer,
  position,
  show_type,
  uby
) => {
  try {
    const [result] = await db.query(
      `UPDATE questions 
       SET exam_parts_id = ?, unit_id = ?, title_id = ?, 
           ques = ?, option_1 = ?, option_2 = ?, option_3 = ?, option_4 = ?, 
           answer = ?, position = ?, show_type = ?, uby = ?,
            updated_at = NOW()   
       WHERE id = ?`,
      [
        exam_parts_id,
        unit_id,
        title_id,
        ques,
        option_1,
        option_2,
        option_3,
        option_4,
        answer,
        position || 0,
        show_type,
        uby,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      throw new Error("Question not found or no changes made");
    }

    const updatedData = await getByQuesid(id);
    return updatedData[0];
  } catch (error) {
    throw new Error("Error updating question: " + error.message);
  }
};

// 🟥 Delete Question
const deleteQuestion = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM questions WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      throw new Error("Question not found");
    }

    return { success: true, message: "Question deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting question: " + error.message);
  }
};


module.exports = {
  getAllQuestions,
  insertQuestion,
  updateQuestion,
  deleteQuestion,
  getByUnitId,
  getByPartId,
  getByTitleId,
  getByQuesid,
};
