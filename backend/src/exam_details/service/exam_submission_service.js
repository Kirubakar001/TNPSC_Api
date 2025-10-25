const db = require("../../db");

const saveExamSubmission = async (
  user_id,
  exam_type,
  competition_id,
  start_time,
  end_time,
  total_questions,
  total_correct,
  total_wrong,
  total_unseen,
  total_time_seconds,
  answers
) => {
  const connection = await db.getConnection(); // ✅ get connection for transaction
  try {
    await connection.beginTransaction();

    // 1️⃣ Insert into exam_sessions
    const [sessionResult] = await connection.query(
      `INSERT INTO exam_sessions 
        (user_id, exam_type, competition_id, start_time, end_time, total_questions, total_correct, total_wrong, total_unseen, total_time_seconds)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        exam_type,
        competition_id,
        start_time,
        end_time,
        total_questions,
        total_correct,
        total_wrong,
        total_unseen,
        total_time_seconds,
      ]
    );

    const examSessionId = sessionResult.insertId;

    // 2️⃣ Prepare bulk insert values
    const answerValues = answers.map((a) => [
      user_id,
      examSessionId,
      a.question_id,
      a.selected_option,
      a.is_correct,
      a.is_seen,
    ]);

    // 3️⃣ Insert into user_answers
    await connection.query(
      `INSERT INTO user_answers 
        (user_id, exam_session_id, question_id, selected_option, is_correct, is_seen)
       VALUES ?`,
      [answerValues]
    );

    await connection.commit();

    return { success: true, exam_session_id: examSessionId };
  } catch (error) {
    await connection.rollback();
    console.error("❌ Error saving exam submission:", error);
    return { success: false, error: error.message };
  } finally {
    connection.release();
  }
};

module.exports = {
  saveExamSubmission,
};
