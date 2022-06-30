import api from '../../service/api';

export const TOKEN_RESPONSE = 'TOKEN_RESPONSE';
export const DATA_USER = 'DATA_USER';
export const TIMER_RESPONSE = 'TIMER_RESPONSE';
export const SCORE_UP = 'SCORE_UP';

const tokenResponse = (state) => ({
  type: TOKEN_RESPONSE,
  payload: state,
});

export const dataUser = (state) => ({
  type: DATA_USER,
  payload: state,
});

export const timerResponse = (state) => ({
  type: TIMER_RESPONSE,
  payload: state,
});

export const scoreUp = (state) => ({
  type: SCORE_UP,
  payload: state,
});

export const fetchToken = () => async (dispatch) => {
  const result = await api();
  dispatch(tokenResponse(result));
};

export default tokenResponse;
