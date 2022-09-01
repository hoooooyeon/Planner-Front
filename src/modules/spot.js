import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as spotAPI from '../lib/api/spot';
import { takeLatest } from 'redux-saga/effects';

const [SPOTINFO, SPOTINFO_SUCCESS, SPOTINFO_FAILURE] = createRequestActionTypes('spot/SPOTINFO');

export const spotInfo = (spotName, spotImage, detail) => ({
  type: SPOTINFO,
  spotName,
  spotImage,
  detail,
});

const spotInfoSaga = createRequestSaga(SPOTINFO, spotAPI.spotInfo);
export function* spotSaga() {
  yield takeLatest(SPOTINFO, spotInfoSaga);
}

const initialState = {
  spotInfo: {
    spotName: '',
    spotImage: '',
    detail: '',
  },
  spot: null,
  spotError: null,
};

function spot(state = initialState, action) {
  switch (action.type) {
    case SPOTINFO_SUCCESS:
      return {
        ...state,
        spotError: null,
        spot,
      };
    case SPOTINFO_FAILURE:
      return {
        ...state,
        spotError: error,
      };
    default:
      return state;
  }
}
