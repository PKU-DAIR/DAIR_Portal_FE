import axios from "axios";

const isdev = import.meta.env.DEV;

const ax = axios.create();

if (isdev) {
    ax.defaults.baseURL = "http://100.64.0.18:8000";
} else {
    ax.defaults.baseURL = "/api";
}

ax.interceptors.request.use((config) => {
    let token = localStorage.getItem("ApiToken");
    const expired = localStorage.getItem("ApiTokenExpiredAt");
    if (!expired || new Date(expired) < new Date()) {
        token = null;
        localStorage.removeItem("ApiToken");
        localStorage.removeItem("ApiTokenExpiredAt");
    }
    if (token != null) {
        config.headers["Api-key"] = token;
    }
    return config;
});

export default ax;


