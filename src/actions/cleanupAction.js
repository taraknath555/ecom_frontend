import { RESET_STORE } from "../constants/globalConstants";

const cleanup = () => (dispatch) => {
  dispatch({
    type: RESET_STORE,
  });
};

export default cleanup;
