import { takeLatest } from 'redux-saga/effects';
import createSaga from '../lib/createSaga';
import * as authAPI from '../lib/api/authAPI';

// 액션 타입
const INITIALIZE_TYPE = 'auth/INITIALIZE';
const INITIALIZE_FROM_TYPE = 'auth/INITIALIZE_FORM';
const INITIALIZE_ERROR_TYPE = 'auth/INITIALIZE_ERROR';
const CHANGE_FIELD_TYPE = 'auth/CHANGE_FIELD';
const VALIDATE_TYPE = 'auth/VALIDATE';
const CODE_TIMER_END_TYPE = 'auth/CODE_TIMER_END';

export const LOGIN_TYPE = 'auth/LOGIN';
const LOGIN_SUCCESS_TYPE = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE_TYPE = 'auth/LOGIN_FAILURE';

export const REGISTER_TYPE = 'auth/REGISTER';
const REGISTER_SUCCESS_TYPE = 'auth/REGISTER_SUCCESS';
const REGISTER_FAILURE_TYPE = 'auth/REGISTER_FAILURE';

export const EMAIL_CODE_REQUEST_TYPE = 'auth/EMAIL_CODE_REQUEST';
const EMAIL_CODE_REQUEST_SUCCESS_TYPE = 'auth/EMAIL_CODE_REQUEST_SUCCESS';
const EMAIL_CODE_REQUEST_FAILURE_TYPE = 'auth/EMAIL_CODE_REQUEST_FAILURE';

export const EMAIL_CODE_CHECK_TYPE = 'auth/EMAIL_CODE_CHECK';
const EMAIL_CODE_CHECK_SUCCESS_TYPE = 'auth/EMAIL_CODE_CHECK_SUCCESS';
const EMAIL_CODE_CHECK_FAILURE_TYPE = 'auth/EMAIL_CODE_CHECK_FAILURE';

export const PHONE_CODE_REQUEST_TYPE = 'auth/PHONE_CODE_REQUEST';
const PHONE_CODE_REQUESET_SUCCESS_TYPE = 'auth/PHONE_CODE_REQUEST_SUCCESS';
const PHONE_CODE_REQUEST_FAILURE_TYPE = 'auth/PHONE_CODE_REQUEST_FAILURE';

// const phoneCodeCheckType = 'auth/PHONE_CODE_CHECK_TYPE';
// const phoneCodeCheckSuccessType = 'auth/PHONE_CODE_CHECK_SUCCESS_TYPE';
// const phoneCodeCheckFailureType = 'auth/PHONE_CODE_CHECK_FAILURE_TYPE';

export const TOKEN_REISSUE_TYPE = 'auth/TOKEN_REISSUE';
export const TOKEN_REISSUE_SUCCESS_TYPE = 'auth/TOKEN_REISSUE_SUCCESS';
const TOKEN_REISSUE_FAILURE_TYPE = 'auth/TOKEN_REISSUE_FAILURE';

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

export const codeTimerEndAction = (error) => ({
    type: CODE_TIMER_END_TYPE,
    error,
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

export const emailCodeRequestAction = (email) => ({
    type: EMAIL_CODE_REQUEST_TYPE,
    email
});

export const emailCodeCheckAction = ({ email, code }) => ({
    type: EMAIL_CODE_CHECK_TYPE,
    email,
    code
});

export const tokenRissueAction = () => ({
    type: TOKEN_REISSUE_TYPE
});

export const loginSaga = createSaga(LOGIN_TYPE, authAPI.login);
export const registerSaga = createSaga(REGISTER_TYPE, authAPI.register);
export const emailCodeRequestSaga = createSaga(EMAIL_CODE_REQUEST_TYPE, authAPI.emailCodeRequest);
export const emailCodeCheckSaga = createSaga(EMAIL_CODE_CHECK_TYPE, authAPI.emailCodeCheck);
export const tokenReissueSaga = createSaga(TOKEN_REISSUE_TYPE, authAPI.tokenReissue);

export function* authSaga() {
    yield takeLatest(LOGIN_TYPE, loginSaga);
    yield takeLatest(REGISTER_TYPE, registerSaga);
    yield takeLatest(EMAIL_CODE_REQUEST_TYPE, emailCodeRequestSaga);
    yield takeLatest(EMAIL_CODE_CHECK_TYPE, emailCodeCheckSaga);
    yield takeLatest(TOKEN_REISSUE_TYPE, tokenReissueSaga);
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
    emailConfirm: {
        email: '',
        code: '',
        emailCodeRequest: false,
        emailCodeCheck: false
    },
    registerSuccess: false,
    account: undefined,
    accessToken: '',
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
                emailConfirm: initialState.emailConfirm,
                registerSuccess: initialState.registerSuccess,
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
        case CODE_TIMER_END_TYPE: {
            return { ...state, emailConfirm: initialState.emailConfirm, authError: action.error };
        }
        case LOGIN_SUCCESS_TYPE: {
            return {
                ...state,
                account: action.payload.data.user,
                accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwbGFubmVyIiwiaWF0IjoxNzAzODI5MTAzLCJleHAiOjE3MDM4MjkxMDMsInVzZXJJZCI6MX0.gQ5sBc0j72i7xfgS-6bi8tlxRXihTllp5k7eHPFTv9Y',
                // accessToken: action.payload.data.accessToken,
                state: { ...action.payload }
            };
        }
        case REGISTER_SUCCESS_TYPE: {
            return { ...state, registerSuccess: true };
        }
        case VALIDATE_TYPE: {
            return { ...state, authError: { ...action.validState } };
        }
        case EMAIL_CODE_REQUEST_SUCCESS_TYPE: {
            return { ...state, emailConfirm: { ...state.emailConfirm, emailCodeRequest: true } };
        }
        case EMAIL_CODE_CHECK_SUCCESS_TYPE: {
            return { ...state, emailConfirm: { ...state.emailConfirm, emailCodeCheck: true } };
        }
        case TOKEN_REISSUE_SUCCESS_TYPE: {
            return { ...state, accessToken: action.payload.data.accessToken };
        }
        case LOGIN_FAILURE_TYPE:
        case REGISTER_FAILURE_TYPE:
        case EMAIL_CODE_REQUEST_FAILURE_TYPE:
        case EMAIL_CODE_CHECK_FAILURE_TYPE: {
            return { ...state, authError: action.payload.message, state: { ...action.payload } };
        }
        default: {
            return state;
        }
    }
}

export default authReducer;
