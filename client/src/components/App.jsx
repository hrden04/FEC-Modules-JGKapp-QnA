/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';
import Header from './Header.jsx';
import Search from './Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      numQstsToDisplay: 4,
      numQstsLeft: 0,
    };

    this.getQuestionsByProductId = this.getQuestionsByProductId.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.findQuestionIndex = this.findQuestionIndex.bind(this);
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.collapseQuestions = this.collapseQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestionsByProductId(1001);
  }

  getQuestionsByProductId(productId) {
    axios.get('/api/products/questions', {
      params: {
        productId,
      },
    })
      .then((results) => results.data.questions)
      .then((questions) => {
        const numQstsLeft = questions.length > 4 ? questions.length - 4 : 0;
        this.setState({
          questions,
          numQstsToDisplay: 4,
          numQstsLeft,
        });
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  }

  handleVote(questionId, voteCount) {
    const { questions } = this.state;

    axios.patch('/api/products/questions', {
      questionId,
      voteCount,
    })
      .then((results) => results.data.question)
      .then(() => {
        const index = this.findQuestionIndex(questionId);
        const updatedQuestions = questions.slice();
        updatedQuestions[index].question_votes = voteCount;
        this.setState({
          questions: updatedQuestions,
        });
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  }

  findQuestionIndex(questionId) {
    const { questions } = this.state;
    for (let i = 0; i < questions.length; i += 1) {
      if (questions[i].question_id === questionId) {
        return i;
      }
    }
    return -1;
  }

  showMoreQuestions() {
    const { questions } = this.state;
    let { numQstsToDisplay, numQstsLeft } = this.state;
    numQstsToDisplay += 1;
    numQstsLeft -= 1;
    if (questions.length >= numQstsToDisplay) {
      this.setState({
        numQstsToDisplay,
        numQstsLeft,
      });
    }
  }

  collapseQuestions() {
    const { questions } = this.state;
    this.setState({
      numQstsToDisplay: 4,
      numQstsLeft: questions.length - 4,
    });
  }

  render() {
    const { questions, numQstsLeft, numQstsToDisplay } = this.state;

    const endOfListContent = () => {
      if (questions.length === 0) {
        return (
          <div className="show-more hypertext">Be the first to ask a question!</div>
        );
      }
      if (questions.length <= 4) {
        return [];
      }
      if (numQstsLeft <= 0) {
        return (
          <div className="collapse-questions" onClick={this.collapseQuestions}>
            <span>Collapse all questions</span>
          </div>
        );
      }
      if (numQstsToDisplay > 4) {
        return (
          <div>
            <div className="show-more hypertext" onClick={this.showMoreQuestions}>
              See more answered questions
              (
              {numQstsLeft}
              )
            </div>
            <div className="collapse-questions" onClick={this.collapseQuestions}>
              <span className="inner-button-text">Collapse all questions</span>
            </div>
          </div>
        );
      }
      return (
        <div className="show-more hypertext" onClick={this.showMoreQuestions}>
          See more answered questions
          (
          {numQstsLeft}
          )
        </div>
      );
    };

    return (
      <div>
        <Header />
        <div className="main-width">
          <Search />
          <div className="question-list">
            {questions.slice(0, numQstsToDisplay).map((question) => (
              <Question
                question={question}
                key={question.question_id}
                handleVote={this.handleVote}
              />
            ))}
            <div className="end-questions-container">
              {endOfListContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
