import createSaga from "../lib/createSaga";
import { takeLatest } from 'redux-saga/effects';
import * as profileAPI from "../lib/api/profileAPI";

// 액션 타입
const changeFieldType = 'profile/CHANGE_FIELD';

const profileLoadType = 'profile/PROFILE_LOAD';
const profileLoadSuccessType = 'profile/PROFILE_LOAD_SUCCESS';
const profileLoadFailureType = 'profile/PROFILE_LOAD_FAILURE';

// 액션 함수
export const changeFieldAction = ({ form, value }) => ({
    type: changeFieldType,
    form,
    value
});

export const profileLoadAction = (accountId) => ({
    type: profileLoadType,
    accountId
});

const profileLoad = createSaga(profileLoadType, profileAPI.profileLoad);

export function* profileSaga() {
    yield takeLatest(profileLoadType, profileLoad);
};

const initialState = {
    profileFiled: {
        username: '',
        nickname: '',
        phone: ''
    },
    profile: null,
    profileError: null
};

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case changeFieldType: {
            return { ...state, profileFiled: { ...state.profileFiled, [action.filed]: action.value } };
        }
        case profileLoadSuccessType: {
            return { ...state, profile: action.payload.data };
        }
        case profileLoadFailureType: {
            return { ...state, profileError: action.payload.data };
        }
        default: {
            return state;
        }
    }
}

export default profileReducer;
