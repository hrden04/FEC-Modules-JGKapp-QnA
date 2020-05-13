const db = require('../database/index.js');

module.exports = {
  getQuestionsByProductId: (productId) => {
    const sqlString = 'SELECT * FROM questions WHERE product_id = $1 ORDER BY question_votes DESC';

    return db.query(sqlString, [productId]);
  },

  getAnswersByQuestionId: (questionId) => {
    const sqlString = `SELECT
      answers.answer_id,
      answers.answer_text,
      answers.created_at,
      answers.answer_upvotes,
      answers.answer_downvotes,
      users.username,
      users.user_avatar_url
      FROM answers INNER JOIN users ON answers.user_id = users.user_id
      WHERE answers.question_id = $1`;

    return db.query(sqlString, [questionId]);
  },

  updateQuestionVoteCount: (questionId, voteCount) => {
    const sqlString = 'UPDATE questions SET question_votes = $1 WHERE question_id = $2';

    return db.query(sqlString, [voteCount, questionId]);
  },
};
