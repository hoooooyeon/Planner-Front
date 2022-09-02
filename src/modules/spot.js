import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as spotAPI from '../lib/api/spots';
import { takeLatest } from 'redux-saga/effects';

const [READ_SPOT, READ_SPOT_SUCCESS, READ_SPOT_FAILURE] = createRequestActionTypes('spot/READ_SPOT');

export const readSpot = () => ({
  type: READ_SPOT,
});

const readSpotSaga = createRequestSaga(READ_SPOT, spotAPI.readSpot);
export function* spotSaga() {
  yield takeLatest(READ_SPOT, readSpotSaga);
}

const initialState = {
  spot: [
    {
      spotId: 1,
      spotName: '테스트',
      spotImage: 'imagepath',
      contryName: '테스트',
      cityName: '테스트',
      detail: '테스트',
      likeCount: 0,
    },
    {
      spotId: 2,
      spotName: '천안 터미널',
      spotImage: 'ㅁㅁㅁ',
      contryName: '대한민국',
      cityName: '천안',
      detail: '서울같은 천안',
      likeCount: 50,
    },
  ],
  spotError: null,
};

function spot(state = initialState, action) {
  switch (action.type) {
    case READ_SPOT_SUCCESS:
      return {
        ...state,
        spotError: null,
        // spot,
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
