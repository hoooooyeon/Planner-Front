import client from './client';

const baseUrl = '/api/auth';

export const login = ({ email, password }) => {
    return client.post(`${baseUrl}/login`, { email, password });
};

export const register = ({ email, password, username, nickname, phone }) => {
    return client.post(`${baseUrl}/register`, { email, password, username, nickname, phone });
};

// export const emailCodeSend = ({ email }) => {
//     return client.post(`${baseUrl}/authentication-code/send?email=${email}`, { email });
// };

export const phoneCodeSend = ({ userName, phone }) => {
    return client.post(`${baseUrl}/authentication-code/send?phone=${phone}`, { userName, phone });
};

// export const emailCodeCheck = ({ email, code }) => {
//     return client.post(`${baseUrl}//authentication-code/check`, { email, code });
// };

// export const phoneCodeCheck = ({ userName, phone, code }) => {
//     return client.post(`${baseUrl}//authentication-code/check`, { userName, phone, code });
// };
