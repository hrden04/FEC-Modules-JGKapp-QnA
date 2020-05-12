const model = require('../models/index.js');

module.exports = {
  getQuestionsByProductId: (req, res) => {
    const { productId } = req.query;

    if (productId) {
      model.getQuestionsByProductId(productId)
        .then((results) => results.rows)
        .then((questions) => {
          res.status(200).json({
            message: `Successfully retrieved questions for product id: ${productId}`,
            questions,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: `Failed to retrieve questions for product id: ${productId}`,
            error: err,
          });
        });
    } else {
      res.status(400).json({ message: 'Bad request - must include a product id' });
    }
  },

  getAnswersByQuestionId: (req, res) => {
    const { questionId } = req.query;

    if (questionId) {
      model.getAnswersByQuestionId(questionId)
        .then((results) => results.rows)
        .then((answers) => {
          res.status(200).json({
            message: `Successfully retrieved answers for question id: ${questionId}`,
            answers,
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: `Failed to retrieve answers for question id: ${questionId}`,
            error: err,
          });
        });
    } else {
      res.status(400).json({ message: 'Bad request - must include a question id' });
    }
  },

  updateQuestionVoteCount: (req, res) => {
    const { questionId, voteCount } = req.body;

    if (questionId && voteCount) {
      model.updateQuestionVoteCount(questionId, voteCount)
        .then(() => {
          res.status(200).json({
            message: 'Successfully updated vote count',
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: 'Failed to update question vote count',
            error: err,
          });
        });
    } else {
      res.status(400).json({ message: 'Bad request - must include voteCount and questionId' });
    }
  },
};
