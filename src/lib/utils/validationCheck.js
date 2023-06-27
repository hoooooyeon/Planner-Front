const validType = {
    EMAIL: 'email',
    PASSWORD: 'password',
    USERNAME: 'username',
    NICKNAME: 'nickname',
    PHONE: 'phone'
};
const regexType = {
    email: /^[\w\.\-]+@[\w\.\-]+\.\w+$/,
    password: /^(?=.*[\w])(?=.*[~!@#$%^&*()+|=])[\w~!@#$%^&*()+|=]{8,16}$/,
    username: /^.*[가-힣a-zA-z]$/,
    nickname: /^.*[가-힣a-zA-z\d]$/,
    phone: /^010[\d]{4}[\d]{3}$/,
};
const notValidMsg = {
    email: '이메일 형식이 아닙니다.',
    password: '비밀번호는 8~16글자 입니다.',
    passwordConfirm: '비밀번호가 동일하지 않습니다.',
    username: '이름은 한글, 숫자만 가능합니다.',
    nickname: '닉네임은 한글, 영어, 숫자만 가능합니다.',
    phone: '휴대폰 번호는 010으로 시작하고 -는 불필요합니다.'
};

const validation = (formValues) => {
    const validState = {};
    Object.keys(formValues).forEach(element => {
        if (element === 'passwordConfirm') {
            if (formValues.password !== formValues.passwordConfirm) {
                validState[element] = notValidMsg[element];
            }
        }
        else {
            const regex = regexType[element];
            if (!regex.test(formValues[element])) {
                validState[element] = notValidMsg[element];
            }
        }
    });

    return validState;
}

export default validation;