import axios from 'axios';

const client = axios.create();

export const tokenUse = () => {
    if (localStorage.getItem('token') != null) {
        client.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    }
};
export default client;
