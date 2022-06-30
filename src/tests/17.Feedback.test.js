import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

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
  renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback' );
});
