const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = (requestType) => ({ type: START_LOADING, requestType });
export const finishLoading = (requestType) => ({ type: FINISH_LOADING, requestType });

const initialState = {};

function loading(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        requestType: true,
      };
    case FINISH_LOADING:
      return {
        ...state,
        requestType: false,
      };
    default:
      return state;
  }
}

export default loading;
