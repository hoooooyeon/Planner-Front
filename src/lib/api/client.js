import axios from "axios";

const client = axios.create();

export const tokenUse = () => {
    client.defaults.headers.common['Authorization'] = localStorage.getItem("token");
}

export default client;