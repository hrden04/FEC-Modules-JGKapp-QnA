/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
      numAnsToDisplay: 1,
      numAnsLeft: 0,
    };

    this.getAnswersByQuestionId = this.getAnswersByQuestionId.bind(this);
    this.showMoreAnswers = this.showMoreAnswers.bind(this);
    this.collapseAnswers = this.collapseAnswers.bind(this);
  }

  componentDidMount() {
    this.getAnswersByQuestionId();
  }

  getAnswersByQuestionId() {
    const { question } = this.props;
    const { numAnsToDisplay } = this.state;
    axios.get('/api/products/answers', {
      params: {
        questionId: question.question_id,
      },
    })
      .then((results) => results.data.answers)
      .then((answers) => {
        const numAnsLeft = answers.length === 0 ? 0 : answers.length - numAnsToDisplay;
        this.setState({
          answers,
          numAnsLeft,
        });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }

  showMoreAnswers() {
    const { answers } = this.state;
    let { numAnsToDisplay, numAnsLeft } = this.state;
    const numToChange = numAnsLeft > 3 ? 3 : numAnsLeft;
    numAnsToDisplay += numToChange;
    numAnsLeft -= numToChange;
    if (answers.length >= numAnsToDisplay) {
      this.setState({
        numAnsToDisplay,
        numAnsLeft,
      });
    }
  }

  collapseAnswers() {
    const { answers } = this.state;
    this.setState({
      numAnsToDisplay: 1,
      numAnsLeft: answers.length - 1,
    });
  }

  render() {
    const { answers, numAnsLeft, numAnsToDisplay } = this.state;
    const { question, handleVote } = this.props;

    const endOfListContent = () => {
      if (answers.length === 0) {
        return (
          <div className="show-more hypertext">Be the first to answer this question!</div>
        );
      }
      if (answers.length === 1) {
        return [];
      }
      if (numAnsLeft <= 0) {
        return (
          <div className="collapse-answers" onClick={this.collapseAnswers}>
            <span className="inner-button-text">Collapse all answers</span>
          </div>
        );
      }
      if (numAnsToDisplay > 1) {
        return (
          <div>
            <div className="show-more hypertext" onClick={this.showMoreAnswers}>
              See more answers
              (
              {numAnsLeft}
              )
            </div>
            <div className="collapse-answers" onClick={this.collapseAnswers}>
              <span className="inner-button-text">Collapse all answers</span>
            </div>
          </div>
        );
      }
      return (
        <div className="show-more hypertext" onClick={this.showMoreAnswers}>
          See more answers
          (
          {numAnsLeft}
          )
        </div>
      );
    };

    return (
      <div className="flexbox-container">
        <QuestionVotes
          questionVotes={question.question_votes}
          questionId={question.question_id}
          handleVote={handleVote}
        />
        <div className="question-answer-list">
          <div className="question-line-container flexbox-container">
            <span className="a-text-bold section-name">Question:</span>
            <div className="question-text hypertext">{question.question_text}</div>
          </div>
          <div className="answer-line-container flexbox-container">
            <span className="a-text-bold section-name">Answer:</span>
            <div className="answers-container">
              {answers.slice(0, numAnsToDisplay).map((ans) => (
                <Answer answer={ans} key={ans.answer_id} />
              ))}
              {endOfListContent()}
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
  handleVote: PropTypes.func.isRequired,
};

export default Question;
