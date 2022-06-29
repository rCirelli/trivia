import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends Component {
  state = {
    answerArrSort: [],
    questions: '',
    answers: '',
    count: 0,
    isResponded: false,
    isDisabledQuestion: false,
  }

  componentDidMount() {
    const { history } = this.props;
    const RESPONDE_CODE_WRONG = 3;
    const tokenUser = localStorage.getItem('token');
    console.log(tokenUser);
    fetch(`https://opentdb.com/api.php?amount=5&token=${tokenUser}`)
      .then((response) => response.json()).then((data) => {
        if (data.response_code === RESPONDE_CODE_WRONG) {
          localStorage.clear();
          history.push('/');
        } else {
          this.setState({
            questions: data.results,
          });
        }
      }).then(() => {
        const { questions, count } = this.state;
        const answers = questions[count].incorrect_answers.map((answer, index) => (
          {
            answer,
            dataTesting: `wrong-answer-${index}`,
          }
        ));

        answers.push({
          answer: questions[count].correct_answer,
          dataTesting: 'correct-answer',
        });
        this.setState({ answers });
        const answerArrSort = this.shuffleArray(answers);
        this.setState({ answerArrSort });
      });
  }
  // referencia de codigo:
  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  // Função para randomizar array
  shuffleArray = (arr) => {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  responded = () => {
    this.setState({ isResponded: true });
  }

  timerOff = () => {
    this.setState({ isDisabledQuestion: true });
    this.responded();
  }

  render() {
    const { questions, count, answers, isResponded, isDisabledQuestion, answerArrSort } = this.state;
    return (
      <div>
        <Header />
        <Timer
          timerOff={ this.timerOff }
        />
        {answers && (
          <>
            <h3
              data-testid="question-category"
            >
              Categoria:
              {' '}
              {questions[count].category}
            </h3>
            <h3
              data-testid="question-text"
            >
              Pergunta:
              {' '}
              {questions[count].question}
            </h3>
            <section
              data-testid="answer-options"
            >
              {
                answerArrSort?.map((answer, index) => (
                  <button
                    type="button"
                    key={ index }
                    data-testid={ answer.dataTesting }
                    disabled={ isDisabledQuestion }
                    onClick={ this.responded }
                  >
                    {answer.answer}

                  </button>
                ))
              }
            </section>
            {
              isResponded && <button data-testid="btn-next">Next</button>
            }
          </>
        )}

      </div>

    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
