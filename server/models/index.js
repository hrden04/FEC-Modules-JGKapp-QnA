const db = require('../database/index.js');

module.exports = {
  getQuestionsByProductId: (productId) => {
    const sqlString = 'SELECT * FROM questions WHERE product_id = $1';

    return db.query(sqlString, [productId]);
  },

  getAnswersByQuestionId: (questionId) => {
    const sqlString = 'SELECT * FROM answers WHERE question_id = $1';

    return db.query(sqlString, [questionId]);
  },
};
