import { DATA_USER } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

export default function player(state = INITIAL_STATE, action) {
  if (action.type === DATA_USER) {
    return ({
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    });
  }
  return state;
}
