import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ answer }) => {
  return (
    <div>
      <p>{answer.answer_text}</p>
    </div>
  );
};

Answer.propTypes = {
  answer: PropTypes.shape({
    answer_text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Answer;
