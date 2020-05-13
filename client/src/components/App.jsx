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
    };

    this.getQuestionsByProductId = this.getQuestionsByProductId.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.findQuestionIndex = this.findQuestionIndex.bind(this);
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
        this.setState({
          questions,
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

  render() {
    const { questions } = this.state;

    return (
      <div>
        <Header />
        <div className="main-width">
          <Search />
          <div className="question-list">
            {questions.slice(0, 4).map((question) => (
              <Question
                question={question}
                key={question.question_id}
                handleVote={this.handleVote}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
