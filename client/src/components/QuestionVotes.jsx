import React from 'react';
import PropTypes from 'prop-types';

const QuestionVotes = ({ questionVotes }) => (
  <ul className="question-votes-list">
    <li><input type="submit" className="vote up-vote" value="Vote Up" /></li>
    <li>
      {questionVotes}
      <br />
      votes
    </li>
    <li><input type="submit" className="vote down-vote" value="Vote Down" /></li>
  </ul>
);


QuestionVotes.propTypes = {
  questionVotes: PropTypes.number.isRequired,
};

export default QuestionVotes;
