import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';
import * as authAPI from '../lib/api/authAPI';

// 액션 타입
const INITIALIZE_TYPE = 'auth/INITIALIZE';
const INITIALIZE_FROM_TYPE = 'auth/INITIALIZE_FORM';
const INITIALIZE_ERROR_TYPE = 'auth/INITIALIZE_ERROR';
const CHANGE_FIELD_TYPE = 'auth/CHANGE_FIELD';
const VALIDATE_TYPE = 'auth/VALIDATE';

export const LOGIN_TYPE = 'auth/LOGIN';
const LOGIN_SUCCESS_TYPE = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE_TYPE = 'auth/LOGIN_FAILURE';

export const REGISTER_TYPE = 'auth/REGISTER';
const REGISTER_SUCCESS_TYPE = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE_TYPE = 'auth/REGISTER_FAILURE';

// const emailCodeSendType = 'auth/EMAIL_CODE_SEND_TYPE';
// const emailCodeSendSuccessType = 'auth/EMAIL_CODE_SEND_SUCCESS_TYPE';
// const emailCodeSendFailureType = 'auth/EMAIL_CODE_SEND_FAILURE_TYPE';

// const emailCodeCheckType = 'auth/EMAIL_CODE_CHECK_TYPE';
// const emailCodeCheckSuccessType = 'auth/EMAIL_CODE_CHECK_SUCCESS_TYPE';
// const emailCodeCheckFailureType = 'auth/EMAIL_CODE_CHECK_FAILURE_TYPE';

export const PHONE_CODE_REQUEST_TYPE = 'auth/PHONE_CODE_REQUEST_TYPE';
const PHONE_CODE_REQUESET_SUCCESS_TYPE = 'auth/PHONE_CODE_REQUEST_SUCCESS_TYPE';
const PHONE_CODE_REQUEST_FAILURE_TYPE = 'auth/PHONE_CODE_REQUEST_FAILURE_TYPE';

// const phoneCodeCheckType = 'auth/PHONE_CODE_CHECK_TYPE';
// const phoneCodeCheckSuccessType = 'auth/PHONE_CODE_CHECK_SUCCESS_TYPE';
// const phoneCodeCheckFailureType = 'auth/PHONE_CODE_CHECK_FAILURE_TYPE';

// 액션함수
export const initialize = () => ({
    type: INITIALIZE_TYPE,
});

export const initializeForm = (form) => ({
    type: INITIALIZE_FROM_TYPE,
    form,
});

export const initializeError = () => ({
    type: INITIALIZE_ERROR_TYPE,
});

export const changeField = ({ form, field, value }) => ({
    type: CHANGE_FIELD_TYPE,
    form,
    field,
    value,
});

export const validateFieldAction = (validState) => ({
    type: VALIDATE_TYPE,
    validState,
});

export const loginAction = ({ email, password }) => ({
    type: LOGIN_TYPE,
    email,
    password,
});

export const registerAction = ({ email, password, username, nickname, phone }) => ({
    type: REGISTER_TYPE,
    email,
    password,
    username,
    nickname,
    phone,
});

export const loginSaga = createSaga(LOGIN_TYPE, authAPI.login);
export const registerSaga = createSaga(REGISTER_TYPE, authAPI.register);

export function* authSaga() {
    yield takeLatest(LOGIN_TYPE, loginSaga);
    yield takeLatest(REGISTER_TYPE, registerSaga);
}

const initialState = {
    login: {
        email: '',
        password: '',
    },
    register: {
        email: '',
        password: '',
        passwordConfirm: '',
        username: '',
        nickname: '',
        phone: '',
    },
    account: undefined,
    token: '',
    authError: {},
    state: {
        state: false,
        message: '',
    },
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_TYPE: {
            return {
                ...state,
                login: initialState.login,
                register: initialState.register,
                authentication: initialState.authentication,
                state: initialState.state,
            };
        }
        case INITIALIZE_FROM_TYPE: {
            return { ...state, [action.form]: initialState[action.form] };
        }
        case INITIALIZE_ERROR_TYPE: {
            return { ...state, authError: initialState.authError };
        }
        case CHANGE_FIELD_TYPE: {
            return { ...state, [action.form]: { ...state[action.form], [action.field]: action.value } };
        }
        case LOGIN_SUCCESS_TYPE: {
            return {
                ...state,
                account: action.payload.data,
                state: { ...action.payload },
                token: action.payload.token,
            };
        }
        case REGISTER_SUCCESS_TYPE: {
            return { ...state, state: { ...action.payload } };
        }
        case VALIDATE_TYPE: {
            return { ...state, authError: { ...action.validState } };
        }
        case LOGIN_FAILURE_TYPE:
        case REGISTER_FAILURE_TYPE: {
            return { ...state, authError: action.payload.message, state: { ...action.payload } };
        }
        default: {
            return state;
        }
    }
}

export default authReducer;
