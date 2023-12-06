const validType = {
    EMAIL: 'email',
    PASSWORD: 'password',
    USERNAME: 'username',
    NICKNAME: 'nickname',
    PHONE: 'phone',
    CODE: 'code',
    TITLE: 'title',
    EXPENSE: 'expense',
    MEMBERCOUNT: 'memberCount',
    MEMBERTYPEID: 'memberTypeId',
};
const regexType = {
    email: /^[\w\.\-]+@[\w\.\-]+\.\w+$/,
    password: /^(?=.*[\w])(?=.*[~!@#$%^&*()+|=])[\w~!@#$%^&*()+|=]{8,16}$/,
    username: /^.*[가-힣a-zA-z]$/,
    nickname: /^.*[가-힣a-zA-z\d]$/,
    phone: /^010[\d]{4}[\d]{4}$/,
    code: /^\d{6}$/,
    title: /^.{1,20}$/,
    expense: /^\d+$/,
    memberCount: /^\d+$/,
    memberTypeId: /^[1-4]{1}$/,
};
const notValidMsg = {
    email: '이메일 형식이 아닙니다.',
    password: '비밀번호는 8~16글자 입니다.',
    passwordConfirm: '비밀번호가 동일하지 않습니다.',
    username: '이름은 한글, 숫자만 가능합니다.',
    nickname: '닉네임은 한글, 영어, 숫자만 가능합니다.',
    phone: '휴대폰 번호는 010으로 시작하고 -는 불필요합니다.',
    code: '인증번호는 숫자만 가능합니다.',
    title: '플래너 제목은 빈 칸 또는 20자를 넘을 수 없습니다.',
    expense: '여행 비용은 숫자만 가능합니다.',
    memberCount: '여행 인원은 숫자만 가능합니다.',
    memberTypeId: '여행 멤버 타입은 1~4만 가능합니다.',
};

const validation = (formValues) => {
    const validState = {};
    Object.keys(formValues).forEach((element) => {
        if (element === 'passwordConfirm') {
            if (formValues.password !== formValues.passwordConfirm) {
                validState[element] = notValidMsg[element];
            }
        } else {
            const regex = regexType[element];
            if (!regex.test(formValues[element])) {
                validState[element] = notValidMsg[element];
            }
        }
    });

    return validState;
};

export default validation;
