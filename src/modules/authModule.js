// 액션 타입
const loginType = "auth/LOGIN";
const loginSuccessType = "auth/LOGIN_SUCCESS";
const loginFailureType = "auth/LOGIN_FAILURE";

const registerType = "auth/REGISTRY";
const registerSuccessType = "auth/REGISTER_SUCCESS";
const registerFailureType = "auth/REGISTER_FAILURE";

// 액션함수
export const loginAction = ({ id, pw }) => ({
    type: loginType,
    id,
    pw
})