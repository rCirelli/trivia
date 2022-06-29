import { TOKEN_RESPONSE } from '../actions/index';

const INITIAL_STATE = {
  ranking: [],
  token: '',
};

export default function ranking(state = INITIAL_STATE, action) {
  if (action.type === TOKEN_RESPONSE) {
    return ({
      ...state,
      token: action.payload.token,
    });
  }
  return state;
}
