'@testing-library/jest-dom'
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';

const INITIAL_STATE = {
  player: {
    name: 'Nome da Pessoa',
    assertions: 2,
    score: 0,
    gravatarEmail: 'email@dapessoa.com',
    timerResponse: 0,
  },
};

const LOCAL_STORAGE = [
  {score: 140, name: "Nome 1", picture: "asdasda@teste.com"},
  {score: 10, name: "Nome 2", picture: "adlasdklahsdklh@aldjasldjk.com"},
  {score: 10, name: "Nome 3", picture: ""},
  {score: 71, name: "Nome 4", picture: "ldjaldjalsdjaskldj@alsdjasldjasldjk.com"},
  {score: 10, name: "Nome 5", picture: "teste@teste.com"},

]

describe('Testa a tela de Ranking', () => {

  it('deve exibir todos os elementos corretamente', () => {
    window.localStorage.setItem('ranking', JSON.stringify(LOCAL_STORAGE));
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking' );

    const profilePicture = screen.getAllByTestId("header-profile-picture")[0];
    const playerName = screen.getByTestId("player-name-0");
    const playerScore = screen.getByTestId("player-score-0");

    expect(profilePicture).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();

    const homeBtn = screen.getByTestId("btn-go-home");
    expect(homeBtn).toBeInTheDocument()
    userEvent.click(homeBtn);

    expect(history.location.pathname).toBe('/');
  });
});
