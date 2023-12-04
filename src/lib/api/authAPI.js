import client from './client';

const baseUrl = '/api/auth';

export const login = ({ email, password }) => {
    return client.post(`${baseUrl}/login`, { email, password });
};

export const register = ({ email, password, username, nickname, phone }) => {
    return client.post(`${baseUrl}/register`, { email, password, username, nickname, phone });
};

export const emailCodeRequest = ({ email }) => {
    return client.post(`${baseUrl}/authentication-code/request?email=${email}`);
};

export const phoneCodeRequest = ({ username, phone }) => {
    const userName = username;
    return client.post(`${baseUrl}/authentication-code/request?phone=${phone}`, { userName, phone });
};

export const emailCodeCheck = ({ email, code }) => {
    return client.post(`${baseUrl}/authentication-code/check`, { email, code });
};

// export const phoneCodeCheck = ({ userName, phone, code }) => {
//     return client.post(`${baseUrl}//authentication-code/check`, { userName, phone, code });
// };
