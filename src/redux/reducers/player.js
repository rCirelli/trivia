import { DATA_USER, TIMER_RESPONSE, SCORE_UP } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  timerResponse: 0,
};

export default function player(state = INITIAL_STATE, action) {
  if (action.type === DATA_USER) {
    return ({
      ...state,
      name: action.payload.name,
      email: action.payload.email,
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
    });
  }
  return state;
}
