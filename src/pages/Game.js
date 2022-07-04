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
    selectedAnswer: '',
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

  decodeUtf8 = (s) => decodeURI(s);

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

  responded = ({ target, target: { id } }) => {
    this.setState({ isResponded: true, isDisabledQuestion: true, isPaused: true });
    this.scoreboard(id);
    this.setState({ selectedAnswer: target.innerText })
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

  applyStyle = ({ answer, answerType }) => {
    const { isResponded, selectedAnswer } = this.state;
    if (isResponded && selectedAnswer === answer) {
      return `${this.typeStyle(answerType)} border border-4 border-violet-700 animate-pulse`;
    }
    if (isResponded) {
      return this.typeStyle(answerType);
    }
  }

  // typeStyle = (answerType) => {
  //   if (answerType === 'correct') {
  //     return this.correctAnswerStyle;
  //   }
  //   return this.wrongAnswerStyle;
  // }
  typeStyle = (answerType) => {
    if (answerType === 'correct') {
      return "bg-green-500";
    }
    return "bg-red-600";
  }

  render() {
    const { questions, count, isPaused,
      answers, isResponded, isNext,
      isDisabledQuestion, answerArrSort } = this.state;
    return (
      <>
        <Header />
        <div className="py-10 flex flex-col justify-center items-center w-full">
          <Timer
            setTimerStop={ this.setTimerStop }
            timerOff={ this.timerOff }
            isPaused={ isPaused }
            isNext={ isNext }
            resetNext={ this.resetNext }
          />
          <div className="mt-7 pt-7 rounded-lg bg-violet-100 max-w-3xl">
            {answers && (
              <div
                className="flex flex-col justify-center items-center
                gap-5 text-center"
              >
                <h3
                  data-testid="question-category"
                  className="text-violet-900 font-bold"
                >
                  {questions[count].category}
                </h3>
                <h2
                  data-testid="question-text"
                  className="text-violet-900 px-10 text-lg"
                >
                  {this.decodeUtf8(questions[count].question)}
                </h2>
                <section
                  data-testid="answer-options"
                  className="flex flex-col justify-center items-center"
                >
                  <div className="flex flex-wrap justify-center items-center m-auto w-9/12 gap-5 mb-5">
                    {
                    answerArrSort[count]?.map((answer, index) => (
                      <button
                        className={`font-medium p-3 w-48 h-20 rounded-lg bg-[#07DBAC] ${this.applyStyle(answer)}`}
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
                  </div>
                </section>
                {
                  isResponded
                && (
                  <button
                    className="w-full rounded-b-lg py-3 bg-[#07DBAC] text-lg font-medium"
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.nextQuestion }
                  >
                    Next Question
                  </button>
                )
                }
              </div>
            )}
          </div>

        </div>
      </>
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
