import axios from "axios";

const isDev = !!window.location.hostname.match(/^(localhost|127\.|192\.)/);

export const endpoint = isDev ? 'http://localhost:8000' : 'https://cost-monitoring.wiggaz.xyz';

const options = {
    baseURL: endpoint,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Cache-Control": "no-cache",
    },
};

export default axios.create(options);
