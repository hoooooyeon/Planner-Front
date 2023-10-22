
import { takeLatest } from "redux-saga/effects";
import { inviteAccept, inviteReject } from "../lib/api/invitationAPI";
import createSaga from "../lib/createSaga";

// 액션 타입
const INITIALIZE_TYPE = 'invitation/INITIALIZE';
const INVITE_ACCEPT_TYPE = 'invitation/INVITE_ACCEPT';
const INVITE_ACCEPT_SUCCESS_TYPE = 'invitation/INVITE_ACCEPT_SUCCESS';
const INVITE_ACCEPT_FAILURE_TYPE = 'invitation/INVITE_ACCEPT_FAILURE';

const INVITE_REJECT_TYPE = 'invitation/INVITE_REJECT';
const INVITE_REJECT_SUCCESS_TYPE = 'invitation/INVITE_REJECT_SUCCESS';
const INVITE_REJECT_FAILURE_TYPE = 'invitation/INVITE_REJECT_FAILURE';

export const invitationInitializeAction = () => ({
    type: INITIALIZE_TYPE
})

export const inviteAcceptAction = (link) => ({
    type: INVITE_ACCEPT_TYPE,
    link
});

export const inviteRejectAction = (link) => ({
    type: INVITE_REJECT_TYPE,
    link
});

const inviteAcceptSaga = createSaga(INVITE_ACCEPT_TYPE, inviteAccept);
const inviteRejectSaga = createSaga(INVITE_REJECT_TYPE, inviteReject);

export function* invitationSaga() {
    yield takeLatest(INVITE_ACCEPT_TYPE, inviteAcceptSaga);
    yield takeLatest(INVITE_REJECT_TYPE, inviteRejectSaga);
};

const initialState = {
    invitation: {
        state: null,
        message: '',
        data: null
    }
}

function invitationReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_TYPE: {
            return { ...initialState };
        }
        case INVITE_ACCEPT_SUCCESS_TYPE:
        case INVITE_REJECT_SUCCESS_TYPE:
        case INVITE_ACCEPT_FAILURE_TYPE:
        case INVITE_REJECT_FAILURE_TYPE: {
            return { ...state, invitation: action.payload };
        }
        default:
            return state;
    }
};

export default invitationReducer;