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

describe('Testa a tela de Feedbacks', () => {

  it('deve exibir todos os elementos corretamente', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback' );

    const messageHeading = screen.getByRole('heading', {  name: /could be better\.\.\./i});
    const scoreText = screen.getByTestId('feedback-total-score');
    const assertionsText = screen.getByTestId('feedback-total-question');
    const rankingBtn = screen.getByRole('button', {  name: /ranking/i});
    const playAgainBtn = screen.getByRole('button', {  name: /play again/i});
  
    expect(messageHeading).toBeInTheDocument();
    expect(scoreText).toBeInTheDocument();
    expect(assertionsText).toBeInTheDocument();
    expect(rankingBtn).toBeInTheDocument();
    expect(playAgainBtn).toBeInTheDocument();
  });
  it('ao clicar em Play Again deve ser redirecionado para a pagina correta', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback' );

    const playAgainBtn = screen.getByRole('button', {  name: /play again/i});
    userEvent.click(playAgainBtn);

    expect(history.location.pathname).toBe('/');
  });
  it('ao clicar em Ranking deve ser redirecionado para a pagina correta', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback' );

    const rankingBtn = screen.getByRole('button', {  name: /ranking/i});
    userEvent.click(rankingBtn);

    expect(history.location.pathname).toBe('/ranking');
  });
});
