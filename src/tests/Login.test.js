import React from 'react'
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import  mockData, {
  INICIAL_STATE_MOCK,
  EMPTY_USER_NAME,
  EMPTY_USER_EMAIL,
  VALID_USER_NAME,
  VALID_USER_EMAIL,
} from './helpers/mockData';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockData)
    }))
}

describe('Crie uma tela de login', () => {
  const inicial = INICIAL_STATE_MOCK;
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  test('A Rota  deve ser \'/\'',() => {
    const { history } = renderWithRouterAndRedux(<Login/>)
    expect( history.location.pathname).toBe('/');
  });

  test('Tela de Login possui local para User Name, Email User e botões Play e Configurações' 
  , () => {
    renderWithRouterAndRedux(<Login/>, '/', inicial);
    const inputNameUser = screen.getByTestId('input-player-name');
    const inputEmailUser = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-play')

    expect(inputNameUser).toBeInTheDocument();
    expect(inputEmailUser).toBeInTheDocument(); 
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
  });

  test('Botões possuem os nomes corretos ', () => {
    renderWithRouterAndRedux(<Login/>, '/', inicial);
    const btnPlay = screen.getByTestId('btn-play');
    const btnSettings = screen.getByTestId('btn-settings');

    expect(btnPlay).toHaveTextContent('Play');
    expect(btnSettings).toHaveTextContent('Configurações')
  });

  test('Botão Configurações ao ser Clicado redireciona para a pagina de Config', () => {
    const { history } =  renderWithRouterAndRedux(<Login/>, '/', inicial);
    const btnSettings = screen.getByTestId('btn-settings');
    expect(btnSettings).toBeInTheDocument();
    userEvent.click(btnSettings);
    expect(history.location.pathname).toBe('/config');
  });

  test('Verifica se os campos são preenchidos corretamente para habilitar o botão play', () => {
    renderWithRouterAndRedux(<Login/>, '/', inicial);
    const inputNameUser = screen.getByTestId('input-player-name');
    const inputEmailUser = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputNameUser, EMPTY_USER_NAME);
    userEvent.type(inputEmailUser, EMPTY_USER_EMAIL);
    expect(btnPlay).toBeDisabled();
   
    userEvent.type(inputNameUser, EMPTY_USER_NAME);
    userEvent.type(inputEmailUser, VALID_USER_EMAIL);
    expect(btnPlay).toBeDisabled();
  });

  test('Verifica se os campos são preenchidos corretamente para habilitar o botão play, segunda parte', () => {
    renderWithRouterAndRedux(<Login/>, '/', inicial);
    const inputNameUser = screen.getByTestId('input-player-name');
    const inputEmailUser = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputNameUser, VALID_USER_NAME);
    userEvent.type(inputEmailUser, EMPTY_USER_EMAIL);
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputNameUser, VALID_USER_NAME);
    userEvent.type(inputEmailUser, VALID_USER_EMAIL);
    expect(btnPlay).not.toBeDisabled();
  });

  test('Verificar se o email e User é salvo no store', () => {
    const { store } = renderWithRouterAndRedux(<Login/>, '/', inicial)
    const inputNameUser = screen.getByTestId('input-player-name');
    const inputEmailUser = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputNameUser, VALID_USER_NAME);
    userEvent.type(inputEmailUser, VALID_USER_EMAIL);
    expect(btnPlay).not.toBeDisabled();
    userEvent.click(btnPlay);

    expect(store.getState().player.gravatarEmail).toBe(VALID_USER_EMAIL);
    expect(store.getState().player.name).toBe(VALID_USER_NAME);
  });

  test('Vaerifica se API Trivia é chamada', async () => {
    renderWithRouterAndRedux(<Login/>, '/', inicial)
    const inputNameUser = screen.getByTestId('input-player-name');
    const inputEmailUser = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(inputNameUser, VALID_USER_NAME);
    userEvent.type(inputEmailUser, VALID_USER_EMAIL);
    expect(btnPlay).not.toBeDisabled();
    userEvent.click(btnPlay);
    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
  });

})