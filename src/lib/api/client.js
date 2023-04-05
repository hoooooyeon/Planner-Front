import axios from 'axios';

const client = axios.create();

export const tokenUse = () => {
    client.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
};
export default client;
