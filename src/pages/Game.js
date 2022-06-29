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

  correctAnswerStyle = {
    border: '3px solid rgb(6, 240, 15)',
  }

  wrongAnswerStyle = {
    border: '3px solid red',
  }

  componentDidMount() {
    const { history } = this.props;
    const RESPONDE_CODE_WRONG = 3;
    const tokenUser = localStorage.getItem('token');
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
        const { questions } = this.state;
        // Criação do banco de dados das questões com seus respectivos valores
        const answerArrSort = questions.map((question) => {
          const answers = question.incorrect_answers.map((answer, index) => (
            {
              answer,
              answerType: 'wrong',
              dataTesting: `wrong-answer-${index}`,
            }
          ));

          answers.push({
            answer: question.correct_answer,
            answerType: 'correct',
            dataTesting: 'correct-answer',
          });
          this.setState({ answers });
          const answerArrSort2 = this.shuffleArray(answers);
          return answerArrSort2;
        });
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
    this.setState({ isResponded: true, isDisabledQuestion: true });
  }

  nextQuestion = () => {
    const { count } = this.state;
    const MAX_ARRAY = 4;
    if (count < MAX_ARRAY) {
      this.setState((prev) => ({
        isResponded: false,
        count: prev.count + 1,
        isDisabledQuestion: false,
      }));
    }
  }

  timerOff = () => {
    this.setState({ isDisabledQuestion: true });
    this.responded();
  }

  applyStyle = (answerType) => {
    const { isResponded } = this.state;
    if (isResponded) {
      return this.typeStyle(answerType);
    }
  }

  typeStyle = (answerType) => {
    if (answerType === 'correct') {
      return this.correctAnswerStyle;
    }
    return this.wrongAnswerStyle;
  }

  render() {
    const { questions, count,
      answers, isResponded,
      isDisabledQuestion, answerArrSort } = this.state;
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
                answerArrSort[count]?.map((answer, index) => (
                  <button
                    style={ this.applyStyle(answer.answerType) }
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
              isResponded
              && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextQuestion }
                >
                  Next
                </button>
              )
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
