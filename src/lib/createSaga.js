import { call, put } from 'redux-saga/effects';

export default function createSaga(type, request) {
    return function* (action) {
        const success = `${type}_SUCCESS`;
        const failure = `${type}_FAILURE`;

        try {
            const response = yield call(request, action);
            yield put({
                type: success,
                payload: response.data,
                response: response
            });
        }
        catch (e) {
            yield put({
                type: failure,
                payload: e.response.data,
                response: e.response
            });
        }
    }
}