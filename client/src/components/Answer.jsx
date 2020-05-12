import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ answer }) => {
  const createdAt = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(answer.created_at));

  const userString = `By ${answer.username} on ${createdAt}`;

  return (
    <div>
      <p className="answer-text">{answer.answer_text}</p>
      <span className="user-date-text">{userString}</span>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.shape({
    answer_text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Answer;
