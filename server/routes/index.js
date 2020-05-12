const router = require('express').Router();
const controller = require('../controllers/index.js');

// Route different requests to different endpoints
router.get('/questions', controller.getQuestionsByProductId);
router.get('/answers', controller.getAnswersByQuestionId);
router.patch('/questions', controller.updateQuestionVoteCount);

module.exports = router;
