import createSaga from '../lib/createSaga';
import { notifyDelete, notifyRead } from '../lib/api/notificationAPI';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_TYPE = 'notification/INITIALIZE';

const NOTIFY_READ_TYPE = 'notification/NOTIFY_READ';
const NOTIFY_READ_SUCCESS_TYPE = 'notification/NOTIFY_READ_SUCCESS';
const NOTIFY_READ_FAILURE_TYPE = 'notification/NOTIFY_READ_FAILURE';

const NOTIFY_DELETE_TYPE = 'notification/NOTIFY_DELETE';
const NOTIFY_DELETE_SUCCESS_TYPE = 'notification/NOTIFY_DELETE_SUCCESS';
const NOTIFY_DELETE_FAILURE_TYPE = 'notification/NOTIFY_DELETE_FAILURE';

export const notificationInitializeAction = () => ({
    type: INITIALIZE_TYPE,
});

export const notifyReadAction = ({ notificationId }) => ({
    type: NOTIFY_READ_TYPE,
    notificationId,
});

export const notifyDeleteAction = ({ notificationId }) => ({
    type: NOTIFY_DELETE_TYPE,
    notificationId,
});

const notifyReadSaga = createSaga(NOTIFY_READ_TYPE, notifyRead);
const notifyDeleteSaga = createSaga(NOTIFY_DELETE_TYPE, notifyDelete);

export function* notificationSaga() {
    yield takeLatest(NOTIFY_READ_TYPE, notifyReadSaga);
    yield takeLatest(NOTIFY_DELETE_TYPE, notifyDeleteSaga);
}

const initialState = {
    notification: {
        state: null,
        message: '',
        data: null,
    },
};

function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_TYPE: {
            return { ...initialState };
        }
        case NOTIFY_READ_SUCCESS_TYPE:
        case NOTIFY_READ_FAILURE_TYPE:
        case NOTIFY_DELETE_SUCCESS_TYPE:
        case NOTIFY_DELETE_FAILURE_TYPE:
            return { ...state, notification: action.payload };
        default:
            return state;
    }
}

export default notificationReducer;
