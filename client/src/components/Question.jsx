import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answer from './Answer.jsx';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
    };
  }

  componentDidMount() {
    this.getAnswersByQuestionId();
  }

  getAnswersByQuestionId() {
    const { question } = this.props;
    axios.get('/api/products/answers', {
      params: {
        questionId: question.question_id,
      },
    })
      .then((results) => results.data.answers)
      .then((answers) => {
        this.setState({
          answers,
        });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }

  render() {
    const { answers } = this.state;
    const { question } = this.props;

    return (
      <div>
        <div>{question.question_text}</div>
        {answers.slice(0, 1).map((ans) => (
          <Answer answer={ans} key={ans.answer_id} />
        ))}
        <div>See more answers</div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    question_text: PropTypes.string.isRequired,
    question_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Question;
