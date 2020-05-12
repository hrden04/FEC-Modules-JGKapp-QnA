const db = require('../database/index.js');

module.exports = {
  getQuestionsByProductId: (productId) => {
    const sqlString = 'SELECT * FROM questions WHERE product_id = $1';

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
};
