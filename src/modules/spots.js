import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as spotsAPI from '../lib/api/spots';
import { takeLatest } from 'redux-saga/effects';

const [LIST_SPOTS, LIST_SPOTS_SUCCESS, LIST_SPOTS_FAILURE] = createRequestActionTypes('spots/LIST_SPOTS');

export const listSpots = () => ({
  type: LIST_SPOTS,
});

const listSpotsSaga = createRequestSaga(LIST_SPOTS, spotsAPI.listSpots);
export function* spotsSaga() {
  yield takeLatest(LIST_SPOTS, listSpotsSaga);
}

const initialState = {
  spots: [
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
  spotsError: null,
};

function spots(state = initialState, action) {
  switch (action.type) {
    case LIST_SPOTS_SUCCESS:
      return {
        ...state,
        spotsError: null,
        // spots,
      };
    case LIST_SPOTS_FAILURE:
      return {
        ...state,
        spotsError: action.error,
      };
    default:
      return state;
  }
}

export default spots;
