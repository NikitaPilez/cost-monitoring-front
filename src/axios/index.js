import axios from "axios";

const options = {
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Cache-Control": "no-cache",
        "Authorization": "Bearer 1|94tCykQKIuRAlSbeQQ6rggWojbrwaLwrTXmUSNd4"
    },
};

export default axios.create(options);
