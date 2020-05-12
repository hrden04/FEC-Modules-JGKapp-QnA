import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Answer from './Answer.jsx';
import QuestionVotes from './QuestionVotes.jsx';

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
      <div className="flexbox-container">
        <QuestionVotes questionVotes={question.question_votes} />
        <div className="question-answer-list">
          <div className="question-line-container flexbox-container">
            <span className="a-text-bold section-name">Question:</span>
            <div className="question-text hypertext">{question.question_text}</div>
          </div>
          <div className="answer-line-container flexbox-container">
            <span className="a-text-bold section-name">Answer:</span>
            <div className="answers-container">
              {answers.slice(0, 1).map((ans) => (
                <Answer answer={ans} key={ans.answer_id} />
              ))}
              <div className="show-more hypertext">See more answers</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    question_text: PropTypes.string.isRequired,
    question_id: PropTypes.number.isRequired,
    question_votes: PropTypes.number,
  }).isRequired,
};

export default Question;
