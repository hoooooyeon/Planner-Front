import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as spotAPI from '../lib/api/spots';
import { takeLatest } from 'redux-saga/effects';

const [READ_SPOT, READ_SPOT_SUCCESS, READ_SPOT_FAILURE] = createRequestActionTypes('spot/READ_SPOT');

export const readSpot = (id) => ({
  type: READ_SPOT,
  id,
});

const readSpotSaga = createRequestSaga(READ_SPOT, spotAPI.readSpot);
export function* spotSaga() {
  yield takeLatest(READ_SPOT, readSpotSaga);
}

const initialState = {
  spot: null,
  spotError: null,
};

function spot(state = initialState, action) {
  switch (action.type) {
    case READ_SPOT_SUCCESS:
      return {
        ...state,
        spotError: null,
        spot,
      };
    case READ_SPOT_FAILURE:
      return {
        ...state,
        spotError: action.error,
      };
    default:
      return state;
  }
}

export default spot;
