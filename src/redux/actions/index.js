import api from '../../service/api';

export const TOKEN_RESPONSE = 'TOKEN_RESPONSE';

const tokenResponse = (state) => ({
  type: TOKEN_RESPONSE,
  payload: state,
});

export const fetchToken = () => async (dispatch) => {
  const result = await api();
  dispatch(tokenResponse(result));
};

export default tokenResponse;
