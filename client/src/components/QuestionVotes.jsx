import React from 'react';
import PropTypes from 'prop-types';

const QuestionVotes = ({ questionId, questionVotes, handleVote }) => (
  <div className="voting-block">
    <ul className="question-votes-list">
      <li>
        <input
          type="submit"
          className="vote up-vote"
          value="Vote Up"
          onClick={() => handleVote(questionId, questionVotes + 1)}
        />
      </li>
      <li className="vote-count">
        {questionVotes}
        <br />
        vote
        {questionVotes === 1 ? '' : 's'}
      </li>
      <li>
        <input
          type="submit"
          className="vote down-vote"
          value="Vote Down"
          onClick={() => handleVote(questionId, questionVotes - 1)}
        />
      </li>
    </ul>
  </div>
);


QuestionVotes.propTypes = {
  questionId: PropTypes.number.isRequired,
  questionVotes: PropTypes.number.isRequired,
  handleVote: PropTypes.func.isRequired,
};

export default QuestionVotes;
