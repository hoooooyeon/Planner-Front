
const validUtil = {
    regexType: {
        email: /^[\w\.\-]+@[\w\.\-]+\.\w+$/,
        password: /^(?=.*[\w])(?=.*[~!@#$%^&*()+|=])[\w~!@#$%^&*()+|=]{8,16}$/,
        userName: /^.*[가-힣]$/,
        nickName: /^.*[a-zA-z\d]$/,
        phone: /^010[\d]{4}[\d]{4}$/,
    },
    valid: function (type, value) {
        const regex = this.regexType[type];
        return regex.test(value);
    }
};

export default validUtil;