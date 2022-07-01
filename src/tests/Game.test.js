import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import '@testing-library/jest-dom';
import App from '../App';

const questions = {
    response_code:0,
    results:[
        {
          "category":"Entertainment: Video Games",
          "type":"boolean",
          "difficulty":"hard",
          "question":"TF2: Sentry rocket damage falloff is calculated based on the distance between the sentry and the enemy, not the engineer and the enemy",
          "correct_answer":"False",
          "incorrect_answers": [
              "True"
          ]
        },
        {
            "category":"testnext",
            "type":"boolean",
            "difficulty":"hard",
            "question":"Estou na proxima pergunta?",
            "correct_answer":"True",
            "incorrect_answers": [
                "False"
            ]
          },
          {
              "category":"testnext",
              "type":"boolean",
              "difficulty":"hard",
              "question":"Estou na proxima pergunta?",
              "correct_answer":"True",
              "incorrect_answers": [
                  "False"
              ]
            },
            {
                "category":"testnext",
                "type":"boolean",
                "difficulty":"hard",
                "question":"Estou na proxima pergunta?",
                "correct_answer":"True",
                "incorrect_answers": [
                    "False"
                ]
              },
              {
                  "category":"testnext",
                  "type":"boolean",
                  "difficulty":"hard",
                  "question":"Estou na proxima pergunta?",
                  "correct_answer":"True",
                  "incorrect_answers": [
                      "False"
                  ]
                }
    ]
  };

  const initialState = { player : {
    name: 'test',
    assertions:'',
    score:0,
    gravatarEmail:'test@test.com',
    timerResponse:0,
    },
    ranking: {
        ranking: [],
        token: ''
    }
};  

describe('Testando page Game', () => {
    test('Testando informações Header', () => {
        const { history } = renderWithRouterAndRedux(<App />, 
            initialState,
            '/Game',
          );
        expect(history.location.pathname).toBe('/Game');
        const imgPerfil = screen.getByTestId('header-profile-picture');
        expect(imgPerfil).toBeInTheDocument();
        const name = screen.getByTestId('header-player-name');
        expect(name).toBeInTheDocument();
        const score = screen.getByText(/score/i);
        expect(score).toBeInTheDocument();
        const numberScore = screen.getByText('0');
        expect(numberScore).toBeInTheDocument();
        const timer = screen.getByText(/timer/i);
        expect(timer).toBeInTheDocument();
        const valueTimer = screen.getByText(/30/i);
        expect(valueTimer).toBeInTheDocument();
      });
      test('Testando informações das perguntas', async () => {      
          const mock = jest.spyOn(global, 'fetch');
          global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(questions),
          });
          const { history } = renderWithRouterAndRedux(<App />, 
            initialState,
            '/Game',
          );
        expect(history.location.pathname).toBe('/Game');
        expect(global.fetch).toBeCalledTimes(1);
        expect(global.fetch).toBeCalledWith(
            'https://opentdb.com/api.php?amount=5&token=null',
        );
        const category = await screen.findByText(/Entertainment: Video Games/i);
        expect(category).toBeInTheDocument();
        const question = await screen.findByText(/TF2: Sentry rocket damage falloff/i);
        expect(question).toBeInTheDocument();
        const correctButton = await screen.findByTestId('correct-answer');
        const incorrectButton = await screen.findByTestId('wrong-answer-0');
        userEvent.click(correctButton);
        expect(correctButton).toBeDisabled();
        expect(incorrectButton).toBeDisabled();
        expect(correctButton).toHaveAttribute('style', expect.stringContaining('border: 3px solid rgb(6, 240, 15);'));
        expect(incorrectButton).toHaveAttribute('style', expect.stringContaining('border: 3px solid red;'));
        const nextButton = await screen.findByTestId('btn-next');
        expect(nextButton).toBeInTheDocument();
        userEvent.click(nextButton);
        const newQuestion = await screen.findByText(/Estou na proxima pergunta?/i);
        expect(newQuestion).toBeInTheDocument();
        mock.mockRestore();
      });
      test('Testando se responde as 5 perguntas', async () => {  
        const mock = jest.spyOn(global, 'fetch');
          global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(questions),
          });   
          const { history } = renderWithRouterAndRedux(<App />, 
            initialState,
            '/Game',
          );
        expect(history.location.pathname).toBe('/Game');
        for(let i = 0; i < 5; i += 1) {
            const correctButton = await screen.findByTestId('correct-answer');
            userEvent.click(correctButton);
            const nextButton = await screen.findByTestId('btn-next');
            userEvent.click(nextButton);
        }
        expect(history.location.pathname).toBe('/feedback');
        mock.mockRestore();
      });
      test('Testando retorno sem token', async () => {
        const mock = jest.spyOn(global, 'fetch');
          global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
              response_code:3,
              results:[]
            }),
          });        
          const { history } = renderWithRouterAndRedux(<App />, 
            initialState,
            '/Game',
          );
        expect(history.location.pathname).toBe('/Game');
        mock.mockRestore();
      });
})