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

  render() {
    const { questions } = this.state;

    return (
      <div>
        <Header />
        <Search />
        {questions.slice(0, 4).map((question) => (
          <Question question={question} key={question.question_id} />
        ))}
      </div>
    );
  }
}

export default App;
