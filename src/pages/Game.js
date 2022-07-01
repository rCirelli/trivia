import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scoreUp, clearScore } from '../redux/actions';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends Component {
  state = {
    timerStop: 0,
    answerArrSort: [],
    questions: [],
    answers: '',
    count: 0,
    isResponded: false,
    isDisabledQuestion: false,
    isPaused: false,
    isNext: false,
  }

  correctAnswerStyle = {
    border: '3px solid rgb(6, 240, 15)',
  }

  wrongAnswerStyle = {
    border: '3px solid red',
  }

  componentDidMount() {
    const { history, dispatch } = this.props;
    dispatch(clearScore());
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

  responded = ({ target: { id } }) => {
    this.setState({ isResponded: true, isDisabledQuestion: true, isPaused: true });
    this.scoreboard(id);
  }

  setTimerStop = (time) => {
    this.setState({ timerStop: time });
  }

  scoreboard = (response) => {
    const { count, questions, timerStop } = this.state;
    const { dispatch } = this.props;
    const difficultyValue = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const { difficulty } = questions[count];
    const constScore = 10;
    if (response === questions[count].correct_answer) {
      const score = constScore + (timerStop * difficultyValue[difficulty]);
      dispatch(scoreUp({ score }));
    }
  }

  nextQuestion = () => {
    const { count } = this.state;
    const { history } = this.props;
    const MAX_ARRAY = 4;
    if (count < MAX_ARRAY) {
      this.setState((prev) => ({
        isResponded: false,
        count: prev.count + 1,
        isDisabledQuestion: false,
        isPaused: false,
        isNext: true,
      }));
    } else {
      this.saveRanking();
      history.push('/feedback');
    }
  }

  saveRanking = () => {
    const { score, name, gravatarEmail } = this.props;
    let ranking = localStorage.getItem('ranking') || '[]';
    ranking = JSON.parse(ranking);
    ranking.push({ score, name, picture: gravatarEmail });
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  resetNext = () => {
    this.setState({ isNext: false });
  }

  timerOff = () => {
    this.setState({ isDisabledQuestion: true });
    this.responded({ target: { value: 'erro' } });
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
    const { questions, count, isPaused,
      answers, isResponded, isNext,
      isDisabledQuestion, answerArrSort } = this.state;
    return (
      <div>
        <Header />
        <Timer
          setTimerStop={ this.setTimerStop }
          timerOff={ this.timerOff }
          isPaused={ isPaused }
          isNext={ isNext }
          resetNext={ this.resetNext }
        />
        {answers && (
          <>
            <h3>
              Categoria:
              {' '}
            </h3>
            <h3 data-testid="question-category">
              {questions[count].category}
            </h3>
            <h3>
              Pergunta:
              {' '}
            </h3>
            <h3 data-testid="question-text">
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
                    id={ answer.answer }
                    key={ index }
                    data-testid={ answer.dataTesting }
                    disabled={ isDisabledQuestion }
                    onClick={ (event) => this.responded(event) }
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

const mapStateToProps = (state) => ({
  timerResponse: state.player.timerResponse,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
