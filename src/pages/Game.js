import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: '',
    answers: '',
    count: 0,
  }

  async componentDidMount() {
    const RESPONDE_CODE_WRONG = 3;
    const tokenUser = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${tokenUser}`, {
      method: 'GET',
    }).then((response) => response.json()).then((data) => {
      if (data.response_code === RESPONDE_CODE_WRONG) {
        localStorage.clear();
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
    });
  }

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

  render() {
    const { questions, count, answers } = this.state;
    return (
      <div>
        <Header />
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
              data-testid
            >
              Pergunta:
              {' '}
              {questions[count].question}
            </h3>
            {
              this.shuffleArray(answers).map((answer, index) => (
                <p
                  key={ index }
                  data-testid={ answer.dataTesting }
                >
                  {answer.answer}

                </p>
              ))
            }
          </>
        )}

      </div>

    );
  }
}

export default Game;
