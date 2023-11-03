import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';
import * as authAPI from '../lib/api/authAPI';

// 액션 타입
const initializeType = 'auth/INITIALIZE';
const initializeFormType = 'auth/INITIALIZE_FORM';
const initializeErrorType = 'auth/INITIALIZE_ERROR';
const changeFieldType = 'auth/CHANGE_FIELD';
const validateType = 'auth/VALIDATE';

const loginType = 'auth/LOGIN';
const loginSuccessType = 'auth/LOGIN_SUCCESS';
const loginFailureType = 'auth/LOGIN_FAILURE';

const registerType = 'auth/REGISTER';
const registerSuccessType = 'auth/REGISTER_SUCCESS';
const registerFailureType = 'auth/REGISTER_FAILURE';

// const emailCodeSendType = 'auth/EMAIL_CODE_SEND_TYPE';
// const emailCodeSendSuccessType = 'auth/EMAIL_CODE_SEND_SUCCESS_TYPE';
// const emailCodeSendFailureType = 'auth/EMAIL_CODE_SEND_FAILURE_TYPE';

// const emailCodeCheckType = 'auth/EMAIL_CODE_CHECK_TYPE';
// const emailCodeCheckSuccessType = 'auth/EMAIL_CODE_CHECK_SUCCESS_TYPE';
// const emailCodeCheckFailureType = 'auth/EMAIL_CODE_CHECK_FAILURE_TYPE';

export const phoneCodeRequestType = 'auth/PHONE_CODE_REQUEST_TYPE';
const phoneCodeRequestSuccessType = 'auth/PHONE_CODE_REQUEST_SUCCESS_TYPE';
const phoneCodeRequestFailureType = 'auth/PHONE_CODE_REQUEST_FAILURE_TYPE';

// const phoneCodeCheckType = 'auth/PHONE_CODE_CHECK_TYPE';
// const phoneCodeCheckSuccessType = 'auth/PHONE_CODE_CHECK_SUCCESS_TYPE';
// const phoneCodeCheckFailureType = 'auth/PHONE_CODE_CHECK_FAILURE_TYPE';

// 액션함수
export const initialize = () => ({
    type: initializeType,
});

export const initializeForm = (form) => ({
    type: initializeFormType,
    form,
});

export const initializeError = () => ({
    type: initializeErrorType,
});

export const changeField = ({ form, field, value }) => ({
    type: changeFieldType,
    form,
    field,
    value,
});

export const validateFieldAction = (validState) => ({
    type: validateType,
    validState,
});

export const loginAction = ({ email, password }) => ({
    type: loginType,
    email,
    password,
});

export const registerAction = ({ email, password, username, nickname, phone }) => ({
    type: registerType,
    email,
    password,
    username,
    nickname,
    phone,
});

export const loginSaga = createSaga(loginType, authAPI.login);
export const registerSaga = createSaga(registerType, authAPI.register);

export function* authSaga() {
    yield takeLatest(loginType, loginSaga);
    yield takeLatest(registerType, registerSaga);
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
        case initializeType: {
            return {
                ...state,
                login: initialState.login,
                register: initialState.register,
                authentication: initialState.authentication,
                state: initialState.state,
            };
        }
        case initializeFormType: {
            return { ...state, [action.form]: initialState[action.form] };
        }
        case initializeErrorType: {
            return { ...state, authError: initialState.authError };
        }
        case changeFieldType: {
            return { ...state, [action.form]: { ...state[action.form], [action.field]: action.value } };
        }
        case loginSuccessType: {
            return {
                ...state,
                account: action.payload.data,
                state: { ...action.payload },
                token: action.payload.token,
            };
        }
        case registerSuccessType: {
            return { ...state, state: { ...action.payload } };
        }
        case validateType: {
            return { ...state, authError: { ...action.validState } };
        }
        case loginFailureType:
        case registerFailureType: {
            return { ...state, authError: action.payload.message, state: { ...action.payload } };
        }
        default: {
            return state;
        }
    }
}

export default authReducer;
