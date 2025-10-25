const db = require("../../db");

const getAllQuestions = async (userId) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 
        q.id,
        q.exam_parts_id,
        q.unit_id,
        q.title_id,
        q.ques,
        q.option_1,
        q.option_2,
        q.option_3,
        q.option_4,
        q.answer,
        q.position,
        q.show_type,
        CASE 
          WHEN b.id IS NOT NULL THEN 1 
          ELSE 0 
        END AS bookmark
      FROM questions q
      LEFT JOIN bookmark b 
        ON q.id = b.ques_id AND b.user_id = ?
      ORDER BY q.created_at DESC;
      `,
      [userId]
    );
    return rows;
  } catch (error) {
    throw new Error("Error fetching question details: " + error.message);
  }
};

module.exports = {
  getAllQuestions,
};
