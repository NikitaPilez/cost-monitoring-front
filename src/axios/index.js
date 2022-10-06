import axios from "axios";

let token = localStorage.token;
const options = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Cache-Control": "no-cache",
        "Authorization": "Bearer " + token
    },
};

export default axios.create(options);
