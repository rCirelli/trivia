import { DATA_USER, TIMER_RESPONSE, SCORE_UP, CLEAR_SCORE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timerResponse: 0,
};

export default function player(state = INITIAL_STATE, action) {
  if (action.type === DATA_USER) {
    return ({
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    });
  }
  if (action.type === CLEAR_SCORE) {
    return ({
      ...state,
      score: 0,
    });
  }
  if (action.type === TIMER_RESPONSE) {
    return ({
      ...state,
      timerResponse: action.payload.timerResponse,
    });
  }
  if (action.type === SCORE_UP) {
    return ({
      ...state,
      score: +(state.score) + +(action.payload.score),
      assertions: +(state.assertions) + 1,
    });
  }
  return state;
}
