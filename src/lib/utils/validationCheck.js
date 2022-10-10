
const validUtil = {
    regexType: {
        email: /^[\w\.\-]+@[\w\.\-]+\.\w+$/,
        password: 'password',
        passwordConfirm: 'passwordConfirm',
        userName: 'userName',
        nickName: 'nickName',
        phone: 'phone',
    },
    valid: function (type, value) {
        const regex = this.regexType[type];
        return regex.test(value);
    },
    isEmail: (email) => {
        //return emailRegex.test(email);
    },
    isPassword: (password) => {

    },
    isUserName: (userName) => {

    },
    isNickName: (nickName) => {

    },
    isPhone: (phone) => {
        // 전화번호 정규식 체크
        //const regex = //;
        //return regex.test(phone);
    },
};

export default validUtil;